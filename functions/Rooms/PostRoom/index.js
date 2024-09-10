const { db } = require('../../../services/index');
const { response } = require('../../../responses/index');
const { v4: uuid } = require('uuid');
const dummyData = [
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Enkelrum",
			price: 500,
			bedsInRoom: 1,
			isAvaliable: true,
			roomNumber: "101"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Enkelrum",
			price: 500,
			bedsInRoom: 1,
			isAvaliable: true,
			roomNumber: "102"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Enkelrum",
			price: 500,
			bedsInRoom: 1,
			isAvaliable: true,
			roomNumber: "201"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Enkelrum",
			price: 500,
			bedsInRoom: 1,
			isAvaliable: true,
			roomNumber: "202"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Enkelrum",
			price: 500,
			bedsInRoom: 1,
			isAvaliable: true,
			roomNumber: "301"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Enkelrum",
			price: 500,
			bedsInRoom: 1,
			isAvaliable: true,
			roomNumber: "302"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Enkelrum",
			price: 500,
			bedsInRoom: 1,
			isAvaliable: true,
			roomNumber: "401"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Enkelrum",
			price: 500,
			bedsInRoom: 1,
			isAvaliable: true,
			roomNumber: "402"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Dubbelrum",
			price: 1000,
			bedsInRoom: 2,
			isAvaliable: true,
			roomNumber: "103"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Dubbelrum",
			price: 1000,
			bedsInRoom: 2,
			isAvaliable: true,
			roomNumber: "104"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Dubbelrum",
			price: 1000,
			bedsInRoom: 2,
			isAvaliable: true,
			roomNumber: "203"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Dubbelrum",
			price: 1000,
			bedsInRoom: 2,
			isAvaliable: true,
			roomNumber: "204"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Dubbelrum",
			price: 1000,
			bedsInRoom: 2,
			isAvaliable: true,
			roomNumber: "303"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Dubbelrum",
			price: 1000,
			bedsInRoom: 2,
			isAvaliable: true,
			roomNumber: "304"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Dubbelrum",
			price: 1000,
			bedsInRoom: 2,
			isAvaliable: true,
			roomNumber: "403"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Dubbelrum",
			price: 1000,
			bedsInRoom: 2,
			isAvaliable: true,
			roomNumber: "404"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Svit",
			price: 1500,
			bedsInRoom: 3,
			isAvaliable: true,
			roomNumber: "305"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Svit",
			price: 1500,
			bedsInRoom: 3,
			isAvaliable: true,
			roomNumber: "306"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Svit",
			price: 1500,
			bedsInRoom: 3,
			isAvaliable: true,
			roomNumber: "405"
		}

	},
	{
		pk: uuid().substring(0, 6),
		sk: "room",
		object: {
			roomType: "Svit",
			price: 1500,
			bedsInRoom: 3,
			isAvaliable: true,
			roomNumber: "406"
		}
	}
]
exports.handler = async (event) => {
	const {room} = JSON.parse(event.body);
	if(room){
		try {
			await db.put({
				TableName: "bonz-ai-db",
				Item: {
					pk: uuid().substring(0, 6),
					sk: "room",
					object: {
						roomType : 		room.roomType,
						price : 		room.price,
						bedsInRoom  : 	room.bedsInRoom,
						isAvaliable : true,
						roomNumber  : 	room.roomNumber
					}
				}
			});
			
	
			return response(200, room);
		} catch (error) {
			return response(400, `Något fel: ${error}`);
		}
	}
	else{

		const {Items} = await db.scan({
			TableName: 'bonz-ai-db',
			FilterExpression: 'attribute_exists(#sk)',
			ExpressionAttributeNames:{
				'#sk':'room'
				}
		});
		if(Items){
			return response(200, Items);
		}
		
		dummyData.forEach(async (eachRoom) => {
			await db.put({
				TableName: "bonz-ai-db",
				Item: {
					pk: uuid().substring(0, 6),
					sk: "room",
					object: {
						roomType : eachRoom.object.roomType,
						price : eachRoom.object.price,
						bedsInRoom  : eachRoom.object.bedsInRoom,
						isAvaliable : true,
						roomNumber  : eachRoom.object.roomNumber
					}
				}
			});
		});
		return response(200,"Success.");
	}

};
