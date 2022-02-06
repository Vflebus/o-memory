const express = require('express');

const scoreController = require('./controllers/scoreController');

const router = express.Router();

router.get('/', scoreController.getAll);
router.post('/', scoreController.create);

router.use((req, res) => {
    res.status(404).send('Service does not exists.')
})

module.exports = router;