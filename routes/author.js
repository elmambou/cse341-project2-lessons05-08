const express = require('express');
const router = express.Router();


const {requiresAuth} = require('express-openid-connect');
//const {isAuthenticated} = require('../middleware/authenticate');

const authorController = require('../controllers/author');
const validation = require('../middleware/validate');



router.get('/', authorController.getAll);

router.get('/:id', authorController.getSingle);

router.post('/', requiresAuth(), validation.saveAuthor, authorController.createAuthor);

router.put('/:id', requiresAuth(), validation.saveAuthor, authorController.updateAuthor);

router.delete('/:id', requiresAuth(), authorController.deleteAuthor);

module.exports = router;
