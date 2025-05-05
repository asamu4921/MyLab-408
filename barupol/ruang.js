const express = require('express');
const router = express.Router();
const connection = require('../db');

router.use(express.urlencoded({ extended: true }));

// Tampilkan semua ruang
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM ruang';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data: ' + err.stack);
      return res.status(500).send('Error fetching data');
    }

    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Data Ruang</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
    <div class="container mt-5">
        <h1>Data Ruang</h1>
        <a href="/" class="btn btn-outline-dark mt-3">← Menu Utama</a>
        <a href="/ruang/tambah" class="btn btn-success mb-3">+ Tambah Data</a>
        <table class="table table-bordered table-striped">
            <thead>
                <tr><th>ID</th><th>Ruang</th><th>Aksi</th></tr>
            </thead>
            <tbody>`;

    results.forEach(ruang => {
      html += `
        <tr>
            <td>${ruang.id}</td>
            <td>${ruang.namaruang}</td>
            <td>
              <a href="/ruang/edit/${ruang.id}" class="btn btn-warning btn-sm">Edit</a>
              <a href="/ruang/delete/${ruang.id}" class="btn btn-danger btn-sm">Hapus</a>
            </td>
        </tr>`;
    });

    html += `</tbody></table></div></body></html>`;
    res.send(html);
  });
});

// Form tambah
router.get('/tambah', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Tambah Ruang</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
    <div class="container mt-5">
        <h1>Tambah Ruang</h1>
        <form action="/ruang/tambah" method="POST">
            <div class="mb-3">
                <label for="namaruang" class="form-label">Nama Ruang</label>
                <input type="text" class="form-control" id="namaruang" name="namaruang" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan</button>
            <a href="/ruang" class="btn btn-secondary">Kembali</a>
        </form>
    </div>
    </body>
    </html>
  `);
});

// Proses tambah
router.post('/tambah', (req, res) => {
  const { namaruang } = req.body;
  const query = 'INSERT INTO ruang (namaruang) VALUES (?)';

  connection.query(query, [namaruang], (err) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/ruang');
  });
});

// Form edit
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM ruang WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).send('Error fetching data');
    }

    const ruang = results[0];
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Edit Ruang</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
      <div class="container mt-5">
          <h1>Edit Ruang</h1>
          <form action="/ruang/edit/${ruang.id}" method="POST">
              <div class="mb-3">
                  <label for="namaruang" class="form-label">Nama Ruang</label>
                  <input type="text" class="form-control" id="namaruang" name="namaruang" value="${ruang.namaruang}" required>
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
              <a href="/ruang" class="btn btn-secondary">Kembali</a>
          </form>
      </div>
      </body>
      </html>
    `);
  });
});

// Proses edit
router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { namaruang } = req.body;
  const query = 'UPDATE ruang SET namaruang = ? WHERE id = ?';

  connection.query(query, [namaruang, id], (err) => {
    if (err) {
      console.error('Error updating data: ', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/ruang');
  });
});

// Hapus ruang
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM ruang WHERE id = ?';

  connection.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting data: ', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/ruang');
  });
});

module.exports = router;
