package main

import (
	"context"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db *dynamodb.DynamoDB

func handler(ctx context.Context, payload events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	major, err := interpretCUPayload(payload)
	if err == nil {
		inDBError := checkInDatabase(major, db)
		if inDBError == nil {
			addDBError := addToDatabase(major, db)
			if addDBError == nil {
				return OkResponse("Major has been updated in database"), nil
			} else {
				return BadRequest(addDBError.Error()), nil
			}
		} else {
			return BadRequest(inDBError.Error()), nil
		}
	} else {
		return BadRequest("Payload is incorrect, refer to Update Major documentation"), err
	}
}

func main() {
	initializeDB(&db)
	lambda.Start(handler)
}
