const User = require('../models/user');
const { hashPassword } = require('../helpers/bcrypt');

const getUserById = async(req, res) => {
    const {uid} = req.params;

    //Se recupera el usuario excluyendo la contraseña, su estado, y __v
    const user = await User.findById(uid).select('-password -active -__v');

    res.status(200).json({ result: {user} });
}

const createUser = async(req, res) => {

    const { name, email, password } = req.body;
    const user = new User({name, email, password});

    //Definición del nombre en caso de que no haya sido provisto
    if(!name){
        user.name = email.split('@')[0];
    }
    user.password = await hashPassword( password );
    await user.save();

    res.status(201).json({ results: {msg:'Creación exitosa', uid: user._id} });

}

const updateUser = async(req, res) => {
    const { uid } = req.params;

    //Verificación de que haya contenidos en el body
    if(Object.keys(req.body).length ===0){
        return res.status(400).json({ results:{err: 'No hay datos para actualizar'} });
    }

    const user = req.body;
    if(user.email){
        const usedEmail = await User.findOne({email: user.email});

        //TODO verificar que este tratando de actualizar a su mismo email
        if(usedEmail){
            return res.status(400).json({ results:{err: 'Email ya en uso'} });
        }
    }
    if(user.password){
        user.password = await hashPassword( user.password );
    }

    const updatedUser = await User.findByIdAndUpdate(uid, user, {new:true}).select('-password -active -__v');
    res.status(200).json({ results: {updatedUser} });
}

const deleteUser = async(req, res) => {
    const { uid } = req.params;
    const deletedUser = await User.findByIdAndUpdate(uid, {active:false}, {new:true}).select('-password -__v');;
    res.status(200).json({ results: {deletedUser} });
}

module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
