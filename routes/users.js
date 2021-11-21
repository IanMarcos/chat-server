const { Router } = require('express');
const { body, param } = require('express-validator');

const { userExist, validateResults } = require('./../middlewares/');
const { getUserById, createUser } = require('./../controllers/users');

const router = Router()

router.get('/:uid', [
    param('uid', 'El id del usuario es necesario').isMongoId(),
    param('uid').custom(userExist),
    validateResults
], getUserById)

router.post('/', [
    body('email', 'El email es obligatorio').notEmpty(),
    body('email', 'No es un email válido').isEmail(),
    body('password', 'La contraseña es obligatoria').notEmpty(),
    validateResults
], createUser);

module.exports = router;
