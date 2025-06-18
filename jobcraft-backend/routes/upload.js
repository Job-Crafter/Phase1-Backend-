// const express = require('express');
// const router = express.Router();
// const upload = require('../uploads/upload');
// const { spawn } = require('child_process');
// const path = require('path');
// const Resume = require('../models/resume');
// router.post('/resume', upload.single('resume'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const resumePath = path.join(__dirname, '../uploads', req.file.filename);
//     //   const python = spawn('p0ython', ['resume_parser/parse_resume.py', resumePath]);

//     const python = spawn('python', ['resume_parser/parse_resume.py', resumePath], {
//         env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
//     });


//     let parsedText = '';

//     python.stdout.on('data', (data) => {
//         parsedText += data.toString();
//     });

//     python.stderr.on('data', (data) => {
//         console.error(`Python error: ${data}`);
//     });

//     // python.on('close', () => {

//     //     // res.json({
//     //     //   message: 'Parsed resume successfully ✅',
//     //     //   resumeText: parsedText
//     //     // });
//     //     try {
//     //         const newResume = new Resume({
//     //             filename: req.file.originalname,
//     //             resumeText: parsedText
//     //             // You can add goal or other fields here if needed
//     //         });

//     //         const savedResume = await newResume.save();

//     //         res.json({
//     //             message: 'Resume uploaded and stored in MongoDB ✅',
//     //             resume: savedResume
//     //         });
//     //     } catch (err) {
//     //         console.error('Error saving to DB:', err);
//     //         res.status(500).json({ error: 'Failed to save resume to database' });
//     //     }
//     // });
//     python.on('close', async () => {
//   try {
//     const newResume = new Resume({
//       filename: req.file.originalname,
//       resumeText: parsedText
//     });

//     const savedResume = await newResume.save();

//     // OPTIONAL: delete uploaded file after parsing
//     // const fs = require('fs-extra');
//     // await fs.remove(resumePath);

//     res.json({
//       message: 'Resume uploaded and stored in MongoDB ✅',
//       resume: savedResume
//     });
//   } catch (err) {
//     console.error('Error saving to DB:', err);
//     res.status(500).json({ error: 'Failed to save resume to database' });
//   }
// });

// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const upload = require('../uploads/upload');
// const { spawn } = require('child_process');
// const path = require('path');
// const Resume = require('../models/resume'); // Mongoose model
// // const fs = require('fs-extra'); // Optional: for deleting uploaded file

// router.post('/resume', upload.single('resume'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   const resumePath = path.join(__dirname, '../uploads', req.file.filename);
//   const python = spawn('python', ['resume_parser/parse_resume.py', resumePath], {
//     env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
//   });

//   let parsedText = '';

//   // ✅ Read Python output
//   python.stdout.on('data', (data) => {
//     console.log('Python stdout:', data.toString()); // debug log
//     parsedText += data.toString();
//   });

//   // ✅ Log any Python error
//   python.stderr.on('data', (data) => {
//     console.error('Python error:', data.toString());
//   });

//   // ✅ After Python finishes, save to MongoDB
//   python.on('close', async () => {
//     console.log('Final parsed text:', parsedText); // debug log

//     try {
//       const newResume = new Resume({
//         filename: req.file.originalname,
//         resumeText: parsedText
//       });

//       const saved = await newResume.save();

//       // Optional: delete uploaded file to save space
//       // await fs.remove(resumePath);

//       res.json({
//         message: 'Resume parsed and saved to MongoDB ✅',
//         resume: saved
//       });
//     } catch (err) {
//       console.error('MongoDB Save Error:', err);
//       res.status(500).json({ error: 'Failed to save resume to MongoDB' });
//     }
//   });
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const upload = require('../uploads/upload');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs-extra'); // make sure to npm install fs-extra
const Resume = require('../models/resume');

// POST /api/upload/resume
// ───────────────────────
// 1. Saves the uploaded PDF temporarily in /uploads
// 2. Parses text via Python (PyMuPDF)
// 3. Stores full document in MongoDB with goal, audit placeholder & empty roadmap
// 4. Removes the temp PDF to keep disk clean
// 5. Returns the full saved object (contains _id for frontend)
router.post('/resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const goal = req.body.goal || '';
    const resumePath = path.join(__dirname, '../uploads', req.file.filename);

    const python = spawn('python', ['resume_parser/parse_resume.py', resumePath], {
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });

    let parsedText = '';
    python.stdout.on('data', data => {
      parsedText += data.toString();
    });

    python.stderr.on('data', data => {
      console.error(`Python error: ${data}`);
    });

    python.on('close', async () => {
      try {
        // Create DB entry with placeholders for later audit/roadmap
        const newResume = new Resume({
          filename: req.file.originalname,
          resumeText: parsedText,
          goal,
          audit: '',
          roadmap: []
        });

        const saved = await newResume.save();

        // Clean up uploaded file to avoid disk bloat
        await fs.remove(resumePath);

        // Return the saved document (contains _id the frontend will use)
        res.json({
          message: 'Resume parsed and saved to MongoDB ✅',
          resume: saved
        });
      } catch (err) {
        console.error('Error saving to DB:', err);
        res.status(500).json({ error: 'Failed to save resume to database' });
      }
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
