const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const db = require('./db');
// server.js
const sidebarHeader = require('./sidebar/header');
const sidebarFooter = require('./sidebar/footer');
const sidebarLeftside = require('./sidebar/leftside');

app.use('/sidebar/header', sidebarHeader);
app.use('/sidebar/footer', sidebarFooter);
app.use('/sidebar/leftside', sidebarLeftside);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/dataset', express.static(path.join(__dirname, 'dataset')));

app.use(session({
  secret: 'rahasia_sessionmu',
  resave: false,
  saveUninitialized: false
}));

// Middleware: Cek login
function cekLogin(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

// Route publik
app.use('/', require('./halamanawal'));
app.use('/login', require('./login/login'));
app.use('/login', require('./login/logout'));

// Route privat
app.use('/dashboard', cekLogin, require('./dashboard/admin'));
app.use('/sidebar', cekLogin, require('./sidebar/header'));
app.use('/sidebar', cekLogin, require('./sidebar/footer'));
app.use('/sidebar', cekLogin, require('./sidebar/leftside'));
app.use('/users', cekLogin, require('./users/indeks'));
app.use('/users', cekLogin, require('./users/create'));
app.use('/users', cekLogin, require('./users/edit'));
app.use('/users', cekLogin, require('./users/update'));
app.use('/users', cekLogin, require('./users/delete'));

const PORT = 3005;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));
