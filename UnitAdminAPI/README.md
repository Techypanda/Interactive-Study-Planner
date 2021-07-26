# Unit Admin API

## Purpose

The unit admin api will perform CUD (Create Update Delete) operations for Majors, Specializations and Units it does this with authentication from JWT from AWS Cognito.

## Payloads

### Add/Update Major
```json
{
    "majorCode": "testMajor",
    "name": "Test One With Real API",
    "credits": 12.5,
    "units": ["aa"],
    "unitAntiReqs": ["aa"],
    "specAntiReqs": ["bb"]
}
```
### Add/Update Unit
```json
{
    "unitCode": "new unitb",
    "unitName": "Test One With Real API",
    "unitDescription": "could be a description",
    "unitCredits": 25.25,
    "delivery": "22222223123 Online",
    "prerequistes": ["aa"],
    "corequistes": ["bb"],
    "antirequistes": ["cc"]
}
```

### Add/Update Specialization
```json
{
    "specCode": "testSpec",
    "name": "Test One With Real API",
    "credits": 12.5,
    "courseInternal": false,
    "units": ["aa"],
    "unitAntiReqs": ["aa"],
    "specAntiReqs": ["bb"],
    "majorAntiReqs": ["cc"]
}
```

### Delete Operations
All Delete Operations simply require the specCode/unitCode/majorCode

## Deployment

Deployment is done via AWS SAM, to do it manually you need to do the following commands
```sh
sam build # Build
./RunSamTests.sh # Run SAM tests
go test -v # Run go test suite
IMAGES_TO_DELETE=$( aws ecr list-images --region ap-southeast-2 --repository-name "curtinmedicalcourseplanner/unitadmin" --query 'imageIds[*]' --output json ) # Get all the images
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/unitadmin --image-ids "$IMAGES_TO_DELETE" || true # Delete all the images
sam package --output-template-file packaged-template.yaml --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/unitadmin --no-progressbar # Package into ECR
sam deploy --template ./packaged-template.yaml --stack-name UnitAdminAPIDev --region ap-southeast-2 --capabilities CAPABILITY_IAM --image-repository 363837338544.dkr.ecr.ap-southeast-2.amazonaws.com/curtinmedicalcourseplanner/unitadmin # Deploy onto API
aws ecr batch-delete-image --region ap-southeast-2 --repository-name curtinmedicalcourseplanner/unitadmin --image-ids "$IMAGES_TO_DELETE" || true # for some reason it doesnt need to exist, so we can save money by just removing it again
```

## Testing

Testing is done by running each endpoint locally in AWS SAM, then we compare the expected response with the actual response.