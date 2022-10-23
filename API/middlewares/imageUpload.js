const multer = require('multer');
const path = require('path');

// Destination to Store image
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = '';

        if(req.baseUrl.includes('users')){
            folder = 'users';
        } else if (req.baseUrl.includes('posts')){
            folder = 'posts';
        }

        cb(null, `uploads/${folder}/`);
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));

    }
    
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){

            // upload only png and jpg formats
            return cb(new Error('Por favor envie imagens em png ou jpg.'));
        }
        cb(undefined, true);
    }
})

module.exports = {
    imageUpload,
}