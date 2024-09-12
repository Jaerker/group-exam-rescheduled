const { agent } = require('../../../services/index');
const { response } = require('../../../responses/index');

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return response(400, { message: 'Missing reservation ID' });
    }

    const reservation = await agent.reservations.getById(id);
    if (!reservation) {
      return response(404, { message: `Reservation ID ${id} not found` });
    }

    await agent.reservations.delete(id);

    return response(200, { message: `Reservation ID ${id} deleted successfully.` });
  } catch (error) {
    return response(500, { error: 'Failed to delete reservation', details: error.message });
  }
};