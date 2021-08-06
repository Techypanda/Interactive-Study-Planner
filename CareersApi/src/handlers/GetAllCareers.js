// Get the Careers DynamoDB table name from environment variables
const tableName = process.env.DEV_CAREER_TABLE;

const AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-southeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.getAllCareers = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllCarrers only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    let value = 'CareerId';
    let params = {
        TableName : tableName,
        Key: {'CareerId':value}
    };

    const scanResults = [];
    do{
        const items =  await docClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(items.LastEvaluatedKey);

    const response = {
        statusCode: 200,
        body: scanResults
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
