#!/bin/bash
rm -f -- UnitTestOutput.txt

echo "Running Build" >> UnitTestOutput.txt
sam build >> UnitTestOutput.txt

#Testing trait api and functions
echo "Running Trait Api Events" >> UnitTestOutput.txt
echo "Add Trait Api" >> UnitTestOutput.txt
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/AddTraitEvent.json > unittests/responses/trait/AddTraitResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/AddTraitResponse.json unittests/expectedResponses/trait/AddTraitExpectedResponse.json >> UnitTestOutput.txt

echo "Add Already Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/AddTraitEvent.json > unittests/responses/trait/AlreadyExistsResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/AlreadyExistsResponse.json unittests/expectedResponses/trait/AlreadyExistsExpectedResponse.json >> UnitTestOutput.txt

echo "Update Trait Api" >> UnitTestOutput.txt
#Executing
sam local invoke UpdateTraitFunction -e unittests/payloads/trait/UpdateTraitEvent.json > unittests/responses/trait/UpdateTraitResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/UpdateTraitResponse.json unittests/expectedResponses/trait/UpdateTraitExpectedResponse.json >> UnitTestOutput.txt

echo "Update Non-Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke UpdateTraitFunction -e unittests/payloads/trait/AddTraitEvent.json > unittests/responses/trait/UpdateNonExistResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/UpdateNonExistResponse.json unittests/expectedResponses/trait/NonExistExpectedResponse.json >> UnitTestOutput.txt

echo "Delete Trait Api" >> UnitTestOutput.txt
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/RemoveTraitEvent.json > unittests/responses/trait/DeleteTraitExpectedResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/DeleteTraitResponse.json unittests/expectedResponses/trait/DeleteTraitExpectedResponse.json >> UnitTestOutput.txt

echo "Delete Non-Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/RemoveKindTraitEvent.json > unittests/responses/trait/DeleteNonExistResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/DeleteNonExistResponse.json unittests/expectedResponses/trait/NonExistExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Add with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/AddBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/AddBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Update with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/UpdateBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/UpdateBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

echo "Attempt Delete with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/DeleteBadInputResponse.json
#Comparing expected response to actual response
diff unittests/responses/trait/DeleteBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

echo "Running Career Events"
