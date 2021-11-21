const User = require('./../models/user');
const { hashPassword } = require('./../helpers/bcrypt');

const getUserById = async(req, res) => {

    const {uid} = req.params;

    const user = await User.findById(uid);
    //TODO exclude password

    res.status(200).json({result: {user}});
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

    res.status(201).json({results: {msg:'Creación exitosa', uid: user._id} });

}

module.exports = {
    getUserById,
    createUser
};
