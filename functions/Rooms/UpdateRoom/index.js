const { agent } = require('../../../services/index');
const { response } = require('../../../responses/index');

exports.handler = async (event) => {
	const room = JSON.parse(event.body);
    let id = "";
	if(room){
		try {
            id = event.pathParameters.id;
			await agent.rooms.update(id, room);

			return response(200, room);
		} catch (error) {
			return response(400, `Error: ${error}`);
		}
	}
	return response(400,'Wrong data in body');
};
