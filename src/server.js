const express = require('express');
const routes = require('./routes'); // Impor routes dari file terpisah

const app = express();
const port = 9000;

// Middleware untuk mengizinkan Express membaca body JSON dari request
app.use(express.json());

// Gunakan routes yang sudah kita definisikan
// Express secara otomatis akan mencocokkan method (GET, POST, dll) dan path
app.use(routes); 

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});