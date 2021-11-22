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

    const data = req.body;
    const { authUser } = req;

    //Verificación de que sea el mismo usuario en el id del url y el del token
    if(uid !== authUser._id.toString()){
        return res.status(401).json({ results:{err: 'Solo el usuario puder cambiar sus datos'} });
    }

    if(data.email){
        
        //Verificación de que el usuario no actualice su correo al mismo
        if(data.email === authUser.email){
            return res.status(401).json({ results:{err: 'No se puede actualizar con el mismo correo'} });
        }

        //Verificación de que el correo no esté ya en la DB
        const usedEmail = await User.findOne({email: data.email});
        if(usedEmail){
            return res.status(400).json({ results:{err: 'Email ya en uso'} });
        }
    }

    //Hashing de la nueva contraseña
    if(data.password) data.password = await hashPassword( data.password );
    
    const updatedUser = await User.findByIdAndUpdate(uid, data, {new:true}).select('-password -active -__v');
    res.status(200).json({ results: {updatedUser} });
}

const deleteUser = async(req, res) => {
    const { uid } = req.params;
    const { authUser } = req;

    //Verificación de que sea el mismo usuario en el id del url y el del token
    console.log(authUser);
    if( uid !== authUser._id.toString()){
        return res.status(401).json({ results:{err: 'Solo el usuario puder eliminar su cuenta'} });
    }
    const deletedUser = await User.findByIdAndUpdate(uid, {active:false}, {new:true}).select('-password -__v');;
    res.status(200).json({ results: {deletedUser} });
}

module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
