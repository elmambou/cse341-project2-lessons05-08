
const dotenv = require('dotenv');
dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0.CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};


//const { requiresAuth } = require('express-openid-connect');


//app.get('/profile', requiresAuth(), (req, res) => {
 // res.send(JSON.stringify(req.oidc.user));
//});



const isAuthenticated = (req, res, next) => {
if (req.user === undefined) { 
return res.status(401).json({ error: 'User not authenticated' });
}
next();
};

module.exports = { config, isAuthenticated };
