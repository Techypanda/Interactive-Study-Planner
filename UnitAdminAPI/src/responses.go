package main

import (
	"fmt"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

func BadRequest(reason string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Origin":      "*",
			"Access-Control-Allow-Methods":     "POST, OPTIONS",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Headers":     "X-Amz-Date,X-Api-Key,X-Amz-Security-Token,X-Requested-With,X-Auth-Token,Referer,User-Agent,Origin,Content-Type,Authorization,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
			"Content-Type":                     "application/json",
		},
		StatusCode: http.StatusBadRequest,
		Body:       fmt.Sprintf("Bad Request: %s", reason),
	}
}

func OkResponse(successText string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Origin":      "*",
			"Access-Control-Allow-Methods":     "POST, OPTIONS",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Headers":     "X-Amz-Date,X-Api-Key,X-Amz-Security-Token,X-Requested-With,X-Auth-Token,Referer,User-Agent,Origin,Content-Type,Authorization,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
			"Content-Type":                     "application/json",
		},
		Body:       fmt.Sprintf("Success: %s", successText),
		StatusCode: http.StatusOK,
	}
}

func InvalidOperation(reason string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Origin":      "*",
			"Access-Control-Allow-Methods":     "POST, OPTIONS",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Headers":     "X-Amz-Date,X-Api-Key,X-Amz-Security-Token,X-Requested-With,X-Auth-Token,Referer,User-Agent,Origin,Content-Type,Authorization,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
			"Content-Type":                     "application/json",
		},
		Body:       fmt.Sprintf("We do not support: %s", reason),
		StatusCode: http.StatusMethodNotAllowed,
	}
}

func Unauthorized(reason string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Origin":      "*",
			"Access-Control-Allow-Methods":     "POST, OPTIONS",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Headers":     "X-Amz-Date,X-Api-Key,X-Amz-Security-Token,X-Requested-With,X-Auth-Token,Referer,User-Agent,Origin,Content-Type,Authorization,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
			"Content-Type":                     "application/json",
		},
		Body:       fmt.Sprintf("You are not authorized: %s", reason),
		StatusCode: http.StatusUnauthorized,
	}
}
