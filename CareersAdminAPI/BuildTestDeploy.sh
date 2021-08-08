#!/bin/bash

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 6/08/2021
#Date Last Modified: 6/08/2021

set -e

#Build and Test
echo "Building and Testing API"
./UnitTestsHandler.sh

#Deploy
echo "Beginning Deploy Stage"
#Remove any old ECRs
echo "Wiping ECR Before Deploying..."
IMAGES_TO_DELETE=$( aws ecr list-images --region ap-southeast-2 --repository-name "curtinmedicalcourseplanner/careeradmin" --query 'imageIds[*]' --output json )

#Delete old ECRs
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/careeradmin --image-ids "$IMAGES_TO_DELETE" || true

#Package image
sam package --output-template-file packaged-template.yaml --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/careeradmin --no-progressbar

#Deploy
sam deploy --template ./packaged-template.yaml --stack-name CareerAdminAPIDev --region ap-southeast-2 --capabilities CAPABILITY_IAM --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/careeradmin

#Remove local ECR
echo "Wiping ECR After Deploying..."
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/careeradmin --image-ids "$IMAGES_TO_DELETE" || true # for some reason it doesnt need to exist, so we can save money by just removing it again