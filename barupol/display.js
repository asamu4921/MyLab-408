const express = require('express');
const router = express.Router();
const connection = require('../db');

// Middleware agar bisa parsing data form POST
router.use(express.urlencoded({ extended: true }));

// Menampilkan semua data dari tabel users
router.get('/', (req, res) => {
    const sql = `
    SELECT 
        d.id,
        u.username,
        r.namaruang,
        d.kegiatan,
        CONCAT(d.start_time, ' - ', d.end_time) AS waktu
    FROM 
        display d
    JOIN 
        users_ruang ur ON d.users_ruang_id = ur.id
    JOIN 
        users u ON ur.users_id = u.id
    JOIN 
        ruang r ON ur.ruang_id = r.id;
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
        <title>Data Users</title>
        <!-- Link Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h1>Data Display</h1>
            <!-- Tombol Tambah Data -->
            <a href="/" class="btn btn-outline-dark mt-3">← Menu Utama</a>
            <a href="/display/tambah" class="btn btn-primary mb-3">Tambah Data</a>
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Ruang</th>
                        <th>Kegiatan</th>
                        <th>Waktu</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>`;

    results.forEach(display => {
      html += `
      <tr>
          <td>${display.id}</td>
          <td>${display.username}</td>
          <td>${display.namaruang}</td>
          <td>${display.kegiatan}</td>
          <td>${display.waktu}</td>
          <td>
              <a href="/display/edit/${display.id}" class="btn btn-warning btn-sm">Edit</a>
              <a href="/display/delete/${display.id}" class="btn btn-danger btn-sm">Hapus</a>
          </td>
      </tr>`;
    });

    html += `
                </tbody>
            </table>
        </div>

        <!-- Link Bootstrap JS (Optional) -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>`;

    res.send(html);
  });
});
// tambah data
router.get('/tambah', (req, res) => {
    // Mengambil daftar users_ruang untuk ditampilkan dalam form
    const sql = `
    SELECT ur.id, u.username, r.namaruang 
    FROM users_ruang ur
    JOIN users u ON ur.users_id = u.id
    JOIN ruang r ON ur.ruang_id = r.id
    `;
    
    connection.query(sql, (err, usersRuangResults) => {
        if (err) {
            console.error('Error fetching users_ruang: ' + err.stack);
            res.status(500).send('Error fetching users_ruang');
            return;
        }

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Tambah Display</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1>Tambah Display</h1>
                <form action="/display/tambah" method="POST">
                    <div class="mb-3">
                        <label for="users_ruang_id" class="form-label">User - Ruang</label>
                        <select class="form-select" id="users_ruang_id" name="users_ruang_id" required>
                            <option value="">Pilih User-Ruang</option>
                            ${usersRuangResults.map(ur => `
                                <option value="${ur.id}">${ur.username} - ${ur.namaruang}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="kegiatan" class="form-label">Kegiatan</label>
                        <input type="text" class="form-control" id="kegiatan" name="kegiatan" required>
                    </div>
                    <div class="mb-3">
                        <label for="start_time" class="form-label">Start Time</label>
                        <input type="time" class="form-control" id="start_time" name="start_time" required>
                    </div>
                    <div class="mb-3">
                        <label for="end_time" class="form-label">End Time</label>
                        <input type="time" class="form-control" id="end_time" name="end_time" required>
                    </div>
                    <button type="submit" class="btn btn-success">Simpan</button>
                    <a href="/display" class="btn btn-secondary">Kembali</a>
                </form>
            </div>
        </body>
        </html>
        `;
        res.send(html);
    });
});

router.post('/tambah', (req, res) => {
    const { users_ruang_id, kegiatan, start_time, end_time } = req.body;
    const sql = 'INSERT INTO display (users_ruang_id, kegiatan, start_time, end_time) VALUES (?, ?, ?, ?)';

    connection.query(sql, [users_ruang_id, kegiatan, start_time, end_time], (err, result) => {
        if (err) {
            console.error('Error inserting display data: ', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/display');
    });
});
// edit
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;

    const sql = `
    SELECT 
        d.id, d.users_ruang_id, d.kegiatan, d.start_time, d.end_time,
        u.username, r.namaruang
    FROM display d
    JOIN users_ruang ur ON d.users_ruang_id = ur.id
    JOIN users u ON ur.users_id = u.id
    JOIN ruang r ON ur.ruang_id = r.id
    WHERE d.id = ?
    `;
    
    connection.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(500).send('Data tidak ditemukan');
        }

        const display = results[0];
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Edit Display</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1>Edit Display</h1>
                <form action="/display/edit/${display.id}" method="POST">
                    <div class="mb-3">
                        <label for="users_ruang_id" class="form-label">User - Ruang</label>
                        <select class="form-select" id="users_ruang_id" name="users_ruang_id" required>
                            <option value="${display.users_ruang_id}" selected>${display.username} - ${display.namaruang}</option>
                            <!-- Daftar users_ruang untuk memilih jika ingin mengubah -->
                            <!-- (Menampilkan daftar yang sama seperti di form tambah) -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="kegiatan" class="form-label">Kegiatan</label>
                        <input type="text" class="form-control" id="kegiatan" name="kegiatan" value="${display.kegiatan}" required>
                    </div>
                    <div class="mb-3">
                        <label for="start_time" class="form-label">Start Time</label>
                        <input type="time" class="form-control" id="start_time" name="start_time" value="${display.start_time}" required>
                    </div>
                    <div class="mb-3">
                        <label for="end_time" class="form-label">End Time</label>
                        <input type="time" class="form-control" id="end_time" name="end_time" value="${display.end_time}" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                    <a href="/display" class="btn btn-secondary">Kembali</a>
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
    const { users_ruang_id, kegiatan, start_time, end_time } = req.body;

    const sql = 'UPDATE display SET users_ruang_id = ?, kegiatan = ?, start_time = ?, end_time = ? WHERE id = ?';

    connection.query(sql, [users_ruang_id, kegiatan, start_time, end_time, id], (err, result) => {
        if (err) {
            console.error('Error updating display data: ', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/display');
    });
});
// hapus
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM display WHERE id = ?';

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting display data: ', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/display');
    });
});

module.exports = router;