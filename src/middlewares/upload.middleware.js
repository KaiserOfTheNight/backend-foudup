import multer from 'multer';

const storage = multer.memoryStorage(); 

const upload = multer({ 
  storage,
  fileFilter: function (req, file, cb) {
 const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png)'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, 
  }
});

export default upload;
