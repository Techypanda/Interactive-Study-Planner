import json
import boto3
import requests
from botocore.exceptions import ClientError

#JWT token validation
# Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
def validateJWTToken(self, token):
    keys_url = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gn4KIEkx0/.well-known/jwks.json"

    response = requests.get(keys_url)
    keys = json.loads(response.decode("utf-8"))["keys"]

    #headers = jwt.get_unverified_headers(token)
    #kid = headers["kid"]

    #return valid, error

class Trait:
    def __init__(self, traitId, name):
        self.id = traitId
        self.name = name

def lambda_handler(event, context):
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
        return badRequest("Table does not exist. An empty table is now being created.  Please try again.")
    else:
        #Retrieve data
        body = json.loads(event["body"])
        trait = Trait(body["Id"], body["Name"])

        #Delete from table
        try:
            response = table.delete_item(
                Item={
                    "Id": trait.id,
                    "Name": trait.name
                },
                ConditionExpression=Attr("Id").eq(trait.id)   #Check in table
            )
        except ClientError as err:
            #Check if error was due to item not existing in table
            if err.response['Error']['Code'] == 'ConditionalCheckFailedException':
                return badRequest("Item does not exist in the table.")
            else:
                return badRequest("Unknown error occured.")
        else:
            #Return ok response
            return okResponse("Trait deleted from database.")

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