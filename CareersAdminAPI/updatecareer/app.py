import json
import boto3
import requests
import jose
import jose.utils
import time
import os
import fast_luhn
from icecream import ic
from typing import Tuple
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 17/08/2021
#Description: Update career operation handler

#JWT token validation
# Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
def validateJWTToken(token: str) -> Tuple[bool, dict]:
    keys_url = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gn4KIEkx0/.well-known/jwks.json"

    response = requests.get(keys_url)
    keys = json.loads(response.decode("utf-8"))["keys"]

    headers = jwt.get_unverified_headers(token)
    kid = headers["kid"]

    key_index = -1

    #sSearch for kid in public keys list
    for i in range(len(keys)):
        if kid == keys[i]['kid']:
            key_index = i
            break
    if key_index == -1:
        message = "Public key not found in jwks.json."
        ic(message)
        return False, badRequest(message)

    #Construct and decode signature
    public_key = jwk.construct(keys[key_index])

    message, encoded_signature = str(token.rsplit('.', 1))

    decoded_signature = base64url_decode(encoded_signature.encode('utf-8'))

    #Verify signature
    if not public_key.verify(message.encode("utf8"), decoded_signature):
        message = "Signature verification failed."
        ic(message)
        return False, badRequest(message)
    else:
        claims = jwt.get_unverified_claims(token)
        #Verify token not expired
        if time.time() > claims['exp']:
            message = "Token is expired."
            ic(message)
            return False, badRequest(message)
        else:
            return True, None
#Career class definition
class Career:
    def __init__(self, careerId: str, name: str, description: str, industry: str, reqs: list, traits: list) -> None:
        self.id = careerId
        self.name = name.lower()        #Convert to lowercase
        self.description = description
        self.industry = industry
        self.reqs = set(x.lower() for x in reqs)        #Convert to lowercase
        self.traits = set(x.lower() for x in traits)    #Convert to lowercase

#Lambda handler - updates the target career in the database if possible
def lambda_handler(event, context) -> dict:
    #Check if testing
    try:
        if os.getenv("DisableAuthentication"):
            return updateCareer(json.loads(event["body"]))
        else:
            #Validate token
            valid, error = validateJWTToken(event['token'])

            if valid:
                return updateCareer(json.loads(event["body"]))
            else:
                return error
    except KeyError:
            ic("Data received was in an invalid format or was incorrect.")
            return badRequest("Invalid data or format recieved.")

#Update career function
def updateCareer(body: dict) -> dict:
    #Setup link to database and table
    db = boto3.resource('dynamodb', region_name='ap-southeast-2')
    table = db.Table("DevCareers")

    try:
        #Attempt to load table - checks if table exists
        table.load()
    except Exception:   #TODO - Find out import for ResourceNotFoundException
        #Create table
        table = db.create_table(
            TableName='DevCareers',
            KeySchema=[
                {
                    'AttributeName': 'CareerId',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'CareerId',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )

        ic("Unable to handle request, DevCareers table does not exist, table is now being created.")
        #Return bad request indicating table does not exist and is being created
        return badRequest("Table does not exist. An empty table is now being created. Please try again.")

    else:
        try:    
            #Retrieve data
            career = Career(body["CareerId"], body["Name"], body["Description"],body["Industry"], body["Requirements"], body["Traits"])
        except KeyError:
            ic("Data received was in an invalid format or was incorrect.")
            return badRequest("Invalid data or format recieved.")
        else:
            #Check valid id
            if not os.getenv('Testing'):    #Check not testing
                if not fast_luhn.validate(career.careerId):
                    ic("Recieved CareerId was invalid.")
                    return badRequest("Id recieved was invalid.")

            #Update item in table
            try:
                response = table.put_item(
                    Item={
                        "CareerId": career.id,
                        "Name": career.name,
                        "Description": career.description,
                        "Industry": career.industry,
                        "Requirements": career.reqs,
                        "Traits": career.traits
                    },
                    ConditionExpression=Attr("CareerId").eq(career.id)   #Check in table already
                )
            except ClientError as err:
                #Check if error was due to item already existing in table
                if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    ic("Target career does not exist.")
                    return badRequest("Item does not exist in the table.")
                else:
                    ic("Unknown client error:" + err.response)
                    return badRequest("Unknown error occured.")
            else:
                #Return ok response
                return okResponse("Career updated in database.")

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