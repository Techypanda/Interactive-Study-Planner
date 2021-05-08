package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
)

type Specialization struct {
	SpecCode string `json:"specCode"`
	Name string `json:"name"`
	Credits float32 `json:"credits"`
	CourseInternal bool `json:"courseInternal"`
	Units []string `json:"units"`
	UnitAntiReqs []string `json:"unitAntiReqs"`
	SpecAntiReqs []string `json:"specAntiReqs"`
	MajorAntiReqs []string `json:"majorAntiReqs"`
}

func interpretCUPayload(payload events.APIGatewayProxyRequest) (Specialization, error) {
	var specialization Specialization
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
