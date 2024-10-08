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
	getItems: async (pk, isAvailable = false) => {
		const { Items } = await db.query({
			TableName: 'bonz-ai-db',
			KeyConditionExpression: 'pk = :pk',
			ExpressionAttributeValues: {
				':pk': pk,
			},
		});
		if (isAvailable){
			return Items.filter((room) => room.data.isAvailable === true);
		}
		return Items;
	},
	getItem: async (pk, sk) => {
		const { Item } = await db.get({
			TableName: 'bonz-ai-db',
			Key: {
				pk: pk,
				sk: sk,
			},
		});
		if (Item) {
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
				data: data,
			},
		});
	},
	updateItem: async (pk, id, data) => {
		await db.put({
			TableName: 'bonz-ai-db',
			Item: {
				pk: pk,
				sk: id,
				data: data,
			},
		});
	},
	deleteItem: async (pk, id) => {
		await db.delete({
			TableName: 'bonz-ai-db',
			Key: {
				pk: pk,
				sk: id,
			},
		});
	}
};

const reservations = {
	getById: async (id) => 			dbCall.getItem('reservation', id),
	getAll:  async () => 			dbCall.getItems('reservation', false),
	create:  async (data) => 		dbCall.createItem('reservation', data),
	update:  async (id, data) => 	dbCall.updateItem('reservation', id, data),
	delete:  async (id) => 			dbCall.deleteItem('reservation', id)
};

const rooms = {
	getById:			async (id) => 			dbCall.getItem('room', id),
	getAll: 			async () => 			dbCall.getItems('room', false),
	getAllAvailable: 	async () => 			dbCall.getItems('room', true),
	create: 			async (data) => 		dbCall.createItem('room', data),
	delete: 			async (id) => 			dbCall.deleteItem('room', id),
	update: 			async (id, data) => 	dbCall.updateItem('room', id, data)
};

const agent = {
	rooms,
	reservations,
};

module.exports = { agent };