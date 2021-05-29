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

type Unit struct {
	UnitCode      string   `json:"unitCode"`
	Name          string   `json:"unitName"`
	Description   string   `json:"unitDescription"`
	Credits       float32  `json:"unitCredits"` // could be a half unit :/
	Delivery      string   `json:"delivery"`
	Prerequistes  []string `json:"prerequistes"`
	Corequistes   []string `json:"corequistes"`
	Antirequistes []string `json:"antirequistes"`
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
		unitPayload, err := retrieveUnit(payload)
		if err == nil {
			inDBError := checkInDatabase(unitPayload, db)
			if inDBError == nil {
				addDBError := addToDatabase(unitPayload, db)
				if addDBError == nil {
					return events.APIGatewayProxyResponse{
						Body:       fmt.Sprintf("Successfully Updated Unit With ID: %s", unitPayload.UnitCode),
						StatusCode: 200,
					}, nil
				} else {
					return events.APIGatewayProxyResponse{
						Body:       fmt.Sprintf("Bad Request: %s", addDBError.Error()),
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
				Body:       fmt.Sprintf("Bad Request: %s", err.Error()),
				StatusCode: 400,
			}, nil
		}
	}
}

func main() {
	initializeDB(&db)
	lambda.Start(handler)
}
