import json
import os

from .utils import Utils

def lambda_handler(event, context):
    utils = Utils()
    
    try:
        utils.addToDatabase()
    except Exception as err:
        #Log error
        pass
    else:
        return {
            "statusCode": 200,
            
            "body": json.dumps(
            {
                "message": "hello world",
            }),
        }