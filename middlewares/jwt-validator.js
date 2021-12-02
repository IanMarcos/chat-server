const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res, next) => {

    const { cvtoken: cvToken } = req.headers;
    
    if(!cvToken){
        return res.status(400).json({ results: {err:'No hay token en la petición'}});
    }
    
    try {
        //Verificación de que sea un token válido
        const { uid } = jwt.verify(cvToken, process.env.SECRETJWTKEY);
        const user = await User.findById(uid).select('-password -__v -active');

        //Verificación de que se trate de un usuario valido y activo
        if(!user){
            return res.status(401).json({ results: {err:'No se encuentra este usuario'}});
        }

        //Se guarda al usuario verificado en la request
        req.authUser = user;

        next();
        
    } catch (error) {
        res.status(400).json({results: {err: error} });
    }
    
}

module.exports = {
    validateJWT
};
