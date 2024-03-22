require('dotenv').config(); // Load environment variables from .env file
const { MongoClient } = require('mongodb');
const express = require('express');
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');


let connection;
let db;

describe('BOOKSTORE Collections Tests', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);

    const app = express();
    app.use(express.json());
    app.use('/author', authorRoutes); // Mount author routes
    app.use('/book', bookRoutes); // Mount book routes
    global.app = app; // Make app accessible in tests
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('Author Tests', () => {
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

    // Add more author tests as needed
  });

  describe('Book Tests', () => {
    it('should insert a document into the book collection', async () => {
      const books = db.collection('book');

      const mockBook = {
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        publicationYear: "1949",
        isbn: "9780451524935",
        copiesAvailable: "3",
        description: "A dystopian novel depicting a totalitarian regime."
      };

      await books.insertOne(mockBook);
    });

    // Add more book tests as needed
  });
});
