#!/bin/bash
set -e
echo "Every tests is run in the background so it can go faster in CI/CD Context"
echo "Running Singular Resource Additions To Test Add"
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testaddcareer.json > ./unittests/responses/actualaddcareer.json &
pid1=$!
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testaddmajor.json > ./unittests/responses/actualaddmajor.json &
pid2=$!
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testaddspec.json > ./unittests/responses/actualaddspec.json &
pid3=$!
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testaddunit.json > ./unittests/responses/actualaddunit.json &
pid4=$!
wait
echo "Running A Bulk Add Of All Units Defined In Biomedical Science"
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testbulkadd.json > ./unittests/responses/actualbulkadd.json &
pid5=$!
wait
echo "Running Bad Payloads"
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testbadbulk.json > ./unittests/responses/actualbadbulkadd.json &
pid6=$!
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testbadcareer.json > ./unittests/responses/actualbadcareer.json &
pid7=$!
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testbadmajor.json > ./unittests/responses/actualbadmajor.json &
pid8=$!
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testbadspec.json > ./unittests/responses/actualbadspec.json &
pid9=$!
sam local invoke CSVParser --env-vars ./unittests/debug.json -e ./unittests/payloads/testbadunit.json > ./unittests/responses/actualbadunit.json &
pid10=$!
wait
echo "SAM Tests Concluded"