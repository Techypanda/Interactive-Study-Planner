#!/bin/bash
set -e

#Build and Test
sam build

echo "Building and Testing API"
./CareerApiTests.sh

#Deploy
echo "Beginning Deploy Stage"
#Remove any old ECRs
echo "Wiping ECR Before Deploying..."
IMAGES_TO_DELETE=$( aws ecr list-images --region ap-southeast-2 --repository-name "curtinmedicalcourseplanner/careerapi" --query 'imageIds[*]' --output json )

#Delete old ECRs
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/careerapi --image-ids "$IMAGES_TO_DELETE" || true

#Package image
sam package --output-template-file packaged-template.yaml --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/careerapi --no-progressbar

#Deploy
sam deploy --template ./packaged-template.yaml --stack-name CareerAPIDev --region ap-southeast-2 --capabilities CAPABILITY_IAM --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/careerapi

#Remove local ECR
echo "Wiping ECR After Deploying..."
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/careerapi --image-ids "$IMAGES_TO_DELETE" || true # for some reason it doesnt need to exist, so we can save money by just removing it again