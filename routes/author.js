const express = require('express');
const router = express.Router();

const authorController = require('../controllers/author');
const validation = require('../middleware/validate');
const {requiresAuth} = require('express-openid-connect');
//const {isAuthenticated} = require('../middleware/authenticate');




router.get('/', authorController.getAll);

router.get('/:id', authorController.getSingle);

router.post('/', validation.saveAuthor, authorController.createAuthor);

router.put('/:id', requiresAuth(), validation.saveAuthor, authorController.updateAuthor);

router.delete('/:id', requiresAuth(), authorController.deleteAuthor);

module.exports = router;
