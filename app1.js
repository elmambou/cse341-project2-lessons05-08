const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');
const { auth, requiresAuth } = require('express-openid-connect');


//NEW LINES TO APP.JS 3
const Author = require('./author');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//




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

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  next();
});

process.on('uncaughtException', (err, origin) => {
  console.error(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb()
  .then(() => {
    app.locals.db = mongodb.getDb();

    const authorRoutes = require('./routes/author');
    const bookRoutes = require('./routes/book');
    app.use('/', require('./routes'));
    app.use('/author', authorRoutes);
    app.use('/book', bookRoutes);

    app.use(auth(config));

    app.get('/profile', requiresAuth(), (req, res) => {
      res.send(JSON.stringify(req.oidc.user));
    });

    app.get('/', (req, res) => {
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });



    
    // NEW LINES TO APP.JS 10
    app.get('/author', requiresAuth(), (req, res) => {
      console.log(req)
      Author.find()
      .then(author => {
        res.status(200).json(author)
      }).catch(err => {
        res.status(500).json({ message: 'An error occurred', error: err })
      })
    })
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    //






    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error starting the app:', err);
  });
