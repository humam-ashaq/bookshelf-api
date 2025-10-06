const { nanoid } = require('nanoid');
const books = require('./books');

// Handler untuk MENAMBAH buku baru
const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.body;

  // Kriteria 3: Client tidak melampirkan properti name
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Kriteria 3: Client melampirkan readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
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

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Jika buku berhasil ditambahkan
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // Jika gagal (kasus umum)
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// --- Handler lainnya akan Anda buat di sini ---
// TODO: Buat handler untuk menampilkan semua buku
const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books: books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    })),
  },
});

// TODO: Buat handler untuk menampilkan detail buku
const getBookByIdHandler = (request, h) => {
  // Logika Anda di sini
};

// TODO: Buat handler untuk mengubah data buku
const editBookByIdHandler = (request, h) => {
  // Logika Anda di sini
};

// TODO: Buat handler untuk menghapus buku
const deleteBookByIdHandler = (request, h) => {
  // Logika Anda di sini
};


module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};