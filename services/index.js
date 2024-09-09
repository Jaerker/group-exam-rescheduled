const {DynamoDb} = require('@aws-sdk/client-dynamodb');
const {DynamoDbDocument} = require('@aws-sdk/lib-dynamodb');
const client = new DynamoDb();
const db = DynamoDbDocument.from(client);

module.exports = { db };
