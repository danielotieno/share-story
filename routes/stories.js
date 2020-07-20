const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const Story = require('../models/Story');

const router = express.Router();

// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
});

// @desc    Process add form
// @route   GET /stories/add
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.render('/error/500');
  }
});

// @desc    Show all stories
// @route   GET /stories/
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();
    res.redirect('/stories/index', { stories });
  } catch (err) {
    console.log(err);
    res.redirect('error/500');
  }
});

module.exports = router;
