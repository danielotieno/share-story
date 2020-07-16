import express from 'express';

const router = express.Router();

// @desc    Login/Landing Page
// @route   GET /
router.get('/', (req, res) => {
  res.render('This is a homepage');
});

// @desc    Dashboard Page
// @route   GET /
router.get('/dashboard', (req, res) => {
  res.render('This is a dashboard page');
});

export default router;
