#!/bin/bash

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 29/07/2021
#Date Last Modified: 16/08/2021

set -e

#Remove old test file output.
rm -f -- UnitTestOutput.txt

echo "Running Build" >> UnitTestOutput.txt
sam build --parallel >> UnitTestOutput.txt

# #Testing trait api and functions
# echo "Running Trait Api Events" >> UnitTestOutput.txt
# echo "Add Trait Api" >> UnitTestOutput.txt
# #Executing Add Trait Async
# sam local invoke --env-vars unittests/debug.json AddTraitFunction -e unittests/payloads/trait/AddTraitEvent.json > unittests/responses/trait/AddTraitResponse.json &
# addtrait=$!

# echo "Update Trait Non-Existing Item" >> UnitTestOutput.txt
# #Executing
# sam local invoke --env-vars unittests/debug.json UpdateTraitFunction -e unittests/payloads/trait/UpdateNonExistTraitEvent.json > unittests/responses/trait/UpdateNonExistResponse.json &
# updatenoexisttrait=$!

# echo "Delete Trait Non-Existing Item" >> UnitTestOutput.txt
# #Executing
# sam local invoke --env-vars unittests/debug.json DeleteTraitFunction -e unittests/payloads/trait/DeleteTraitEventNoExist.json > unittests/responses/trait/DeleteNonExistResponse.json & # uses separate json now to avoid race condition
# deletenoexist=$! 

# echo "Attempt Add Trait with Bad Input" >> UnitTestOutput.txt
# #Executing
# sam local invoke --env-vars unittests/debug.json AddTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/AddBadInputResponse.json &
# badinputtrait=$!

# echo "Attempt Update Trait with Bad Input" >> UnitTestOutput.txt
# #Executing
# sam local invoke --env-vars unittests/debug.json UpdateTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/UpdateBadInputResponse.json &
# badinputupdate=$!

# echo "Attempt Delete Trait with Bad Input" >> UnitTestOutput.txt
# #Executing
# sam local invoke --env-vars unittests/debug.json DeleteTraitFunction -e unittests/payloads/trait/BadInputEvent.json > unittests/responses/trait/DeleteBadInputResponse.json &
# badinputdeletetrait=$!

#Testing Career api and functions
echo "Running Career Events" >> UnitTestOutput.txt
echo "Add Career" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json AddCareerFunction -e unittests/payloads/career/AddCareerEvent.json > unittests/responses/career/AddCareerResponse.json &
addcareer=$!

echo "Update Career Non-Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json UpdateCareerFunction -e unittests/payloads/career/UpdateNonExistCareerEvent.json > unittests/responses/career/UpdateNonExistResponse.json &
updatecareernoexist=$!

echo "Delete Career Non-Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json DeleteCareerFunction -e unittests/payloads/career/DeleteCareerEventNoExist.json > unittests/responses/career/DeleteNonExistResponse.json &
deletenoexistcareer=$!

echo "Attempt Add Career with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json AddCareerFunction -e unittests/payloads/career/BadInputEvent.json > unittests/responses/career/AddBadInputResponse.json &
addcareerbadinput=$!

echo "Attempt Update Career with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json UpdateCareerFunction -e unittests/payloads/career/BadInputEvent.json > unittests/responses/career/UpdateBadInputResponse.json &
updatebadinputcareer=$!

echo "Attempt Delete Career with Bad Input" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json DeleteCareerFunction -e unittests/payloads/career/BadInputEvent.json > unittests/responses/career/DeleteBadInputResponse.json &
deletecareerbad=$!

# WAITS
echo "Waiting all seeding data"
wait
# #Comparing expected response to actual response
# diff unittests/responses/trait/AddTraitResponse.json unittests/expectedResponses/trait/AddTraitExpectedResponse.json >> UnitTestOutput.txt

# #Comparing expected response to actual response
# diff unittests/responses/trait/UpdateNonExistResponse.json unittests/expectedResponses/trait/NonExistExpectedResponse.json >> UnitTestOutput.txt

# #Comparing expected response to actual response
# diff unittests/responses/trait/DeleteTraitResponse.json unittests/expectedResponses/trait/DeleteTraitExpectedResponse.json >> UnitTestOutput.txt

# #Comparing expected response to actual response
# diff unittests/responses/trait/AddBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

# #Comparing expected response to actual response
# diff unittests/responses/trait/UpdateBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

# #Comparing expected response to actual response
# diff unittests/responses/trait/DeleteBadInputResponse.json unittests/expectedResponses/trait/BadInputExpectedResponse.json >> UnitTestOutput.txt

