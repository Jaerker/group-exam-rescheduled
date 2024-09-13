const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { v4: uuid } = require('uuid');

// DB Connection
const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

// Skapa ID
const createId = () => uuid().substring(0, 6);

// Basic databas anrop
const dbCall = {
    getItems: async (pk) => {
        try {
            const { Items } = await db.query({
                TableName: 'bonz-ai-db',
                KeyConditionExpression: 'pk = :pk',
                ExpressionAttributeValues: {
                    ':pk': pk,
                },
            });
            return Items || [];
        } catch (error) {
            console.error('Error fetching items:', error);
            throw new Error('Failed to fetch items');
        }
    },

    getItem: async (pk, sk) => {
        try {
            const { Item } = await db.get({
                TableName: 'bonz-ai-db',
                Key: {
                    pk,
                    sk,
                },
            });
            return Item || null;
        } catch (error) {
            console.error('Error fetching item:', error);
            throw new Error('Failed to fetch item');
        }
    },

    createItem: async (pk, data) => {
        try {
            await db.put({
                TableName: 'bonz-ai-db',
                Item: {
                    pk,
                    sk: createId(),
                    data,
                },
            });
        } catch (error) {
            console.error('Error creating item:', error);
            throw new Error('Failed to create item');
        }
    },

    updateItem: async (pk, id, data) => {
        try {
            await db.put({
                TableName: 'bonz-ai-db',
                Item: {
                    pk,
                    sk: id,
                    data,
                },
            });
        } catch (error) {
            console.error('Error updating item:', error);
            throw new Error('Failed to update item');
        }
    },

    deleteItem: async (pk, id) => {
        try {
            await db.delete({
                TableName: 'bonz-ai-db',
                Key: {
                    pk,
                    sk: id,
                },
            });
        } catch (error) {
            console.error('Error deleting item:', error);
            throw new Error('Failed to delete item');
        }
    },
};

const reservations = {
    getById: (id) => dbCall.getItem('reservation', id),
    getAll: () => dbCall.getItems('reservation'),
    create: (data) => dbCall.createItem('reservation', data),
    update: (id, data) => dbCall.updateItem('reservation', id, data),
    delete: (id) => dbCall.deleteItem('reservation', id),
};

const rooms = {
    getById: (id) => dbCall.getItem('room', id),
    getAll: () => dbCall.getItems('room'),
    create: (data) => dbCall.createItem('room', data),
    update: (id, data) => dbCall.updateItem('room', id, data),
    delete: (id) => dbCall.deleteItem('room', id),
};

const agent = {
    rooms,
    reservations,
};

module.exports = { db, agent, createId };