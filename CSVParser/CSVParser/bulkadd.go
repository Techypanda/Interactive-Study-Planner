package main

import (
	"bufio"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math"
	"strconv"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/segmentio/ksuid"
)

const STEP = 24

func bulkAddToDB(unitList []Unit, majorList []Major, specList []Specialization, careerList []Career) error {
	var db *dynamodb.DynamoDB
	initializeDB(&db)
	count := 0
	for count < len(unitList) { // Write in roughly blocks of STEP (Bulk Write has a limit of 25)
		var unitWriteRequests []*dynamodb.WriteRequest
		temp := int(math.Min(float64(count)+STEP, float64(len(unitList))))
		for _, unit := range unitList[count:temp] {
			tempUpperCaseUnitCode := strings.ToUpper(unit.UnitCode)
			tempLowerCaseUnitName := strings.ToLower(unit.Name)
			unitItem := map[string]*dynamodb.AttributeValue{
				"UnitCode": {
					S: aws.String(tempUpperCaseUnitCode),
				},
				"Name": {
					S: aws.String(tempLowerCaseUnitName),
				},
				"Description": {
					S: aws.String(unit.Description),
				},
				"Credits": {
					N: aws.String(fmt.Sprintf("%f", unit.Credits)),
				},
				"Delivery": {
					S: aws.String(unit.Delivery),
				},
				"Semester": {
					N: aws.String(fmt.Sprintf("%d", unit.Semester)),
				},
				"Year": {
					N: aws.String(fmt.Sprintf("%d", unit.Year)),
				},
			}
			attachRequistesToUnitAddition(&unitItem, unit)
			unitWriteRequests = append(unitWriteRequests, &dynamodb.WriteRequest{
				PutRequest: &dynamodb.PutRequest{
					Item: unitItem,
				},
			})
		}
		if len(unitWriteRequests) > 0 {
			input := &dynamodb.BatchWriteItemInput{
				RequestItems: map[string][]*dynamodb.WriteRequest{
					"DevUnits": unitWriteRequests,
				},
			}
			res, err := db.BatchWriteItem(input)
			if err != nil {
				return fmt.Errorf("failed to batch write units: %s", err.Error())
			}
			log.Println(res)
		}
		count += STEP
	}
	count = 0
	for count < len(majorList) { // Write in roughly blocks of STEP (Bulk Write has a limit of 25)
		var majorWriteRequests []*dynamodb.WriteRequest
		temp := int(math.Min(float64(count)+STEP, float64(len(majorList))))
		for _, major := range majorList[count:temp] {
			majorName := strings.ToLower(major.Name)
			majorCode := strings.ToUpper(major.MajorCode)
			majorItem := map[string]*dynamodb.AttributeValue{
				"MajorCode": {
					S: aws.String(majorCode),
				},
				"Name": {
					S: aws.String(majorName),
				},
				"Description": {
					S: aws.String(major.Description),
				},
				"Credits": {
					N: aws.String(fmt.Sprintf("%f", major.Credits)),
				},
				"Units": {
					SS: convertToStringMemoryArray(major.Units),
				},
			}
			attachMajorData(&majorItem, major)
			majorWriteRequests = append(majorWriteRequests, &dynamodb.WriteRequest{
				PutRequest: &dynamodb.PutRequest{
					Item: majorItem,
				},
			})
		}
		if len(majorWriteRequests) > 0 {
			input := &dynamodb.BatchWriteItemInput{
				RequestItems: map[string][]*dynamodb.WriteRequest{
					"DevMajors": majorWriteRequests,
				},
			}
			res, err := db.BatchWriteItem(input)
			if err != nil {
				return fmt.Errorf("failed to batch write majors: %s", err.Error())
			}
			log.Println(res)
		}
		count += STEP
	}
	count = 0
	for count < len(specList) { // Write in roughly blocks of STEP (Bulk Write has a limit of 25)
		var specWriteRequests []*dynamodb.WriteRequest
		temp := int(math.Min(float64(count)+STEP, float64(len(specList))))
		for _, spec := range specList[count:temp] {
			uppercasedSpecCode := strings.ToUpper(spec.SpecCode)
			lowercasedName := strings.ToLower(spec.Name)
			specItem := map[string]*dynamodb.AttributeValue{
				"SpecializationCode": {
					S: aws.String(uppercasedSpecCode),
				},
				"Name": {
					S: aws.String(lowercasedName),
				},
				"Description": {
					S: aws.String(spec.Description),
				},
				"Credits": {
					N: aws.String(fmt.Sprintf("%f", spec.Credits)),
				},
				"Units": {
					SS: convertToStringMemoryArray(spec.Units),
				},
				"Internal": {
					BOOL: aws.Bool(spec.CourseInternal),
				},
			}
			attachSpecData(&specItem, spec)

			specWriteRequests = append(specWriteRequests, &dynamodb.WriteRequest{
				PutRequest: &dynamodb.PutRequest{
					Item: specItem,
				},
			})
		}

		if len(specWriteRequests) > 0 {
			input := &dynamodb.BatchWriteItemInput{
				RequestItems: map[string][]*dynamodb.WriteRequest{
					"DevSpecializations": specWriteRequests,
				},
			}
			res, err := db.BatchWriteItem(input)
			if err != nil {
				return fmt.Errorf("failed to batch write specs: %s", err.Error())
			}
			log.Println(res)
		}
		count += STEP
	}
	count = 0
	for count < len(careerList) {
		var careerWriteRequests []*dynamodb.WriteRequest
		temp := int(math.Min(float64(count)+STEP, float64(len(careerList))))
		for _, career := range careerList[count:temp] {
			lowercasedName := strings.ToLower(career.Name)
			var careerReqs []*dynamodb.AttributeValue
			for _, req := range career.Requirements {
				careerReqs = append(careerReqs, &dynamodb.AttributeValue{
					S: aws.String(req),
				})
			}
			var careerTraits []*dynamodb.AttributeValue
			for _, trait := range career.Traits {
				careerTraits = append(careerTraits, &dynamodb.AttributeValue{
					S: aws.String(trait),
				})
			}
			lowercasedID := strings.ToLower(career.CareerCode)
			careerItem := map[string]*dynamodb.AttributeValue{
				"CareerId": {
					S: aws.String(lowercasedID),
				},
				"Name": {
					S: aws.String(lowercasedName),
				},
				"Description": {
					S: aws.String(career.Description),
				},
				"Industry": {
					S: aws.String(career.Industry),
				},
				"Requirements": {
					L: careerReqs,
				},
				"Traits": {
					L: careerTraits,
				},
			}
			careerWriteRequests = append(careerWriteRequests, &dynamodb.WriteRequest{
				PutRequest: &dynamodb.PutRequest{
					Item: careerItem,
				},
			})
		}
		if len(careerWriteRequests) > 0 {
			input := &dynamodb.BatchWriteItemInput{
				RequestItems: map[string][]*dynamodb.WriteRequest{
					"DevCareers": careerWriteRequests,
				},
			}
			res, err := db.BatchWriteItem(input)
			if err != nil {
				return fmt.Errorf("failed to batch write careers: %s", err.Error())
			}
			log.Println(res)
		}
		count += STEP
	}
	return nil
}

