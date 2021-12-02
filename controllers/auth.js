const { passwordMatch } = require('./../helpers/bcrypt');
const { generateJWT } = require('./../helpers/jwt');
const User = require('./../models/user');

const validateUser = (req, res) => {
    const user = req.authUser;
    const data = {uid: user._id, uName: user.name};
    //Renueva el token
    const cvToken = generateJWT(data);
    res.status(200).json({results: {cvToken, user}});
}

const signIn = async(req, res) => {
    
    const { email, password } = req.body;

    try {
        //Validación de la existencia del correo activo en la DB
        const user =  await User.findOne({email});
        if( !user || !user.active ){
            return res.status(401).json({ results:{ err:'Correo o contraseña invalidos'} });
        }
    
        //Validación de la contraseña
        if(! await passwordMatch(password, user.password)){
            return res.status(401).json({ results:{ err:'Correo o contraseña invalidos'} });
        }
    
        //Generación del JWT
        const cvToken = generateJWT({uid: user._id, uName: user.name});

        const safeUser = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        res.status(200).json({results: {cvToken, user:safeUser} });
        
    } catch (error) {
        res.status(500).json({ results: {err: {error} } });
    }
}

module.exports = {
    signIn,
    validateUser
};
