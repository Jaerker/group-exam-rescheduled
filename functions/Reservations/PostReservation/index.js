const { agent } = require("../../../services/index");
const {
  validateRoomData,
} = require("../../../middleware/validationMiddleware");
const { v4: uuid } = require("uuid");

exports.handler = async (event) => {
  try {
    const {
      roomType,
      amountOfRooms,
      guests,
      checkIn,
      checkOut,
      firstName,
      lastName,
      email,
    } = JSON.parse(event.body);

    if (
      !firstName ||
      !lastName ||
      !email ||
      roomType === undefined ||
      !amountOfRooms ||
      !checkIn ||
      !checkOut ||
      guests === undefined
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            "Room type needs to be set to Single, Double, or Suite. Check-in and check-out need to be valid. First name, last name, and email are required.",
        }),
      };
    }

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      !Array.isArray(roomType) ||
      roomType.some((type) => typeof type !== "string") ||
      /\d/.test(firstName) ||
      /\d/.test(lastName) ||
      roomType.some((type) => /\d/.test(type))
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            "First name, last name, and room type should only contain letters.",
        }),
      };
    }

    const checkInTimestamp = Date.parse(checkIn);
    const checkOutTimestamp = Date.parse(checkOut);

    if (isNaN(checkInTimestamp) || isNaN(checkOutTimestamp)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid check-in or check-out date format.",
        }),
      };
    }

    if (checkOutTimestamp <= checkInTimestamp) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Check-out date must be after check-in date.",
        }),
      };
    }

    const bookingId = uuid().substring(0, 6);

    const bookingData = {
      roomType,
      amountOfRooms,
      guests,
      checkIn,
      checkOut,
      firstName,
      lastName,
      email,
      bookingId,
    };

    await agent.reservations.create(bookingData);

    for (const type of roomType) {
      const rooms = await agent.rooms.getAllAvaliable();
      let roomsUpdated = 0;
      /**
       * roomType kommer behöva vara antingen 'Enkelrum', 'Dubbelrum' eller 'Svit'
       * 
       * validateRoomData kommer inte behövas, då data har validerats in i databasen sen innan.
       * 
       * Kolla om rummet möter de kriterier man söker
       * 
       * kom ihåg att antalet rum får inte överstiga antalet gäster
       * 
       * Om rummet går att använda: 
       *  ange rummets ID i en variabel som heter chosenRooms (en array med strängar)
       *  I for loopen, sätt det aktuella rummets 'isAvaliable' till false (den som vars ID läggs i chosenRooms)
       *  gör en await agent.rooms.update(room.sk, room.data)
       * 
       * Om det inte finnns några rum, eller inte tillräckligt med rum eller sängar så kan man returnera direkt
       * 
       */
      for (const room of rooms) {
        if (room.data.roomType === type && validateRoomData(room.data)) {
          await agent.rooms.update(room.sk, {
            ...room.data,
            isAvailable: false,
          });
          roomsUpdated++;
        }

        if (roomsUpdated >= amountOfRooms) break;
      }
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Booking created successfully",
        roomType, // sätt in chosenRooms istället, alltså arrayen med rum ID 
        amountOfRooms,
        guests,
        checkIn,
        checkOut,
        firstName,
        lastName,
        email,
        bookingId, //denna kan tas bort
      }),
    };
  } catch (error) {
    console.error("Error processing booking:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