func processCareer(parser *LineParser) (Career, error) {
	career := Career{}
	career.CareerCode = ksuid.New().String()
	careerName, err := parser.getLine("careername")
	if err != nil {
		return career, err
	}
	career.Name = careerName
	careerDescription, err := parser.getLine("careerdesc")
	if err != nil {
		return career, err
	}
	career.Description = careerDescription
	careerIndustry, err := parser.getLine("careerindustry")
	if err != nil {
		return career, err
	}
	career.Industry = careerIndustry
	careerRequirements, err := parser.getLine("careerrequirements")
	if err != nil {
		return career, err
	}
	career.Requirements = strings.Split(careerRequirements, ",")
	careerTraits, err := parser.getLine("careerTraits")
	if err != nil {
		return career, err
	}
	career.Traits = strings.Split(careerTraits, ",")
	return career, nil
}

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
	specDesc, err := parser.getLine("specdescription")
	if err != nil {
		return spec, err
	}
	spec.Description = specDesc
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
	spec.Units = unitList
	tempUnitAntiReqs, err := parser.getLine("specunitantireqs")
	if err != nil {
		return spec, err
	}
	var unitAntiReqs [][]string
	for _, unitAntiReqsGroup := range strings.Split(tempUnitAntiReqs, ";") {
		var tempAntireqGroup []string
		for _, antiReq := range strings.Split(unitAntiReqsGroup, ",") {
			if antiReq != "" {
				tempAntireqGroup = append(tempAntireqGroup, antiReq)
			}
		}
		if len(tempAntireqGroup) > 0 {
			unitAntiReqs = append(unitAntiReqs, tempAntireqGroup)
		}
	}
	spec.UnitAntiReqs = unitAntiReqs
	tempSpecAntiReqs, err := parser.getLine("specspecantireqs")
	if err != nil {
		return spec, err
	}
	var specAntiReqs [][]string
	for _, specAntiReqsGroup := range strings.Split(tempSpecAntiReqs, ";") {
		var tempAntireqGroup []string
		for _, antiReq := range strings.Split(specAntiReqsGroup, ",") {
			if antiReq != "" {
				tempAntireqGroup = append(tempAntireqGroup, antiReq)
			}
		}
		if len(tempAntireqGroup) > 0 {
			specAntiReqs = append(specAntiReqs, tempAntireqGroup)
		}
	}
	spec.SpecAntiReqs = specAntiReqs
	tempMajorAntiReqs, err := parser.getLine("specmajorantireqs")
	if err != nil {
		return spec, err
	}
	var majorAntiReqs [][]string
	for _, majorAntiReqsGroup := range strings.Split(tempMajorAntiReqs, ";") {
		var tempAntireqGroup []string
		for _, antiReq := range strings.Split(majorAntiReqsGroup, ",") {
			if antiReq != "" {
				tempAntireqGroup = append(tempAntireqGroup, antiReq)
			}
		}
		if len(tempAntireqGroup) > 0 {
			majorAntiReqs = append(majorAntiReqs, tempAntireqGroup)
		}
	}
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
		return major, fmt.Errorf("expected majordescription on line: %d, recieved either error or eof", *lineNumber)
	}
	major.Description = scanner.Text()
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
		if unit != "" {
			majorUnits = append(majorUnits, unit)
		}
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
		for _, antiReq := range strings.Split(unitAntiReqsGroup, ",") {
			if antiReq != "" {
				tempAntireqGroup = append(tempAntireqGroup, antiReq)
			}
		}
		if len(tempAntireqGroup) > 0 {
			unitAntiReqs = append(unitAntiReqs, tempAntireqGroup)
		}
	}
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
		for _, antiReq := range strings.Split(specAntiReqsGroup, ",") {
			if antiReq != "" {
				tempAntireqGroup = append(tempAntireqGroup, antiReq)
			}
		}
		if len(tempAntireqGroup) > 0 {
			specAntiReqs = append(specAntiReqs, tempAntireqGroup)
		}
	}
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
		for _, preReq := range strings.Split(preReqGroup, ",") {
			if preReq != "" {
				tempPrereqGroup = append(tempPrereqGroup, preReq)
			}
		}
		if len(tempPrereqGroup) > 0 {
			preReqs = append(preReqs, tempPrereqGroup)
		}
	}
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
		for _, coReq := range strings.Split(coreqGroup, ",") {
			if coReq != "" {
				tempCoreqGroup = append(tempCoreqGroup, coReq)
			}
		}
		if len(tempCoreqGroup) > 0 {
			coReqs = append(coReqs, tempCoreqGroup)
		}
	}
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
		for _, antiReq := range strings.Split(antiGroup, ",") {
			if antiReq != "" {
				tempAntiGroup = append(tempAntiGroup, antiReq)
			}
		}
		if len(tempAntiGroup) > 0 {
			antiReqs = append(antiReqs, tempAntiGroup)
		}
	}
	unit.Antirequistes = antiReqs
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected semester on line: %d, recieved either error or eof", *lineNumber)
	}
	semester, err := strconv.Atoi(scanner.Text())
	if err != nil {
		return unit, fmt.Errorf("Expected a int for semester, recieved: %s", scanner.Text())
	}
	if semester != 1 && semester != 2 && semester != 12 {
		return unit, fmt.Errorf("Expected 1, 2 or 12 for semester, recieved: %d", semester)
	}
	unit.Semester = semester
	*lineNumber += 1
	read = scanner.Scan()
	if !read {
		return unit, fmt.Errorf("expected year on line: %d, recieved either error or eof", *lineNumber)
	}
	if len(scanner.Text()) == 0 {
		unit.Year = 0
	} else {
		year, err := strconv.Atoi(scanner.Text())
		if err != nil {
			return unit, fmt.Errorf("Expected a int for year, recieved: %s", scanner.Text())
		}
		unit.Year = year
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
		return BadRequest(fmt.Sprintf("Failed to decode base64 csv: %s", err.Error()))
	}
	log.Printf("Successfully processed data")
	unitList := []Unit{}
	majorList := []Major{}
	specList := []Specialization{}
	careerList := []Career{}
	scanner := bufio.NewScanner(strings.NewReader(csvData))
	lineNumber := 0
	linNumAdd := &lineNumber
	parser := LineParser{scanner: &scanner, lineNumber: &linNumAdd}
	for scanner.Scan() {
		lineNumber++
		dataType := scanner.Text()
		switch strings.ToUpper(dataType) {
		case "CAREER":
			career, err := processCareer(&parser)
			if err != nil {
				log.Printf("Failed to process a career!: %s; On Line Number: %d", err.Error(), lineNumber)
				return BadRequest(fmt.Sprintf("Failed to process a career!: %s, On Line Number: %d", err.Error(), lineNumber))
			}
			careerList = append(careerList, career)
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
				log.Printf("Failed to process a specialization!: %s; On Line Number: %d", err.Error(), lineNumber)
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
	log.Printf("Validated %d careers", len(careerList))
	err = bulkAddToDB(unitList, majorList, specList, careerList)
	if err != nil {
		log.Printf("Failed to bulk add - %s", err.Error())
		return BadRequest(fmt.Sprintf("Failed to bulk add - %s", err.Error()))
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
