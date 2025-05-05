const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const connection = require('../db');

// Middleware untuk parsing form data
router.use(express.urlencoded({ extended: true }));

// Tampilkan data API
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM api';
  
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
        <title>Data API</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
        <div class="container mt-4">
          <h1 class="mb-4">Data API</h1>
          <a href="/" class="btn btn-outline-dark mt-3">← Menu Utama</a>
          <a href="/api/tambah" class="btn btn-primary mb-3">Tambah Data API</a>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>NIM Mahasiswa</th>
                <th>Nama Mahasiswa</th>
                <th>Jenis Kegiatan</th>
                <th>Nama Kegiatan (Other)</th>
                <th>Tanggal Pinjam</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Kode Ruangan</th>
                <th>Nama Ruangan</th>
                <th>Gedung Ruangan</th>
                <th>NIK Penanggung Jawab</th>
                <th>Nama Penanggung Jawab</th>
              </tr>
            </thead>
            <tbody>
    `;

    results.forEach(api => {
      html += `
        <tr>
          <td>${api.id}</td>
          <td>${api.nim_mahasiswa}</td>
          <td>${api.nama_mahasiswa}</td>
          <td>${api.jenis_kegiatan}</td>
          <td>${api.nama_kegiatan_other}</td>
          <td>${api.tanggal_pinjam}</td>
          <td>${api.start_time}</td>
          <td>${api.end_time}</td>
          <td>${api.kode_ruangan}</td>
          <td>${api.nama_ruangan}</td>
          <td>${api.gedung_ruangan}</td>
          <td>${api.nik_penanggungjawab}</td>
          <td>${api.nama_penanggungjawab}</td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
      </html>
    `;
    
    res.send(html);
  });
});

// Rute untuk menambah data API (akan dipicu saat tombol "Tambah Data API" diklik)
router.get('/tambah', async (req, res) => {
  const apiUrl = "https://peminjaman.polibatam.ac.id/api-penru/data-peminjaman";
  const apiKey = "9a89a3be-1d44-4e81-96a8-585cb0453718";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "api-key": apiKey }
    });

    let data = await response.json();

    // Menghapus duplikat berdasarkan ID
    const seenIds = new Set();
    data = data.filter(item => {
      if (seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      return true;
    });

    console.log(`Total data unik: ${data.length}`);

    const insertQuery = `
      INSERT INTO api (
        id, nim_mahasiswa, nama_mahasiswa, jenis_kegiatan, nama_kegiatan_other,
        tanggal_pinjam, start_time, end_time, kode_ruangan, nama_ruangan,
        gedung_ruangan, nik_penanggungjawab, nama_penanggungjawab
      )
      VALUES ?
    `;

    const values = data.map(item => [
      item.id,
      item.nim_mahasiswa,
      item.nama_mahasiswa,
      item.jenis_kegiatan,
      item.nama_kegiatan_other,
      item.tanggal_pinjam,
      item.start_time,
      item.end_time,
      item.kode_ruangan,
      item.nama_ruangan,
      item.gedung_ruangan,
      item.nik_penanggungjawab,
      item.nama_penanggungjawab
    ]);

    // Menyisipkan data ke dalam database
    connection.query(insertQuery, [values], (err, results) => {
      if (err) {
        console.error("❌ Gagal memasukkan data:", err.message);
        return res.status(500).send("❌ Gagal memasukkan data");
      }
      console.log("✅ Data berhasil dimasukkan ke database.");
      res.send("<h2>✅ Data berhasil dimasukkan ke database!</h2><a href='/'>Kembali ke halaman utama</a>");
    });
  } catch (error) {
    console.error("❌ Gagal:", error.message);
    res.status(500).send("❌ Gagal mengambil atau memproses data!");
  }
});

module.exports = router;
