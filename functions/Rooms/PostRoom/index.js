const { agent } = require('../../../services');
const { response } = require('../../../responses/index');
exports.handler = async (event) => {
	const room = JSON.parse(event.body); 
	if(room){
		try {
			let numAlreadyExists = false; 
			
			rooms = await agent.rooms.getAll();

			rooms.forEach(item => {
				if(item.data.roomNumber == room.roomNumber){
					numAlreadyExists = true;
				}
			});
			
			if(numAlreadyExists){ //Check om numret redan existerar i databasen.
				return response(400, `Room with number, or name: ${room.roomNumber} already exists`);
			}
			room.isAvaliable = true;
			await agent.rooms.create(room);

			return response(200, room);
		} catch (error) {
			return response(400, `Error: ${error.message}`);
		}
	}
	return response(400,'Wrong data in body.');

};
