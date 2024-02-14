const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDb(); // Get the database object once
        const result = await db.collection('book').find().toArray();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Some error occurred while retrieving all books.' });
    }
};


const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to find a book.');
      }
    try {
        const db = mongodb.getDb(); // Get the database object once
        const userId = new ObjectId(req.params.id);
        const result = await db.collection('book').findOne({ _id: userId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Some error occurred while retrieving a single book.' });
    }
};

const createBook = async (req, res) => {
    try {
        const db = mongodb.getDb(); // Get the database object once
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            isbn: req.body.isbn,
            copiesAvailable: req.body.copiesAvailable,
            description: req.body.description
        };
        const response = await db.collection('book').insertOne(book);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the book.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to update a book.');
      }
    try {
        const db = mongodb.getDb(); // Get the database object once
        const userId = new ObjectId(req.params.id);
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            isbn: req.body.isbn,
            copiesAvailable: req.body.copiesAvailable,
            description: req.body.description
        };
        const response = await db.collection('book').replaceOne({ _id: userId }, book);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            throw new Error('Some error occurred while updating the book.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to delete a book.');
      }
    try {
        const db = mongodb.getDb(); // Get the database object once
        const userId = new ObjectId(req.params.id);
        const response = await db.collection('book').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            throw new Error('Some error occurred while deleting the book.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Some error occurred while deleting the book.'});
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
};
