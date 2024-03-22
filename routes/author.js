const express = require('express');
const router = express.Router();
const security = require('../middleware/authorize.js');
const authorController = require('../controllers/author');
const validation = require('../middleware/validate');



router.get('/', authorController.getAll);

router.get('/:id', authorController.getSingle);

router.post('/', security.checkLogin, validation.saveAuthor, authorController.createAuthor);

router.put('/:id', security.checkLogin, validation.saveAuthor, authorController.updateAuthor);

router.delete('/:id', security.checkLogin, authorController.deleteAuthor);

module.exports = router;
