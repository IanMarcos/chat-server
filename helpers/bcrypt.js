const bcrypt = require('bcrypt');

const hashPassword = async(plainPassword) => {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}
    
module.exports = {
    hashPassword
};
