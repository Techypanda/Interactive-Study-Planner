import json
import boto3
import requests
import jose
import jose.util
import time
import os
import fast_luhn
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 16/08/2021
#Description: Update trait operation handler

#JWT token validation
# Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
def validateJWTToken(token: str) -> bool, dict:

#Trait class definition
class Trait:
    def __init__(self, traitId: str, name: str) -> None:
        self.id = traitId
        self.name = name.lower()        #Convert to lowercase

#Lambda handler - updates the target trait in the database if possible
def lambda_handler(event, context) -> dict:
    #Check if testing
    try:
        if os.getenv("DisableAuthentication"):
            return updateTrait(json.loads(event["body"]))
        else:
            #Validate token
            valid, error = validateJWTToken(event['token'])

            if valid:
                return updateTrait(json.loads(event["body"]))
            else:
                return error
    except KeyError:
            ic("Data received was in an invalid format or was incorrect.")
            return badRequest("Invalid data or format recieved.")

#Update trait function
def updateTrait(body: dict) -> dict:
    #Setup link to database and table
    db = boto3.resource('dynamodb', region_name='ap-southeast-2')
    table = db.Table("DevTraits")

    try:
        #Attempt to load table - checks if table exists
        table.load()
    except Exception:   #TODO - Find out import for ResourceNotFoundException
        #Create table
        table = db.create_table(
            TableName='DevTraits',
            KeySchema=[
                {
                    'AttributeName': 'Id',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'Id',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )

        ic("Unable to handle request, DevTraits table does not exist, table is now being created.")
        #Return bad request indicating table does not exist and is being created
        return badRequest("Table does not exist. An empty table is now being created. Please try again.")

    else:
        try:
            #Retrieve data
            trait = Trait(body["Id"], body["Name"])
        except KeyError:
            ic("Data received was in an invalid format or was incorrect.")
            return badRequest("Invalid data or format recieved.")
        else:    
            #Check valid id
            if not fast_luhn.validate(career):
                ic("Recieved Id was invalid.")
                return badRequest("Id recieved was invalid.")
            else:
                #Update item in table
                try:
                    response = table.put_item(
                        Item={
                            "Id": trait.id,
                            "Name": trait.name
                        },
                        ConditionExpression=Attr("Id").eq(trait.id)   #Check in table already
                    )
                except ClientError as err:
                    #Check if error was due to item already existing in table
                    if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                        ic("Target trait does not exist.")
                        return badRequest("Item does not exist in the table.")
                    else:
                        ic("Unknown client error:" + err.response)
                        return badRequest("Unknown error occured.")
                else:
                    return okResponse("Trait updated in database.")

#Http responses
#Badrequest response
def badRequest(reason: str) -> dict:
    return {
        "statusCode" : 400,
        "body" : "Bad request: " + reason,
        "headers": { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            },
    }

#Ok response
def okResponse(reason: str) -> dict:
    return {
        "statusCode" : 200,
        "body" : "Success: " + reason,
        "headers": { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            },
    }    