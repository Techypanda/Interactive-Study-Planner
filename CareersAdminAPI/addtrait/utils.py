import boto3
import requests
import json
from jose import jwt
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

class Utils:
    def __init__(self):
        self.db = boto3.resource('dynamodb', region_name="ap-southeast-2")
        self.table = db.Table("Traits")

    #Http request data parsing
    def parseData(self, data):
        print("Data parsing")

    #JWT token validation
    # Link: https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.py
    def validateJWTToken(self, token):
        keys_url = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_gn4KIEkx0/.well-known/jwks.json"

        response = requests.get(keys_url)
        keys = json.loads(response.decode('utf-8'))['keys']

        headers = jwt.get_unverified_headers(token)
        kid = headers['kid']

        return valid, error

    #Database interactions
    def checkInDatabase(self, name):
        try:
            response = self.table.get_item(Key={'name': name})
        except ClientError as err:
            raise Exception("Failed to check for item in database.")
        else:
            if response:
                return response['Item']
            else:
                return

    def addToDatabase(self, name):
        check = self.checkInDatabase(name)

        if check:
            raise Exception("Item already exists.")
        else:
            response = db.put_item(name) 

    #Http responses
    def badRequest(self):
        print("badrequest")

    def okResponse(self):
        print("ok")    