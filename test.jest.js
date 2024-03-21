const { MongoClient } = require('mongodb');
const request = require('supertest');
const express = require('express');
const authorRoutes = require('../Routes/author'); // Import the author routes

describe('Author Collection Tests', () => {
    let connection;
    let db;
    let app;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(global.__MONGO_DB_NAME__);

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

            await authors.insertOne(mockAuthor); // Corrected: Used 'authors' instead of 'author'

            const insertedAuthor = await authors.findOne({ name: 'Test Author' });
            expect(insertedAuthor).toEqual(mockAuthor);
        });
    });

    describe('CRUD Operations', () => {
        it('should insert a new author', async () => {
            const res = await request(app)
                .post('/author')
                .send({
                    name: 'F. Scott Fitzgerald',
                    birthDate: '1896-09-24',
                    nationality: 'American',
                    biography: 'F. Scott Fitzgerald was an American novelist...',
                    website: 'https://www.fscottfitzgeraldsociety.org/',
                    booksWritten: 'Most Popular Books, The Great Gatsby, Tender is the Night, The Beautiful and Damned, This Side of Paradise, The Short Stories of F. Scott Fitzgerald.',
                    awards: 'None'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('acknowledged');
        });

        it('should retrieve all authors', async () => {
            const res = await request(app).get('/author');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });

        // Add tests for other CRUD operations like getSingle, updateAuthor, deleteAuthor as needed
    });
});
