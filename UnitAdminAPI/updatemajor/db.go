package main

import (
	"errors"
	"fmt"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

func initializeDB(db **dynamodb.DynamoDB) {
	session := session.Must(session.NewSession())
	*db = dynamodb.New(session)
	(*db).Config.WithRegion("ap-southeast-2")
}

/*
	Purpose: Return a error if the major doesnt exists in DB, else return nil
	TODO: (Maybe make use of panic here)
*/
func checkInDatabase(major Major, db *dynamodb.DynamoDB) error {
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevMajors"),
		Key: map[string]*dynamodb.AttributeValue{
			"MajorCode": {
				S: aws.String(major.MajorCode),
			},
		},
	}
	item, getErr := db.GetItem(input)
	if getErr == nil {
		if item.Item == nil {
			return errors.New("that unitCode doesnt exist in db")
		} else {
			return nil
		}
	} else {
		if aerr, ok := getErr.(awserr.Error); ok {
			switch aerr.Code() {
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				return errors.New("DBError: Provisioned Throughput has been exceeded")
			case dynamodb.ErrCodeResourceNotFoundException:
				return nil
			case dynamodb.ErrCodeRequestLimitExceeded:
				return errors.New("DBError: cannot request from db, limit exceeded")
			case dynamodb.ErrCodeInternalServerError:
				return errors.New("DBError: internal server error (most likely on Amazon's Side)")
			default:
				return errors.New(aerr.Error())
			}
		} else {
			return errors.New(getErr.Error())
		}
	}
}

/*
	Purpose: Return a error if the unit fails to add to db, else return nil
	TODO: (Maybe make use of panic here)
*/
func addToDatabase(major Major, db *dynamodb.DynamoDB) error {
	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"MajorCode": {
				S: aws.String(strings.ToUpper(major.MajorCode)),
			},
			"Name": {
				S: aws.String(major.Name),
			},
			"Credits": {
				N: aws.String(fmt.Sprintf("%f", major.Credits)),
			},
			"Units": {
				SS: convertToStringMemoryArray(major.Units),
			},
			"UnitAntiReqs": {
				SS: convertToStringMemoryArray(major.UnitAntiReqs),
			},
			"SpecAntiReqs": {
				SS: convertToStringMemoryArray(major.SpecAntiReqs),
			},
			"SearchName": {
				S: aws.String(strings.ToLower(major.Name)),
			},
		},
		TableName: aws.String("DevMajors"),
	}

	_, err := db.PutItem(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case dynamodb.ErrCodeConditionalCheckFailedException:
				return errors.New("dberror: conditionalcheck failed")
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				return errors.New("dberror: throughput exceeded")
			case dynamodb.ErrCodeResourceNotFoundException:
				return errors.New("dberror: resource not found")
			case dynamodb.ErrCodeItemCollectionSizeLimitExceededException:
				return errors.New("dberror: FATAL, item collection size exceeded")
			case dynamodb.ErrCodeTransactionConflictException:
				return errors.New("dberror: transaction conflict")
			case dynamodb.ErrCodeRequestLimitExceeded:
				return errors.New("dberror: request limits reached")
			case dynamodb.ErrCodeInternalServerError:
				return errors.New("dberror: dynamodb internal server error, likely aws down")
			default:
				return errors.New(aerr.Error())
			}
		} else {
			return errors.New(err.Error())
		}
		return err
	}
	return nil
}
