import json
import boto3
import requests
import random
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError

#Author: Matthew Loe
#Student Id: 19452425
#Date Created: 25/05/2021
#Date Last Modified: 6/08/2021
#Description: Add career operation handler

#Career class definition
class Career:
    def __init__(self, name: str, description: str, industry: str, reqs: list, traits: list) -> None:
        self.id = "0"
        self.name = name
        self.description = description
        self.industry = industry
        self.reqs = reqs
        self.traits = traits


#Lambda handler - adds the received career to the database if possible
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
        return badRequest("Table does not exist. Table is now being created. Please try again.")
    else:
        try:   
            #Retrieve data
            body = json.loads(event["body"])
            career = Career(body["Name"], body["Description"], body["Industry"], body["Requirements"], body["Traits"])
            
            #Check Testing
            if (body["CareerId"] == "TEST"):
                career.id = body["CareerId"]
            else:
                #Check id not in table already
                flag = True
                random.seed()
                while(flag):
                    career.id = random.randint(1, 10000000);

                    try:
                        response = table.get_item(
                            Key={
                                career.id
                            }
                        )
                    except Exception as err:
                        return badRequest("Failed check for existing item.")

                    #Check no item
                    if response is None:
                        flag = False
        except KeyError:
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
                    return badRequest("Item already exists in table.")
                else:
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