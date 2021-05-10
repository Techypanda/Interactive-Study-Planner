package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
)

type Major struct {
	MajorCode string `json:"majorCode"`
	Name string `json:"name"`
	Credits float32 `json:"credits"`
	Units []string `json:"units"`
	UnitAntiReqs []string `json:"unitAntiReqs"`
	SpecAntiReqs []string `json:"specAntiReqs"`
}

type RemoveMajorPayload struct {
	MajorCode string `json:"majorCode"`
}

func interpretCUPayload(payload events.APIGatewayProxyRequest) (Major, error) {
	var major Major
	err := json.Unmarshal([]byte(payload.Body), &major)
	if err != nil {
		return major, err
	}
	return major, nil
}

func interpretDPayload(payload events.APIGatewayProxyRequest) (RemoveMajorPayload, error) {
	var p RemoveMajorPayload
	err := json.Unmarshal([]byte(payload.Body), &p)
	if err != nil {
		return p, err
	}
	return p, nil
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
