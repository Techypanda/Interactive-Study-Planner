package main

import (
	"errors"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

/*
	Purpose: Return a error if the unit doesnt exists in DB, else return nil
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
	Purpose: Delete unit from the database
	TODO: panic in this probably
*/
func deleteFromDatabase(item Unit, db *dynamodb.DynamoDB) error {
	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"UnitCode": {
				S: aws.String(item.UnitCode),
			},
		},
		TableName: aws.String("DevUnits"),
	}
	_, err := db.DeleteItem(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case dynamodb.ErrCodeConditionalCheckFailedException:
				errors.New("dberror: conditional check failed")
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				errors.New("dberror: provisioned throughput exceeded")
			case dynamodb.ErrCodeResourceNotFoundException:
				errors.New("That resource is not found")
			case dynamodb.ErrCodeItemCollectionSizeLimitExceededException:
				errors.New("dberror: item collection size reached")
			case dynamodb.ErrCodeTransactionConflictException:
				errors.New("dberror: transaction code conflict")
			case dynamodb.ErrCodeRequestLimitExceeded:
				errors.New("dberror: request limit exceeded")
			case dynamodb.ErrCodeInternalServerError:
				errors.New("dberror: internal server error")
			default:
				errors.New(aerr.Error())
			}
		} else {
			// Print the error, cast err to awserr.Error to get the Code and
			// Message from an error.
			errors.New(err.Error())
		}
	}
	return nil
}
