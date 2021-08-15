#!/bin/bash

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 29/07/2021
#Date Last Modified: 9/08/2021

set -e

#Remove old test file output.
rm -f -- UnitTestOutput.txt

echo "Running Build" >> UnitTestOutput.txt
sam build >> UnitTestOutput.txt

#Testing trait api and functions
echo "Running Trait Api Events" >> UnitTestOutput.txt
echo "Add Trait Api" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json AddTraitFunction -e unittests/payloads/trait/AddTraitEvent.json > unittests/responses/trait/AddTraitResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/AddTraitResponse.json unittests/expectedResponses/trait/AddTraitExpectedResponse.json >> UnitTestOutput.txt

echo "Add Trait Already Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json AddTraitFunction -e unittests/payloads/trait/AddTraitEvent.json > unittests/responses/trait/AlreadyExistsResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/AlreadyExistsResponse.json unittests/expectedResponses/trait/AlreadyExistsExpectedResponse.json >> UnitTestOutput.txt

echo "Update Trait Api" >> UnitTestOutput.txt
#Executing
sam local invoke UpdateTraitFunction -e unittests/payloads/trait/UpdateTraitEvent.json > unittests/responses/trait/UpdateTraitResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/UpdateTraitResponse.json unittests/expectedResponses/trait/UpdateTraitExpectedResponse.json >> UnitTestOutput.txt

echo "Update Trait Non-Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke UpdateTraitFunction -e unittests/payloads/trait/UpdateNonExistTraitEvent.json > unittests/responses/trait/UpdateNonExistResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/UpdateNonExistResponse.json unittests/expectedResponses/trait/NonExistExpectedResponse.json >> UnitTestOutput.txt

echo "Delete Trait Api" >> UnitTestOutput.txt
#Executing
sam local invoke DeleteTraitFunction -e unittests/payloads/trait/DeleteTraitEvent.json > unittests/responses/trait/DeleteTraitResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/DeleteTraitResponse.json unittests/expectedResponses/trait/DeleteTraitExpectedResponse.json >> UnitTestOutput.txt

echo "Delete Trait Non-Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke DeleteTraitFunction -e unittests/payloads/trait/DeleteTraitEvent.json > unittests/responses/trait/DeleteNonExistResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/DeleteNonExistResponse.json unittests/expectedResponses/trait/NonExistExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Add Trait with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json AddTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/AddBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/AddBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Update Trait with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke UpdateTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/UpdateBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/UpdateBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Delete Trait with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke DeleteTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/DeleteBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/DeleteBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

#Testing Career api and functions
echo "Running Career Events"
echo "Add Career Api" >> UnitTestOutput.txt
#Executing
sam local invoke AddCareerFunction -e unittests/payloads/career/AddCareerEvent.json > unittests/responses/career/AddCareerResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/AddCareerResponse.json unittests/expectedResponses/career/AddCareerExpectedResponse.json >> UnitTestOutput.txt

echo "Add Career Already Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke AddCareerFunction -e unittests/payloads/career/AddCareerEvent.json > unittests/responses/career/AlreadyExistsResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/AlreadyExistsResponse.json unittests/expectedResponses/career/AlreadyExistsExpectedResponse.json >> UnitTestOutput.txt

echo "Update Career Api" >> UnitTestOutput.txt
#Executing
sam local invoke UpdateCareerFunction -e unittests/payloads/career/UpdateCareerEvent.json > unittests/responses/career/UpdateCareerResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/UpdateCareerResponse.json unittests/expectedResponses/career/UpdateCareerExpectedResponse.json >> UnitTestOutput.txt

echo "Update Career Non-Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke UpdateCareerFunction -e unittests/payloads/career/UpdateNonExistCareerEvent.json > unittests/responses/career/UpdateNonExistResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/UpdateNonExistResponse.json unittests/expectedResponses/career/NonExistExpectedResponse.json >> UnitTestOutput.txt

echo "Delete Career Api" >> UnitTestOutput.txt
#Executing
sam local invoke DeleteCareerFunction -e unittests/payloads/career/DeleteCareerEvent.json > unittests/responses/career/DeleteCareerResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/DeleteCareerResponse.json unittests/expectedResponses/career/DeleteCareerExpectedResponse.json >> UnitTestOutput.txt

echo "Delete Career Non-Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke DeleteCareerFunction -e unittests/payloads/career/DeleteCareerEvent.json > unittests/responses/career/DeleteNonExistResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/DeleteNonExistResponse.json unittests/expectedResponses/career/NonExistExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Add Career with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke AddCareerFunction -e unittests/payloads/career/BadInputEvent.json > unittests/responses/career/AddBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/AddBadInputResponse.json unittests/expectedResponses/career/BadInputExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Update Career with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke UpdateCareerFunction -e unittests/payloads/career/BadInputEvent.json > unittests/responses/career/UpdateBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/UpdateBadInputResponse.json unittests/expectedResponses/career/BadInputExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Delete Career with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke DeleteCareerFunction -e unittests/payloads/career/BadInputEvent.json > unittests/responses/career/DeleteBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/career/DeleteBadInputResponse.json unittests/expectedResponses/career/BadInputExpectedResponse.json >> UnitTestOutput.txt