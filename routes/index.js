// Application endpoints index

const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/author', require('./author'))
router.use('/book', require('./book'))

module.exports = router;
