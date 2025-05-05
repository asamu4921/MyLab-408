// views/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MyLab Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .content {
        display: flex;
        flex: 1;
      }
      aside {
        width: 220px;
        transition: all 0.3s;
      }
      aside.collapsed {
        width: 0;
        overflow: hidden;
      }
      main {
        flex-grow: 1;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <button class="btn btn-outline-light me-3" id="toggleSidebar">☰</button>
      <a class="navbar-brand" href="#">MyLab</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="#" onclick="loadPage('/matkul')">Data Matkul</a></li>
          <li class="nav-item"><a class="nav-link" href="#" onclick="loadPage('/users')">Users</a></li>
          <li class="nav-item"><a class="nav-link" href="#" onclick="loadPage('/users_ruang')">Ruang Users</a></li>
          <li class="nav-item"><a class="nav-link" href="#" onclick="loadPage('/display')">Display</a></li>
          <li class="nav-item"><a class="nav-link" href="#" onclick="loadPage('/ruang')">Ruang</a></li>
          <li class="nav-item"><a class="nav-link" href="#" onclick="loadPage('/api')">API</a></li>
          <a href="/" class="btn btn-secondary mb-3">Logout</a>
        </ul>
      </div>
    </nav>

    <!-- Sidebar + Main -->
    <div class="content">
      <aside class="bg-light border-end p-3" id="sidebar">
        <ul class="nav flex-column">
          <li><a href="#" class="nav-link" onclick="loadPage('/matkul')">Data Matkul</a></li>
          <li><a href="#" class="nav-link" onclick="loadPage('/users')">Users</a></li>
          <li><a href="#" class="nav-link" onclick="loadPage('/users_ruang')">Ruang Users</a></li>
          <li><a href="#" class="nav-link" onclick="loadPage('/display')">Display</a></li>
          <li><a href="#" class="nav-link" onclick="loadPage('/ruang')">Ruang</a></li>
          <li><a href="#" class="nav-link" onclick="loadPage('/api')">API</a></li>
        </ul>
      </aside>
      <main>
        <h1>Selamat datang di Dashboard MyLab</h1>
        <p>Silakan pilih menu di sidebar atau navbar untuk melihat data.</p>
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      const toggleBtn = document.getElementById('toggleSidebar');
      const sidebar = document.getElementById('sidebar');
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });

      function loadPage(url) {
        fetch(url)
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector('body');
            document.querySelector('main').innerHTML = content.innerHTML;
          })
          .catch(error => {
            console.error('Gagal memuat halaman:', error);
            document.querySelector('main').innerHTML = '<p>Error loading content.</p>';
          });
      }
    </script>
  </body>
  </html>
  `;
  res.send(html);
});

module.exports = router;
