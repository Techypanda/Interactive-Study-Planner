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

def lambda_handler(event, context):
    #Setup link to database and table
    db = boto3.resource('dynamodb', region_name='ap-southeast-2')
    table = db.Table("DevTraits")

    try:
        #Attempt to load table - checks if table exists
        table.load()
    except Exception:
        #Create table
        table = db.create_table(
            TableName='DevTraits',
            KeySchema=[
                {
                    'AttributeName': 'Name',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
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

        #Return bad request indicating table did not exist and is being created
        return badRequest("Table did not exist. Table is now being created. Please try again later.")

    #Retrieve data
    body = json.loads(event["body"])   
    name = body["name"]

    #Add to table
    #TODO - Add check for if it already exists
    response = table.put_item(
        Item={
            "Name": name
        }
    )

    #Return ok response
    return okResponse("Trait added to database.")

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