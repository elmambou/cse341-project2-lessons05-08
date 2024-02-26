const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  //secret: 'a long, randomly-generated string stored in env',
  secret: 'ABKHj_7drfzdxemJ6cEXROLkSY2Y_y7qv6voZOwlBOTEtmwLuoo8MBB8Yagi6QNl',
  baseURL: 'http://localhost:8080',
  clientID: 'wr4Qbq8W1Vfi0ZTogrgXiAstMj2c35aD',
  issuerBaseURL: 'dev-lbodsr1ycluh2vxj.us.auth0.com'
};

router.use(auth(config));

router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;
