const express = require('express');
const router = express.Router();
const authenticateController = require('../controllers/authenticate');

router.get('/', authenticateController.loginLogout);
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8080',
  clientID: 'wr4Qbq8W1Vfi0ZTogrgXiAstMj2c35aD',
  issuerBaseURL: 'https://dev-lbodsr1ycluh2vxj.us.auth0.com'
};

//const app = express();  CHANGES FROM FEB 19

// auth router attaches /login, /logout, and /callback routes to the baseURL


//CHANGES FROM FEB 19 REPLACE app. by router.
//app.use(auth(config));
router.use(auth(config));


// req.isAuthenticated is provided from the auth router
// CHANGES FROM FEB 19 REPLACE app. by router.
//app.get('/', (req, res) => {
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


module.exports = router;