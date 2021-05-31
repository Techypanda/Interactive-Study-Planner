#!/bin/bash
echo "Building"
sam build
echo "Testing API"
./RunSamTests.sh
go test -v
echo "Beginning Deploy Stage"
echo "Wiping ECR Before Deploying..."
IMAGES_TO_DELETE=$( aws ecr list-images --region ap-southeast-2 --repository-name "curtinmedicalcourseplanner/unitadmin" --query 'imageIds[*]' --output json )
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/unitadmin --image-ids "$IMAGES_TO_DELETE" || true
sam package --output-template-file packaged-template.yaml --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/unitadmin --no-progressbar
sam deploy --template ./packaged-template.yaml --stack-name UnitAdminAPIDev --region ap-southeast-2 --capabilities CAPABILITY_IAM --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/unitadmin
echo "Wiping ECR After Deploying..."
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/unitadmin --image-ids "$IMAGES_TO_DELETE" || true # for some reason it doesnt need to exist, so we can save money by just removing it again