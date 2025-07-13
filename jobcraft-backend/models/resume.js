// const mongoose = require('mongoose');

// const ResumeSchema = new mongoose.Schema({
//   filename: String,             // original file name
//   resumeText: String,           // parsed text from PDF
//   goal: String,                 // optional: like "Frontend Developer"
//   audit: String,                // for AI audit (Phase 2)
//   roadmap: [                    // for learning roadmap (Phase 3)
//     {
//       step: String,
//       completed: { type: Boolean, default: false }
//     }
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Resume', ResumeSchema);

const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  filename: String,
  resumeText: String,
  goal: String, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

