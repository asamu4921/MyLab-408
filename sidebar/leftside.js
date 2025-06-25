const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
    <aside class="h-full flex flex-col bg-gray-800 text-white">
      <!-- Judul Atas -->
      <div class="border-b border-gray-600 p-4">
        <h1 class="text-lg font-bold">Judul</h1>
        <div class="text-sm text-gray-300">MyLab</div>
      </div>

      <!-- Isi Sidebar -->
      <div class="flex-1 p-4 space-y-1">
        <div class="text-xs text-gray-400 uppercase mb-2">Main Nav</div>

        <a href="/dashboard/home" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">
          🏠 Home
        </a>
        <a href="/users/indeks" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">
          🧩 Users
        </a>
        <a href="/api/indeks" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">
          📚 API 
        </a>
		        <a href="/matkul/indeks" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">
          🏫 MATKUL 
        </a>
      </div>
    </aside>
  `);
});

module.exports = router;
