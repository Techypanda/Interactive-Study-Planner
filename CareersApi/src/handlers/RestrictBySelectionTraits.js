// //TODO Place this in a separate class
// class Career {
//     constructor(id,name,descript,industry,reqs,traits){
//         this.id = id;
//         this.name = name;
//         this.descript = descript;
//         this.industry = industry;
//         this.reqs = reqs;
//         this.traits = traits;
//     }
// }

// Get the Careers DynamoDB table name from environment variables
const tableName = process.env.DEV_CAREER_TABLE;

const AWS = require('aws-sdk');

AWS.config.update({
    region: "ap-southeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.getAllCareers = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    let params = {
        TableName : tableName
    };

    const scanResults = [];
    let items = await docClient.scan(params).promise();
    do {
        items.Items.forEach((item) => scanResults.push(item));
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
