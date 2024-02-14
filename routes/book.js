const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');
const validation = require('../middleware/validate');

router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

router.post('/', validation.saveBook, bookController.createBook);

router.put('/:id', validation.saveBook, bookController.updateBook);

router.delete('/:id', validation.saveBook, bookController.deleteBook);

module.exports = router;
