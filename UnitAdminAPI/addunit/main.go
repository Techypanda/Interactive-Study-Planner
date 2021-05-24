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
	// fmt.Printf("Recieved Payload: %+v\n", payload) // redirect to logs

	unit, err := retrieveUnit(payload)
	if err == nil {
		inDBError := checkInDatabase(unit, db)
		if inDBError == nil {
			addDBError := addToDatabase(unit, db)
			if addDBError == nil {
				return events.APIGatewayProxyResponse{
					Headers: map[string]string{
						"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
						"Access-Control-Allow-Origin":  "*",
						"Access-Control-Allow-Methods": "OPTIONS,POST",
					},
					Body:       fmt.Sprintf("Successfully added unit: %s", unit.UnitCode),
					StatusCode: 400,
				}, nil
			} else {
				return events.APIGatewayProxyResponse{
					Headers: map[string]string{
						"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
						"Access-Control-Allow-Origin":  "*",
						"Access-Control-Allow-Methods": "OPTIONS,POST",
					},
					Body:       fmt.Sprintf("Bad Request: %s", addDBError.Error()),
					StatusCode: 400,
				}, nil
			}
		} else {
			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
					"Access-Control-Allow-Origin":  "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST",
				},
				Body:       fmt.Sprintf("Bad Request: %s", inDBError.Error()),
				StatusCode: 400,
			}, nil
		}
	} else {
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "OPTIONS,POST",
			},
			Body:       "Invalid payload recieved, please refer to the AddUnit documentation for correct payload",
			StatusCode: 400,
		}, nil
	}
}

func main() {
	initializeDB(&db)
	lambda.Start(handler)
}
