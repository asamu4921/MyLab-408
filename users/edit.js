const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/edit', (req, res) => {
  const id = req.query.id;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
    if (err || rows.length === 0) return res.send('User tidak ditemukan.');
    const u = rows[0];

    res.send(`
      <h3>Edit User</h3>
      <form class="ajax-form" method="POST" action="/users/update" enctype="multipart/form-data">
        <input type="hidden" name="id" value="${u.id}">
        <input name="nama" value="${u.nama}" required><br>
        <input name="password" value="${u.password}" required><br>
        <select name="role">
          <option value="superadmin" ${u.role === 'superadmin' ? 'selected' : ''}>Superadmin</option>
          <option value="dosen" ${u.role === 'dosen' ? 'selected' : ''}>Dosen</option>
          <option value="laboran" ${u.role === 'laboran' ? 'selected' : ''}>Laboran</option>
        </select><br>
        <input type="file" name="foto"><br>
        <button type="submit">Update</button>
      </form>
    `);
  });
});

module.exports = router;
