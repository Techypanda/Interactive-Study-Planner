import boto3
from boto3.dynamodb.conditions import Key

client = boto3.client("dynamodb")

#Http request data parsing
def parseData(data):
    print("Data parsing")

#JWT token validation
def validateJWTToken(token):
    print("Token validation")

#Database interactions
def checkInDatabase(name):
    
    response = client.query(
        TableName = '',
        KeyConditionExpression = Key('name').eq(name)
    )

def addToDatabase(name):
    response = client.put_item(
        TableName = '',
        KeyConditionExpression = Key('name').eq(name)
    )

#Http responses
def badRequest():
    print("badrequest")

def okResponse():
    print("ok")    