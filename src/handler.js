const { nanoid } = require('nanoid');
const books = require('./books');

// Handler untuk MENAMBAH buku baru
const addBookHandler = (req, res) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.body;

  // Kriteria 3: Client tidak melampirkan properti name
  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  // Kriteria 3: Client melampirkan readPage > pageCount
  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.some((book) => book.id === id);

  // Jika buku berhasil ditambahkan
  if (isSuccess) {
    return res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
  }

  // Jika gagal (kasus umum)
  return res.status(500).json({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
};

// Handler untuk MENAMPILKAN SEMUA buku
const getAllBooksHandler = (req, res) => {
  // Bonus (Opsional): Filter berdasarkan query parameters
  const { name, reading, finished } = req.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading) {
    filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
  }

  if (finished) {
    filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
  }

  const responseBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return res.status(200).json({
    status: 'success',
    data: {
      books: responseBooks,
    },
  });
};

// Handler untuk MENAMPILKAN DETAIL buku
const getBookByIdHandler = (req, res) => {
  const { bookId } = req.params;
  const book = books.find((b) => b.id === bookId);

  if (book) {
    return res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
};

// Handler untuk MENGUBAH data buku
const editBookByIdHandler = (req, res) => {
  const { bookId } = req.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.body;
  const updatedAt = new Date().toISOString();

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished: pageCount === readPage,
      updatedAt,
    };
    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
};

// Handler untuk MENGHAPUS buku
const deleteBookByIdHandler = (req, res) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
};


module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};