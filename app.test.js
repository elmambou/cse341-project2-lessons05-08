require('dotenv').config(); // Load environment variables from .env file
const { MongoClient } = require('mongodb');
const express = require('express');
const { authorRoutes } = require('./routes/author'); // Import the author routes
const { bookRoutes } = require('./routes/book'); // Import the book routes

describe('BOOKSTORE Collections Tests', () => {
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
        app.use('/book', bookRoutes); // Mount book routes
    });

    afterAll(async () => {
        await connection.close();
    });

    // ---------------------TEST FOR AUTHOR-------------------------- 

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

    // ---------------------TEST FOR BOOK-------------------------- 

    describe('insert', () => {
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
    });
});
