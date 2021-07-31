package main

import (
	"context"
	"log"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db *dynamodb.DynamoDB

var ENDPOINTS = map[string]func(string) events.APIGatewayProxyResponse{
	"addunit":    AddUnitHandler,
	"updateunit": UpdateUnitHandler,
	"deleteunit": RemoveUnitHandler,
}

func handler(ctx context.Context, payload events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if payload.HTTPMethod == "POST" || payload.HTTPMethod == "PUT" || payload.HTTPMethod == "PATCH" { // Treat them all the same
		var valid bool
		var err error
		operation := strings.ToLower(payload.PathParameters["operation"])
		log.Printf("IP: %v is attempting operation: %s with method: %s", payload.RequestContext.Identity.SourceIP, operation, payload.HTTPMethod)
		if os.Getenv("DisableAuthentication") == "true" {
			log.Printf("Authentication has been disabled, please only do this in test!")
			valid = true
		} else {
			log.Printf("Performing Authentication")
			valid, err = validateJWT(payload.Headers["Authorization"])
		}
		if !valid {
			log.Printf("User was unauthorized, terminating: %s", err.Error())
			return Unauthorized(err.Error()), nil
		}
		if endpointHandler, ok := ENDPOINTS[operation]; ok {
			return endpointHandler(payload.Body), nil
		} else {
			log.Printf("Invalid endpoint hit: %s", operation)
			return BadRequest("That endpoint doesnt exist"), nil
		}
	} else {
		log.Printf("IP: %v requested unsupported method: %s", payload.RequestContext.Identity.SourceIP, payload.HTTPMethod)
		return InvalidOperation(payload.HTTPMethod), nil
	}
}

func main() {
	initializeDB(&db)
	lambda.Start(handler)
}
