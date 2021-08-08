// Get the Careers DynamoDB table name from environment variables
//import { GetItemCommand } from "@aws-sdk/client-dynamodb";
const tableName = process.env.DEV_CAREER_TABLE;

const AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-southeast-2"
});


const docClient = new AWS.DynamoDB.DocumentClient();

exports.getCareer = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getCareer only accept GET method, you tried: ${event.httpMethod}`);
    }
    //TODO: Make this tolower when data has been changed to towerlower
    let body = JSON.parse(event["body"])
    var params = {
        TableName: tableName,
        Key: {
          'CareerId' : body['CareerId']
        },
    };
    const item = await docClient.get(params).promise()

    return {
         statusCode: 200,
         body: JSON.stringify(item)
    }
}
