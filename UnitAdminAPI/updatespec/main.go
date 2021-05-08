package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db *dynamodb.DynamoDB

func handler(ctx context.Context, payload events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	spec, err := interpretCUPayload(payload)
	if err == nil {
		inDBError := checkInDatabase(spec, db)
		if inDBError == nil {
			addDBError := addToDatabase(spec, db)
			if addDBError == nil {
				return OkResponse("Specialization has been added to database"), nil
			} else {
				return BadRequest(addDBError.Error()), nil
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
