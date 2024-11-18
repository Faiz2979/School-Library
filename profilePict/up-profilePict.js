const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './ProfilePict');
    },
    filename: (req, file, cb) => {
        cb(null, `ProfilePicture-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Konfigurasi multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal 10 MB
    fileFilter: (req, file, cb) => {
        const acceptedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!acceptedTypes.includes(file.mimetype)) {
            return cb(new Error(`Invalid file type (${file.mimetype}). Only JPG, JPEG, and PNG are allowed.`));
        }
        cb(null, true);
    }
});

module.exports = upload;
