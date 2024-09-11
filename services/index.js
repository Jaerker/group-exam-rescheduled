const {DynamoDB} = require('@aws-sdk/client-dynamodb');
const {DynamoDBDocument} = require('@aws-sdk/lib-dynamodb');
const {v4: uuid} = require('uuid');

//DB Connection
const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

//Skapa ID 
const createId = () => uuid().substring(0, 6);

//Basic databas anrop
const dbCall = {
    getItems: async (pk) => {
        const {Items} = await db.query({
            TableName: 'bonz-ai-db',
            KeyConditionExpression: 'pk = :pk',
            ExpressionAttributeValues:{
              ':pk': pk,
            }
          });
        return Items;
    },
    getItem: async (pk, sk) => {
        const {Item} = await db.get({
            TableName: 'bonz-ai-db',
            Key: {
              pk: pk,
              sk: sk
            }
          });
          if(Item){
            return Item;
          }
          return null;
    },
    createItem: async (pk, data) => {
        await db.put({
            TableName: 'bonz-ai-db',
            Item: {
                pk: pk,
                sk: createId(),
                object: data
            }
        });
    },
    updateItem: async (pk, id, data) => {

        if(pk === 'room'){
            await db.put({
                TableName: 'bonz-ai-db',
                Item: {
                    pk: pk,
                    sk: id,
                    object: data
                }
            });    
        }
    },
    deleteItem: async (pk, id) => {
        await db.delete({
            TableName: 'bonz-ai-db',
            Key:{
              'pk':pk,
              'sk': id,
            }
          });
    }
}



const rooms = {
    getById:    (id) => dbCall.getItem('room', id),
    getAll:     () => dbCall.getItems('room'),
    create:     (data) => dbCall.createItem('room', data),
    delete:     (id) => dbCall.deleteItem('room', id),
    update:     (id, data) => dbCall.updateItem('room', id, data),
}

const agent = {
    rooms: rooms
}

module.exports = { db, agent, createId };
