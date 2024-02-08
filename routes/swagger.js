const router = require('express').Router();
const /* The `swagger` module is used to generate and serve API documentation. In this code snippet, it
is being used to set up a route for serving the Swagger UI and providing the Swagger document
(`swagger.json`) to be displayed in the UI. */
swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
