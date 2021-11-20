const { Router } = require('express');

const router = Router()

router.get('/', (req, res) => {
    res.json({resp:'hi'})
})

module.exports = router;
