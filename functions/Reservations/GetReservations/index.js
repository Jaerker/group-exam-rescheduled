const {agent} = require('../../../services/index');
const {response} = require('../../../responses/index');

exports.handler = async (event) => {
  const reservations = await agent.reservations.getAll(); 
  return response(200, reservations);
};
