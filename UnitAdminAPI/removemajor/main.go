package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db *dynamodb.DynamoDB

func handler(ctx context.Context, payload events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	dPayload, err := interpretDPayload(payload)
	if err == nil {
		inDBError := checkInDatabase(dPayload, db)
		if inDBError == nil {
			removeDBError := deleteFromDatabase(dPayload, db)
			if removeDBError == nil {
				return OkResponse("Major has been deleted from database"), nil
			} else {
				return BadRequest(removeDBError.Error()), nil
			}
		} else {
			return BadRequest(inDBError.Error()), nil
		}
	} else {
		return BadRequest("Payload is incorrect, refer to Update Major documentation"), nil
	}
}

func main() {
	initializeDB(&db)
	lambda.Start(handler)
}