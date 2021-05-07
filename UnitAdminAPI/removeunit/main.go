package main

// TODO: main_test.go
import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws/session"
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

func handler(ctx context.Context, payload Unit) (events.APIGatewayProxyResponse, error) {
	fmt.Printf("Recieved Payload: %+v\n", payload) // redirect to logs

	inDBError := checkInDatabase(payload, db)
	if inDBError == nil {
		delError := deleteFromDatabase(payload, db)
		if delError == nil {
			return events.APIGatewayProxyResponse{
				Body:       "Successfully Deleted Unit",
				StatusCode: 200,
			}, nil
		} else {
			return events.APIGatewayProxyResponse{
				Body:       delError.Error(),
				StatusCode: 400,
			}, delError
		}
	} else {
		return events.APIGatewayProxyResponse{
			Body:       inDBError.Error(),
			StatusCode: 400,
		}, inDBError
	}
	/*if inDBError == nil {
		addDBError := addToDatabase(payload, db)
		if addDBError != nil {
			return events.APIGatewayProxyResponse{
				Body:       "Failure To Add Unit To DB!",
				StatusCode: 400,
			}, addDBError
		} else {
			return events.APIGatewayProxyResponse{
				Body:       "Successfully Added Unit",
				StatusCode: 200,
			}, nil
		}
	} else {
		return events.APIGatewayProxyResponse{
			Body:       inDBError.Error(),
			StatusCode: 400,
		}, inDBError
	} */
}

func main() {
	session := session.Must(session.NewSession())
	db = dynamodb.New(session)
	db.Config.WithRegion("ap-southeast-2")
	lambda.Start(handler)
}
