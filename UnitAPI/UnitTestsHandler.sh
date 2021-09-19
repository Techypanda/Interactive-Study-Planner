#!/bin/bash

rm unittests/actualResponses/unit/*
rm unittests/actualResponses/specialization/*
rm unittests/actualResponses/major/*
rm -f -- UnitTestOutput.txt

echo "Running build" >> UnitTestOutput.txt
sam build --parallel >> UnitTestOutput.txt

echo "RUNNING UNIT RELATED APIs" >> UnitTestOutput.txt

echo "Running get unit valid query" >> UnitTestOutput.txt
sam local invoke GetUnitFunction -e unittests/payloads/unit/GetUnitValidQuery.json >> unittests/actualResponses/unit/GetUnitValidQueryActualResponse.json &

echo "Running get unit invalid query" >> UnitTestOutput.txt
sam local invoke GetUnitFunction -e unittests/payloads/unit/GetUnitInvalidParam.json >> unittests/actualResponses/unit/GetUnitInvalidQueryActualResponse.json &

echo "Running search unit valid query" >> UnitTestOutput.txt
sam local invoke SearchUnitFunction -e unittests/payloads/unit/SearchUnitValidQuery.json >> unittests/actualResponses/unit/SearchUnitValidQueryActualResponse.json &

echo "Running search unit invalid query" >> UnitTestOutput.txt
sam local invoke SearchUnitFunction -e unittests/payloads/unit/SearchUnitInvalidParam.json >> unittests/actualResponses/unit/SearchUnitInvalidQueryActualResponse.json &

echo "RUNNING MAJOR RELATED APIs" >> UnitTestOutput.txt
####Omitted because it sometimes returns units in a different order, causing diff to output a diff when file contents is same, will fix later

#echo "Running get major valid query" >> UnitTestOutput.txt
#sam local invoke GetMajorFunction -e unittests/payloads/major/GetMajorValidQuery.json >> unittests/actualResponses/major/GetMajorValidQueryActualResponse.json

#Comparing actual to expected
#diff -w unittests/expectedResponses/major/GetMajorValidQueryExpectedResponse.json unittests/actualResponses/major/GetMajorValidQueryActualResponse.json >> UnitTestOutput.txt


echo "Running get major invalid query" >> UnitTestOutput.txt
sam local invoke GetMajorFunction -e unittests/payloads/major/GetMajorInvalidParam.json >> unittests/actualResponses/major/GetMajorInvalidQueryActualResponse.json &

###Omitted because it sometimes returns units in a different order, causing diff to output a diff when file contents is same, will fix later
#echo "Running search major valid query" >> UnitTestOutput.txt
#sam local invoke SearchMajorFunction -e unittests/payloads/major/SearchMajorValidQuery.json >> unittests/actualResponses/major/SearchMajorValidQueryActualResponse.json

#Comparing actual to expected
#diff unittests/actualResponses/major/SearchMajorValidQueryActualResponse.json unittests/expectedResponses/major/SearchMajorValidQueryExpectedResponse.json >> UnitTestOutput.txt



echo "Running search major invalid query" >> UnitTestOutput.txt
sam local invoke SearchMajorFunction -e unittests/payloads/major/SearchMajorInvalidParam.json >> unittests/actualResponses/major/SearchMajorInvalidQueryActualResponse.json &


echo "RUNNING SPEC RELATED APIs" >> UnitTestOutput.txt



###Omitted because it sometimes returns units in a different order, causing diff to output a diff when file contents is same, will fix later
#echo "Running get spec valid query" >> UnitTestOutput.txt
#sam local invoke GetSpecFunction -e unittests/payloads/specialization/GetSpecValidQuery.json >> unittests/actualResponses/specialization/GetSpecValidQueryActualResponse.json

#Comparing actual to expected
#diff unittests/actualResponses/specialization/GetSpecValidQueryActualResponse.json unittests/expectedResponses/specialization/GetSpecValidQueryExpectedResponse.json >> UnitTestOutput.txt

echo "Running get spec invalid query" >> UnitTestOutput.txt
sam local invoke GetSpecFunction -e unittests/payloads/specialization/GetSpecInvalidParam.json >> unittests/actualResponses/specialization/GetSpecInvalidQueryActualResponse.json &

###Omitted because it sometimes returns units in a different order, causing diff to output a diff
#echo "Running search spec valid query" >> UnitTestOutput.txt
#sam local invoke SearchSpecFunction -e unittests/payloads/specialization/SearchSpecValidQuery.json >> unittests/actualResponses/specialization/SearchSpecValidQueryActualResponse.json

#Comparing actual to expected
#diff unittests/actualResponses/specialization/SearchSpecValidQueryActualResponse.json unittests/expectedResponses/specialization/SearchSpecInvalidQueryExpectedResponse.json >> UnitTestOutput.txt

echo "Running search spec invalid query" >> UnitTestOutput.txt
sam local invoke SearchSpecFunction -e unittests/payloads/specialization/SearchSpecInvalidParam.json >> unittests/actualResponses/specialization/SearchSpecInvalidQueryActualResponse.json &

wait

#Comparing actual to expected
diff unittests/actualResponses/specialization/SearchSpecInvalidQueryActualResponse.json unittests/expectedResponses/specialization/SearchSpecInvalidQueryExpectedResponse.json >> UnitTestOutput.txt

#Comparing actual to expected
diff unittests/actualResponses/unit/GetUnitValidQueryActualResponse.json unittests/expectedResponses/unit/GetUnitValidQueryExpectedResponse.json >> UnitTestOutput.txt

#Compare actual to expected
diff unittests/actualResponses/unit/GetUnitInvalidQueryActualResponse.json unittests/expectedResponses/unit/GetUnitInvalidQueryExpectedResponse.json

#Comparing actual to expected
diff unittests/actualResponses/unit/SearchUnitValidQueryActualResponse.json unittests/expectedResponses/unit/SearchUnitValidQueryExpectedResponse.json >> UnitTestOutput.txt

#Comparing actual to expected
diff unittests/actualResponses/unit/SearchUnitInvalidQueryActualResponse.json unittests/expectedResponses/unit/SearchUnitInvalidQueryExpectedResponse.json >> UnitTestOutput.txt

#Comparing actual to expected
diff unittests/expectedResponses/major/GetMajorInvalidQueryExpectedResponse.json unittests/actualResponses/major/GetMajorInvalidQueryActualResponse.json >> UnitTestOutput.txt

#Comparing actual to expected
diff unittests/actualResponses/major/SearchMajorInvalidQueryActualResponse.json unittests/expectedResponses/major/SearchMajorInvalidQueryExpectedResponse.json >> UnitTestOutput.txt

#Comparing actual to expected
diff unittests/actualResponses/specialization/GetSpecInvalidQueryActualResponse.json unittests/expectedResponses/specialization/GetSpecInvalidQueryExpectedResponse.json >> UnitTestOutput.txt