const express = require('express');
const router = express.Router();

const authorRoutes = require('./author');

router.use('/', require('./swagger'));
router.use('/author', authorRoutes);
router.use('/book', require('./book'));

module.exports = { authorRoutes };
