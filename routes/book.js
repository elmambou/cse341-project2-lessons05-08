//const express = require('express');
//const router = express.Router();
//const security = require('../middleware/authorize.js');

//const bookController = require('../controllers/book');
//const validation = require('../middleware/validate');



//router.get('/', bookController.getAll);

//router.get('/:id', bookController.getSingle);

//router.post('/', security.checkLogin, validation.saveBook, bookController.createBook);

//router.put('/:id', security.checkLogin, validation.saveBook, bookController.updateBook);

//router.delete('/:id', security.checkLogin, bookController.deleteBook);

//module.exports = router;



//ANOTHER INSTANCE
///const express = require('express');
//const router = express.Router();
//const checkLogin = require('../middleware/authorize.js'); // Import the middleware directly
//const { saveBook } = require('../middleware/validate'); // Import the middleware directly

//const bookController = require('../controllers/book');



//router.get('/', bookController.getAll);

//router.get('/:id', bookController.getSingle);

//router.post('/', checkLogin,  saveBook, bookController.createBook); // Use middleware directly

//router.put('/:id', checkLogin,  saveBook, bookController.updateBook);

//router.delete('/:id', checkLogin,  saveBook, bookController.deleteBook);

//module.exports = router;



const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/authorize'); // Import checkLogin middleware from authorize.js
const { saveBook } = require('../middleware/validate'); // Import saveAuthor and saveBook middleware from validate.js

const bookController = require('../controllers/book');

router.get('/', bookController.getAll);
router.get('/:id', bookController.getSingle);
router.post('/', checkLogin, saveBook, bookController.createBook); // Use middleware functions as route handlers
router.put('/:id', checkLogin, saveBook, bookController.updateBook); // Use middleware functions as route handlers
router.delete('/:id', checkLogin, saveBook, bookController.deleteBook);

module.exports = router;
