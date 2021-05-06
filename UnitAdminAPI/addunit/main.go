package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

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

func addToDatabase(unit Unit) error {
	return nil
}

func handler(ctx context.Context, payload Unit) (events.APIGatewayProxyResponse, error) {
	fmt.Printf("Recieved Payload: %+v\n", payload) // redirect to logs
	err := addToDatabase(payload)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       "Failure To Add Unit To DB!",
			StatusCode: 400,
		}, err
	}
	return events.APIGatewayProxyResponse{
		Body:       fmt.Sprintf("%v", payload),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(handler)
}
