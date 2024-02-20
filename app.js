const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');
const { auth } = require('express-openid-connect');
//const {isAuthenticated} = require('express-openid-connect');




const port = process.env.PORT || 8080;
const app = express();


// Define your configuration for Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:8080',
  clientID: 'wr4Qbq8W1Vfi0ZTogrgXiAstMj2c35aD',
  issuerBaseURL: 'https://dev-lbodsr1ycluh2vxj.us.auth0.com'
};


// Import your routes
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');



// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json())
   .use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
 next();
   })


   // CHANGES FROM FEB 19  6 LINES
   //process.on('uncaughtException', (err, origin) => {
    //console.log(
    //  process.stderr.fd,
     // `Caught exception: ${err}\n` + `Exception origin: ${origin}`
   // );
  //});




// Routes
mongodb.initDb()
    .then(() => {
        app.locals.db = mongodb.getDb();

        app.use('/', require('./routes'));
        app.use('/author', authorRoutes);
        app.use('/book', bookRoutes);

       // Use auth middleware
        app.use(auth(config));

        // req.isAuthenticated is provided from the auth router
        app.get('/', (req, res) => {
            res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

   
app.listen(port, () => {
    console.log(`Connected to DB and listening on ${port}`);
    console.log(`http://localhost:${port}/author`);
    console.log(`http://localhost:${port}/book`);
    console.log(`http://localhost:${port}/api-docs`);
        });
    })
    .catch((err) => {
        console.error('Error starting the app:', err);
    });
