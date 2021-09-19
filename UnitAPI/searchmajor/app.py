from boto3.dynamodb.conditions import Key, Attr
from decimal import *
import boto3
import requests
import json
from icecream import ic


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('DevMajors')
    ic("Retrieving Dev Majors table")
    #Check to see table exists
    try:
        ic("Attempting to load table")
        table.load()
    except Exception:
        ic("Table does not exist")
        return badRequest('Table does not exist.')
    else:
        ic("Table loaded successfully")
        if 'queryStringParameters' in event:
            ic("Event successfully has query string parameters")
            query = event['queryStringParameters']
        else:
            ic("Empty query")
            return badRequest('No param.')
        #Check if empty
        if not query:
            ic("No query parameter was passed")
            return badRequest('No query parameter passed.')
        #Check to see if the query string parameter was 'name'
        if 'name' in query:
            ic("Query has correct parameter ('name')")
            #Set fieldname so we know what Attr to search for later
            #This is done so we only need to write the query once
            fieldName = 'Name'
            #Convert the balue to lower, since the SearchName field
            #is converted to lower when being added to the table
            queryCaseAdjusted = query['name'].lower()
        elif 'code' in query:
            ic("Query has correct parameter ('code')")
            #Set fieldname so we know what Attr to search for later
            #This is done so we only need to write the query once
            fieldName = 'MajorCode'
            #Convert the value to upper, since the MajorCode field 
            #is converted to lower when being added to the table
            queryCaseAdjusted = query['code'].upper()
        #Anything other than 'code' or 'name' is invalid
        else:
            ic("Parameter passed is invalid")
            return badRequest('Non valid query parameter.')
        #Query the table looking for a match between whatever fieldName was
        #set to, and whatever the user searched fort
        response = table.scan(
            FilterExpression=Attr(fieldName).contains(queryCaseAdjusted)
            )
        ic("Querying table with parameter passed")
        queryResults = response['Items']
        #Check if results are empty
        if not queryResults:
            ic("Query returned nothing.")
            return badRequest('No search results.')
        #Return payload assumin it has made it past all checks
        ic("Returning response. Query passed all checks")
        return okResponse(response['Items'])
#Neeedf to convert Decimal and sets into ints and lists respectively
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
