#!/bin/bash
set -e
echo "Building"
sam build --parallel
echo "Testing API"
./CareerApiTests.sh
echo "Beginning Deploy Stage"
echo "Wiping ECR Before Deploying..."
IMAGES_TO_DELETE=$( aws ecr list-images --region ap-southeast-2 --repository-name "curtinmedicalcourseplanner/careerapi" --query 'imageIds[*]' --output json )
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/careerapi --image-ids "$IMAGES_TO_DELETE" || true
sam package --output-template-file packaged-template.yaml --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/careerapi --no-progressbar
sam deploy --template ./packaged-template.yaml --stack-name CareerAPIDev --region ap-southeast-2 --capabilities CAPABILITY_IAM --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/careerapi
echo "Wiping ECR After Deploying..."
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/careerapi --image-ids "$IMAGES_TO_DELETE" || true # for some reason it doesnt need to exist, so we can save money by just removing it again