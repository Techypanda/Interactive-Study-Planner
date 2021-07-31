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
	Purpose: Return a error if the unit exists in DB, else return nil
*/
func checkUnitNotInDatabase(unit Unit, db *dynamodb.DynamoDB) error {
	tempUppercaseUnitCode := strings.ToUpper(unit.UnitCode)
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevUnits"),
		Key: map[string]*dynamodb.AttributeValue{
			"UnitCode": {
				S: aws.String(tempUppercaseUnitCode),
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
	Purpose: Return a error if the unit doesnt exists in DB, else return nil
*/
func checkUnitIsInDatabase(unit DelUnit, db *dynamodb.DynamoDB) error {
	upperCased := strings.ToUpper(unit.UnitCode)
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevUnits"),
		Key: map[string]*dynamodb.AttributeValue{
			"UnitCode": {
				S: aws.String(upperCased),
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
	String sets require []*string, so I guess we need to convert it.
*/
func convertToStringMemoryArray(arr []string) []*string {
	var outArr []*string
	for index, _ := range arr {
		outArr = append(outArr, &arr[index])
	}
	return outArr
}

/*
	Purpose: Delete unit from the database
*/
func deleteUnitFromDatabase(item DelUnit, db *dynamodb.DynamoDB) error {
	upperCasedUnitCode := strings.ToUpper(item.UnitCode)
	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"UnitCode": {
				S: aws.String(upperCasedUnitCode),
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

/*
	Purpose: Return a error if the unit fails to add to db, else return nil
*/
func addUnitToDatabase(unit Unit, db *dynamodb.DynamoDB) error {
	tempUpperCaseUnitCode := strings.ToUpper(unit.UnitCode)
	tempLowerCaseUnitName := strings.ToLower(unit.Name)
	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"UnitCode": {
				S: aws.String(tempUpperCaseUnitCode),
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
			"SearchName": {
				S: aws.String(tempLowerCaseUnitName),
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
				return fmt.Errorf("dberror: resource not found, %v", err)
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
