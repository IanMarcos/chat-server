const jwt = require('jsonwebtoken');

const jwtKey = process.env.SECRETJWTKEY;

const generateJWT = (payload) => {
    //Forma sincrónica
    const rules = { expiresIn: '15m'}
    return jwt.sign(payload, jwtKey, rules);
}

const verifyJWT = (token) => {
    return jwt.verify(token, jwtKey); 
}

module.exports = {
    generateJWT,
    verifyJWT
};
