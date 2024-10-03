const {agent} = require('../../../services/index');
const {response} = require('../../../responses/index');
exports.handler = async (event) => {

  const dummyData = {
    "firstName": "Jerker",
    "lastName": "Jakberger",
    "checkIn": "2024-10-25 15:00",
    "chosenRooms": [
      "1606e0",
      "5b0ba5"
    ],
    "amountOfGuests": 3,
    "checkOut": "2024-10-27 12:00",
    "email": "johan@jakberger.se"
  }

  const updatedReservation = JSON.parse(event.body);
  const {id} = event.pathParameters

  if (updatedReservation) {

    if(Date.parse(data.checkIn) > Date.parse(date.checkOut))
      return response(400, 'checkIn must be before checkOut')


    if (data.amountOfGuests < updatedReservation.amountOfGuests) {
      return agent.updatedReservation.update(data.amountOfGuests);
    }

    if (data.amountOfGuests > data.bedsInRoom)
      return agent.updatedReservation.remove(chosenRooms)
    else if (data.amountOfGuests < data.bedsInRoom)
      return response(200, rooms.filter(room => room.data.isAvaliable === true));

    
    await agent.reservations.getById(data.chosenRooms)
    await agent.reservations.getById(id)
    await agent.reservations.update(id, updatedReservation)
    return response(200, 'Success!')
  }

    return response(400, 'Bad response');
  };
  
