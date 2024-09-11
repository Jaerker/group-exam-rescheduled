const {DynamoDB} = require('@aws-sdk/client-dynamodb');
const {DynamoDBDocument} = require('@aws-sdk/lib-dynamodb');
const {v4: uuid} = require('uuid');
const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

const createId = () => uuid().substring(0, 6);

module.exports = { db, createId };
