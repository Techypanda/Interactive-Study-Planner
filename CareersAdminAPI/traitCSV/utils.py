import boto3
import json

client = boto3.client('lambda')

def parseCSV():

    inputParams = {

    }

    response = client.invoke(
        FunctionName = "",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )

    responseData = json.load(response["Payload"])