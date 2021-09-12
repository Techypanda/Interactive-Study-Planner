#!/bin/bash
set -e
echo "Running Add Events"
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/addspecpayload.json > ./unittests/responses/actualaddspecresponse.json &
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/addmajorpayload.json > ./unittests/responses/actualaddmajorresponse.json &
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/addunitpayload.json > ./unittests/responses/actualaddunitresponse.json &
wait
echo "Running Update Events"
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/updatespecpayload.json > ./unittests/responses/actualupdatespecresponse.json &
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/updatemajorpayload.json > ./unittests/responses/actualupdatemajorresponse.json &
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/updateunitpayload.json > ./unittests/responses/actualupdateunitresponse.json &
wait
echo "Running Remove Events"
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/removespecpayload.json > ./unittests/responses/actualremovespecresponse.json &
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/removemajorpayload.json > ./unittests/responses/actualremovemajorresponse.json &
sam local invoke UnitAdminAPI --env-vars ./unittests/debug.json -e ./unittests/payloads/removeunitpayload.json > ./unittests/responses/actualremoveunitresponse.json &
wait