const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <nav class="flex flex-col space-y-2 p-4">
      <a href="/dashboard/home" class="ajax hover:text-blue-300">🏠 Home</a>
      <a href="/users/indeks" class="ajax hover:text-blue-300">👥 Users</a>
    </nav>
  `);
});

module.exports = router;
