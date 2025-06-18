const express = require('express');
const router = express.Router();
const { auditResume } = require('../controllers/skillAuditController');

router.post('/skills', auditResume);

module.exports = router;
