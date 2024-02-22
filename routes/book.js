const express = require('express');
const router = express.Router();
const security = require('../middleware/authorize.js');

const bookController = require('../controllers/book');
const validation = require('../middleware/validate');



router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

router.post('/', security.checkLogin, validation.saveBook, bookController.createBook);

router.put('/:id', security.checkLogin, validation.saveBook, bookController.updateBook);

router.delete('/:id', security.checkLogin, bookController.deleteBook);

module.exports = router;
