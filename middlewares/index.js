const { ...fieldValidator } = require('./fields-validator');
const { ...dbValidator } = require('./db-validator');
const { ...jwtValidator } = require('./jwt-validator');

module.exports = {
    ...fieldValidator,
    ...dbValidator,
    ...jwtValidator
};
