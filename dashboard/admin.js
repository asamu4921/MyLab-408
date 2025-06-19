// routes/admin.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Dashboard</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="h-screen flex overflow-hidden">

      <!-- Sidebar -->
      <aside id="sidebar" class="w-64 bg-gray-800 text-white flex-shrink-0"></aside>

      <!-- Main content wrapper -->
      <div class="flex flex-col flex-1">

        <!-- Header -->
        <header id="header" class="bg-gray-100 h-16 flex items-center justify-between px-4 border-b border-gray-300"></header>

        <!-- Main content -->
        <main id="konten" class="flex-1 overflow-y-auto p-4 bg-white">
          <h2>Selamat Datang ${user.nama} !</h2>
        </main>

        <!-- Footer -->
        <footer id="footer" class="h-16 bg-gray-100 flex items-center justify-center border-t border-gray-300"></footer>
      </div>

      <script>
        // Load partials
        fetch('/sidebar/header').then(r => r.text()).then(html => document.getElementById('header').innerHTML = html);
        fetch('/sidebar/leftside').then(r => r.text()).then(html => document.getElementById('sidebar').innerHTML = html);
        fetch('/sidebar/footer').then(r => r.text()).then(html => document.getElementById('footer').innerHTML = html);

        // AJAX navigation
        document.addEventListener('click', function(e) {
          if (e.target.classList.contains('ajax')) {
            e.preventDefault();
            fetch(e.target.href)
              .then(res => res.text())
              .then(html => document.getElementById('konten').innerHTML = html);
          }

          if (e.target.id === 'toggleSidebar') {
            document.getElementById('sidebar').classList.toggle('hidden');
          }
        });
      </script>
    </body>
    </html>
  `);
});

router.get('/home', (req, res) => {
  const user = req.session.user;
  res.send(`<h2>Selamat Datang ${user.nama} !</h2>`);
});

module.exports = router;
