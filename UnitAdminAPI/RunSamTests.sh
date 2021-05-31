#!/bin/bash
echo "Running Add Events"
sam local invoke AddSpecFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/addspecpayload.json > ./unittests/responses/actualaddspecresponse.json
sam local invoke AddMajorFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/addmajorpayload.json > ./unittests/responses/actualaddmajorresponse.json
sam local invoke AddUnitFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/addunitpayload.json > ./unittests/responses/actualaddunitresponse.json
echo "Running Update Events"
sam local invoke UpdateSpecFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/updatespecpayload.json > ./unittests/responses/actualupdatespecresponse.json
sam local invoke UpdateMajorFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/updatemajorpayload.json > ./unittests/responses/actualupdatemajorresponse.json
sam local invoke UpdateUnitFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/updateunitpayload.json > ./unittests/responses/actualupdateunitresponse.json
echo "Running Remove Events"
sam local invoke RemoveSpecFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/removespecpayload.json > ./unittests/responses/actualremovespecresponse.json
sam local invoke RemoveMajorFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/removemajorpayload.json > ./unittests/responses/actualremovemajorresponse.json
sam local invoke RemoveUnitFunction --env-vars ./unittests/debug.json -e ./unittests/payloads/removeunitpayload.json > ./unittests/responses/actualremoveunitresponse.json