const express = require('express');
const router = express.Router();
const connection = require('../db');

router.use(express.urlencoded({ extended: true }));

// Menampilkan semua data
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM matkul_kelas';
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Data Matkul</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h1>Data Matkul</h1>
            <a href="/" class="btn btn-secondary mb-3">← Menu Utama</a>
            <a href="/matkul/tambah" class="btn btn-primary mb-3">+ Tambah Data</a>
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Matkul</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>`;

    results.forEach(matkul => {
      html += `
        <tr>
            <td>${matkul.id}</td>
            <td>${matkul.nama_matkul_kelas}</td>
            <td>
                <a href="/matkul/edit/${matkul.id}" class="btn btn-warning btn-sm">Edit</a>
                <a href="/matkul/delete/${matkul.id}" class="btn btn-danger btn-sm" onclick="return confirm('Yakin ingin menghapus?')">Hapus</a>
            </td>
        </tr>`;
    });

    html += `
                </tbody>
            </table>
        </div>
    </body>
    </html>`;
    res.send(html);
  });
});
// tambah 
router.get('/tambah', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Tambah Matkul</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h1>Tambah Matkul</h1>
            <form action="/matkul/tambah" method="POST">
                <div class="mb-3">
                    <label for="nama" class="form-label">Nama Matkul</label>
                    <input type="text" class="form-control" id="nama" name="nama_matkul_kelas" required>
                </div>
                <button type="submit" class="btn btn-success">Simpan</button>
                <a href="/matkul" class="btn btn-secondary">Kembali</a>
            </form>
        </div>
    </body>
    </html>
    `;
    res.send(html);
  });
  
  router.post('/tambah', (req, res) => {
    const { nama_matkul_kelas } = req.body;
    const query = 'INSERT INTO matkul_kelas (nama_matkul_kelas) VALUES (?)';
  
    connection.query(query, [nama_matkul_kelas], (err, result) => {
      if (err) {
        console.error('Error inserting matkul: ', err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/matkul');
    });
  });
// edit
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM matkul_kelas WHERE id = ?';
  
    connection.query(query, [id], (err, results) => {
      if (err || results.length === 0) {
        return res.status(500).send('Data tidak ditemukan');
      }
  
      const matkul = results[0];
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Edit Matkul</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <div class="container mt-5">
              <h1>Edit Matkul</h1>
              <form action="/matkul/edit/${matkul.id}" method="POST">
                  <div class="mb-3">
                      <label for="nama" class="form-label">Nama Matkul</label>
                      <input type="text" class="form-control" id="nama" name="nama_matkul_kelas" value="${matkul.nama_matkul_kelas}" required>
                  </div>
                  <button type="submit" class="btn btn-primary">Update</button>
                  <a href="/matkul" class="btn btn-secondary">Kembali</a>
              </form>
          </div>
      </body>
      </html>
      `;
      res.send(html);
    });
  });
  
  router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nama_matkul_kelas } = req.body;
    const query = 'UPDATE matkul_kelas SET nama_matkul_kelas = ? WHERE id = ?';
  
    connection.query(query, [nama_matkul_kelas, id], (err, result) => {
      if (err) {
        console.error('Error updating matkul: ', err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/matkul');
    });
  });
//   delete
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM matkul_kelas WHERE id = ?';
  
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting matkul: ', err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/matkul');
    });
  });
  

module.exports = router;