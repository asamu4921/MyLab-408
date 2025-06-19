const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { nama, password } = req.body;

  const query = 'SELECT * FROM users WHERE nama = ? AND password = ? LIMIT 1';
  db.query(query, [nama, password], (err, results) => {
    if (err) return res.status(500).send('Error server');

    if (results.length > 0) {
      req.session.user = results[0];
      res.redirect('/dashboard'); // redirect satu-satunya yang diperbolehkan: setelah login
    } else {
      res.send('Login gagal. Cek nama dan password.');
    }
  });
});

module.exports = router;
