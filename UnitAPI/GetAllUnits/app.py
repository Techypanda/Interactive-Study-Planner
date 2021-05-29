from boto3.dynamodb.conditions import Key, Attr
from decimal import *
import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    
    #This is the table we are getting the information from
    table = dynamodb.Table('DevUnits')

    response = table.scan()

    #Only interested in ['Items'] from the scan
    item = response['Items']

    jsonResponse = { 
        'statusCode': 200,
        'body': json.dumps(item, default=handle_types),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }
    return jsonResponse


#Need this to convert decimal and set to int and list respectively
#Otherwise json.dumps will cry
def handle_types(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    if isinstance(obj, set):
        return list(obj)
