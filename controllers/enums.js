const CONDITIONS = require('../models/conditions');
const CATEGORIES = require('../models/category');

//@route   GET /api/enums
//@access  public
//@usage   Allow user to fetch all enums (e.g. item categories, item conditions, etc.)
const getEnums = async (req, res) => {
    res.send({
      categories: CATEGORIES,
      conditions: CONDITIONS,
      initialFormFields: {
        title: '',
        sellerName: '',
        sellerEmail: '',
        description: '',
        locatedCity: '',
        locatedState: '',
        price: '',
        condition: '',
        category: '',
      },
    });
  };

  module.exports = {
    getEnums
  };