#!/bin/bash
echo "Testing Get all careers"
sam local invoke "GetAllCareers" -e ./events/event-get-all-careers.json > ./__tests__/output/GetAllCareersResponse.json &

echo "Testing Get All Traits"
sam local invoke "GetAllTraits" -e ./events/event-get-all-traits.json > ./__tests__/output/GetAllTraitsResponse.json &

echo "Testing Get Single Career"
sam local invoke "GetCareer" -e ./events/event-get-career.json > ./__tests__/output/GetCareerResponse.json &

echo "Testing search for a word"
sam local invoke "Search" -e ./events/event-search.json > ./__tests__/output/SearchResponse.json &

echo "Testing get Careers based of unit code"
sam local invoke "RestrictWithUnitCode" -e ./events/event-get-by-unit-code.json > ./__tests__/output/GetUnitCodeResponse.json &

echo "Testing get Careers based of trait code"
sam local invoke "RestrictWithTraitCode" -e ./events/event-get-by-trait-code.json > ./__tests__/output/GetTraitCodeResponse.json &
# not sure where we actually check these files are expected but wait here as I assume its after?
wait