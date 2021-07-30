#!/bin/bash
echo "Running Build"
sam local build

echo "Running Trait Api Events"
echo "Add Trait Api"
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json > unittests/expectedResponses/trait/AddTraitExpectedResponse.json
diff (cat unittests/responses/trait/AddTraitResponse.json) (cat unittests/expectedResponses/trait/AddTraitExpectedResponse)
echo "Add Trait Api"
sam local invoke AddTraitFunction -e unittests/payloads/trait/addTraitPayload.json
echo "Running Career Events"
