package main

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

func initializeDB(db **dynamodb.DynamoDB) {
	session := session.Must(session.NewSession())
	*db = dynamodb.New(session)
	(*db).Config.WithRegion("ap-southeast-2")
}

func retrieveUnit(payload events.APIGatewayProxyRequest) (Unit, error) {
	var unit Unit
	err := json.Unmarshal([]byte(payload.Body), &unit)
	if err != nil {
		return unit, err
	}
	return unit, nil
}

/*
	Purpose: Return a error if the unit exists in DB, else return nil
	TODO: (Maybe make use of panic here)
*/
func checkInDatabase(unit Unit, db *dynamodb.DynamoDB) error {
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevUnits"),
		Key: map[string]*dynamodb.AttributeValue{
			"UnitCode": {
				S: aws.String(unit.UnitCode),
			},
		},
	}
	item, getErr := db.GetItem(input)
	if getErr == nil {
		if item.Item == nil {
			return nil
		} else {
			return errors.New("that unitCode exists in db")
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
	String sets require []*string, so I guess we need to convert it.
	TODO: (Please phase this out, surely it doesnt need a array of pointers...)
*/
func convertToStringMemoryArray(arr []string) []*string {
	var outArr []*string
	for index, _ := range arr {
		outArr = append(outArr, &arr[index])
	}
	return outArr
}

/*
	Purpose: Return a error if the unit fails to add to db, else return nil
	TODO: (Maybe make use of panic here)
*/
func addToDatabase(unit Unit, db *dynamodb.DynamoDB) error {
	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"UnitCode": {
				S: aws.String(unit.UnitCode),
			},
			"Name": {
				S: aws.String(unit.Name),
			},
			"Description": {
				S: aws.String(unit.Description),
			},
			"Credits": {
				N: aws.String(fmt.Sprintf("%f", unit.Credits)),
			},
			"Delivery": {
				S: aws.String(unit.Delivery),
			},
			"Prerequistes": {
				SS: convertToStringMemoryArray(unit.Prerequistes),
			},
			"Corequistes": {
				SS: convertToStringMemoryArray(unit.Corequistes),
			},
			"Antirequistes": {
				SS: convertToStringMemoryArray(unit.Antirequistes),
			},
		},
		TableName: aws.String("DevUnits"),
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
				return errors.New(fmt.Sprintf("dberror: resource not found, %v", err))
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
		return nil
	}
	return nil
}
