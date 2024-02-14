const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contact API'
  },
  host: 'localhost:8080',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'author',
      description: 'Operations related to authors'
    },
    {
      name: 'book',
      description: 'Operations related to books'
    }
  ],
  definitions: {
    Contact: {
      type: 'object',
      properties: {
        name: 'required|string',
        birthDate: { type: 'string' },
        nationality: { type: 'string' },
        biography: { type: 'string' },
        website: { type: 'string' },
        booksWritten: { type: 'string' },
        awards: { type: 'string' }
      },
      required: ['name', 'birthDate', 'nationality', 'biography', 'website', 'booksWritten', 'awards']
    },
    Book: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        genre: { type: 'string' },
        publicationYear: { type: 'string' },
        isbn: { type: 'string' },
        copiesAvailable: { type: 'number' },
        description: { type: 'string' }
      },
      required: ['title', 'author', 'genre', 'publicationYear', 'isbn', 'copiesAvailable', 'description']
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