#Comparing expected response to actual response
echo "Add Career" >> UnitTestOutput.txt
diff unittests/responses/career/AddCareerResponse.json unittests/expectedResponses/career/AddCareerExpectedResponse.json >> UnitTestOutput.txt

#Comparing expected response to actual response
echo "Update Non-existant" >> UnitTestOutput.txt
diff unittests/responses/career/UpdateNonExistResponse.json unittests/expectedResponses/career/NonExistExpectedResponse.json >> UnitTestOutput.txt

#Comparing expected response to actual response
echo "Delete Non-existant" >> UnitTestOutput.txt
diff unittests/responses/career/DeleteNonExistResponse.json unittests/expectedResponses/career/NonExistExpectedResponse.json >> UnitTestOutput.txt

#Comparing expected response to actual response
echo "Add Bad Input" >> UnitTestOutput.txt
diff unittests/responses/career/AddBadInputResponse.json unittests/expectedResponses/career/BadInputExpectedResponse.json >> UnitTestOutput.txt

#Comparing expected response to actual response
echo "Update Bad Input" >> UnitTestOutput.txt
diff unittests/responses/career/UpdateBadInputResponse.json unittests/expectedResponses/career/BadInputExpectedResponse.json >> UnitTestOutput.txt

#Comparing expected response to actual response
echo "Delete Bad Input" >> UnitTestOutput.txt
diff unittests/responses/career/DeleteBadInputResponse.json unittests/expectedResponses/career/BadInputExpectedResponse.json >> UnitTestOutput.txt

echo "Running Add Event That Relied On Data since adds are done"
# echo "Add Trait Already Existing Item" >> UnitTestOutput.txt
# #Executing
# sam local invoke --env-vars unittests/debug.json AddTraitFunction -e unittests/payloads/trait/AddTraitEvent.json > unittests/responses/trait/AlreadyExistsResponse.json &
# addtraitexists=$!

echo "Add Career Already Existing Item" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json AddCareerFunction -e unittests/payloads/career/AddCareerEvent.json > unittests/responses/career/AlreadyExistsResponse.json &
addcareerexists=$!

wait
# #Comparing expected response to actual response
# diff unittests/responses/trait/AlreadyExistsResponse.json unittests/expectedResponses/trait/AlreadyExistsExpectedResponse.json >> UnitTestOutput.txt

#Comparing expected response to actual response
echo "Already Exists" >> UnitTestOutput.txt
diff unittests/responses/career/AlreadyExistsResponse.json unittests/expectedResponses/career/AlreadyExistsExpectedResponse.json >> UnitTestOutput.txt

echo "Running Updates now that all the adds are done"
echo "Update Career" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json UpdateCareerFunction -e unittests/payloads/career/UpdateCareerEvent.json > unittests/responses/career/UpdateCareerResponse.json &
updatecareer=$!

# echo "Update Trait Api" >> UnitTestOutput.txt
# #Executing
# sam local invoke --env-vars unittests/debug.json UpdateTraitFunction -e unittests/payloads/trait/UpdateTraitEvent.json > unittests/responses/trait/UpdateTraitResponse.json &
# updatetrait=$!

wait
#Comparing expected response to actual response
echo "Update Career" >> UnitTestOutput.txt
diff unittests/responses/career/UpdateCareerResponse.json unittests/expectedResponses/career/UpdateCareerExpectedResponse.json >> UnitTestOutput.txt

# #Comparing expected response to actual response
# diff unittests/responses/trait/UpdateTraitResponse.json unittests/expectedResponses/trait/UpdateTraitExpectedResponse.json >> UnitTestOutput.txt

echo "Running Deletes now that all of the adds are done"
# echo "Delete Trait Api" >> UnitTestOutput.txt
# #Executing
# sam local invoke --env-vars unittests/debug.json DeleteTraitFunction -e unittests/payloads/trait/DeleteTraitEvent.json > unittests/responses/trait/DeleteTraitResponse.json &
# deletetrait=$!

echo "Delete Career Api" >> UnitTestOutput.txt
#Executing
sam local invoke --env-vars unittests/debug.json DeleteCareerFunction -e unittests/payloads/career/DeleteCareerEvent.json > unittests/responses/career/DeleteCareerResponse.json &
deletecareer=$!

wait
#Comparing expected response to actual response
echo "Delete Career" >> UnitTestOutput.txt
diff unittests/responses/career/DeleteCareerResponse.json unittests/expectedResponses/career/DeleteCareerExpectedResponse.json >> UnitTestOutput.txt

# #Comparing expected response to actual response
# diff unittests/responses/trait/DeleteNonExistResponse.json unittests/expectedResponses/trait/NonExistExpectedResponse.json >> UnitTestOutput.txt