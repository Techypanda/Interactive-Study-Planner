from boto3.dynamodb.conditions import Key, Attr
from decimal import *
import boto3
import json
from icecream import ic

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('DevSpecializations')
    ic("Retrieving Dev Specializations table")
    #Scan entire table since we are retrieving all data
    response = table.scan()
    ic("Scanning table")
    #Only interested in ['Items'] from the scan
    item = response['Items']
    ic("Retrieving ['Items'] from the response")

    jsonResponse = { 
        'statusCode': 200,
        'body': json.dumps(item, default=handleTypes),
        'headers': { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }
    ic("Returning response")
    return jsonResponse

#Need this to convert decimal and set to int and list respectively
def handleTypes(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    if isinstance(obj, set):
        return list(obj)
