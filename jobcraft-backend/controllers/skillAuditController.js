const Resume = require('../models/resume');
const skillMap = require('../data/skillMaps');

function extractSkills(text, roleSkills) {
  const lowerText = text.toLowerCase();
  return roleSkills.filter(skill =>
    lowerText.includes(skill.toLowerCase())
  );
}

const auditResume = async (req, res) => {
  const { resumeId, goal } = req.body;

  if (!resumeId || !goal) {
    return res.status(400).json({ error: 'resumeId and goal are required' });
  }

  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    const roleSkills = skillMap[goal];
    if (!roleSkills) return res.status(400).json({ error: 'Invalid role/goal' });

    const foundSkills = extractSkills(resume.resumeText, roleSkills);
    const missingSkills = roleSkills.filter(skill => !foundSkills.includes(skill));

    // Optional: save to DB for future use
    resume.audit = `Found: ${foundSkills.join(', ')} | Missing: ${missingSkills.join(', ')}`;
    await resume.save();

    res.json({
      resumeId,
      goal,
      foundSkills,
      missingSkills
    });
  } catch (err) {
    console.error('Skill audit error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { auditResume };
