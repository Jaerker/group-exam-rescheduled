const validateRoomData = (room) => {
  if (
    !room ||
    !room.hasOwnProperty("roomType") ||
    !room.hasOwnProperty("price") ||
    !room.hasOwnProperty("bedsInRoom") ||
    !room.hasOwnProperty("isAvailable") ||
    !room.hasOwnProperty("roomNumber")
  ) {
    return false;
  }
  return true;
};

module.exports = { validateRoomData };
