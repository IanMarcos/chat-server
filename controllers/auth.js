const { passwordMatch } = require('./../helpers/bcrypt');
const { generateJWT } = require('./../helpers/jwt');
const User = require('./../models/user');

const logIn = async(req, res) => {
    
    const { email, password } = req.body;

    //Validación de la existencia del correo activo en la DB
    const user =  await User.findOne({email});
    if( !user || !user.active ){
        res.status(401).json({ results:{ err:'Correo o contraseña invalidos'} });
    }

    //Validación de la contraseña
    if(! await passwordMatch(password, user.password)){
        res.status(401).json({ results:{ err:'Correo o contraseña invalidos'} });
    }

    //Generación del JWT
    const cvToken = generateJWT({uid: user._id, uName: user.name});
    res.json({cvToken});
}

module.exports = {
    logIn
};
