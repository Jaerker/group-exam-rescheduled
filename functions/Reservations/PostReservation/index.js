const { agent } = require("../../../services/index");

exports.handler = async (event) => {
  try {
    // Parsear JSONdatan från ett anrop
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

    // Validering som funkar som så att om att fälten nedan inte är med när man skickar in json data så får man error
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
            "Rumstyp måste vara Enkelrum, Dubbelrum eller Svit. Inchecknings- och utcheckningsdatum måste vara giltiga. Förnamn, efternamn och e-postadress är obligatoriska.",
        }),
      };
    }

    // Validering av datatyper
    if (
      typeof firstName !== "string" || // För och efternamn måste vara en sträng
      typeof lastName !== "string" ||
      !Array.isArray(roomType) || //Denna och nedanstående rad gör att rumstypen hamnar i en array som en sträng
      roomType.some((type) => typeof type !== "string") ||
      /\d/.test(firstName) || // Ser till att för och efternamn inte innehåller siffror
      /\d/.test(lastName) ||
      !roomType.every(
        (
          type // Varje rumstyp måste vara en av Enkel dubbel och svit
        ) => ["Enkelrum", "Dubbelrum", "Svit"].includes(type)
      )
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            "Förnamn, efternamn måste vara text, och rumstypen måste vara Enkelrum, Dubbelrum eller Svit.",
        }),
      };
    }

    // Konverterar inchecknings- och utcheckningsdatum till tidsstämplar
    const checkInTimestamp = Date.parse(checkIn);
    const checkOutTimestamp = Date.parse(checkOut);

    // Kontrollerar checkin och out enbart är nummer
    if (isNaN(checkInTimestamp) || isNaN(checkOutTimestamp)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Ogiltigt format på inchecknings- eller utcheckningsdatum.",
        }),
      };
    }

    // Kontrollerar att utcheckning sker efter incheckning
    if (checkOutTimestamp <= checkInTimestamp) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Utcheckningsdatum måste vara efter incheckningsdatum.",
        }),
      };
    }

    const bookingData = {
      roomType,
      amountOfRooms,
      guests,
      checkIn,
      checkOut,
      firstName,
      lastName,
      email,
    };

    // Bokningen skapas genom reservation i services.
    await agent.reservations.create(bookingData);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Bokning skapad framgångsrikt",
        roomType, // Använd rumstypen
        amountOfRooms,
        guests,
        checkIn,
        checkOut,
        firstName,
        lastName,
        email,
      }),
    };
  } catch (error) {
    console.error("Fel vid bearbetning av bokning:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internt serverfel" }),
    };
  }
};
