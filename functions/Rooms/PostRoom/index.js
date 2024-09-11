const { db, createId } = require('../../../services/index');
const { response } = require('../../../responses/index');

exports.handler = async (event) => {
	const room = JSON.parse(event.body);
	if(room){
		try {
			let numAlreadyExists = false;
			
			const { Items } = await db.scan({ //Ska göra detta till en funktion sen
				TableName: 'bonz-ai-db',
				FilterExpression: 'attribute_exists(#sk)',
				ExpressionAttributeNames: {
				  '#sk': 'sk'
				}
			});

			Items.forEach(item => {
				if(item.object.roomNumber == room.roomNumber){
					numAlreadyExists = true;
				}
			});
			
			if(numAlreadyExists){ //Check om numret redan existerar i databasen.
				return response(400, `Room with number: ${room.roomNumber} already exists`);
			}
			await db.put({
				TableName: "bonz-ai-db",
				Item: {
					pk: createId(),
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
			return response(400, `Error: ${error}`);
		}
	}
	
	return response(400,'Wrong data in body.');

};
