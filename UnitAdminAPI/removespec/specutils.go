package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
)

type DPayload struct {
	SpecCode string `json:"specCode"`
}

func interpretDPayload(payload events.APIGatewayProxyRequest) (DPayload, error) {
	var specialization DPayload
	err := json.Unmarshal([]byte(payload.Body), &specialization)
	if err != nil {
		return specialization, err
	}
	return specialization, nil
}

func BadRequest(reason string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		StatusCode:        400,
		Body:              fmt.Sprintf("Bad Request: %s", reason),
	}
}

func OkResponse(successText string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Body:       fmt.Sprintf("Success: %s", successText),
		StatusCode: 200,
	}
}

/*
	String sets require []*string, so I guess we need to convert it.
	TODO: (Please phase this out, surely it doesnt need a array of pointers...)
*/
func convertToStringMemoryArray(arr []string) []*string {
	var outArr []*string
	for index, _ := range arr {
		outArr = append(outArr, &arr[index])
	}
	return outArr
}
