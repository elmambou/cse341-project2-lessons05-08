const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const authorValidationRules = () => {
  const rules = [
    body('couple')
      .isArray({ min: 2, max: 2 })
      .withMessage('couple must be an array of two authors')
      .custom(async (value) => {
        const coupleIds = value.map((id) => new ObjectId(id));
        const author = await mongodb
          .getDb()
          .db()
          .collection('author')
          .find({ _id: { $in: coupleIds } })
          .toArray();
        if (author.length !== 2) {
          throw new Error('Both authors must exist in the authors collection');
        }
        return true; // Validation passed
      }),
    body('birthDate')
      .notEmpty()
      .withMessage('author birthDate is required')
      .isISO8601()
      .withMessage('author birthDate must be a valid and in the YYYY-MM-DD format')
  ];
  return rules;
};

// Place all validation rules above this validate function!
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  authorValidationRules,
  validate
};