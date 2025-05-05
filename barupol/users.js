const express = require('express');
const router = express.Router();
const connection = require('../db');

// Middleware agar bisa parsing data form POST
router.use(express.urlencoded({ extended: true }));

// Rute GET ke /users → tampilkan daftar pengguna
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';

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
        <title>Data Users</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h1>Data Users</h1>
            <!-- Tombol Tambah Data -->
            <a href="/" class="btn btn-outline-dark mt-3">← Menu Utama</a>
            <a href="/users/tambah" class="btn btn-success mb-3">+ Tambah Data</a>
            
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Role</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>`;

    results.forEach(user => {
      html += `
      <tr>
          <td>${user.id}</td>
          <td>${user.role}</td>
          <td>${user.username}</td>
          <td>${user.password}</td>
          <td>
          <a href="/users/edit/${user.id}" class="btn btn-warning btn-sm">Edit</a>
          <a href="/users/delete/${user.id}" class="btn btn-danger btn-sm">Hapus</a>
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

// Rute GET /users/tambah → tampilkan form tambah data
router.get('/tambah', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tambah Pengguna</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h1>Tambah Pengguna</h1>
            <form action="/users/tambah" method="POST">
                <div class="mb-3">
                    <label for="role" class="form-label">Role</label>
                    <input type="text" class="form-control" id="role" name="role" required>
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Simpan</button>
                <a href="/users" class="btn btn-secondary">Kembali</a>
            </form>
        </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Rute POST /users/tambah → proses simpan data ke database
router.post('/tambah', (req, res) => {
  const { role, username, password } = req.body;
  const query = 'INSERT INTO users (role, username, password) VALUES (?, ?, ?)';
  
  connection.query(query, [role, username, password], (err, results) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/users'); // kembali ke daftar users setelah tambah
  });
});
// edit
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user: ', err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Edit Pengguna</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <div class="container mt-5">
              <h1>Edit Pengguna</h1>
              <form action="/users/edit/${user.id}" method="POST">
                  <div class="mb-3">
                      <label for="role" class="form-label">Role</label>
                      <input type="text" class="form-control" id="role" name="role" value="${user.role}" required>
                  </div>
                  <div class="mb-3">
                      <label for="username" class="form-label">Username</label>
                      <input type="text" class="form-control" id="username" name="username" value="${user.username}" required>
                  </div>
                  <div class="mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" class="form-control" id="password" name="password" value="${user.password}" required>
                  </div>
                  <button type="submit" class="btn btn-primary">Update</button>
                  <a href="/users" class="btn btn-secondary">Kembali</a>
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
  const { role, username, password } = req.body;
  const query = 'UPDATE users SET role = ?, username = ?, password = ? WHERE id = ?';

  connection.query(query, [role, username, password, id], (err, result) => {
    if (err) {
      console.error('Error updating user: ', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/users');
  });
});
// delete data
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user: ', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/users');
  });
});

module.exports = router;
