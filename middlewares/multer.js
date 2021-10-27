const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

const storeImagesInServer = upload.array('images')

module.exports = storeImagesInServer