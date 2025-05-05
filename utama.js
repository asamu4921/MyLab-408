// utama.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware untuk parsing URL-encoded data dan JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));
// Rute untuk halaman awal dengan tombol
app.get('/', (req, res) => {
    const html = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mylab</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .text-primary-0 { color: #0d6efd; }
        .text-tersier-0 { color: #6c757d; }
        .text-secondary-0 { color: #adb5bd; }
        .bg-primary-0 { background-color: #0d6efd; }
        .bg-tersier-0 { background-color: #6c757d; }
        .project-img { width: 100%; height: 200px; object-fit: cover; }
        .footer-bg {
            background-color: #0d6efd;
        }
        .footer-link:hover {
            color: #ffc107 !important;
        }
        .footer-icon {
            width: 36px;
            height: 36px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #dee2e6;
            border-radius: 50%;
            margin-right: 8px;
        }
        .footer-icon:hover {
            background-color: #ffc107;
            border-color: #ffc107;
            color: white;
        }
    </style>
</head>
<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary-0">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#home">Mylab</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#portfolio">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Contact</a>
                    </li>
                            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="ruangLabDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Ruang Lab
          </a>
          <ul class="dropdown-menu" aria-labelledby="ruangLabDropdown">
            <li><a class="dropdown-item" href="/ruang/gu.601">GU.601</a></li>
            <li><a class="dropdown-item" href="/ruang/gu601">GU 601</a></li>
            <li><a class="dropdown-item" href="/ruang/gu604">GU.604</a></li>
            <li><a class="dropdown-item" href="/ruang/gu606">GU.606</a></li>
            <li><a class="dropdown-item" href="/ruang/gu607">GU.607</a></li>
            <li><a class="dropdown-item" href="/ruang/gu608">GU.608</a></li>
            <li><a class="dropdown-item" href="/ruang/gu702">GU.702</a></li>
            <li><a class="dropdown-item" href="/ruang/gu704">GU.704</a></li>
            <li><a class="dropdown-item" href="/ruang/gu705">GU.705</a></li>
            <li><a class="dropdown-item" href="/ruang/gu706">GU.706</a></li>
            <li><a class="dropdown-item" href="/ruang/gu707">GU.707</a></li>
            <li><a class="dropdown-item" href="/ruang/gu805">GU.805</a></li>
            <li><a class="dropdown-item" href="/ruang/rtfiii1">RTF.III.1</a></li>
            <li><a class="dropdown-item" href="/ruang/rtfiii3">RTF.III.3</a></li>
            <li><a class="dropdown-item" href="/ruang/rtfiii6">RTF.III.6</a></li>
            <li><a class="dropdown-item" href="/ruang/rtfiv1">RTF.IV.1</a></li>
            <li><a class="dropdown-item" href="/ruang/rtfiv2">RTF.IV.2</a></li>
            <li><a class="dropdown-item" href="/ruang/rtfiv4">RTF.IV.4</a></li>
            <li><a class="dropdown-item" href="/ruang/rtfv4">RTF.V.4</a></li>
            <li><a class="dropdown-item" href="/ruang/tax3">TA.X.3</a></li>
            <li><a class="dropdown-item" href="/ruang/tax4">TA.X.4</a></li>
            <li><a class="dropdown-item" href="/ruang/taxi3">TA.XI.3</a></li>
            <li><a class="dropdown-item" href="/ruang/taxi4a">TA.XI.4</a></li>
          </ul>
        </li>

        <!-- Dropdown Ruang Dosen -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="ruangDosenDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Ruang Dosen
          </a>
          <ul class="dropdown-menu" aria-labelledby="ruangDosenDropdown">
            <li><a class="dropdown-item" href="/ruang/ruangdosen1">ruang dosen 1</a></li>
          </ul>
        </li>
                </ul>
                                    <form action="/dashboard" method="get">
          <button type="submit" class="btn btn-primary btn-lg">Login</button>
        </form>
            </div>
        </div>
    </nav>

    <!-- Banner -->
    <section id="home" class="pt-5 text-primary-0">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <h1 class="fs-4 fw-semibold">Hello👋, Welcome to 
                        <span class="d-block fw-bold fs-1 text-tersier-0 mt-1">Mylab</span>
                    </h1>
                    <h2 class="fw-medium fs-5 mb-3">Temukan Ruang Lab dan Dosen Polibatam ! | <span class="text-secondary-0">😊</span></h2>
                    <p class="fw-medium text-secondary-0 mb-4">"Pengembangan IOT, Display ketersediaan Ruang dan Dosen menggunakan Raspberry PI"</p>
                    <a class="fw-semibold fs-6 text-white bg-secondary py-2 px-4 rounded-pill shadow-sm text-decoration-none" href="#about">
                        Contact Person
                    </a>
                </div>
                <div class="col-md-6">
                    <img src="img/banner.jpg" alt="Banner" class="img-fluid rounded-3 shadow-lg">
                </div>
            </div>
        </div>
    </section>

    <!-- About -->
    <section id="about" class="pt-5 pb-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 mb-5">
                    <h4 class="fw-bold text-uppercase text-primary-0 mb-3 text-tersier-0">About Us</h4>
                    <h2 class="fw-bold text-slate-900 fs-2 mb-3">Current</h2>
                    <p class="text-secondary-0 fw-medium">
                        Hey, We're PBL-408 TRPL 4-B.
                    </p>
                </div>
                <div class="col-lg-12">
                    <h3 class="fw-semibold text-slate-900 fs-4 mb-3">Get in Touch</h3>
                    <p class="text-secondary-0 fw-medium mb-4">
                        For a comprehensive understanding or any specific details, feel free to get in touch with me. I'm readily to provide you with further information and assistance.
                    </p>
                    <div class="d-flex align-items-center gap-2">
                        <a href="https://www.youtube.com/channel/UCSsfvdt47_AUAz4PRyfaCJg" target="_blank" class="btn btn-outline-secondary btn-sm rounded-circle">
                            <i class="bi bi-youtube"></i>
                        </a>
                        <a href="https://github.com/IAmNewbe" target="_blank" class="btn btn-outline-secondary btn-sm rounded-circle">
                            <i class="bi bi-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/ahmad-169085247/" target="_blank" class="btn btn-outline-secondary btn-sm rounded-circle">
                            <i class="bi bi-linkedin"></i>
                        </a>
                        <a href="mailto:ahlulhikam2222@gmail.com" target="_blank" class="btn btn-outline-secondary btn-sm rounded-circle">
                            <i class="bi bi-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio -->
    <section id="portfolio" class="py-5 bg-light">
        <div class="container">
            <div class="text-center mb-5">
                <h4 class="fw-semibold text-uppercase text-tersier-0 mb-2">Profile</h4>
                <h2 class="fw-bold text-primary-0">Our Member</h2>
            </div>
            <div class="row g-4">
                <!-- Members -->
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="img/mpleh1.jpg" class="card-img-top project-img" alt="Ahmad Saif Al Muflihin">
                        <div class="card-body text-center">
                            <h5 class="card-title">Ahmad Saif Al Muflihin</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="img/grecia1.jpg" class="card-img-top project-img" alt="Grecia Joy Manalu">
                        <div class="card-body text-center">
                            <h5 class="card-title">Grecia </h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="img/iqbal.jpg" class="card-img-top project-img" alt="Grecia Joy Manalu">
                        <div class="card-body text-center">
                            <h5 class="card-title">iqbal</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="img/naura1.jpg" class="card-img-top project-img" alt="Grecia Joy Manalu">
                        <div class="card-body text-center">
                            <h5 class="card-title">naura</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="img/nuri1.jpg" class="card-img-top project-img" alt="Grecia Joy Manalu">
                        <div class="card-body text-center">
                            <h5 class="card-title">nuri</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="img/kavit1.jpg" class="card-img-top project-img" alt="Grecia Joy Manalu">
                        <div class="card-body text-center">
                            <h5 class="card-title">kavit</h5>
                        </div>
                    </div>
                </div>
                <!-- Additional Members -->
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-bg text-white pt-5 pb-5">
        <div class="container">
            <div class="row">
                <!-- About Section -->
                <div class="col-md-4 mb-4">
                    <h2 class="fw-bold mb-3">MyLab</h2>
                    <h3 class="h5">Contact Us</h3>
                    <p>PBL-408</p>
                    <p>Gedung TA.12 Polibatam Teluk Tering Batam Center, 29461</p>
                    <p>Batam</p>
                </div>
                <!-- Article Section -->
                <div class="col-md-4 mb-4">
                    <h3 class="fw-bold mb-3">Article</h3>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white text-decoration-none footer-link">Belum ada</a></li>
                    </ul>
                </div>
                <!-- Links Section -->
                <div class="col-md-4 mb-4">
                    <h3 class="fw-bold mb-3">Links</h3>
                    <ul class="list-unstyled">
                        <li><a href="#home" class="text-white text-decoration-none footer-link">Home</a></li>
                        <li><a href="#about" class="text-white text-decoration-none footer-link">About</a></li>
                        <li><a href="#portofolio" class="text-white text-decoration-none footer-link">Portfolio</a></li>
                        <li><a href="#skill" class="text-white text-decoration-none footer-link">Skills</a></li>
                        <li><a href="#contact" class="text-white text-decoration-none footer-link">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-top border-white pt-3">
                <!-- Social Media Icons -->
                <div class="d-flex justify-content-center mb-3">
                    <a href="https://www.youtube.com/channel/UCSsfvdt47_AUAz4PRyfaCJg" target="_blank" class="footer-icon text-white">
                        <svg role="img" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="https://github.com/IAmNewbe" target="_blank" class="footer-icon text-white">
                        <svg role="img" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </a>
                    <!-- Add other social links similarly -->
                </div>
                <p class="text-center mb-0">Copyrights 2025 All Right Reserved, Developed by <span class="fw-bold text-warning">PBL-408</span></p>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
    res.send(html);
  });
  
  // Gunakan router dari views/index.js untuk rute '/dashboard'
  const dashboardRouter = require('./barupol/index');
  app.use('/dashboard', dashboardRouter);
  
app.use('/matkul', require('./barupol/matkul'));
app.use('/users', require('./barupol/users'));
app.use('/users_ruang', require('./barupol/users_ruang'));
app.use('/display', require('./barupol/display'));
app.use('/ruang', require('./barupol/ruang'));
app.use('/api', require('./barupol/api'));
// Dalam utama.js
app.use('/ruang/gu.601', require('./ruang/gu.601'));
app.use('/ruang/gu601', require('./ruang/gu601'));
app.use('/ruang/gu604', require('./ruang/gu604'));
app.use('/ruang/gu606', require('./ruang/gu606'));
app.use('/ruang/gu607', require('./ruang/gu607'));
app.use('/ruang/gu608', require('./ruang/gu608'));
app.use('/ruang/gu702', require('./ruang/gu702'));
app.use('/ruang/gu704', require('./ruang/gu704'));
app.use('/ruang/gu705', require('./ruang/gu705'));
app.use('/ruang/gu706', require('./ruang/gu706'));
app.use('/ruang/gu707', require('./ruang/gu707'));
app.use('/ruang/gu805', require('./ruang/gu805'));
app.use('/ruang/rtfiii1', require('./ruang/rtfiii1'));
app.use('/ruang/rtfiii3', require('./ruang/rtfiii3'));
app.use('/ruang/rtfiii6', require('./ruang/rtfiii6'));
app.use('/ruang/rtfiv1', require('./ruang/rtfiv1'));
app.use('/ruang/rtfiv2', require('./ruang/rtfiv2'));
app.use('/ruang/rtfiv4', require('./ruang/rtfiv4'));
app.use('/ruang/rtfv4', require('./ruang/rtfv4'));
app.use('/ruang/tax3', require('./ruang/tax3'));
app.use('/ruang/tax4', require('./ruang/tax4'));
app.use('/ruang/taxi3', require('./ruang/taxi3'));
app.use('/ruang/taxi4a', require('./ruang/taxi4a'));
app.use('/ruang/ruangdosen1', require('./ruang/ruangdosen1'));

// Menjalankan server pada port 3000
const port = 300;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
