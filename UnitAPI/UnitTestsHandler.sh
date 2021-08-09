#!/bin/bash
rm -f -- UnitTestOutput.txt
echo "Running Build" >> UnitTestOutput.txt
sam build >> UnitTestOutput.txt

#Testing API
echo "Running Unit related Api events" >> UnitTestOutput.txt
echo "Running get all units Api" >> UnitTestOutput.txt
#Executing
sam local invoke getallunits >> unittests/actualResponses/unit/GetAllUnitsActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/GetAllUnitsActualResponse.json unittests/expectedResponses/unit/GetAllUnitsExpectedResponse.json >> UnitTestOutput.txt

echo "Running get unit valid query" >> UnitTestOutput.txt
#Executing
sam local invoke getunit -e unittests/payloads/unit/GetUnitValidQuery.json >> unittests/actualResponses/unit/GetUnitValidQueryActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/GetUnitValidQueryActualResponse.json unittests/expectedResponses/unit/GetUnitValidQueryExpectedResponse.json >> UnitTestOutput.txt

echo "Running get unit no result" >> UnitTestOutput.txt
#Executing
sam local invoke getunit -e unittests/payloads/unit/GetUnitNoResult.json >> unittests/actualResponses/unit/GetUnitNoResultActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/GetUnitNoResultActualResponse.json unittests/expectedResponses/unit/GetUnitNoResultExpectedResponse.json >> UnitTestOutput.txt

echo "Running get unit invalid parameter" >> UnitTestOutput.txt
#Executing
sam local invoke getunit -e unittests/payloads/unit/GetUnitInvalidParam.json >> unittests/actualResponses/unit/GetUnitInvalidParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/GetUnitInvalidParamActualResponse.json unittests/expectedResponses/unit/GetUnitInvalidParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running get unit no parameter" >> UnitTestOutput.txt
#Executing
sam local invoke getunit -e unittests/payloads/unit/GetUnitNoParam.json  >> unittests/actualResponses/unit/GetUnitNoParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/GetUnitNoParamActualResponse.json unittests/expectedResponses/unit/GetUnitNoParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running search unit invalid param api" >> UnitTestOutput.txt
#Executing
sam local invoke searchunit -e unittests/payloads/unit/SearchUnitInvalidParam.json >> unittests/actualResponses/unit/SearchUnitInvalidParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/SearchUnitInvalidParamActualResponse.json unittests/expectedResponses/unit/SearchUnitInvalidParamExpectedResponse.json >> UnitTestOutput.txt
echo "Running search unit no param api" >> UnitTestOutput.txt
#Executing
sam local invoke searchunit -e unittests/payloads/unit/SearchUnitNoParam.json >> unittests/actualResponses/unit/SearchUnitNoParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/SearchUnitNoParamActualResponse.json unittests/expectedResponses/unit/SearchUnitNoParamExpectedResponse.json >> UnitTestOutput.txt
echo "Running search unit no result api" >> UnitTestOutput.txt
#Executing
sam local invoke searchunit -e unittests/payloads/unit/SearchUnitNoResult.json >> unittests/actualResponses/unit/SearchUnitNoResultActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/SearchUnitNoResultActualResponse.json unittests/expectedResponses/unit/SearchUnitNoResultExpectedResponse.json >> UnitTestOutput.txt

echo "Running search unit valid query api" >> UnitTestOutput.txt
sam local invoke searchunit -e unittests/payloads/unit/SearchUnitValidQuery.json >> unittests/actualResponses/unit/SearchUnitValidQueryActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/unit/SearchUnitValidQueryActualResponse.json unittests/expectedResponses/unit/SearchUnitValidQueryExpectedResponse.json >> UnitTestOutput.txt

echo "Running Major related Api events" >> UnitTestOutput.txt
echo "Running get all majors Api" >> UnitTestOutput.txt
#Executing
sam local invoke getallmajors >> unittests/actualResponses/major/GetAllMajorsActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/major/GetAllMajorsActualResponse.json unittests/expectedResponses/major/GetAllMajorsExpectedResponse.json >> UnitTestOutput.txt

echo "Running get major invalid param Api" >> UnitTestOutput.txt
#Executing
sam local invoke getmajor -e unittests/payloads/major/GetMajorInvalidParam.json >> unittests/actualResponses/major/GetMajorInvalidParamActualResponse.json
diff unittests/actualResponses/major/GetMajorInvalidParamActualResponse.json unittests/expectedResponses/major/GetMajorInvalidParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running get major no result api" >> UnitTestOutput.txt
sam local invoke getmajor -e unittests/payloads/major/GetMajorNoResult.json >> unittests/actualResponses/major/GetMajorNoResultActualResponse.json
diff unittests/actualResponses/major/GetMajorNoResultActualResponse.json unittests/expectedResponses/major/GetMajorNoResultExpectedResponse.json >> UnitTestOutput.txt

echo "Running get major no param api" >> UnitTestOutput.txt
sam local invoke getmajor -e unittests/payloads/major/GetMajorNoParam.json >> unittests/actualResponses/major/GetMajorNoParamActualResponse.json
diff unittests/actualResponses/major/GetMajorNoParamActualResponse.json unittests/expectedResponses/major/GetMajorNoParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running get major valid query api" >> UnitTestOutput.txt
sam local invoke getmajor -e unittests/payloads/major/GetMajorValidQuery.json >> unittests/actualResponses/major/GetMajorValidQueryActualResponse.json
diff unittests/actualResponses/major/GetMajorValidQueryActualResponse.json unittests/expectedResponses/major/GetMajorValidQueryExpectedResponse.json >> UnitTestOutput.txt

