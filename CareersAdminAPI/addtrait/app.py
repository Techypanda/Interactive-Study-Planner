import json
import boto3
import requests
import random
import jose
import jose.util
import time
import os
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 15/08/2021
#Description: Add trait operation handler

#JWT token validation
# Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
def validateJWTToken(token: str) -> bool, dict:
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
        return False, badRequest("Public key not found in jwks.json")

    #Construct and decode signature
    public_key = jwk.construct(keys[key_index])

    message, encoded_signature = str(token.rsplit('.', 1))

    decoded_signature = base64url_decode(encoded_signature.encode('utf-8'))

    #Verify signature
    if not public_key.verify(message.encode("utf8"), decoded_signature):
        return False, badRequest("Signature verification failed.")
    else:
        claims = jwt.get_unverified_claims(token)
        #Verify token not expired
        if time.time() > claims['exp']:
            return False, badRequest("Token is expired.")
        else:
            return True, None

#Trait class definition
class Trait:
    def __init__(self, name: str) -> None:
        self.name = name.lower()    #Convert to lowercase
        self.id = "0"

#Lambda handler - adds the received trait to the database if possible
def lambda_handler(event, context) -> dict:
    valid, error = validateJWTToken(event['token'])

    if os.getenv("DisableAuthentication"):
        return adddTrait(json.loads(event["body"]))
    else:
        if valid:
            return addTrait(json.loads(event["body"]))
        else:
            return error

def addTrait(body: dict) -> dict:
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

        #Return bad request indicating table does not exist and is being created
        return badRequest("Table does not exist. Table is now being created. Please try again.")
    else:
        try:
            #Retrieve data
            trait = Trait(body["Name"])
        
            #Check Testing
            if (body["Id"] == "TEST"):
                trait.id = body["Id"]
            else:
                #Check id not in table already
                flag = True
                random.seed()

                while(flag):
                    trait.id = str(random.randint(1, 1000000));

                    try:
                        response = table.get_item(
                            Key={
                                "Id": trait.id
                            }
                        )
                    except ClientError as err:
                        return badRequest("Failed check for existing item.")

                    #Check no item
                    try:
                        #Exception is raised when there is no matching item
                        response["Item"]    
                    except KeyError:    
                        flag = False

        except KeyError:
            return badRequest("Invalid data or format recieved.")
        else:
            #Add to table
            try:
                response = table.put_item(
                    Item={
                        "Id": trait.id,
                        "Name": trait.name
                    },
                    ConditionExpression=Attr("Id").ne(trait.id)  #Check not in table already
                )
            except ClientError as err:
                #Check if error was due to item already existing in table
                if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    return badRequest("Item already exists in table.")
                else:
                    return badRequest("Unknown error occured.")
            else:
                #Return ok response
                return okResponse("Trait added to database.") 


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