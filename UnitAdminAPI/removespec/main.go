package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db *dynamodb.DynamoDB

func handler(ctx context.Context, payload events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	spec, err := interpretDPayload(payload)
	if err == nil {
		inDBError := checkInDatabase(spec, db)
		if inDBError == nil {
			delDBError := deleteFromDatabase(spec, db)
			if delDBError == nil {
				return OkResponse("Specialization has been deleted from database"), nil
			} else {
				return BadRequest(delDBError.Error()), nil
			}
		} else {
			return BadRequest(inDBError.Error()), nil
		}
	} else {
		return BadRequest("Payload is incorrect, refer to Add Specialization documentation"), nil
	}
}

func main() {
	initializeDB(&db)
	lambda.Start(handler)
}
