// Application endpoints index

const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/author', require('./author'));
router.use('/book', require('./book'));



//NEW LINES TO ROUTES/INDEX.JS  3
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;
