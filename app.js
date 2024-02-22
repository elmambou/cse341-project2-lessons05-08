const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};


const port = process.env.PORT;
const app = express();


app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  console.log(JSON.stringify(req.oidc.user))
  res.send(JSON.stringify(req.oidc.user));
});


app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  next();
});

const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');
app.use('/', require('./routes'));
app.use('/author', authorRoutes);
app.use('/book', bookRoutes);


process.on('uncaughtException', (err, origin) => {
  console.error(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb()
  .then(() => {
    app.locals.db = mongodb.getDb();

    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error starting the app:', err);
  });
