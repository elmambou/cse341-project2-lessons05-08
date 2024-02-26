const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');
const config = require('../config'); // Use require instead of import

router.use(auth(config));

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;
