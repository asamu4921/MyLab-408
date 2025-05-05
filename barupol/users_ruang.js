const express = require('express');
const router = express.Router();
const connection = require('../db');

// agar router bisa menerima data
router.use(express.urlencoded({ extended: true }));

// Menampilkan semua data dari tabel users_ruang
router.get('/', (req, res) => {
  const sql = `
    SELECT ur.id, u.username, r.namaruang
    FROM users_ruang ur
    JOIN users u ON ur.users_id = u.id
    JOIN ruang r ON ur.ruang_id = r.id
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data: ' + err.stack);
      res.status(500).send('Error fetching data');
      return;
    }

    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Data Users Ruang</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h1>Data Users Ruang</h1>
            <a href="/" class="btn btn-outline-dark mt-3">← Menu Utama</a>
            <a href="/users_ruang/tambah" class="btn btn-primary mb-3">+ Tambah Data</a>
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Nama Ruang</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>`;

    results.forEach(userruang => {
      html += `
      <tr>
          <td>${userruang.id}</td>
          <td>${userruang.username}</td>
          <td>${userruang.namaruang}</td>
<td>
    <a href="/users_ruang/edit/${userruang.id}" class="btn btn-warning btn-sm">Edit</a>
    <a href="/users_ruang/delete/${userruang.id}" class="btn btn-danger btn-sm">Hapus</a>
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

// Form Tambah Users Ruang
router.get('/tambah', (req, res) => {
  const getUsers = 'SELECT id, username FROM users';
  const getRuang = 'SELECT id, namaruang FROM ruang';

  connection.query(getUsers, (err1, users) => {
    if (err1) return res.status(500).send('Error ambil data users');

    connection.query(getRuang, (err2, ruang) => {
      if (err2) return res.status(500).send('Error ambil data ruang');

      let form = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tambah Users Ruang</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <div class="container mt-5">
              <h1>Tambah Users Ruang</h1>
              <form action="/users_ruang/tambah" method="POST">
                  <div class="mb-3">
                      <label for="users_id" class="form-label">Pilih User</label>
                      <select name="users_id" id="users_id" class="form-select" required>
                          <option value="">-- Pilih User --</option>`;
      users.forEach(user => {
        form += `<option value="${user.id}">${user.username}</option>`;
      });
      form += `
                      </select>
                  </div>

                  <div class="mb-3">
                      <label for="ruang_id" class="form-label">Pilih Ruang</label>
                      <select name="ruang_id" id="ruang_id" class="form-select" required>
                          <option value="">-- Pilih Ruang --</option>`;
      ruang.forEach(r => {
        form += `<option value="${r.id}">${r.namaruang}</option>`;
      });
      form += `
                      </select>
                  </div>

                  <button type="submit" class="btn btn-primary">Simpan</button>
                  <a href="/users_ruang" class="btn btn-secondary">Kembali</a>
              </form>
          </div>
      </body>
      </html>
      `;
      res.send(form);
    });
  });
});

// Proses Tambah Data
router.post('/tambah', (req, res) => {
  const { users_id, ruang_id } = req.body;
  const sql = 'INSERT INTO users_ruang (users_id, ruang_id) VALUES (?, ?)';

  connection.query(sql, [users_id, ruang_id], (err, result) => {
    if (err) {
      console.error('Gagal insert:', err);
      return res.status(500).send('Gagal menambahkan data');
    }
    res.redirect('/users_ruang');
  });
});
// Form Edit
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const getDetail = 'SELECT * FROM users_ruang WHERE id = ?';
    const getUsers = 'SELECT id, username FROM users';
    const getRuang = 'SELECT id, namaruang FROM ruang';
  
    connection.query(getDetail, [id], (err, userruang) => {
      if (err || userruang.length === 0) return res.status(500).send('Data tidak ditemukan');
  
      connection.query(getUsers, (err1, users) => {
        if (err1) return res.status(500).send('Gagal ambil data users');
  
        connection.query(getRuang, (err2, ruang) => {
          if (err2) return res.status(500).send('Gagal ambil data ruang');
  
          const data = userruang[0];
  
          let form = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Edit Users Ruang</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body>
            <div class="container mt-5">
              <h1>Edit Users Ruang</h1>
              <form action="/users_ruang/edit/${data.id}" method="POST">
                <div class="mb-3">
                  <label for="users_id" class="form-label">Pilih User</label>
                  <select name="users_id" class="form-select" required>`;
          users.forEach(user => {
            const selected = user.id === data.users_id ? 'selected' : '';
            form += `<option value="${user.id}" ${selected}>${user.username}</option>`;
          });
          form += `
                  </select>
                </div>
  
                <div class="mb-3">
                  <label for="ruang_id" class="form-label">Pilih Ruang</label>
                  <select name="ruang_id" class="form-select" required>`;
          ruang.forEach(r => {
            const selected = r.id === data.ruang_id ? 'selected' : '';
            form += `<option value="${r.id}" ${selected}>${r.namaruang}</option>`;
          });
          form += `
                  </select>
                </div>
  
                <button type="submit" class="btn btn-success">Update</button>
                <a href="/users_ruang" class="btn btn-secondary">Batal</a>
              </form>
            </div>
          </body>
          </html>
          `;
          res.send(form);
        });
      });
    });
  });
  
  // Proses Edit
  router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { users_id, ruang_id } = req.body;
    const sql = 'UPDATE users_ruang SET users_id = ?, ruang_id = ? WHERE id = ?';
  
    connection.query(sql, [users_id, ruang_id, id], (err, result) => {
      if (err) {
        console.error('Gagal update:', err);
        return res.status(500).send('Gagal update data');
      }
      res.redirect('/users_ruang');
    });
  });
// edit
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM users_ruang WHERE id = ?';
  
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Gagal hapus:', err);
        return res.status(500).send('Gagal hapus data');
      }
      res.redirect('/users_ruang');
    });
  });
  
module.exports = router;
