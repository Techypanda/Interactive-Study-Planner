package main

import (
	"fmt"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

func BadRequest(reason string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusBadRequest,
		Body:       fmt.Sprintf("Bad Request: %s", reason),
	}
}

func OkResponse(successText string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Body:       fmt.Sprintf("Success: %s", successText),
		StatusCode: http.StatusOK,
	}
}

func InvalidOperation(reason string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Body:       fmt.Sprintf("We do not support: %s", reason),
		StatusCode: http.StatusMethodNotAllowed,
	}
}

func Unauthorized(reason string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Body:       fmt.Sprintf("You are not authorized: %s", reason),
		StatusCode: http.StatusUnauthorized,
	}
}
