const express = require('express');
const router  = express.Router();
const Resume  = require('../models/resume');

console.log('resume route loaded');          // <‑ debug line

// *** debug middleware to show any hit to this router
router.use((req, res, next) => {
  console.log('hit resume router URL =', req.url);
  next();
});

// GET /api/resume/:id
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
