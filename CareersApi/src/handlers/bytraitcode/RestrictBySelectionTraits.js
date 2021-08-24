// Get the Careers DynamoDB table name from environment variables
const tableName = process.env.DEV_CAREER_TABLE;

const AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-southeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.restrictWithTraitCode = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`Traits only accept POST method, you tried: ${event.httpMethod}`);
    }
    console.log("Recieved:"+event);
    let userTraitCodes = JSON.parse(event['body'])['Traits'];
    let params = {
        TableName : tableName,
    };
    scanResults = [];
    
    let items = await docClient.scan(params).promise();
    do {
        items.Items.forEach(function(item) {
            getOutOfLoops:
            for(let key in item) { 
                if(key === 'Traits') {
                    let dbTraitCodes = item[key].values;
                    for(let dbTraitCode of dbTraitCodes){ 
                        for(let userTraitCode of userTraitCodes) {
                            if(dbTraitCode.toLowerCase() === userTraitCode.toLowerCase()) {
                                scanResults.push(item);
                                break getOutOfLoops; //No longer need to keep checking if other unit codes are involved with this career choice
                            }
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
            "Access-Control-Allow-Methods": "GET" // Allow only GET request 
        },
        body: JSON.stringify(scanResults)
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
