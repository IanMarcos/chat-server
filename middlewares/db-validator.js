const User = require('./../models/user');

const userExist = async(uid) => {
    const user =  await User.findById(uid);
    if( !user || !user.active ){
        throw new Error(`No existe un usuario activo con el id: ${uid}`);
    }
}

module.exports = {
    userExist
};
