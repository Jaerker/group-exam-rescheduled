const {agent} = require('../../../services/index');
const {response} = require('../../../responses/index');
exports.handler = async (event) => {

  try{
    const {id} = event.pathParameters;
    if(id){
        await agent.rooms.delete(id);
      
      return response(200,'Succesfully deleted');
    }
    return response(404,`No ID found in parameter`);
  }catch(error){
    return response(400, `Error: ${error.message}`);
  }
};