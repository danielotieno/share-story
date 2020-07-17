import express from 'express';

const router = express.Router();

// @desc    Login/Landing Page
// @route   GET /
router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login'
  });
});

// @desc    Dashboard Page
// @route   GET /
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

export default router;
