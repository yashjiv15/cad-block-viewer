const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.dxf') {
    cb(null, true);
  } else {
    cb(new Error('Only DXF files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
