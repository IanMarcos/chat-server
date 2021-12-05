const { Router } = require('express');
const { body, param } = require('express-validator');

const { userExistById, validateResults, validateJWT } = require('./../middlewares/');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user');

const router = Router()

router.get('/', getAllUsers)

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
    validateJWT,
    param('uid', 'No es un id de Mongo').isMongoId(),
    param('uid').custom(userExistById),
    validateResults
], updateUser);

router.delete('/:uid', [
    validateJWT,
    param('uid', 'No es un id de Mongo').isMongoId(),
    param('uid').custom(userExistById),
    validateResults
], deleteUser);

module.exports = router;
