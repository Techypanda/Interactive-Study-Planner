# CareersAdminAPI

## Purpose

The career admin api will perform CUD (Create Update Delete) operations for Careers and Traits it does this with authentication from JWT from AWS Cognito.

Note: Trait functions are commented out from deployment at the moment.

## Requirements
The following are required to run:

- Python3
- pip
- Docker

## Payloads
Career/Trait id should be the same as the career/trait name for the add payloads.

### Add Career
```json
{
    "CareerId": "Scientist",
    "Name": "Scientist",
    "Description": "Random description",
    "Industry": "Health",
    "Requirements": ["aa","bb"],
    "Traits": ["aa","bb"]
}
```

### Add Trait
```json
{
    "Id": "new trait id",
    "Name": "new trait name"
}
```

### Update Career
```json
{
    "CareerId": "Old career name/Career Id",
    "Name": "New career name",
    "Description": "New random description",
    "Industry": "New Industry",
    "Requirements": ["aa","bb"],
    "Traits": ["aa","bb"]
}
```

### Update Trait
```json
{
    "Id": "Old trait name/Trait Id",
    "Name": "New trait name"
}
```

### Delete Operations
All Delete Operations simply require the trait or career id which is the same as the trait or career name.

## Deployment

Deployment is done via AWS SAM, to do it manually you need to do the following commands
```sh
./UnitTestHandler.sh    #Build and Test
IMAGES_TO_DELETE=$( aws ecr list-images --region ap-southeast-2 --repository-name "curtinmedicalcourseplanner/careeradmin" --query 'imageIds[*]' --output json ) # Get all the images
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/careeradmin --image-ids "$IMAGES_TO_DELETE" || true # Delete all the images
sam package --output-template-file packaged-template.yaml --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/careeradmin --no-progressbar # Package into ECR
sam deploy --template ./packaged-template.yaml --stack-name CareerAdminAPIDev --region ap-southeast-2 --capabilities CAPABILITY_IAM --image-repository 363837338544.dkr.ecr. ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/careeradmin # Deploy onto API
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/careeradmin --image-ids "$IMAGES_TO_DELETE" || true # for some reason it doesnt need to exist, so we can save money by just removing it again
```

## Testing Locally

Testing can be done by building locally and running each endpoint, comparing the actual and expected responses.

This can be done manually or using the test script.
