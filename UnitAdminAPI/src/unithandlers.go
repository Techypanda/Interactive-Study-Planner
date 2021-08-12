package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
)

func AddUnitHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running unit add endpoint")
	unit, err := parseUnitAddBody(body)
	if err != nil {
		log.Printf("Could not parse body: %s", err.Error())
		return BadRequest(err.Error())
	}
	log.Printf("Parsed unit: %v", unit)
	err = checkUnitNotInDatabase(unit, db)
	if err != nil {
		log.Printf("Unit is already in database: %s", err.Error())
		return BadRequest(err.Error())
	}
	err = addUnitToDatabase(unit, db)
	if err != nil {
		log.Printf("Unable to add to database: %s", err.Error())
		return BadRequest(err.Error())
	}
	log.Printf("Successfully added unit: %s to database", unit.UnitCode)
	return OkResponse(fmt.Sprintf("Successfully added unit: %s to database", unit.UnitCode))
}

func RemoveUnitHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running unit delete endpoint")
	delUnit, err := parseDelUnitBody(body)
	if err != nil {
		log.Printf("Could not parse body: %s", err.Error())
		return BadRequest(err.Error())
	}
	log.Printf("Processed del request: %v", delUnit)
	err = checkUnitIsInDatabase(delUnit, db)
	if err != nil {
		log.Printf("Unit not in database: %s", err.Error())
		return BadRequest(err.Error())
	}
	err = deleteUnitFromDatabase(delUnit, db)
	if err != nil {
		log.Printf("Unable to delete unit: %s", err.Error())
		return BadRequest(err.Error())
	}
	log.Printf("Successfully deleted unit: %s from database", delUnit.UnitCode)
	return OkResponse(fmt.Sprintf("Successfully deleted unit: %s from database", delUnit.UnitCode))
}

func UpdateUnitHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running unit update endpoint")
	unit, err := parseUnitAddBody(body)
	if err != nil {
		log.Printf("Could not parse body: %s", err.Error())
		return BadRequest(err.Error())
	}
	log.Printf("Processed unit update request: %v", unit)
	err = checkUnitIsInDatabase(DelUnit{UnitCode: unit.UnitCode}, db)
	if err != nil {
		log.Printf("Unit is not in database, cannot update a non existing item")
		return BadRequest("Unit is not in database, cannot update a non existing item")
	}
	err = addUnitToDatabase(unit, db)
	if err != nil {
		log.Printf("Unable to update unit: %s in db, err: %s", unit.UnitCode, err.Error())
		return BadRequest(fmt.Sprintf("Unable to update unit: %s in db, err: %s", unit.UnitCode, err.Error()))
	}
	log.Printf("Successfully updated unit: %s in db", unit.UnitCode)
	return OkResponse(fmt.Sprintf("successfully updated unit: %s in db", unit.UnitCode))
}

func parseDelUnitBody(body string) (DelUnit, error) {
	var unit DelUnit
	err := json.Unmarshal([]byte(body), &unit)
	if err != nil {
		return unit, err
	}
	if unit.UnitCode == "" {
		return unit, errors.New("unitCode is missing or nil")
	}
	return unit, nil
}

func parseUnitAddBody(body string) (Unit, error) {
	var unit Unit
	err := json.Unmarshal([]byte(body), &unit)
	if err != nil {
		return unit, err
	}
	if unit.UnitCode == "" {
		return unit, errors.New("unitCode is empty")
	}
	if unit.Name == "" {
		return unit, errors.New("name is empty")
	}
	if unit.Description == "" {
		return unit, errors.New("description is empty")
	}
	if unit.Credits == 0 || unit.Credits < 0 {
		return unit, errors.New("credits is empty or a invalid value (<= 0)")
	}
	if unit.Delivery == "" {
		return unit, errors.New("delivery is empty")
	}
	// unit.Corequistes = append(unit.Corequistes, "")
	// unit.Prerequistes = append(unit.Prerequistes, "")
	// unit.Antirequistes = append(unit.Antirequistes, "")
	return unit, nil
}
