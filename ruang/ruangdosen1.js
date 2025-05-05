const express = require('express');
const router = express.Router();
const connection = require('../db'); // Pastikan ini adalah koneksi MySQL Anda

router.get('/', (req, res) => {
  const kodeRuangan = 'ruang dosen 1'; // Ganti sesuai kebutuhan

  const dosenQuery = `
    SELECT u.username
    FROM users_ruang ur
    JOIN ruang r ON ur.ruang_id = r.id
    JOIN users u ON ur.users_id = u.id
    WHERE r.namaruang = ?
  `;

  const keberadaanQuery = `
    SELECT 
  u.username,
  d.kegiatan,
  CONCAT(TIME_FORMAT(d.start_time, '%H:%i:%s'), ' - ', TIME_FORMAT(d.end_time, '%H:%i:%s')) AS waktu
FROM display d
JOIN users_ruang ur ON d.users_ruang_id = ur.id
JOIN users u ON ur.users_id = u.id
JOIN ruang r ON ur.ruang_id = r.id
WHERE DATE(d.start_time) = CURDATE()
  AND r.namaruang = 'ruang dosen 1'
ORDER BY d.start_time DESC
LIMIT 8
  `;

  connection.query(dosenQuery, [kodeRuangan], (err, dosenResult) => {
    if (err) return res.status(500).send('Error retrieving dosen data!');

    connection.query(keberadaanQuery, [kodeRuangan], (err, keberadaanResult) => {
      if (err) return res.status(500).send('Error retrieving keberadaan data!');

      const now = new Date();
      const dateNow = now.toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      const timeNow = now.toLocaleTimeString('id-ID');

      let html = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>Jadwal Dosen di ${kodeRuangan}</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
            .bg-custom-blue { background-color: #295292; color: white; min-height: 400px; }
            .bg-deep-blue { background-color: #0b1d35; color: white; min-height: 400px; }
            .divider { border-bottom: 2px solid #ffffff; margin: 1rem 0; }
            .vertical-divider {
  border-left: 2px solid #ffffff;
  height: 100%; /* atau coba fixed height seperti 60px */
  margin: 0 10px;
}

            .keberadaan-wrapper { display: flex; flex-wrap: wrap; gap: 1rem; }
            .keberadaan-item { display: flex; align-items: center; gap: 1rem; }
          </style>
        </head>
        <body class="p-4">
          <a href="/" class="btn btn-secondary mb-3">← Kembali</a>
          <div class="container">
            <div class="row g-3">
              <!-- Kolom Kiri Lebar: Keberadaan Dosen Saat Ini -->
              
              <div class="col-12 col-md-9 p-4 bg-custom-blue">
                <div class="mb-2">${dateNow} - ${timeNow}</div>
                <h4>${kodeRuangan}</h4>
                <div class="divider"></div>
                <h1 class="mt-4">Keberadaan Dosen</h1>
                <div class="mt-5 keberadaan-wrapper">
      `;

      if (keberadaanResult.length > 0) {
        keberadaanResult.forEach((dosen, index) => {
          html += `
            <div class="keberadaan-item">
              <div>
                <h5 class="m-0">${dosen.username}</h5>
                <p class="m-0">${dosen.kegiatan}</p>
                <small>${dosen.waktu}</small>
              </div>
              ${index < keberadaanResult.length - 1 ? '<div class="vertical-divider"></div>' : ''}
            </div>
          `;
        });
      } else {
        html += `<p>Tidak ada dosen yang sedang berada di ${kodeRuangan} saat ini.</p>`;
      }

      html += `
                </div>
              </div>

              <!-- Kolom Kanan Kecil: Daftar Dosen -->
              <div class="col-12 col-md-3 p-4 bg-deep-blue">
                <h3 >Daftar Dosen</h3>
                <div class="divider"></div>
                <div class="mt-5"></div>
      `;

      if (dosenResult.length > 0) {
        dosenResult.forEach((dosen, index) => {
          html += `
            <div>${dosen.username}</div>
            ${index < dosenResult.length - 1 ? '<div class="divider"></div>' : ''}
          `;
        });
      } else {
        html += `<p>Tidak ada dosen terdaftar di ruangan ini.</p>`;
      }

      html += `
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      res.send(html);
    });
  });
});

module.exports = router;
