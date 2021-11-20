const { Router } = require('express');
const User = require('./../models/user');

const router = Router()

router.get('/', (req, res) => {
    res.json({resp:'hi'})
})

module.exports = router;
