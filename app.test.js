require('dotenv').config(); // Load environment variables from .env file
const { MongoClient } = require('mongodb');
//const request = require('supertest');
const express = require('express');
const {authorRoutes} = require('./Routes'); // Import the author routes

describe('Author Collection Tests', () => {
    let connection;
    let db;
    let app;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(process.env.MONGODB_DB_NAME);

        app = express();
        app.use(express.json());
        app.use('/author', authorRoutes); // Mount author routes
    });

    afterAll(async () => {
        await connection.close();
    });

    describe('insert', () => {
        it('should insert a document into the author collection', async () => {
            const authors = db.collection('author');

            const mockAuthor = {
                name: 'Test Author',
                birthDate: '1900-01-01',
                nationality: 'Test Nationality',
                biography: 'Test Biography',
                website: 'http://example.com',
                booksWritten: 'Test Books',
                awards: 'Test Awards'
            };

            await authors.insertOne(mockAuthor);

     
        });
    });

});


// ---------------------TEST FOR BOOK-------------------------- 
describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const Book = db.collection('book');

    const mockBook = {
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        publicationYear: "1949",
        isbn: "9780451524935",
        copiesAvailable: "3",
        description: "A dystopian novel depicting a totalitarian regime."

    };

    await Book.insertOne(mockBook);  
   });
});
// ---------------------TEST FOR AUTHOR-------------------------- 


