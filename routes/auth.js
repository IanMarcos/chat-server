const { Router } = require('express');
const { body } = require('express-validator');
const { signIn, validatePassword, renovateToken } = require('./../controllers/auth');
const { validateResults, validateJWT } = require('./../middlewares');

const router = Router();

router.post('/signin', [
    body('email', 'El correo es obligatorio').notEmpty(),
    body('email', 'No es un correo valido').isEmail(),
    body('password', 'La contraseña es obligatoria').notEmpty(),
    validateResults
], signIn);

router.post('/', validateJWT, renovateToken);

router.post('/pass', [
    validateJWT,
    body('password', 'la contraseña es obligatoria').notEmpty(),
    validateResults
], validatePassword);

module.exports = router;
