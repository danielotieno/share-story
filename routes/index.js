const express = require('express');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const router = express.Router();

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc    Dashboard Page
// @route   GET /
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', { name: req.user.displayName });
});

module.exports = router;
