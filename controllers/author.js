const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



//GET REQUESTS */
// Get a list of all Individuals
const getAll = async (req, res) => {
    // #swagger.tags = ['Author']
    // #swagger.summary = 'Get all authors'
    // #swagger.description = 'This will return all the authors in the database'
    try {
        const db = mongodb.getDb(); // Get the database object once
        const result = await db.collection('author').find().toArray();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Some error occurred while retrieving all authors.' });
    }
};


// Get a single Author by Id
const getSingle = async (req, res) => {
        // #swagger.tags = ['Author']
    // #swagger.summary = 'Get author by Id'
    // #swagger.description = 'This will return an author by Id'
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid author id to find an author.');
    }
    try {
        const db = mongodb.getDb(); // Get the database object once
        const userId = new ObjectId(req.params.id);
        const result = await db.collection('author').findOne({ _id: userId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message ||'Some error occurred while retrieving a single author.'});
    }
};



/* POST REQUESTS */
// Create an Author
const createAuthor = async (req, res) => {
        // #swagger.tags = ['Author']
    // #swagger.summary = 'Create a new Author'
    // #swagger.description = 'Create an Author by providing all required information.'
    try {
        const db = mongodb.getDb(); // Get the database object once
        const author = {
            name: req.body.name,
            birthDate: req.body.birthDate,
            nationality: req.body.nationality,
            biography: req.body.biography,
            website: req.body.website,
            booksWritten: req.body.booksWritten,
            awards: req.body.awards
        };
        const response = await db.collection('author').insertOne(author, { wtimeout: 60000 }); // 30 seconds timeout
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the author.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/* PUT REQUESTS */
// Update a single Author by id
const updateAuthor = async (req, res) => {
    // #swagger.tags = ['Author']
    // #swagger.summary = 'Update an Author by Id'
    // #swagger.description = 'Update an existing author by providing all required information.'

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid author id to update an author.');
      }
    try {
        const db = mongodb.getDb(); // Get the database object once
        const userId = new ObjectId(req.params.id);
        const author = {
            name: req.body.name,
            birthDate: req.body.birthDate,
            nationality: req.body.nationality,
            biography: req.body.biography,
            website: req.body.website,
            booksWritten: req.body.booksWritten,
            awards: req.body.awards
        };
        const response = await db.collection('author').replaceOne({ _id: userId }, author);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            throw new Error('Some error occurred while updating the author.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Some error occurred while updating the author.' });
    }
};

const deleteAuthor = async (req, res) => {
    // #swagger.tags = ['Author']
    // #swagger.summary = 'Delete an Author from the Collection'
    // #swagger.description = 'Update an existing author by providing all required information.'
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid author id to delete a author.');
      }
    try {
      const db = mongodb.getDb(); // Get the database object once
      const userId = new ObjectId(req.params.id);
      const response = await db.collection('author').deleteOne({ _id: userId });
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        throw new Error('Some error occurred while deleting the author.');
      }
    } catch (error) {
        res.status(500).json( error.message || 'Some error occurred while deleting the author.');
    }
};


module.exports = {
    getAll,
    getSingle,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
