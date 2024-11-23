// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passwordRoutes = require('./routes/passwordRoutes');

// Konfigurasi dotenv untuk membaca file .env
dotenv.config();

// Inisialisasi express
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/password', passwordRoutes);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di: http://localhost:${port}`);
});
