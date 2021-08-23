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
#Description: Delete trait operation handler

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

#Lambda handler - removes the received trait from the database if possible
def lambda_handler(event, context) -> dict:
    try:
        #Check if testing
        if os.getenv("DisableAuthentication"):
            return deleteTrait(json.loads(event["body"]))
        else:
            #Validate token
            valid, error = validateJWTToken(event['token'])

            if valid:
                return deleteTrait(json.loads(event["body"]))
            else:
                return error
    except KeyError:
        ic("Data received was in an invalid format or was incorrect.")
        return badRequest("Invalid data or format recieved.")

#Delete trait function
def deleteTrait(body: dict) -> dict:
    #Setup link to database and table
    db = boto3.resource('dynamodb', region_name='ap-southeast-2')
    table = db.Table("DevTraits")

    try:
        #Attempt to load table - checks if table exists
        table.load()
    except Exception:
        ic("Unable to handle request, DevTraits table does not exist.")
        #Return bad request indicating table does not exist
        return badRequest("Table does not exist.  Please try again.")
    else:
        try:    
            #Retrieve data
            trait = body["Id"]
        except KeyError:
            ic("Data received was in an invalid format or was incorrect.")
            return badRequest("Invalid data or format recieved.")
        else:
            #Check valid id
            if not os.getenv('Testing'):    #Check not testing
                if not fast_luhn.validate(trait):
                    ic("Recieved Id was invalid.")
                    return badRequest("Id recieved was invalid.")

            #Delete from table
            try:
                response = table.delete_item(
                    Key={
                        "Id": trait
                    },
                    ConditionExpression=Attr("Id").eq(trait)   #Check in table
                )
            except ClientError as err:
                #Check if error was due to item not existing in table
                if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    ic("Target trait does not exist.")
                    return badRequest("Item does not exist in the table.")
                else:
                    ic("Unknown client error:" + err.response)
                    return badRequest("Unknown error occured.")
            else:
                #Return ok response
                return okResponse("Trait deleted from database.")

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