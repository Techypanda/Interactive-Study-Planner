import json
import boto3
import requests
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 2/08/2021
#Description: Update trait operation handler

#Trait class definition
class Trait:
    def __init__(self, traitId: str, name: str) -> None:
        self.id = traitId
        self.name = name

#Lambda handler - updates the target trait in the database if possible
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
                },
                {
                    'AttributeName': 'Name',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )

        #Return bad request indicating table does not exist and is being created
        return badRequest("Table does not exist. An empty table is now being created. Please try again.")

    else:
        #Retrieve data
        body = json.loads(event["body"])
        trait = Trait(body["Id"], body["Name"])

        #Update item in table
        try:
            response = table.update_item(
                Item={
                    "Id": trait.name,
                    "Name": trait.name
                },
                ConditionExpression=Attr("Id").eq(trait.id)   #Check in table already
            )
        except ClientError as err:
            #Check if error was due to item not existing in table
            if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                return badRequest("Item does not exist in the table.")
            else:
                return badRequest("Unknown error occured.")
        else:
            #Return ok response
            return okResponse("Trait updated to database.")

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