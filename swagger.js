const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Bookstore API'
  },
  host: 'https://cse341-project2-lessons05-08.onrender.com', 
  schemes: ['http'],      // Add a comma here
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
