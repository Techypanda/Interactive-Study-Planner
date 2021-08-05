// Get the Careers DynamoDB table name from environment variables
const tableName = process.env.DEV_CAREER_TABLE;

const AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-southeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.restrictWithTraitCode = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`Traits only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    let id = { "S" : "CMHL1000" };
    let params = {
        TableName : tableName,
        KeyConditionExpression: "#Id = :traitId",
        ExpressionAttributeNames: {
            '#Id' : 'Requirements'
        },
        ExpressionAttributeValues: {
            ":traitId": id
        }
    };

    let scanResults = [];
    try {
        const data = await docClient.query(params).promise();
        data.Items.forEach( (item) => scanResults.push(data))
    }  catch (err) {
        console.log("ERROR:"+err);
    }

    const response = {
        statusCode: 200,
        body: scanResults
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
