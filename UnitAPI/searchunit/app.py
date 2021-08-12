from boto3.dynamodb.conditions import Key, Attr
from decimal import *
import boto3
import requests
import json


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('DevMajors')
    #Check to see table exists
    try:
        table.load()
    except Exception:
        return badRequest('Table does not exist.')
    else:
        if 'queryStringParameters' in event:
            query = event['queryStringParameters']
        else:
            return badRequest('No param.')
        #Check if empty
        if not query:
            return badRequest('No query parameter passed.')
        #Check to see if query string parameter was 'name'
        if 'name' in query:
            #Set fieldName so we know what Attr to search for later
            #This is done so we only need to write the query once
            fieldName = 'Name'
            #Convert the value to lower, since the SearchName field
            #is converted to lower when being added to the table
            queryCaseAdjusted = query['name'].lower()
        #Check to see if the query string parameter was 'code'
        elif 'code' in query:
            #Set fieldName so we know what Attr to search for later
            #This is done so we only need to write the query once
            fieldName = 'MajorCode'
            #Convert the value to upper, since the MajorCode field 
            #is converted to upper when being added to the table
            queryCaseAdjusted = query['code'].upper()
        #Anything other than 'code' or 'name' is invalidf
        else:
            return badRequest('Non valid query parameter.')
        #Query the table looking for a match between whatever fieldfName was
        #set to, and whatever the user searched for
        response = table.scan(
            FilterExpression=Attr(fieldName).contains(queryCaseAdjusted)
            )
        queryResults = response['Items']
        #Check if results are empty
        if not queryResults:
            return badRequest('No search results.')
        #Return payload assuming it has made it past all checks
        return okResponse(response['Items'])

#Needed to convert Decimal and sets into ints and lists respetively
def handleTypes(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    if isinstance(obj, set):
        return list(obj)

def badRequest(reason):
    return {
        'statusCode': 400,
        'body': json.dumps(reason, default=handleTypes),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }

def okResponse(data):
    return {
        'statusCode': 200,
        'body': json.dumps(data, default=handleTypes),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }
