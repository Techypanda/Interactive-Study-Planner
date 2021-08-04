import json
import boto3
import requests
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 3/08/2021
#Description: Update career operation handler

#Career class definition
class Career:
    def __init__(self, careerId: str, name: str, description: str, industry: str, reqs: list, traits: list) -> None:
        self.id = careerId
        self.name = name
        self.description = description
        self.industry = industry
        self.reqs = reqs
        self.traits = traits

#Lambda handler - updates the target career in the database if possible
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
            career = Career(body["CareerId"], body["Name"], body["Description"],body["Industry"], body["Requirements"], body["Traits"])
        except KeyError:
            return badRequest("Invalid data or format recieved.")
        else:
            #Update item in table
            try:
                response = table.update_item(
                    Key={
                        "CareerId": career.id
                    },
                    UpdateExpression="SET CareerId = :newId, Name = :newName, Description = :newDesc, Industry = :newIndustry, Requirements = :newReqs, Traits = :newTraits",
                    ExpressionAttributeValues={
                        ":newId": career.name,
                        ":newName": career.name,
                        ":newDesc": career.description,
                        ":newIndustry": career.industry,
                        ":newReqs": career.reqs,
                        ":newTraits": career.traits
                    },
                    ConditionExpression=Attr("CareerId").eq(career.id)   #Check in table already
                )
            except ClientError as err:
                #Check if error was due to item not existing in table
                if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                    return badRequest("Item does not exist in the table.")
                else:
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