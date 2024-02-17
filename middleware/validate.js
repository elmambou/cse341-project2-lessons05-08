const validator = require('../helpers/validate');

const saveAuthor = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    birthDate: 'string',
    nationality: 'required|string',
    biography: 'required|string',
    website: 'required|string',
    booksWritten: 'required|string',
    awards: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveBook = (req, res, next) => {
    const validationRule = {

        title: 'required|string',
        book: 'required|string',
        genre: 'required|string',
        publicationYear: 'required|string',
        isbn: 'required|string',
        copiesAvailable: 'required|string',
        description: 'required|string'
  
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  
  module.exports = {
    saveAuthor,
    saveBook
  };
  
