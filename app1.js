const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');

const config = require('./config'); // config path 

//graphQL
const { graphqlHTTP } = require('express-graphql'); // Corrected import statement
const { ObjectId } = require('mongodb'); //Import ObjectId
const schema = require('./schema');

const port = process.env.PORT;
const app = express();

// Example usage of ObjectId
app.get('/author/:id', (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);
  // Now you can use objectId to perform operations with MongoDB
  // For example, querying a document by its ID
  // Example: db.collection('author').findOne({ _id: objectId });
  res.send('author ID: ' + id);
});

// Example usage of ObjectId

//app.get('/book/:id', (req, res) => {
  const id = req.params.id;
  const objectId = new ObjectId(id);
  // Now you can use objectId to perform operations with MongoDB
  // For example, querying a document by its ID
  // Example: db.collection('book').findOne({ _id: objectId });
  res.send('book ID: ' + id);
});

//End of ObjectId usage


//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP((req) => ({
  schema,
  graphiql: true,
  context: { db: app.locals.db }, // Pass the MongoDB connection to the context
})));

//End of GraphQL

const { auth, requiresAuth } = require('express-openid-connect');
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');
const authorizeRoutes = require('./routes/authorize');

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


app.use('/', require('./routes'));
app.use('/author', authorRoutes);
app.use('/book', bookRoutes);
app.use('/authorize', authorizeRoutes); // Use the authorization routes here

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
