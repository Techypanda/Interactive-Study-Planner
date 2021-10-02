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
	for index := range arr {
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
				return errors.New("dberror: conditional check failed")
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				return errors.New("dberror: provisioned throughput exceeded")
			case dynamodb.ErrCodeResourceNotFoundException:
				return errors.New("that resource is not found")
			case dynamodb.ErrCodeItemCollectionSizeLimitExceededException:
				return errors.New("dberror: item collection size reached")
			case dynamodb.ErrCodeTransactionConflictException:
				return errors.New("dberror: transaction code conflict")
			case dynamodb.ErrCodeRequestLimitExceeded:
				return errors.New("dberror: request limit exceeded")
			case dynamodb.ErrCodeInternalServerError:
				return errors.New("dberror: internal server error")
			default:
				return errors.New(aerr.Error())
			}
		} else {
			// Print the error, cast err to awserr.Error to get the Code and
			// Message from an error.
			return errors.New(err.Error())
		}
	}
	return nil
}

/*
	Purpose: If prereqs required, attach them, its pass by reference to allow clean code
*/
func attachRequistesToUnitAddition(putItemInput *map[string]*dynamodb.AttributeValue, unit Unit) {
	if len(unit.Prerequistes) > 0 {
		var preReqs []*dynamodb.AttributeValue
		for _, req := range unit.Prerequistes {
			preReqs = append(preReqs, &dynamodb.AttributeValue{
				SS: convertToStringMemoryArray(req),
			})
		}
		(*putItemInput)["Prerequistes"] = &dynamodb.AttributeValue{
			L: preReqs,
		}
	} else {
		var def []*dynamodb.AttributeValue
		var emtpyss []string
		emtpyss = append(emtpyss, "") // empty defualt
		def = append(def, &dynamodb.AttributeValue{
			SS: convertToStringMemoryArray(emtpyss),
		})
		(*putItemInput)["Prerequistes"] = &dynamodb.AttributeValue{
			L: def,
		}
	}
	if len(unit.Antirequistes) > 0 {
		var antiReqs []*dynamodb.AttributeValue
		for _, req := range unit.Antirequistes {
			antiReqs = append(antiReqs, &dynamodb.AttributeValue{
				SS: convertToStringMemoryArray(req),
			})
		}
		(*putItemInput)["Antirequistes"] = &dynamodb.AttributeValue{
			L: antiReqs,
		}
	} else {
		var def []*dynamodb.AttributeValue
		var emtpyss []string
		emtpyss = append(emtpyss, "") // empty defualt
		def = append(def, &dynamodb.AttributeValue{
			SS: convertToStringMemoryArray(emtpyss),
		})
		(*putItemInput)["Antirequistes"] = &dynamodb.AttributeValue{
			L: def,
		}
	}
	if len(unit.Corequistes) > 0 {
		var coReqs []*dynamodb.AttributeValue
		for _, req := range unit.Corequistes {
			coReqs = append(coReqs, &dynamodb.AttributeValue{
				SS: convertToStringMemoryArray(req),
			})
		}
		(*putItemInput)["Corequistes"] = &dynamodb.AttributeValue{
			L: coReqs,
		}
	} else {
		var def []*dynamodb.AttributeValue
		var emtpyss []string
		emtpyss = append(emtpyss, "") // empty defualt
		def = append(def, &dynamodb.AttributeValue{
			SS: convertToStringMemoryArray(emtpyss),
		})
		(*putItemInput)["Corequistes"] = &dynamodb.AttributeValue{
			L: def,
		}
	}
}

