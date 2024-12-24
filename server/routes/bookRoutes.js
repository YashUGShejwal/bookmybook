const express = require('express');
const router = express.Router();
const {
  addBooksFromCSV,
  getAllBooks,
  getSingleBook,
  addSingleBook,
  getRandomBook,
} = require('../controllers/BookController');

const multer = require('multer');
const storage = require('../cloudinary/cloudinary.config');
const upload = multer({ storage });
router.get('/getAll', getAllBooks);
router.get('/getBook/:id', getSingleBook);
router.post('/addFromCSV', addBooksFromCSV);
router.post('/addSingleBook', upload.single('image'), addSingleBook);
router.post('/getRandomBook', getRandomBook);
module.exports = router;
