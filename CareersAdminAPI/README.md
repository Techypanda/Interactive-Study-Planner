# CareersAdminAPI

## Purpose

The unit admin api will perform CUD (Create Update Delete) operations for Majors, Specializations and Units it does this with authentication from JWT from AWS Cognito.

## Requirements
The following are required to run:

-Python3
-pip
-Docker

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


## Testing

Testing can be done by building locally and running each endpoint, comparing the actual and expected responses.