const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');
const validation = require('../middleware/validate');
const {requiresAuth} = require('express-openid-connect');
const {isAuthenticated} = require('../middleware/authenticate');



router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

router.post('/', requiresAuth(), isAuthenticated, validation.saveBook, bookController.createBook);

router.put('/:id', requiresAuth(), isAuthenticated, validation.saveBook, bookController.updateBook);

router.delete('/:id', requiresAuth(), isAuthenticated, bookController.deleteBook);

module.exports = router;
