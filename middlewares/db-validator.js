const User = require('./../models/user');

//NO ES USADO
const userExistByEmail = async(email) => {
    try {
        const user =  await User.findOne({email});
        if( !user || !user.active ){
            throw new Error('No existe un usuario activo con este correo');
        }
    } catch (error) {
        throw new Error('Error 500 -falló la conexión a la DB');
    }
}

const userExistById = async(uid) => {
    try {
        const user =  await User.findById(uid);
        if( !user || !user.active ){
            throw new Error(`No existe un usuario activo con el id: ${uid}`);
        }
    } catch (error) {
        throw new Error('Error 500 -falló la conexión a la DB');
    }
}

module.exports = {
    userExistByEmail,
    userExistById
};
