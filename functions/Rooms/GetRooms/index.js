const { agent } = require('../../../services');
const { response } = require('../../../responses/index');
exports.handler = async (event) => {
	let avaliableRoomsOnly = false;

	try{
		avaliableRoomsOnly = event.queryStringParameters.avaliableRoomsOnly === 'true';
	}
	catch{}
	
	const rooms = await agent.rooms.getAll();

	if(avaliableRoomsOnly){
	    return response(200, rooms.filter(room => room.data.isAvaliable === true));
	}

	return response(200, rooms);
};
