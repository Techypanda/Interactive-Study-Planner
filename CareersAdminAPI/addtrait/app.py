import json
import os
import requests
import jose

def lambda_handler(event, context):
    
    bool valid

    if (os.environ["DisableAuthentication"] == "true"):
        print("Running with no authentication.")
        valid = true
    else:
        token = event.get("Authorization")
        valid = ValidateToken(token)

    if (valid):
        return {
            "statusCode": 200,
            
            "body": json.dumps(
            {
                "message": "hello world",
            }),
        }
    else:
        return {
            "statusCode": 401,
            "headers": json.dumps(
            {
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin":  "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            }),
            "body": json.dumps(
            {
                "message": "Failed authorization: " + err,
            }),
        }
# 
# Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
def ValidateToken(token):
    keys_url = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gn4KIEkx0/.well-known/jwks.json"

    response = requests.get(keys_url)
    keys = json.loads(response.decode('utf-8'))['keys']

    headers = jwt.get_unverified_headers(token)
    kid = headers['kid']

    return valid, error
