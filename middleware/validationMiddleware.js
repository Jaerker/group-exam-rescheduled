const validateRoomData = (room) => {
  if (
    !room ||
    !Object.prototype.hasOwnProperty.call(room, "roomType") ||
    !Object.prototype.hasOwnProperty.call(room, "price") ||
    !Object.prototype.hasOwnProperty.call(room, "bedsInRoom") ||
    !Object.prototype.hasOwnProperty.call(room, "isAvailable") ||
    !Object.prototype.hasOwnProperty.call(room, "roomNumber")
  ) {
    return false;
  }
  return true;
};

module.exports = { validateRoomData };