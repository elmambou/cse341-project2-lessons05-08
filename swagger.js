const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Bookstore API'
  },
  host: 'https://cse341-project2-lessons05-08.onrender.com',
  schemes: ['https'],
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
    Author: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        birthDate: { type: 'string' },
        nationality: { type: 'string' },
        biography: { type: 'string' },
        website: { type: 'string' },
        booksWritten: { type: 'string' },
        awards: { type: 'string' }
      },
      required: ['name', 'nationality', 'biography', 'website', 'booksWritten', 'awards']
    },
    Book: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        genre: { type: 'string' },
        publicationYear: { type: 'string' },
        isbn: { type: 'string' },
        copiesAvailable: { type: 'string' },
        description: { type: 'string' }
      },
      required: ['title', 'author', 'genre', 'publicationYear', 'isbn', 'copiesAvailable', 'description']
    }
  },
  paths: {
    '/author/{id}': {
      put: {
        tags: ['author'],
        summary: 'Update an author',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the author to update',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'body',
            description: 'Updated author object',
            required: true,
            schema: {
              $ref: '#/definitions/Author'
            }
          }
        ],
        responses: {
          204: {
            description: 'Author updated successfully'
          },
          400: {
            description: 'Bad Request'
          },
          412: {
            description: 'Precondition Failed'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      },
      delete: {
        tags: ['author'],
        summary: 'Delete an author',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the author to delete',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Author deleted successfully'
          },
          400: {
            description: 'Bad Request'
          },
          412: {
            description: 'Precondition Failed'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/book/{id}': {
      put: {
        tags: ['book'],
        summary: 'Update a book',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the book to update',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'body',
            description: 'Updated book object',
            required: true,
            schema: {
              $ref: '#/definitions/Book'
            }
          }
        ],
        responses: {
          204: {
            description: 'Book updated successfully'
          },
          400: {
            description: 'Bad Request'
          },
          412: {
            description: 'Precondition Failed'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      },
      delete: {
        tags: ['book'],
        summary: 'Delete a book',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the book to delete',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Book deleted successfully'
          },
          400: {
            description: 'Bad Request'
          },
          412: {
            description: 'Precondition Failed'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    }
  }
};


const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
