from boto3.dynamodb.conditions import Key, Attr
from decimal import *
import boto3
import json
import requests
from icecream import ic


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('DevUnits')
    ic("Retrieving Dev Units table")
    #Check to see the table exiss
    try: 
        ic("Attempting to load table")
        table.load()
    except Exception:
        ic("Table does not exist")
        return badRequest('Table does not exist.')
    else:
        #Check queryStringParameter even exists
        ic("Successfully loaded Dev Units")
        if 'queryStringParameters' in event:
            ic("Event has query string parameters")
            query = event['queryStringParameters']
        else:
            ic("Event does not pass any query string parameters")
            return badRequest('No param.')
        if not query:
            ic("No query parameter has been passed")
            return badRequest('No query parameter passed')
        #Check if the query string parameter was 'code'
        if 'code' in query:
            ic("Query had the correct parameter ('code')")
            #Convert user query to all uppercase, since the UnitCode field
            #is converted to upper when being added to the table
            queryToUpper = query['code'].upper()
            #Query the table looking for a match between UnitCode and what
            #was passed a parameter to the query
            response = table.query(
                KeyConditionExpression=Key('UnitCode').eq(queryToUpper)
                )
            ic("Querying table with unit code passed in query string parameters")
            queryResponse = response['Items']
            ic("Retrieving ['Items'] from response")
            #Check if we got any results from the query
            if not queryResponse:
                ic("Request returning nothing. The code was invalid")
                return badRequest('No search results for this unit code. Try again with a valid code.')
            #Return payload assuminb it has made it past all checks 
            ic("Returning response, all checks passed")
            return okResponse(response['Items'])
        #Anything but 'code' as a query string parameter is invalid
        else:
            ic("Parameter passed was not valid")
            return badRequest('Invalid parameter passed.')
#Needed to convert Decimal and sets into ints and lists respectively
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
