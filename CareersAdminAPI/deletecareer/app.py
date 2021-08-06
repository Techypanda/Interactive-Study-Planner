import json
import boto3
import requests
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 6/08/2021
#Description: Delete career operation handler

#Lambda handler - removes the target career from the database if possible
def lambda_handler(event, context) -> dict:
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

        #Return bad request indicating table does not exist and is being created
        return badRequest("Table does not exist. An empty table is now being created. Please try again.")
    else:
        try:
            #Retrieve data
            body = json.loads(event["body"])
            career = body["CareerId"]
        except KeyError:
            return badRequest("Invalid data or format recieved.")
        else:
            #Delete from table
            try:
                response = table.delete_item(
                    Key={
                        "CareerId": career
                    },
                    ConditionExpression=Attr("CareerId").eq(career)   #Check in table
                )
            except ClientError as err:
                #Check if error was due to item not existing in table
                if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    return badRequest("Item does not exist in the table.")
                else:
                    return badRequest("Unknown error occured.")
            else:
                #Return ok response
                return okResponse("Career deleted from database.")

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
