package main

// TODO: main_test.go
import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db *dynamodb.DynamoDB

type Payload struct {
	UnitCode string `json:"unitCode"`
}

func handler(ctx context.Context, payload events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	token := payload.Headers["Authorization"]
	valid, err := validateJWT(token)
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
		delPayload, err := interpretPayload(payload)
		if err == nil {
			inDBError := checkInDatabase(delPayload, db)
			if inDBError == nil {
				delError := deleteFromDatabase(delPayload, db)
				if delError == nil {
					return events.APIGatewayProxyResponse{
						Body:       fmt.Sprintf("Successfully Deleted Unit With ID: %s", delPayload.UnitCode),
						StatusCode: 200,
					}, nil
				} else {
					return events.APIGatewayProxyResponse{
						Body:       fmt.Sprintf("Bad Request: %s", delError.Error()),
						StatusCode: 400,
					}, nil
				}
			} else {
				return events.APIGatewayProxyResponse{
					Body:       fmt.Sprintf("Bad Request: %s", inDBError.Error()),
					StatusCode: 400,
				}, nil
			}
		} else {
			return events.APIGatewayProxyResponse{
				Body:       "Invalid payload, please read remove unit documentation",
				StatusCode: 400,
			}, nil
		}
	}
}

func main() {
	initializeDB(&db)
	lambda.Start(handler)
}
