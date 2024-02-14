const express = require('express');
const router = express.Router();

const authorController = require('../controllers/author');
const validation = require('../middleware/validate');

router.get('/', authorController.getAll);

router.get('/:id', authorController.getSingle);

router.post('/', validation.saveAuthor, authorController.createAuthor);

router.put('/:id', validation.saveAuthor, authorController.updateAuthor);

router.delete('/:id', validation.saveAuthor, authorController.deleteAuthor);

module.exports = router;
