package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
)

func AddSpecHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running spec add endpoint")
	spec, err := parseSpecBody(body)
	if err != nil {
		log.Printf("Failed to parse body: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to parse body: %s", err.Error()))
	}
	log.Printf("Successfully parsed body: %v", spec)
	err = checkSpecNotInDatabase(spec, db)
	if err != nil {
		log.Printf("Spec is already in database: %s", err.Error())
		return BadRequest(fmt.Sprintf("Spec is already in database: %s", err.Error()))
	}
	err = addSpecToDatabase(spec, db)
	if err != nil {
		log.Printf("Failed to add spec to db: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to add spec to db: %s", err.Error()))
	}
	log.Printf("Successfully added spec %s to db", spec.SpecCode)
	return OkResponse(fmt.Sprintf("Successfully added spec %s to db", spec.SpecCode))
}

func UpdateSpecHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running spec add endpoint")
	spec, err := parseSpecBody(body)
	if err != nil {
		log.Printf("Failed to parse body: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to parse body: %s", err.Error()))
	}
	log.Printf("Successfully parsed body: %v", spec)
	err = checkSpecIsInDatabase(spec, db)
	if err != nil {
		log.Printf("Spec is not in database: %s", err.Error())
		return BadRequest(fmt.Sprintf("Spec is not in database: %s", err.Error()))
	}
	err = addSpecToDatabase(spec, db)
	if err != nil {
		log.Printf("Failed to update spec to db: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to update spec to db: %s", err.Error()))
	}
	log.Printf("Successfully update spec %s to db", spec.SpecCode)
	return OkResponse(fmt.Sprintf("Successfully update spec %s to db", spec.SpecCode))
}

func DeleteSpecHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running spec delete endpoint")
	spec, err := parseDeleteSpecBody(body)
	if err != nil {
		log.Printf("Failed to parse body: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to parse body: %s", err.Error()))
	}
	log.Printf("Successfully parsed body: %v", spec)
	err = checkSpecIsInDatabase(Specialization{SpecCode: spec.SpecCode}, db)
	if err != nil {
		log.Printf("Spec is not in database: %s", err.Error())
		return BadRequest(fmt.Sprintf("Spec is not in database: %s", err.Error()))
	}
	err = deleteFromDatabase(spec, db)
	if err != nil {
		log.Printf("Failed to delete spec: %s", err.Error())
		return BadRequest(fmt.Sprintf("Spec faield to delete: %s", err.Error()))
	}
	log.Printf("Successfully deleted spec %s from database", spec.SpecCode)
	return OkResponse(fmt.Sprintf("Successfully deleted spec %s from database", spec.SpecCode))
}

func parseDeleteSpecBody(body string) (DelSpecialization, error) {
	var specialization DelSpecialization
	err := json.Unmarshal([]byte(body), &specialization)
	if err != nil {
		return specialization, err
	}
	if specialization.SpecCode == "" {
		return specialization, errors.New("spec code is empty")
	}
	return specialization, nil
}

func parseSpecBody(body string) (Specialization, error) {
	var specialization Specialization
	err := json.Unmarshal([]byte(body), &specialization)
	if err != nil {
		return specialization, err
	}
	if specialization.Credits <= 0 {
		return specialization, errors.New("credits <= 0 or empty")
	}
	if specialization.Name == "" {
		return specialization, errors.New("name is empty")
	}
	if specialization.SpecCode == "" {
		return specialization, errors.New("spec code is empty")
	}
	specialization.Units = append(specialization.Units, "")
	return specialization, nil
}
