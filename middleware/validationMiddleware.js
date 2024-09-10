

const validateRoomData = (room) => {
    if( !room ||
        !room.HasOwnProperty('roomType') || 
        !room.HasOwnProperty('price') || 
        !room.HasOwnProperty('bedsInRoom') || 
        !room.HasOwnProperty('isAvaliable') || 
        !room.HasOwnProperty('roomNumber'))
        return false;
    return true;
}

modules.export = {validateRoomData};