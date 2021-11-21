const { Router } = require('express');
const { body, param } = require('express-validator');

const { userExist, validateResults } = require('./../middlewares/');
const { getUserById, createUser, updateUser, deleteUser } = require('../controllers/user');

const router = Router()

router.get('/:uid', [
    param('uid', 'No es un id de Mongo').isMongoId(),
    param('uid').custom(userExist),
    validateResults
], getUserById);

router.post('/', [
    body('email', 'El email es obligatorio').notEmpty(),
    body('email', 'No es un email válido').isEmail(),
    body('password', 'La contraseña es obligatoria').notEmpty(),
    validateResults
], createUser);

router.put('/:uid', [
    param('uid', 'No es un id de Mongo').isMongoId(),
    param('uid').custom(userExist),
    validateResults
], updateUser);

router.delete('/:uid', [
    param('uid', 'No es un id de Mongo').isMongoId(),
    param('uid').custom(userExist),
    validateResults
], deleteUser);

module.exports = router;
