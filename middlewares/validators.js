const { body, validationResult } = require('express-validator');

exports.validatePost = [
  body('title', 'title is required').exists(),
  body('title', 'title is required').notEmpty(),
  body('sellerName', 'sellerName is required').exists(),
  body('sellerName', 'sellerName is required').notEmpty(),
  body('sellerEmail', 'sellerEmail is required').exists(),
  body('sellerEmail', 'sellerEmail is required').notEmpty(),
  body('sellerEmail', 'wrong sellerEmail format').isEmail(),
  body('description', 'description is required').exists(),
  body('description', 'description is required').notEmpty(),
  body('locatedCity', 'description is required').exists(),
  body('locatedCity', 'locatedCity is required').notEmpty(),
  body('locatedState', 'locatedState is required').exists(),
  body('locatedState', 'locatedState is required').notEmpty(),
  body('price', 'priceis required').exists(),
  body('price', 'price is required').notEmpty(),
  body('price', 'price must be a number').isFloat(),
  body('condition', 'condition is required').exists(),
  body('condition', 'condition is required').notEmpty(),
  body('category', 'category is required').exists(),
  body('category', 'category is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
