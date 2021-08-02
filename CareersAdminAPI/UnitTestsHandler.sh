#!/bin/bash
echo "Running Build"
sam local build

#Testing trait api and functions
echo "Running Trait Api Events"
echo "Add Trait Api"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Add Already Existing Item"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Update Trait Api"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Update Non-Existing Item"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Delete Trait Api"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Remove Non-Existing Item"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Attempt Add with Bad Input"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Attempt Update with Bad Input"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Attempt Remove with Bad Input"
#Executing
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
#Comparing expected response to actual response
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)

echo "Running Career Events"
