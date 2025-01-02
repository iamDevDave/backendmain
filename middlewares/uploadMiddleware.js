// src/middlewares/uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Set up multer storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Add a timestamp to avoid name conflicts
    }
});

const upload = multer({ storage });

export default upload;
