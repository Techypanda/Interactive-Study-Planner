#!/bin/bash
set -e # stop on error
echo "Installing Dependencies..."
yarn install
echo "Running Tests..."
CI=true yarn test
echo "Building CMS Site..."
yarn build
echo "Deploying CMS Site..."
aws s3 sync build/ s3://curtinbiomedicalcourseplanner --acl public-read
aws cloudfront create-invalidation --distribution-id E152TFYOUUSUB8 --paths "/index.html"