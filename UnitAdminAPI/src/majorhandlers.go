package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
)

func AddMajorHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running add major endpoint")
	major, err := parseMajorBody(body)
	if err != nil {
		log.Printf("Failed to parse major body: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to parse major body: %s", err.Error()))
	}
	log.Printf("Processed major body: %v", major)
	err = checkMajorNotInDatabase(major, db)
	if err != nil {
		log.Printf("Major db check failed: %s", err.Error())
		return BadRequest(fmt.Sprintf("Cannot add %s to db: %s", major.MajorCode, err.Error()))
	}
	err = addMajorToDatabase(major, db)
	if err != nil {
		log.Printf("Failed to add major to db: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to add major to db: %s", err.Error()))
	}
	log.Printf("Added major %s to db", major.MajorCode)
	return OkResponse(fmt.Sprintf("Added major %s to db", major.MajorCode))
}

func UpdateMajorHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running update major endpoint")
	major, err := parseMajorBody(body)
	if err != nil {
		log.Printf("Failed to parse major body: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to parse major body: %s", err.Error()))
	}
	log.Printf("Processed major body: %v", major)
	err = checkMajorIsInDatabase(major, db)
	if err != nil {
		log.Printf("Major is not in database, cannot update: %s", err.Error())
		return BadRequest(fmt.Sprintf("Major is not in db, cannot update: %s", err.Error()))
	}
	err = addMajorToDatabase(major, db)
	if err != nil {
		log.Printf("Failed to add major to db: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to add major to db: %s", err.Error()))
	}
	log.Printf("Added major %s to db", major.MajorCode)
	return OkResponse(fmt.Sprintf("Updated major %s to db", major.MajorCode))
}

func DeleteMajorHandler(body string) events.APIGatewayProxyResponse {
	log.Printf("Running delete major endpoint")
	major, err := parseDelMajorBody(body)
	if err != nil {
		log.Printf("Failed to parse delete major body: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to parse delete major body: %s", err.Error()))
	}
	log.Printf("Processed del major body: %v", major)
	err = checkMajorIsInDatabase(Major{MajorCode: major.MajorCode}, db)
	if err != nil {
		log.Printf("Major not in db, cannot delete: %s", err.Error())
		return BadRequest(fmt.Sprintf("Major not in db, cannot delete: %s", err.Error()))
	}
	err = deleteMajorFromDatabase(major, db)
	if err != nil {
		log.Printf("Delete error occured: %s", err.Error())
		return BadRequest(fmt.Sprintf("Delete error occured: %s", err.Error()))
	}
	log.Printf("Deleted unit %s from db", major.MajorCode)
	return OkResponse(fmt.Sprintf("Delete major %s from db", major.MajorCode))
}

func parseMajorBody(body string) (Major, error) {
	var major Major
	err := json.Unmarshal([]byte(body), &major)
	if err != nil {
		return major, err
	}
	if major.Name == "" {
		return major, errors.New("name is empty")
	}
	if major.Credits <= 0 {
		return major, errors.New("credits is <= 0")
	}
	if major.MajorCode == "" {
		return major, errors.New("MajorCode is empty")
	}
	major.Units = append(major.Units, "")
	major.SpecAntiReqs = append(major.SpecAntiReqs, "")
	major.UnitAntiReqs = append(major.UnitAntiReqs, "")
	return major, nil
}

func parseDelMajorBody(body string) (DelMajor, error) {
	var major DelMajor
	err := json.Unmarshal([]byte(body), &major)
	if err != nil {
		return major, err
	}
	if major.MajorCode == "" {
		return major, errors.New("major code is empty")
	}
	return major, nil
}
