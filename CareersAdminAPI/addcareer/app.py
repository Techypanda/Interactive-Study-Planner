import json
import boto3
import requests
from botocore.exceptions import ClientError

class Career:
    def __init__(self, careerId, name, description, industry, reqs, traits):
        self.id = careerId
        self.name = name
        self.description = description
        self.reqs = reqs
        self.traits = traits

def lambda_handler(event, context):
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
                },
                {
                    'AttributeName': 'Description',
                    'AttributeType': 'S'
                },
                {
                    'AttributeName': 'Requirements',
                    'AttributeType': 'SS'
                },
                {
                    'AttributeName': 'Traits',
                    'AttributeType': 'SS'
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
        #Retrieve data
        body = json.loads(event["body"])
        career = Career(body["Id"], body["Name"], body["Description"], body["Requirements"], body["Traits"])

        #Add to table
        try:
            response = table.put_item(
                Item={
                    "Id": career.id,
                    "Name": career.name,
                    "Description": career.description,
                    "Requirements": career.reqs,
                    "Traits": career.traits
                },
                ConditionExpression=Attr("Id").ne(career.id)   #Check not in table already
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
def badRequest(reason):
    return {
        "statusCode" : 400,
        "body" : "Bad request: " + reason,
        "headers": { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            },
    }

#Ok response
def okResponse(reason):
    return {
        "statusCode" : 200,
        "body" : "Success: " + reason,
        "headers": { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            },
    }    