import json
import boto3
import requests
import jose
import jose.utils
import time
import os
import fast_luhn
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 17/08/2021
#Description: Update trait operation handler

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
            if not os.getenv('Testing'):    #Check not testing
                if not fast_luhn.validate(trait):
                    ic("Recieved Id was invalid.")
                    return badRequest("Id recieved was invalid.")

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