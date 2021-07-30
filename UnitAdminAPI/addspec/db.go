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
	Purpose: Return a error if the major exists in DB, else return nil
	TODO: (Maybe make use of panic here)
*/
func checkInDatabase(spec Specialization, db *dynamodb.DynamoDB) error {
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevSpecializations"),
		Key: map[string]*dynamodb.AttributeValue{
			"SpecializationCode": {
				S: aws.String(spec.SpecCode),
			},
		},
	}
	item, getErr := db.GetItem(input)
	if getErr == nil {
		if item.Item == nil {
			return nil
		} else {
			return errors.New("that specialization exists in db")
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
func addToDatabase(spec Specialization, db *dynamodb.DynamoDB) error {
	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"SpecializationCode": {
				S: aws.String(strings.ToUpper(spec.SpecCode)),
			},
			"Name": {
				S: aws.String(spec.Name),
			},
			"Credits": {
				N: aws.String(fmt.Sprintf("%f", spec.Credits)),
			},
			"Units": {
				SS: convertToStringMemoryArray(spec.Units),
			},
			"UnitAntiReqs": {
				SS: convertToStringMemoryArray(spec.UnitAntiReqs),
			},
			"SpecAntiReqs": {
				SS: convertToStringMemoryArray(spec.SpecAntiReqs),
			},
			"MajorAntiReqs": {
				SS: convertToStringMemoryArray(spec.MajorAntiReqs),
			},
			"SearchName": {
				S: aws.String(strings.ToLower(spec.Name)),
			},
		},
		TableName: aws.String("DevSpecializations"),
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
	}
	return nil
}