/*
	Purpose: Return a error if the unit fails to add to db, else return nil
*/
func addUnitToDatabase(unit Unit, db *dynamodb.DynamoDB) error {
	tempUpperCaseUnitCode := strings.ToUpper(unit.UnitCode)
	tempLowerCaseUnitName := strings.ToLower(unit.Name)
	putItemInput := map[string]*dynamodb.AttributeValue{
		"UnitCode": {
			S: aws.String(tempUpperCaseUnitCode),
		},
		"Name": {
			S: aws.String(tempLowerCaseUnitName),
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
		"Semester": {
			N: aws.String(fmt.Sprintf("%d", unit.Semester)),
		},
	}
	attachRequistesToUnitAddition(&putItemInput, unit) // pass it by reference
	input := &dynamodb.PutItemInput{
		Item:      putItemInput,
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

/*
	Purpose: Return a error if the major exists in DB, else return nil
*/
func checkMajorNotInDatabase(major Major, db *dynamodb.DynamoDB) error {
	majorCode := strings.ToUpper(major.MajorCode)
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevMajors"),
		Key: map[string]*dynamodb.AttributeValue{
			"MajorCode": {
				S: aws.String(majorCode),
			},
		},
	}
	item, getErr := db.GetItem(input)
	if getErr == nil {
		if item.Item == nil {
			return nil
		} else {
			return errors.New("that major exists in db")
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
	Parse the major data and attach it pass by reference for cleaner code
*/
func attachMajorData(putItem *map[string]*dynamodb.AttributeValue, major Major) {
	if len(major.UnitAntiReqs) > 0 {
		var majorAntiReqs []*dynamodb.AttributeValue
		for _, req := range major.UnitAntiReqs {
			majorAntiReqs = append(majorAntiReqs, &dynamodb.AttributeValue{
				SS: convertToStringMemoryArray(req),
			})
		}
		(*putItem)["UnitAntiReqs"] = &dynamodb.AttributeValue{
			L: majorAntiReqs,
		}
	} else {
		var def []*dynamodb.AttributeValue
		var emtpyss []string
		emtpyss = append(emtpyss, "") // empty defualt
		def = append(def, &dynamodb.AttributeValue{
			SS: convertToStringMemoryArray(emtpyss),
		})
		(*putItem)["UnitAntiReqs"] = &dynamodb.AttributeValue{
			L: def,
		}
	}
	if len(major.SpecAntiReqs) > 0 {
		var specAntiReqs []*dynamodb.AttributeValue
		for _, req := range major.SpecAntiReqs {
			specAntiReqs = append(specAntiReqs, &dynamodb.AttributeValue{
				SS: convertToStringMemoryArray(req),
			})
		}
		(*putItem)["SpecAntiReqs"] = &dynamodb.AttributeValue{
			L: specAntiReqs,
		}
	} else {
		var def []*dynamodb.AttributeValue
		var emtpyss []string
		emtpyss = append(emtpyss, "") // empty defualt
		def = append(def, &dynamodb.AttributeValue{
			SS: convertToStringMemoryArray(emtpyss),
		})
		(*putItem)["SpecAntiReqs"] = &dynamodb.AttributeValue{
			L: def,
		}
	}
}

/*
	Purpose: Return a error if the major fails to add to db, else return nil
*/
func addMajorToDatabase(major Major, db *dynamodb.DynamoDB) error {
	majorName := strings.ToLower(major.Name)
	majorCode := strings.ToUpper(major.MajorCode)
	putItem := map[string]*dynamodb.AttributeValue{
		"MajorCode": {
			S: aws.String(majorCode),
		},
		"Name": {
			S: aws.String(majorName),
		},
		"Description": {
			S: aws.String(major.Description),
		},
		"Credits": {
			N: aws.String(fmt.Sprintf("%f", major.Credits)),
		},
		"Units": {
			SS: convertToStringMemoryArray(major.Units),
		},
	}
	attachMajorData(&putItem, major)
	input := &dynamodb.PutItemInput{
		Item:      putItem,
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
	}
	return nil
}

/*
	Purpose: Return a error if the major doesnt exists in DB, else return nil
*/
func checkMajorIsInDatabase(major Major, db *dynamodb.DynamoDB) error {
	majorCodeUppered := strings.ToUpper(major.MajorCode)
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevMajors"),
		Key: map[string]*dynamodb.AttributeValue{
			"MajorCode": {
				S: aws.String(majorCodeUppered),
			},
		},
	}
	item, getErr := db.GetItem(input)
	if getErr == nil {
		if item.Item == nil {
			return errors.New("that majorCode doesnt exist in db")
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
*/
func deleteMajorFromDatabase(major DelMajor, db *dynamodb.DynamoDB) error {
	uppercased := strings.ToUpper(major.MajorCode)
	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"MajorCode": {
				S: aws.String(uppercased),
			},
		},
		TableName: aws.String("DevMajors"),
	}
	_, err := db.DeleteItem(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case dynamodb.ErrCodeConditionalCheckFailedException:
				return errors.New("dberror: conditional check failed")
			case dynamodb.ErrCodeProvisionedThroughputExceededException:
				return errors.New("dberror: provisioned throughput exceeded")
			case dynamodb.ErrCodeResourceNotFoundException:
				return errors.New("that resource is not found")
			case dynamodb.ErrCodeItemCollectionSizeLimitExceededException:
				return errors.New("dberror: item collection size reached")
			case dynamodb.ErrCodeTransactionConflictException:
				return errors.New("dberror: transaction code conflict")
			case dynamodb.ErrCodeRequestLimitExceeded:
				return errors.New("dberror: request limit exceeded")
			case dynamodb.ErrCodeInternalServerError:
				return errors.New("dberror: internal server error")
			default:
				return errors.New(aerr.Error())
			}
		} else {
			// Print the error, cast err to awserr.Error to get the Code and
			// Message from an error.
			return errors.New(err.Error())
		}
	}
	return nil
}

/*
	Purpose: Return a error if the major exists in DB, else return nil
*/
func checkSpecNotInDatabase(spec Specialization, db *dynamodb.DynamoDB) error {
	uppercasedSpecCode := strings.ToUpper(spec.SpecCode)
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevSpecializations"),
		Key: map[string]*dynamodb.AttributeValue{
			"SpecializationCode": {
				S: aws.String(uppercasedSpecCode),
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
	Purpose: Return a error if the major exists in DB, else return nil
*/
func checkSpecIsInDatabase(spec Specialization, db *dynamodb.DynamoDB) error {
	upperCaseSpec := strings.ToUpper(spec.SpecCode)
	input := &dynamodb.GetItemInput{
		TableName: aws.String("DevSpecializations"),
		Key: map[string]*dynamodb.AttributeValue{
			"SpecializationCode": {
				S: aws.String(upperCaseSpec),
			},
		},
	}
	item, getErr := db.GetItem(input)
	if getErr == nil {
		if item.Item == nil {
			return errors.New("that specialization doesnt exists in db")
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
	Parse the spec data and attach it pass by reference for cleaner code
*/
func attachSpecData(putItem *map[string]*dynamodb.AttributeValue, spec Specialization) {
	if len(spec.UnitAntiReqs) > 0 {
		var unitAntiReqs []*dynamodb.AttributeValue
		for _, req := range spec.UnitAntiReqs {
			unitAntiReqs = append(unitAntiReqs, &dynamodb.AttributeValue{
				SS: convertToStringMemoryArray(req),
			})
		}
		(*putItem)["UnitAntiReqs"] = &dynamodb.AttributeValue{
			L: unitAntiReqs,
		}
	} else {
		var emptyReq []*dynamodb.AttributeValue
		var tempReqSS []string
		tempReqSS = append(tempReqSS, "")
		emptyReq = append(emptyReq, &dynamodb.AttributeValue{
			SS: convertToStringMemoryArray(tempReqSS),
		})
		(*putItem)["UnitAntiReqs"] = &dynamodb.AttributeValue{
			L: emptyReq,
		}
	}
	if len(spec.MajorAntiReqs) > 0 {
		var majorAntiReqs []*dynamodb.AttributeValue
		for _, req := range spec.MajorAntiReqs {
			majorAntiReqs = append(majorAntiReqs, &dynamodb.AttributeValue{
				SS: convertToStringMemoryArray(req),
			})
		}
		(*putItem)["MajorAntiReqs"] = &dynamodb.AttributeValue{
			L: majorAntiReqs,
		}
	} else {
		var emptyReq []*dynamodb.AttributeValue
		var tempReqSS []string
		tempReqSS = append(tempReqSS, "")
		emptyReq = append(emptyReq, &dynamodb.AttributeValue{
			SS: convertToStringMemoryArray(tempReqSS),
		})
		(*putItem)["MajorAntiReqs"] = &dynamodb.AttributeValue{
			L: emptyReq,
		}
	}
	if len(spec.SpecAntiReqs) > 0 {
		var specAntiReqs []*dynamodb.AttributeValue
		for _, req := range spec.SpecAntiReqs {
			specAntiReqs = append(specAntiReqs, &dynamodb.AttributeValue{
				SS: convertToStringMemoryArray(req),
			})
		}
		(*putItem)["SpecAntiReqs"] = &dynamodb.AttributeValue{
			L: specAntiReqs,
		}
	} else {
		var emptyReq []*dynamodb.AttributeValue
		var tempReqSS []string
		tempReqSS = append(tempReqSS, "")
		emptyReq = append(emptyReq, &dynamodb.AttributeValue{
			SS: convertToStringMemoryArray(tempReqSS),
		})
		(*putItem)["SpecAntiReqs"] = &dynamodb.AttributeValue{
			L: emptyReq,
		}
	}
}

/*
	Purpose: Return a error if the unit fails to add to db, else return nil
*/
func addSpecToDatabase(spec Specialization, db *dynamodb.DynamoDB) error {
	uppercasedSpecCode := strings.ToUpper(spec.SpecCode)
	lowercasedName := strings.ToLower(spec.Name)
	putItem := map[string]*dynamodb.AttributeValue{
		"SpecializationCode": {
			S: aws.String(uppercasedSpecCode),
		},
		"Name": {
			S: aws.String(lowercasedName),
		},
		"Internal": {
			BOOL: aws.Bool(spec.CourseInternal),
		},
		"Description": {
			S: aws.String(spec.Description),
		},
		"Credits": {
			N: aws.String(fmt.Sprintf("%f", spec.Credits)),
		},
		"Units": {
			SS: convertToStringMemoryArray(spec.Units),
		},
	}
	attachSpecData(&putItem, spec)
	input := &dynamodb.PutItemInput{
		Item:      putItem,
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

/*
	Purpose: Delete spec from the database
*/
func deleteFromDatabase(spec DelSpecialization, db *dynamodb.DynamoDB) error {
	specCodeUpper := strings.ToUpper(spec.SpecCode)
	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"SpecializationCode": {
				S: aws.String(specCodeUpper),
			},
		},
		TableName: aws.String("DevSpecializations"),
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
