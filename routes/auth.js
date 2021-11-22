const { Router } = require('express');
const { body } = require('express-validator');
const { logIn } = require('./../controllers/auth');
const { validateResults } = require('./../middlewares');

const router = Router();

router.post('/', [
    body('email', 'El correo es obligatorio').notEmpty(),
    body('email', 'No es un correo valido').isEmail(),
    body('password', 'La contraseña es obligatoria').notEmpty(),
    validateResults
], logIn);

module.exports = router;
