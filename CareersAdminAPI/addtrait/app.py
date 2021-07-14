import json
import os
import boto3
import requests
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

#JWT token validation
# Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
def validateJWTToken(self, token):
    keys_url = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gn4KIEkx0/.well-known/jwks.json"

    response = requests.get(keys_url)
    keys = json.loads(response.decode('utf-8'))['keys']

    #headers = jwt.get_unverified_headers(token)
    #kid = headers['kid']

    #return valid, error

def lambda_handler(event, context):
    #Setup link to database and table
    db = boto3.resource('dynamodb', region_name="ap-southeast-2")
    table = db.Table("DevTraits")

    #Retrieve data
    name = event['name']

    #Check if item exists already else add
    try:
        #Try get item from database
        response = table.get_item(Key={'name': name})
    except ClientError as err:
        #Return error
        return badRequest("Failed to check for item in database.")
    else:
        #Check for response
        if response:
            #Return successful request but response failure
            return okResponse("Item already exists.")
        else:
            #Add item to database
            response = db.put_item(name)
            return okResponse("Trait successfully added to database.")

#Http responses
#Badrequest response
def badRequest( reason):
    return {
        "statusCode" : 400,
        "body" : "Bad request: " + reason,
        'headers': { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
    }

#Ok response
def okResponse( reason):
    return {
        "statusCode" : 200,
        "body" : "Success: " + reason,
        'headers': { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
    }    
