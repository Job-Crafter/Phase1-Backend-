// const express = require("express");
// const router = express.Router();
// const resources = require("../data/LearningResources");
// const axios = require("axios");

// const COHERE_API_KEY = process.env.COHERE_API_KEY;
// const PORT = process.env.PORT;
// // console.log("POST", process.env.PORT); 
// router.post("/suggestions", async (req, res) => {
//   const { skills } = req.body;
//   if (!skills || !Array.isArray(skills)) {
//     return res.status(400).json({ error: "Skills must be an array" });
//   }

//   const result = {};

//   for (const skill of skills) {
//     const skillData = resources[skill];
//     if (!skillData) continue;

//     const suggest = {};

//     for (const [type, docs] of Object.entries(skillData)) {
//       const { data } = await axios.post(
//         "https://api.cohere.ai/v1/rerank",
//         {
//           query: `Best ${type} to learn ${skill}`,
//           documents: docs,
//           top_n: 3
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${COHERE_API_KEY}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       suggest[type] = data.results.map(({ index }) => docs[index]);
//     }

//     result[skill] = suggest;
//   }

//   res.json({ suggestions: result });
// });

// module.exports = router;

// const express = require("express");
// const router  = express.Router();
// const resources = require("../data/LearningResources");
// const axios   = require("axios");

// const COHERE_API_KEY = process.env.COHERE_API_KEY;

// router.post("/suggestions", async (req, res) => {
//   const { skills } = req.body;
//   console.log("Received skills for suggestion:", skills);
//   if (!Array.isArray(skills) || skills.length === 0)
//     return res.status(400).json({ error: "Skills must be an array" });

//   const result = {};

//   for (const skill of skills) {
//     const skillData = resources[skill];
//     if (!skillData) continue;             // skip unknown skill

//     const suggest = {};

//     for (const [type, docs] of Object.entries(skillData)) {
//       // 🔑 Cohere needs an array of plain strings
//       const docStrings = docs.map((d) =>
//         typeof d === "string" ? d : `${d.title} – ${d.url}`
//       );

//       if (docStrings.length === 0) continue;

//       try {
//         const { data } = await axios.post(
//           "https://api.cohere.ai/v1/rerank",
//           {
//             query: `Best ${type} to learn ${skill}`,
//             documents: docStrings,
//             top_n: 3
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${COHERE_API_KEY}`,
//               "Content-Type": "application/json"
//             }
//           }
//         );

//         // pick the top‑n docs returned by Cohere
//         suggest[type] = data.results.map(({ index }) => docStrings[index]);
//       } catch (err) {
//         // log why it failed and fall back to first 3
//         console.error(`Cohere error for ${skill}/${type}:`,
//                       err.response?.data || err.message);
//         suggest[type] = docStrings.slice(0, 3);
//       }
//     }

//     result[skill] = suggest;
//   }

//   res.json({ suggestions: result });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const resources = require("../data/LearningResources");
const axios = require("axios");

const COHERE_API_KEY = process.env.COHERE_API_KEY;

router.post("/suggestions", async (req, res) => {
  const { skills } = req.body;
  console.log("Received skills for suggestion:", skills);
  if (!Array.isArray(skills) || skills.length === 0)
    return res.status(400).json({ error: "Skills must be an array" });

  const result = {};

//   for (const skill of skills) {
//     const skillKey = Object.keys(resources).find(
//       (k) => k.toLowerCase() === skill.toLowerCase()
//     );
//     const skillData = resources[skillKey];

//     if (!skillData) {
//       console.warn(`❌ Skill not found in resources: "${skill}"`);
//       continue;
//     }

//     const suggest = {};

//     for (const [type, docs] of Object.entries(skillData)) {
//       const docStrings = docs.map((d) =>
//         typeof d === "string" ? d : `${d.title} – ${d.url}`
//       );

//       if (docStrings.length === 0) continue;

//       try {
//         const { data } = await axios.post(
//           "https://api.cohere.ai/v1/rerank",
//           {
//             query: `Best ${type} to learn ${skill}`,
//             documents: docStrings,
//             top_n: 3
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${COHERE_API_KEY}`,
//               "Content-Type": "application/json"
//             }
//           }
//         );

//         suggest[type] = data.results.map(({ index }) => docStrings[index]);
//       } catch (err) {
//         console.error(`Cohere error for ${skill}/${type}:`, err.response?.data || err.message);
//         suggest[type] = docStrings.slice(0, 3); // fallback
//       }
//     }

//     result[skill] = suggest;
//   }
for (const skill of skills) {
  console.log("🔎 Processing skill:", skill);

  const skillKey = Object.keys(resources).find(
    (k) => k.toLowerCase() === skill.toLowerCase()
  );
  if (!skillKey) {
    console.warn(`❌ Skill not matched in resources: "${skill}"`);
    continue;
  }

  const skillData = resources[skillKey];
  const suggest = {};

  for (const [type, docs] of Object.entries(skillData)) {
    const docStrings = docs.map((d) =>
      typeof d === "string" ? d : `${d.title} – ${d.url}`
    );

    if (docStrings.length === 0) {
      console.warn(`⚠️ No docs for ${skill}/${type}`);
      continue;
    }

    console.log(`📤 Sending ${docStrings.length} docs to Cohere for ${skill}/${type}...`);

    try {
      const { data } = await axios.post(
        "https://api.cohere.ai/v1/rerank",
        {
          query: `Best ${type} to learn ${skill}`,
          documents: docStrings,
          top_n: 3
        },
        {
          headers: {
            Authorization: `Bearer ${COHERE_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      suggest[type] = data.results.map(({ index }) => docStrings[index]);
      console.log(`✅ Received top ${type} for ${skill}`);
    } catch (err) {
      console.error(`❌ Cohere error for ${skill}/${type}:`, err.response?.data || err.message);
      suggest[type] = docStrings.slice(0, 3);
    }
  }

  result[skill] = suggest;
}


  console.log("✅ Final AI Suggestions Result:", result);
//   res.json({ suggestions: result });
});

module.exports = router;
