const { Router } = require('express');
const { body, param } = require('express-validator');

const { userExistById, validateResults, verifyJWT } = require('./../middlewares/');
const { getUserById, createUser, updateUser, deleteUser } = require('../controllers/user');

const router = Router()

router.get('/:uid', [
    param('uid', 'No es un id de Mongo').isMongoId(),
    param('uid').custom(userExistById),
    validateResults
], getUserById);

router.post('/', [
    body('email', 'El email es obligatorio').notEmpty(),
    body('email', 'No es un email válido').isEmail(),
    body('password', 'La contraseña es obligatoria').notEmpty(),
    validateResults
], createUser);

router.put('/:uid', [
    verifyJWT,
    param('uid', 'No es un id de Mongo').isMongoId(),
    param('uid').custom(userExistById),
    validateResults
], updateUser);

router.delete('/:uid', [
    verifyJWT,
    param('uid', 'No es un id de Mongo').isMongoId(),
    param('uid').custom(userExistById),
    validateResults
], deleteUser);

module.exports = router;
