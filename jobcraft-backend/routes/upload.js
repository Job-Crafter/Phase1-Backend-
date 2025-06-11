const express = require('express');
const router = express.Router();
const upload = require('../uploads/upload');
const { spawn } = require('child_process');
const path = require('path');
const Resume = require('../models/resume');
router.post('/resume', upload.single('resume'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const resumePath = path.join(__dirname, '../uploads', req.file.filename);
    //   const python = spawn('p0ython', ['resume_parser/parse_resume.py', resumePath]);

    const python = spawn('python', ['resume_parser/parse_resume.py', resumePath], {
        env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });


    let parsedText = '';

    python.stdout.on('data', (data) => {
        parsedText += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    // python.on('close', () => {

    //     // res.json({
    //     //   message: 'Parsed resume successfully ✅',
    //     //   resumeText: parsedText
    //     // });
    //     try {
    //         const newResume = new Resume({
    //             filename: req.file.originalname,
    //             resumeText: parsedText
    //             // You can add goal or other fields here if needed
    //         });

    //         const savedResume = await newResume.save();

    //         res.json({
    //             message: 'Resume uploaded and stored in MongoDB ✅',
    //             resume: savedResume
    //         });
    //     } catch (err) {
    //         console.error('Error saving to DB:', err);
    //         res.status(500).json({ error: 'Failed to save resume to database' });
    //     }
    // });
    python.on('close', async () => {
  try {
    const newResume = new Resume({
      filename: req.file.originalname,
      resumeText: parsedText
    });

    const savedResume = await newResume.save();

    // OPTIONAL: delete uploaded file after parsing
    // const fs = require('fs-extra');
    // await fs.remove(resumePath);

    res.json({
      message: 'Resume uploaded and stored in MongoDB ✅',
      resume: savedResume
    });
  } catch (err) {
    console.error('Error saving to DB:', err);
    res.status(500).json({ error: 'Failed to save resume to database' });
  }
});

});

module.exports = router;
