const {agent} = require('../../../services');
const {response} = require('../../../responses/index');
exports.handler = async (event) => {

  try{
    const {id} = event.pathParameters;
    
    const room = await agent.rooms.getById(id);
    if(!room){
      return response(200, room);
    }
    return response(400,'Something wrong with id');
  }catch(error){
    return response(400, `Error: ${error}`);
  }

  };
