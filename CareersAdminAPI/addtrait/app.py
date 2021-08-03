import json
import boto3
import requests
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 3/08/2021
#Description: Add trait operation handler

#JWT token validation
# Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
def validateJWTToken(self, token):
    keys_url = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gn4KIEkx0/.well-known/jwks.json"

    response = requests.get(keys_url)
    keys = json.loads(response.decode("utf-8"))["keys"]

    #headers = jwt.get_unverified_headers(token)
    #kid = headers["kid"]

    #return valid, error

#Trait class definition
class Trait:
    def __init__(self, traitId: str, name: str) -> None:
        self.id = traitId
        self.name = name

#Lambda handler - adds the received trait to the database if possible
def lambda_handler(event, context) -> dict:
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
            body = json.loads(event["body"])
            trait = Trait(body["Id"], body["Name"])
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
                    ConditionExpression=Attr("Id").ne(trait.id)   #Check not in table already
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