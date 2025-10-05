import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storagePath = './public/uploads/photos';

// Pastikan direktori ada, jika tidak maka buat
if (!fs.existsSync(storagePath)){
    fs.mkdirSync(storagePath, { recursive: true });
}

// Atur storage engine
const storage = multer.diskStorage({
    destination: storagePath,
    filename: function(req, file, cb) {
        cb(null, `photo-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Inisialisasi upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Hanya gambar (jpeg, jpg, png, webp) yang diizinkan!'));
        }
    }
});

export default upload;