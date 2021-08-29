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
#Date Last Modified: 21/08/2021
#Description: Add career operation handler

#JWT token validation
# Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
def validateJWTToken(token: str) -> Tuple[bool, dict]:
    keys_url = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_1EmEPwI2J/.well-known/jwks.json"

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
    def __init__(self, name: str, description: str, industry: str, reqs: list, traits: list) -> None:
        self.id = "0"
        self.name = name.lower()        #Convert to lowercase
        self.description = description
        self.industry = industry
        self.reqs = set(x.lower() for x in reqs)        #Convert to lowercase
        self.traits = set(x.lower() for x in traits)    #Convert to lowercase


#Lambda handler - adds the received career to the database if possible
def lambda_handler(event, context) -> dict:
    #Check if testing
    if os.getenv("DisableAuthentication"):
        return addCareer(json.loads(event["body"]))
    else:
        #Validate token
        valid, error = validateJWTToken(event['token'])

        if valid:
            return addCareer(json.loads(event["body"]))
        else:
            return error

#Add career function
def addCareer(body: dict) -> dict:
    #Setup link to database and table
    db = boto3.resource('dynamodb', region_name='ap-southeast-2')
    table = db.Table("DevCareers")

    try:
        #Attempt to load table - checks if table exists
        table.load()
    except Exception:
        ic("Unable to handle request, DevCareer table does not exist.")
        #Return bad request indicating table does not exist
        return badRequest("Table does not exist. Please try again.")
    else:
        try:   
            #Retrieve data
            career = Career(body["Name"], body["Description"], body["Industry"], body["Requirements"], body["Traits"])
            
            #Check Testing
            if (os.getenv('Testing')):
                career.id = body["CareerId"]
            else:
                #Check id not in table already
                flag = True

                while(flag):
                    career.id = str(fast_luhn.generate(20))

                    try:
                        response = table.get_item(
                            Key={
                                "CareerId": career.id
                            }
                        )
                    except ClientError as err:
                        ic("Failed check for existing career with same id.")
                        return badRequest("Failed check for existing item.")

                    #Check no item
                    try:
                        #Exception is raised when there is no matching item
                        response["Item"]    
                    except KeyError:    
                        flag = False
        except KeyError:
            ic("Data received was in an invalid format or was incorrect.")
            return badRequest("Invalid data or format recieved.")
        else:
            #Add to table
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
                    ConditionExpression=Attr("CareerId").ne(career.id)  #Check not in table already
                )
            except ClientError as err:
                #Check if error was due to item already existing in table
                if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    ic("Career already exists.")
                    return badRequest("Item already exists in table.")
                else:
                    ic("Unknown client error:" + err.response)
                    return badRequest("Unknown error occured.")
            else:
                #Return ok response
                return okResponse("Career added to database.")

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