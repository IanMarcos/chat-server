const jwt = require('jsonwebtoken');

const generateJWT = (payload) =>{
    //Forma sincrónica
    const rules = { expiresIn: '7d'}
    return jwt.sign(payload, process.env.SECRETJWTKEY, rules);
}

module.exports = {
    generateJWT
};
