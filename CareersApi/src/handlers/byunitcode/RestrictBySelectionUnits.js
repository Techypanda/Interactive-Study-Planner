// Get the Careers DynamoDB table name from environment variables
const tableName = process.env.DEV_CAREER_TABLE;

const AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-southeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.restrictWithUnitCode = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`getAllItems only accept POST method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);
    let userUnitCode = JSON.parse(event['body'])['Requirements'];
    let params = {
        TableName : tableName,
    };
    scanResults = [];
    
    let items = await docClient.scan(params).promise();
    do {
        items.Items.forEach(function(item) {
            getOutOfLoop:
            for(let key in item) { 
                if(key === 'Requirements') {
                    let dbUnitCodes = item[key].values;
                    for(let dbUnitCode of dbUnitCodes){ 
                        if(dbUnitCode.toLowerCase() === userUnitCode.toLowerCase()) {
                            scanResults.push(item);
                            break getOutOfLoop; //No longer need to keep checking if other unit codes are involved with this career choice
                        }
                    }
                    
                }
            }
        });
        params.ExclusiveStartKey = items.LastEvaluatedKey;
        items = await docClient.scan(params).promise();
    }while(items.LastEvaluatedKey);

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", // Allow from anywhere 
            "Access-Control-Allow-Methods": "POST" 
        },
        body: JSON.stringify(scanResults)
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
