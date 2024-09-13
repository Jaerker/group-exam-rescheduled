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

    const checkInDate = new Date(reservation.data.checkIn);
    const currentDate = new Date();
    const daysUntilCheckIn = (checkInDate - currentDate) / (1000 * 60 * 60 * 24);

    if (daysUntilCheckIn < 2) {
      return response(400, {
        message: 'Booking can only be canceled at least two days before the check-in date.',
      });
    }

    const associatedRooms = reservation.data.roomType || [];
    let updatedRooms = [];

    for (const type of associatedRooms) {
      const rooms = await agent.rooms.getAll();

      for (const room of rooms) {
        if (room.data.roomType === type && !room.data.isAvailable) {
          await agent.rooms.update(room.sk, {
            ...room.data,
            isAvailable: true,
          });
          updatedRooms.push(room.sk);
        }
      }
    }

    await agent.reservations.delete(id);

    return response(200, {
      message: `Reservation ID ${id} deleted successfully.`,
      updatedRooms,
    });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return response(500, {
      error: 'Failed to delete reservation',
      details: error.message,
    });
  }
};