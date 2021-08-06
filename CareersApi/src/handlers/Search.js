// Get the Careers DynamoDB table name from environment variables
const tableName = process.env.DEV_CAREER_TABLE;

const AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-southeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.search = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`Search only accept GET method, you tried: ${event.httpMethod}`);
    }
    
    // All log statements are written to CloudWatch
    console.info('received:', event);
    let valueToSearchFor = JSON.parse(event['body'])['ToSearch'].toLowerCase();

    let params = {
        TableName : tableName,
    };

    const scanResults = [];
    let items = await docClient.scan(params).promise();
    do {
        items.Items.forEach(function(item) {
            for(let key in item) { 
                //Example: if its a string, we can get the value as is
                if(typeof item[key] !== 'object') {  
                    if(item[key].toLowerCase().includes(valueToSearchFor)){
                        scanResults.push(item);
                    }
                }
                else {
                    //Other data type used in careersdb is string set, therefore need to loop it this way
                    for(let listData of item[key].values){
                        console.log("other:"+listData);
                        if(listData.toLowerCase().includes(valueToSearchFor)){
                            scanResults.push(item);
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
        body: scanResults
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
