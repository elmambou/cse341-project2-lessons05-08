
const dotenv = require('dotenv');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://cse341-project-b2zk.onrender.com',
  clientID: 'c0EB0TJqRNHuoEzqO6eKqEHIWc3UOZuH',
  issuerBaseURL: 'https://dev-js03z6vvwguaxggx.us.auth0.com'
};

const isAuthenticated = (req, res, next) => {
  if (req.user === undefined) { 
    return res.status(401).json({ error: 'User not authenticated' });
  }
  next();
};

module.exports = { config, isAuthenticated };
