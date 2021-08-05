// Get the Careers DynamoDB table name from environment variables
const tableName = process.env.DEV_CAREER_TABLE;

const AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-southeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.restrictWithUnitCode = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    let params = {
        TableName : tableName,
        KeyConditionExpression: "CareerId = :careerValue",
        ExpressionAttributeValues: {
            ":careerValue":{"S":"TestDontDelete"}
        }
    };
    console.log("TESTINGITESTING");

    let scanResults = [];
    docClient.query(params, function(err, data) {
        console.log("I AM HERE");
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log("Data:", item + ": " + item);
                scanResults.append(data);
            });
            console.log("LOL YES:",data);
        }
    });

    const response = {
        statusCode: 200,
        body: scanResults
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
