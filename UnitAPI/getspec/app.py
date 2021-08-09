from boto3.dynamodb.conditions import Key, Attr
from decimal import *
import boto3
import json
import requests


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('DevSpecializations')
    #Check to see table exists
    try: 
        table.load()
    except Exception:
        return badRequest('Table does not exist.')
    else:
        #Check queryStringParameter even exists
        if 'queryStringParameters' in event:
            query = event['queryStringParameters']
        else:
            return badRequest('No param.')
        #Check if they are empty
        if not query:
            return badRequest('No query parameter passed')
        #Check if the query string parameter was 'code'
        if 'code' in query:
            #Convert user query to all uppercase, since the SpecializationCode
            #is converted to upper when being added to the table
            queryToUpper = query['code'].upper()
            #Query the table looking for a match between SpecializationCode
            #and what was passed as a parameter to the query
            response = table.query(
                KeyConditionExpression=Key('SpecializationCode').eq(queryToUpper)
                )
            queryResults = response['Items']
            #Check to see if we got any results from the query
            if not queryResults:
                return badRequest('No search results for this specialization code. Try again with a valid code.')
            #Return payload assuming it has made it past all checks 
            return okResponse(response['Items'])
        #Anything but 'code' as a query string parameter is invalid
        else:
            return badRequest('Invalid parameter passed.')
#Needed to convert Decimal and sets into ints and lists rewspectively
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
            'Content-Type': 'application/json;',
            'Access-Control-Allow-Origin': '*'
            },
        }
