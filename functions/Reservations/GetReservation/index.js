const {agent} = require('../../../services/index');
const {response} = require('../../../responses/index');
exports.handler = async (event) => {

  const {id} = event.pathParameters;
  if(id){
    const reservation = await agent.reservations.getById(id);
    if(!reservation)
        return response(404,'reservation not found');
    return response(200, reservation); 
  }
};
