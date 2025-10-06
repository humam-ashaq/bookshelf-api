const express = require('express');
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

const router = express.Router();

// Rute untuk menambah buku
router.post('/books', addBookHandler);

// Rute untuk mendapatkan semua buku (termasuk query opsional)
router.get('/books', getAllBooksHandler);

// Rute untuk mendapatkan detail buku berdasarkan ID
router.get('/books/:bookId', getBookByIdHandler);

// Rute untuk mengubah data buku berdasarkan ID
router.put('/books/:bookId', editBookByIdHandler);

// Rute untuk menghapus buku berdasarkan ID
router.delete('/books/:bookId', deleteBookByIdHandler);


module.exports = router;