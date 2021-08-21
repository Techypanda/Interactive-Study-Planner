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

func processSpec(parser *LineParser) (Specialization, error) {
	spec := Specialization{}
	specCode, err := parser.getLine("speccode")
	if err != nil {
		return spec, err
	}
	spec.SpecCode = strings.ToUpper(specCode)
	specName, err := parser.getLine("specname")
	if err != nil {
		return spec, err
	}
	spec.Name = specName
	tempStr, err := parser.getLine("speccredits")
	if err != nil {
		return spec, err
	}
	tempCredits, err := strconv.ParseFloat(tempStr, 32)
	if err != nil {
		return spec, fmt.Errorf("Unable to process credits on line: %d, error: %s", **parser.lineNumber, err)
	}
	spec.Credits = float32(tempCredits)
	specInternal, err := parser.getLine("specinternal")
	if err != nil {
		return spec, err
	}
	switch strings.ToUpper(specInternal) {
	case "TRUE":
		spec.CourseInternal = true
	case "FALSE":
		spec.CourseInternal = false
	default:
		return spec, fmt.Errorf("Unable to process internal on line: %d, expected TRUE/FALSE recieved: %s", **parser.lineNumber, specInternal)
	}
	units, err := parser.getLine("specunits")
	if err != nil {
		return spec, err
	}
	var unitList []string
	for _, unit := range strings.Split(units, ",") {
		unitList = append(unitList, unit)
	}
	unitList = append(unitList, "")
	spec.Units = unitList
	tempUnitAntiReqs, err := parser.getLine("specunitantireqs")
	if err != nil {
		return spec, err
	}
	var unitAntiReqs [][]string
	for _, unitAntiReqsGroup := range strings.Split(tempUnitAntiReqs, ";") {
		var tempAntireqGroup []string
		tempAntireqGroup = append(tempAntireqGroup, "")
		for _, antiReq := range strings.Split(unitAntiReqsGroup, ",") {
			tempAntireqGroup = append(tempAntireqGroup, antiReq)
		}
		unitAntiReqs = append(unitAntiReqs, tempAntireqGroup)
	}
	var tempAntireqGroup []string
	tempAntireqGroup = append(tempAntireqGroup, "")
	unitAntiReqs = append(unitAntiReqs, tempAntireqGroup)
	spec.UnitAntiReqs = unitAntiReqs
	tempSpecAntiReqs, err := parser.getLine("specspecantireqs")
	if err != nil {
		return spec, err
	}
	var specAntiReqs [][]string
	for _, specAntiReqsGroup := range strings.Split(tempSpecAntiReqs, ";") {
		var tempAntireqGroup []string
		tempAntireqGroup = append(tempAntireqGroup, "")
		for _, antiReq := range strings.Split(specAntiReqsGroup, ",") {
			tempAntireqGroup = append(tempAntireqGroup, antiReq)
		}
		specAntiReqs = append(specAntiReqs, tempAntireqGroup)
	}
	var tempSpecAntireqGroup []string
	tempSpecAntireqGroup = append(tempSpecAntireqGroup, "")
	specAntiReqs = append(specAntiReqs, tempSpecAntireqGroup)
	spec.SpecAntiReqs = specAntiReqs
	tempMajorAntiReqs, err := parser.getLine("specmajorantireqs")
	if err != nil {
		return spec, err
	}
	var majorAntiReqs [][]string
	for _, majorAntiReqsGroup := range strings.Split(tempMajorAntiReqs, ";") {
		var tempAntireqGroup []string
		tempAntireqGroup = append(tempAntireqGroup, "")
		for _, antiReq := range strings.Split(majorAntiReqsGroup, ",") {
			tempAntireqGroup = append(tempAntireqGroup, antiReq)
		}
		majorAntiReqs = append(majorAntiReqs, tempAntireqGroup)
	}
	var tempMajorAntireqGroup []string
	tempMajorAntireqGroup = append(tempMajorAntireqGroup, "")
	majorAntiReqs = append(majorAntiReqs, tempMajorAntireqGroup)
	spec.MajorAntiReqs = majorAntiReqs
	return spec, nil
}
func processMajor(scanner *bufio.Scanner, lineNumber *int) (Major, error) {
	major := Major{}
	*lineNumber += 1
	read := scanner.Scan()
	if !read {
		return major, fmt.Errorf("expected majorcode on line: %d, recieved either error or eof", *lineNumber)
	}
	major.MajorCode = strings.ToUpper(scanner.Text())
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return major, fmt.Errorf("expected majorname on line: %d, recieved either error or eof", *lineNumber)
	}
	major.Name = strings.ToUpper(scanner.Text())
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return major, fmt.Errorf("Expected majorcredits on line: %d, recieved either error or eof", *lineNumber)
	}
	tempCredits, err := strconv.ParseFloat(scanner.Text(), 32)
	if err != nil {
		return major, fmt.Errorf("failed to parse credits on line: %d, error: %s", *lineNumber, err.Error())
	}
	major.Credits = float32(tempCredits)
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return major, fmt.Errorf("Expected major units on line: %d, recieved either error or eof", *lineNumber)
	}
	temp := scanner.Text()
	var majorUnits []string
	for _, unit := range strings.Split(temp, ",") {
		majorUnits = append(majorUnits, unit)
	}
	major.Units = majorUnits
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return major, fmt.Errorf("Expected major unit antireqs on line: %d, recieved either error or eof", *lineNumber)
	}
	tempUnitAntiReqs := scanner.Text()
	var unitAntiReqs [][]string
	for _, unitAntiReqsGroup := range strings.Split(tempUnitAntiReqs, ";") {
		var tempAntireqGroup []string
		tempAntireqGroup = append(tempAntireqGroup, "")
		for _, antiReq := range strings.Split(unitAntiReqsGroup, ",") {
			tempAntireqGroup = append(tempAntireqGroup, antiReq)
		}
		unitAntiReqs = append(unitAntiReqs, tempAntireqGroup)
	}
	var tempAntireqGroup []string
	tempAntireqGroup = append(tempAntireqGroup, "")
	unitAntiReqs = append(unitAntiReqs, tempAntireqGroup)
	major.UnitAntiReqs = unitAntiReqs
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return major, fmt.Errorf("Expected major spec antireqs on line: %d, recieved either error or eof", *lineNumber)
	}
	tempSpecAntiReqs := scanner.Text()
	var specAntiReqs [][]string
	for _, specAntiReqsGroup := range strings.Split(tempSpecAntiReqs, ";") {
		var tempAntireqGroup []string
		tempAntireqGroup = append(tempAntireqGroup, "")
		for _, antiReq := range strings.Split(specAntiReqsGroup, ",") {
			tempAntireqGroup = append(tempAntireqGroup, antiReq)
		}
		specAntiReqs = append(specAntiReqs, tempAntireqGroup)
	}
	var tempSpecAntireqGroup []string
	tempSpecAntireqGroup = append(tempSpecAntireqGroup, "")
	specAntiReqs = append(specAntiReqs, tempSpecAntireqGroup)
	major.SpecAntiReqs = specAntiReqs
	return major, nil
}
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
	var preReqs [][]string
	for _, preReqGroup := range strings.Split(tempPrereq, ";") {
		var tempPrereqGroup []string
		tempPrereqGroup = append(tempPrereqGroup, "")
		for _, preReq := range strings.Split(preReqGroup, ",") {
			tempPrereqGroup = append(tempPrereqGroup, preReq)
		}
		preReqs = append(preReqs, tempPrereqGroup)
	}
	var tempPrereqGroup []string
	tempPrereqGroup = append(tempPrereqGroup, "")
	preReqs = append(preReqs, tempPrereqGroup)
	unit.Prerequistes = preReqs
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected corequistes on line: %d, recieved either error or eof", *lineNumber)
	}
	tempCoreq := scanner.Text()
	var coReqs [][]string
	for _, coreqGroup := range strings.Split(tempCoreq, ";") {
		var tempCoreqGroup []string
		tempCoreqGroup = append(tempCoreqGroup, "")
		for _, coReq := range strings.Split(coreqGroup, ",") {
			tempCoreqGroup = append(tempCoreqGroup, coReq)
		}
		coReqs = append(coReqs, tempCoreqGroup)
	}
	var tempCoreqGroup []string
	tempCoreqGroup = append(tempCoreqGroup, "")
	coReqs = append(coReqs, tempCoreqGroup)
	unit.Corequistes = coReqs
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected antirequistes on line: %d, recieved either error or eof", *lineNumber)
	}
	tempAntireq := scanner.Text()
	var antiReqs [][]string
	for _, antiGroup := range strings.Split(tempAntireq, ";") {
		var tempAntiGroup []string
		tempAntiGroup = append(tempAntiGroup, "")
		for _, antiReq := range strings.Split(antiGroup, ",") {
			tempAntiGroup = append(tempAntiGroup, antiReq)
		}
		antiReqs = append(antiReqs, tempAntiGroup)
	}
	var tempAntiGroup []string
	tempAntiGroup = append(tempAntiGroup, "")
	antiReqs = append(antiReqs, tempAntiGroup)
	unit.Antirequistes = antiReqs
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
		return BadRequest(fmt.Sprintf("Failed to decode base64 csv: %s", err.Error()))
	}
	log.Printf("Successfully processed data")
	unitList := []Unit{}
	majorList := []Major{}
	specList := []Specialization{}
	scanner := bufio.NewScanner(strings.NewReader(csvData))
	lineNumber := 0
	linNumAdd := &lineNumber
	parser := LineParser{scanner: &scanner, lineNumber: &linNumAdd}
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
		case "MAJOR":
			major, err := processMajor(scanner, &lineNumber)
			if err != nil {
				log.Printf("Failed to process a major!: %s; On Line Number: %d", err.Error(), lineNumber)
				return BadRequest(fmt.Sprintf("Failed to process a major!: %s; On Line Number: %d", err.Error(), lineNumber))
			}
			majorList = append(majorList, major)
		case "SPECIALIZATION":
			spec, err := processSpec(&parser)
			if err != nil {
				log.Printf("Failed to process a major!: %s; On Line Number: %d", err.Error(), lineNumber)
				return BadRequest(fmt.Sprintf("Failed to process a specialization!: %s; On Line Number: %d", err.Error(), lineNumber))
			}
			specList = append(specList, spec)
		case "":
			continue
		default:
			log.Printf("Unknown data type: %s; On Line Number: %d", strings.ToUpper(dataType), lineNumber)
			return BadRequest(fmt.Sprintf("Unknown data type: %s; On Line Number: %d", strings.ToUpper(dataType), lineNumber))
		}
	}
	log.Printf("Validated %d units, %d majors, %d specializations", len(unitList), len(majorList), len(specList))
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