echo "Running search major invalid param api" >> UnitTestOutput.txt
#Executing
sam local invoke searchmajor -e unittests/payloads/major/SearchMajorInvalidParam.json >> unittests/actualResponses/major/SearchMajorInvalidParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/major/SearchMajorInvalidParamActualResponse.json unittests/expectedResponses/major/SearchMajorInvalidParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running search major no param api" >> UnitTestOutput.txt
#Executing
sam local invoke searchmajor -e unittests/payloads/major/SearchMajorNoParam.json >> unittests/actualResponses/major/SearchMajorNoParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/major/SearchMajorNoParamActualResponse.json unittests/expectedResponses/major/SearchMajorNoParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running search major no resultapi" >> UnitTestOutput.txt
#Executing
sam local invoke searchmajor -e unittests/payloads/major/SearchMajorNoResult.json >> unittests/actualResponses/major/SearchMajorNoResultActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/major/SearchMajorNoResultActualResponse.json unittests/expectedResponses/major/SearchMajorNoResultExpectedResponse.json >> UnitTestOutput.txt

echo "Running search major valid query api" >> UnitTestOutput.txt
#Executing
sam local invoke searchmajor -e unittests/payloads/major/SearchMajorValidQuery.json >> unittests/actualResponses/major/SearchMajorValidQueryActualResponse.json
diff unittests/actualResponses/major/SearchMajorValidQueryActualResponse.json unittests/expectedResponses/major/SearchMajorValidQueryExpectedResponse.json >> UnitTestOutput.txt

echo "Running Specialization related Api events" >> UnitTestOutput.txt
echo "Running get all specializations Api" >> UnitTestOutput.txt
#Executing
sam local invoke getallspecs >> unittests/actualResponses/specialization/GetAllSpecsActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/GetAllSpecsActualResponse.json unittests/expectedResponses/specialization/GetAllSpecsExpectedResponse.json >> UnitTestOutput.txt

echo "Running get spec invalid param api" >> UnitTestOutput.txt
#Executing
sam local invoke getspec -e unittests/payloads/specialization/GetSpecInvalidParam.json >> unittests/actualResponses/specialization/GetSpecInvalidParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/GetSpecInvalidParamActualResponse.json unittests/expectedResponses/specialization/GetSpecInvalidParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running get spec no result api" >> UnitTestOutput.txt
#Executing
sam local invoke getspec -e unittests/payloads/specialization/GetSpecNoResult.json >> unittests/actualResponses/specialization/GetSpecNoResultActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/GetSpecNoResultActualResponse.json unittests/expectedResponses/specialization/GetSpecNoResultExpectedResponse.json >> UnitTestOutput.txt


echo "Running get spec no param api" >> UnitTestOutput.txt
#Executing
sam local invoke getspec -e unittests/payloads/specialization/GetSpecNoParam.json >> unittests/actualResponses/specialization/GetSpecNoParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/GetSpecNoParamActualResponse.json unittests/expectedResponses/specialization/GetSpecNoParamExpectedResponse.json >> UnitTestOutput.txt


echo "Running get spec valid query api" >> UnitTestOutput.txt
#Executing
sam local invoke getspec -e unittests/payloads/specialization/GetSpecValidQuery.json >> unittests/actualResponses/specialization/GetSpecValidQueryActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/GetSpecValidQueryActualResponse.json unittests/expectedResponses/specialization/GetSpecValidQueryExpectedResponse.json >> UnitTestOutput.txt

echo "Running search spec invalid param api" >> UnitTestOutput.txt
#Executing
sam local invoke searchspec -e unittests/payloads/specialization/SearchSpecInvalidParam.json >> unittests/actualResponses/specialization/SearchSpecInvalidParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/SearchSpecInvalidParamActualResponse.json unittests/expectedResponses/specialization/SearchSpecInvalidParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running search spec no param api" >> UnitTestOutput.txt
#Executing
sam local invoke searchspec -e unittests/payloads/specialization/SearchSpecNoParam.json >> unittests/actualResponses/specialization/SearchSpecNoParamActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/SearchSpecNoParamActualResponse.json unittests/expectedResponses/specialization/SearchSpecNoParamExpectedResponse.json >> UnitTestOutput.txt

echo "Running search spec no result api" >> UnitTestOutput.txt
#Executing
sam local invoke searchspec -e unittests/payloads/specialization/SearchSpecNoResult.json >> unittests/actualResponses/specialization/SearchSpecNoResultActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/SearchSpecNoResultActualResponse.json unittests/expectedResponses/specialization/SearchSpecNoResultExpectedResponse.json >> UnitTestOutput.txt

echo "Running search spec valid query api" >> UnitTestOutput.txt
#Executing
sam local invoke searchspec -e unittests/payloads/specialization/SearchSpecValidQuery.json >> unittests/actualResponses/specialization/SearchSpecValidQueryActualResponse.json
#Comparing actual response to expected response
diff unittests/actualResponses/specialization/SearchSpecValidQueryActualResponse.json unittests/expectedResponses/specialization/SearchSpecValidQueryExpectedResponse.json >> UnitTestOutput.txt
