//const express = require('express');
//const router = express.Router();
//const security = require('../middleware/authorize.js');


//const authorController = require('../controllers/author');
//const validation = require('../middleware/validate');


// ANOTHER INSTANCE


//const express = require('express');
//const router = express.Router();
//const checkLogin = require('../middleware/authorize.js'); // Import the middleware directly
//const { saveAuthor } = require('../middleware/validate'); // Import the middleware directly

//const authorController = require('../controllers/author');



//router.get('/', authorController.getAll);

//router.get('/:id', authorController.getSingle);

//router.post('/', checkLogin, saveAuthor, authorController.createAuthor); // Use middleware directly

//router.put('/:id', checkLogin, saveAuthor, authorController.updateAuthor);

//router.delete('/:id', checkLogin, saveAuthor, authorController.deleteAuthor);

//module.exports = router;

//module.exports = router;

const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/authorize'); // Import checkLogin middleware from authorize.js
const { saveAuthor } = require('../middleware/validate'); // Import saveAuthor and saveBook middleware from validate.js
const authorController = require('../controllers/author');


router.get('/', authorController.getAll);
router.get('/:id', authorController.getSingle);
router.post('/', checkLogin, saveAuthor, authorController.createAuthor); // Use middleware functions as route handlers
router.put('/:id', checkLogin, saveAuthor, authorController.updateAuthor); // Use middleware functions as route handlers
router.delete('/:id', checkLogin, authorController.deleteAuthor);

module.exports = router;


