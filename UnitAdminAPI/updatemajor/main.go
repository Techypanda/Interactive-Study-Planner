package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db *dynamodb.DynamoDB

func handler(ctx context.Context, payload events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var valid bool
	var err error
	if os.Getenv("DisableAuthentication") == "true" {
		fmt.Println("Running With No Authentication")
		valid = true
	} else {
		token := payload.Headers["Authorization"]
		valid, err = validateJWT(token)
	}
	if !valid {
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       fmt.Sprintf("you have failed authorization: %v", err),
			StatusCode: 401,
		}, nil
	} else {
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
}

func main() {
	initializeDB(&db)
	lambda.Start(handler)
}
