const User = require('./../models/user');

//NO ES USADO
const userExistByEmail = async(email) => {
    const user =  await User.findOne({email});
    if( !user || !user.active ){
        throw new Error('No existe un usuario activo con este correo');
    }
}

const userExistById = async(uid) => {
    const user =  await User.findById(uid);
    if( !user || !user.active ){
        throw new Error(`No existe un usuario activo con el id: ${uid}`);
    }
}

module.exports = {
    userExistByEmail,
    userExistById
};
