package main

import (
	"bufio"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strconv"
	"strings"

	"github.com/aws/aws-lambda-go/events"
)

func processUnit(scanner *bufio.Scanner, lineNumber *int) (Unit, error) {
	unit := Unit{}
	*lineNumber += 1
	read := scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected unitcode on line: %d, recieved either error or eof", *lineNumber)
	}
	unit.UnitCode = strings.ToUpper(scanner.Text())
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected unitname on line: %d, recieved either error or eof", *lineNumber)
	}
	unit.Name = scanner.Text()
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected unitdescription on line: %d, recieved either error or eof", *lineNumber)
	}
	unit.Description = scanner.Text()
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected credits on line: %d, recieved either error or eof", *lineNumber)
	}
	tempCredits, err := strconv.ParseFloat(scanner.Text(), 32)
	if err != nil {
		return unit, fmt.Errorf("failed to parse credits on line: %d, error: %s", *lineNumber, err.Error())
	}
	unit.Credits = float32(tempCredits)
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected delivery on line: %d, recieved either error or eof", *lineNumber)
	}
	unit.Delivery = scanner.Text()
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected prerequistes on line: %d, recieved either error or eof", *lineNumber)
	}
	tempPrereq := scanner.Text()
	if tempPrereq == "" {
		unit.Prerequistes = append(unit.Prerequistes, "")
	} else {
		for _, prereq := range strings.Split(tempPrereq, ",") {
			for _, x := range unit.Prerequistes {
				if strings.ToUpper(prereq) == x {
					return unit, fmt.Errorf("duplicate prerequiste cannot exist, it occurs on line %d, value: %s", *lineNumber, prereq)
				}
			}
			unit.Prerequistes = append(unit.Prerequistes, strings.ToUpper(prereq))
		}
	}
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected corequistes on line: %d, recieved either error or eof", *lineNumber)
	}
	tempCoreq := scanner.Text()
	if tempCoreq == "" {
		unit.Corequistes = append(unit.Corequistes, "")
	} else {
		for _, coreq := range strings.Split(tempCoreq, ",") {
			for _, x := range unit.Corequistes {
				if strings.ToUpper(coreq) == x {
					return unit, fmt.Errorf("duplicate corequiste cannot exist, it occurs on line %d, value: %s", *lineNumber, coreq)
				}
			}
			unit.Corequistes = append(unit.Corequistes, strings.ToUpper(coreq))
		}
	}
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected antirequistes on line: %d, recieved either error or eof", *lineNumber)
	}
	tempAntiReq := scanner.Text()
	if tempAntiReq == "" {
		unit.Antirequistes = append(unit.Antirequistes, "")
	} else {
		for _, antireq := range strings.Split(tempAntiReq, ",") {
			for _, x := range unit.Antirequistes {
				if strings.ToUpper(antireq) == x {
					return unit, fmt.Errorf("duplicate antirequiste cannot exist, it occurs on line %d, value: %s", *lineNumber, antireq)
				}
			}
			unit.Antirequistes = append(unit.Antirequistes, strings.ToUpper(antireq))
		}
	}
	return unit, nil
}

func BulkAddEndpoint(body string) events.APIGatewayProxyResponse {
	log.Printf("Beginning Bulk Addition")
	bulkReq, err := parseBulkAddBody(body)
	if err != nil {
		log.Printf("Failed to parse request: %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to parse request: %s", err.Error()))
	}
	log.Printf("Successfully recieved base64 encoded csv data, attempting to decode")
	csvData, err := decodeBulkAdd(bulkReq.CSVData)
	if err != nil {
		log.Printf("Failed to decode base64 csv: %s", err.Error())
	}
	log.Printf("Successfully processed data")
	unitList := []Unit{}
	scanner := bufio.NewScanner(strings.NewReader(csvData))
	lineNumber := 0
	for scanner.Scan() {
		lineNumber++
		dataType := scanner.Text()
		switch strings.ToUpper(dataType) {
		case "UNIT":
			unit, err := processUnit(scanner, &lineNumber)
			if err != nil {
				log.Printf("Failed to process a unit!: %s; On Line Number: %d", err.Error(), lineNumber)
				return BadRequest(fmt.Sprintf("Failed to process a unit!: %s; On Line Number: %d", err.Error(), lineNumber))
			}
			unitList = append(unitList, unit)
		}
	}
	for _, i := range unitList {
		fmt.Printf("%v", i)
	}
	return OkResponse("Success - Bulk Addition")
}

func decodeBulkAdd(b64d string) (string, error) {
	data, err := base64.StdEncoding.DecodeString(b64d)
	return string(data), err
}

func parseBulkAddBody(body string) (BulkAddRequest, error) {
	var req BulkAddRequest
	err := json.Unmarshal([]byte(body), &req)
	if err != nil {
		return req, err
	}
	if req.CSVData == "" {
		return req, errors.New("empty csv data")
	}
	return req, nil
}
