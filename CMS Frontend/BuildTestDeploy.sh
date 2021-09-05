#!/bin/bash
set -e # stop on error
echo "Building CMS Site"
yarn install
yarn build
# yarn test
aws s3 sync build/ s3://curtinbiomedicalcourseplannercms --acl public-read
aws cloudfront create-invalidation --distribution-id E3ICHG4YBEUFAD --paths "/index.html"