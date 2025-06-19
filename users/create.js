const express = require('express');
const router = express.Router();

router.get('/create', (req, res) => {
  res.send(`
    <h3>Tambah User</h3>
    <form class="ajax-form" method="POST" action="/users/create" enctype="multipart/form-data">
      <input name="nama" placeholder="Nama" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <select name="role">
        <option value="superadmin">Superadmin</option>
        <option value="dosen">Dosen</option>
        <option value="laboran">Laboran</option>
      </select><br>
      <input type="file" name="foto"><br>
      <button type="submit">Simpan</button>
    </form>
  `);
});

const multer = require('multer');
const path = require('path');
const db = require('../db');

const storage = multer.diskStorage({
  destination: './dataset',
  filename: (req, file, cb) => {
	cb(null, file.originalname);
  }

});
const upload = multer({ storage });

router.post('/create', upload.single('foto'), (req, res) => {
  const { nama, password, role } = req.body;
  const foto = req.file ? req.file.filename : null;

  const query = 'INSERT INTO users (nama, password, role, foto) VALUES (?, ?, ?, ?)';
  db.query(query, [nama, password, role, foto], err => {
    if (err) return res.send('Gagal menambahkan user.');
    res.send('sukses');
  });
});

module.exports = router;
