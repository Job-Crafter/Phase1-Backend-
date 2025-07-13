// "use client";
// import { useState } from "react";
// import { runAudit, toggleRoadmap } from "@/lib/api";

// export default function ResumeView({ initial }) {
//   const [resume, setResume] = useState(initial);
//   const { _id, filename, goal, audit, roadmap } = resume;

//   // async function auditNow() {
//   //   const a = await runAudit(_id, goal);
//   //   setResume((prev) => ({
//   //     ...prev,
//   //     audit: `Found: ${a.foundSkills.join(", ")}\nMissing: ${a.missingSkills.join(", ")}`
//   //   }));
//   // }
//   async function auditNow() {
//   console.log("Running audit with:", _id, goal); // 👈 log values before sending

//   if (!_id || !goal) {
//     console.error("❌ Missing _id or goal");
//     return;
//   }

//   try {
//     const a = await runAudit(_id, goal);
//     setResume((prev) => ({
//       ...prev,
//       audit: `Found: ${a.foundSkills.join(", ")}\nMissing: ${a.missingSkills.join(", ")}`
//     }));
//   } catch (err) {
//     console.error("Audit failed:", err);
//   }
// }


//   async function toggleStep(i) {
//     const updated = { ...resume };
//     updated.roadmap[i].completed = !updated.roadmap[i].completed;
//     setResume(updated);
//     await toggleRoadmap(_id, i, updated.roadmap[i].completed);
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">{filename}</h2>

//       {!audit && (
//         <button
//           onClick={auditNow}
//           className="rounded bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
//         >
//           Run Skill Audit
//         </button>
//       )}

//       {audit && (
//         <div className="whitespace-pre-wrap rounded border bg-white p-4">
//           {audit}
//         </div>
//       )}

//       {roadmap?.length > 0 && (
//         <>
//           <h3 className="text-xl font-semibold">Roadmap</h3>
//           <ul className="space-y-2">
//             {roadmap.map((step, i) => (
//               <li key={i} className="flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   checked={step.completed}
//                   onChange={() => toggleStep(i)}
//                   className="mt-1"
//                 />
//                 <span className={step.completed ? "line-through opacity-70" : ""}>
//                   {step.step}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { runAudit } from "@/lib/api";
// import { CheckCircle, XCircle } from "lucide-react";

// export default function ResumeView({ initial }) {
//   const [resume, setResume] = useState(initial);
//   const { _id, filename, goal, audit } = resume;
//   const [found, setFound] = useState([]);
//   const [missing, setMissing] = useState([]);
//   const [showAudit, setShowAudit] = useState(false);

//   const handleAudit = async () => {
//     const result = await runAudit(_id, goal);
//     setFound(result.foundSkills);
//     setMissing(result.missingSkills);
//     setShowAudit(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-10">
//       <div className="max-w-5xl mx-auto space-y-8">
//         <h2 className="text-3xl font-bold text-center text-gray-800">
//           📝 Skill Audit Results for <span className="text-blue-600">{filename}</span>
//         </h2>

//         {!showAudit && (
//           <div className="text-center">
//             <button
//               onClick={handleAudit}
//               className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
//             >
//               Run Skill Audit
//             </button>
//           </div>
//         )}

//         {showAudit && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* ✅ Found Skills */}
//             <div className="bg-green-50 rounded-xl p-6 shadow-md">
//               <div className="flex items-center gap-2 text-green-700 mb-4">
//                 <CheckCircle className="w-6 h-6" />
//                 <h3 className="text-xl font-semibold">Found Skills</h3>
//               </div>
//               <ul className="space-y-2">
//                 {found.map((skill, i) => (
//                   <li
//                     key={i}
//                     className="bg-green-100 text-green-800 px-3 py-2 rounded-md shadow-sm hover:bg-green-200 transition"
//                   >
//                     {skill}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* ❌ Missing Skills */}
//             <div className="bg-red-50 rounded-xl p-6 shadow-md">
//               <div className="flex items-center gap-2 text-red-700 mb-4">
//                 <XCircle className="w-6 h-6" />
//                 <h3 className="text-xl font-semibold">Missing Skills</h3>
//               </div>
//               <ul className="space-y-2">
//                 {missing.map((skill, i) => (
//                   <li
//                     key={i}
//                     className="bg-red-100 text-red-800 px-3 py-2 rounded-md shadow-sm hover:bg-red-200 transition"
//                   >
//                     {skill}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState } from "react";
// import { runAudit } from "@/lib/api";
// import { CheckCircle, XCircle } from "lucide-react";

// const mockAISuggestions = {
//   youtube: [
//     { channel: "Codevolution", description: "Concise, modern React & Redux tutorials." },
//     { channel: "freeCodeCamp.org", description: "Full-length Redux masterclasses." },
//     { channel: "The Net Ninja", description: "Modern Redux Toolkit & React series." }
//   ],
//   github: [
//     { repo: "reduxjs/redux", description: "Official Redux library and examples." },
//     { repo: "reduxjs/redux-toolkit", description: "Official RTK with starter guides." },
//     { repo: "bradtraversy/devconnector", description: "Fullstack app using Redux." }
//   ],
//   docs: [
//     { title: "Redux Official Docs", url: "https://redux.js.org/" },
//     { title: "Redux Toolkit Docs", url: "https://redux-toolkit.js.org/" },
//     { title: "MDN on Redux", url: "https://developer.mozilla.org/en-US/docs/Web/Redux" }
//   ]
// };

// export default function ResumeView({ initial }) {
//   const [resume, setResume] = useState(initial);
//   const { _id, filename, goal } = resume;
//   const [found, setFound] = useState([]);
//   const [missing, setMissing] = useState([]);
//   const [showAudit, setShowAudit] = useState(false);

//   const handleAudit = async () => {
//     const result = await runAudit(_id, goal);
//     setFound(result.foundSkills);
//     setMissing(result.missingSkills);
//     setShowAudit(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-10">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <h2 className="text-3xl font-bold text-center text-gray-800">
//           🛠️ Skill Audit Results for <span className="text-blue-600">{filename}</span>
//         </h2>

//         {!showAudit && (
//           <div className="text-center">
//             <button
//               onClick={handleAudit}
//               className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
//             >
//               Run Skill Audit
//             </button>
//           </div>
//         )}

//         {showAudit && (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-green-50 rounded-xl p-6 shadow-md">
//                 <div className="flex items-center gap-2 text-green-700 mb-4">
//                   <CheckCircle className="w-6 h-6" />
//                   <h3 className="text-xl font-semibold">Found Skills</h3>
//                 </div>
//                 <ul className="space-y-2">
//                   {found.map((skill, i) => (
//                     <li
//                       key={i}
//                       className="bg-green-100 text-green-800 px-3 py-2 rounded-md shadow-sm hover:bg-green-200 transition"
//                     >
//                       {skill}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-red-50 rounded-xl p-6 shadow-md">
//                 <div className="flex items-center gap-2 text-red-700 mb-4">
//                   <XCircle className="w-6 h-6" />
//                   <h3 className="text-xl font-semibold">Missing Skills</h3>
//                 </div>
//                 <ul className="space-y-2">
//                   {missing.map((skill, i) => (
//                     <li
//                       key={i}
//                       className="bg-red-100 text-red-800 px-3 py-2 rounded-md shadow-sm hover:bg-red-200 transition"
//                     >
//                       {skill}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* AI Suggestions */}
//             <div className="mt-10">
//               <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">📚 AI Suggestions for Redux</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white rounded-xl p-5 shadow-md">
//                   <h4 className="text-lg font-semibold text-blue-600 mb-3">YouTube Channels</h4>
//                   <ul className="space-y-2">
//                     {mockAISuggestions.youtube.map((yt, i) => (
//                       <li key={i} className="border rounded p-2 hover:bg-blue-50">
//                         <span className="font-medium text-gray-800">{yt.channel}</span>
//                         <p className="text-sm text-gray-500">{yt.description}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="bg-white rounded-xl p-5 shadow-md">
//                   <h4 className="text-lg font-semibold text-green-600 mb-3">GitHub Repositories</h4>
//                   <ul className="space-y-2">
//                     {mockAISuggestions.github.map((gh, i) => (
//                       <li key={i} className="border rounded p-2 hover:bg-green-50">
//                         <span className="font-medium text-gray-800">{gh.repo}</span>
//                         <p className="text-sm text-gray-500">{gh.description}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="bg-white rounded-xl p-5 shadow-md">
//                   <h4 className="text-lg font-semibold text-purple-600 mb-3">Documentation</h4>
//                   <ul className="space-y-2">
//                     {mockAISuggestions.docs.map((doc, i) => (
//                       <li key={i} className="border rounded p-2 hover:bg-purple-50">
//                         <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-medium">
//                           {doc.title}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { runAudit } from "@/lib/api";
import { CheckCircle, XCircle } from "lucide-react";

/**
 * Call your Express backend to get AI‑ranked suggestions.
 */
async function getAISuggestions(missingSkills) {
  const res = await fetch("http://localhost:5000/api/ai/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skills: missingSkills })
  });
  if (!res.ok) throw new Error("Failed to fetch AI suggestions");
  const data = await res.json();
  return data.suggestions; // { Redux: { youtube: [...], github: [...], docs: [...]}, ... }
}

/** Utility card component */
function Card({ title, items, color }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-md border-t-4 border-${color}-500`}>
      <h4 className={`text-lg font-semibold text-${color}-600 mb-3`}>{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="border rounded p-2 hover:bg-gray-50 transition text-sm">
            {typeof item === "string" ? (
              <span>{item}</span>
            ) : item.url ? (
              <a href={item.url} target="_blank" className="text-blue-700 font-medium underline">
                {item.title}
              </a>
            ) : (
              <span>{item.channel || item.repo}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumeView({ initial }) {
  const [resume, setResume] = useState(initial);
  const { _id, filename, goal } = resume;

  const [found, setFound] = useState([]);
  const [missing, setMissing] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState({});
  const [showAudit, setShowAudit] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleAudit = async () => {
    // 1️⃣ Run skill audit (backend)
    const result = await runAudit(_id, goal);
    setFound(result.foundSkills);
    setMissing(result.missingSkills);
    setShowAudit(true);
    // 2️⃣ Fetch AI suggestions for the missing skills array
    try {
      setLoadingAI(true);
      const suggestions = await getAISuggestions(result.missingSkills);
      console.log("🧠 Missing Skills from Audit:", result.missingSkills);
      setAiSuggestions(suggestions);
    } catch (err) {
      console.error("AI suggestion error:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          🛠️ Skill Audit Results for <span className="text-blue-600">{filename}</span>
        </h2>

        {!showAudit && (
          <div className="text-center">
            <button
              onClick={handleAudit}
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
            >
              Run Skill Audit
            </button>
          </div>
        )}

        {showAudit && (
          <>
            {/* Found vs Missing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Found */}
              <div className="bg-green-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 text-green-700 mb-4">
                  <CheckCircle className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Found Skills</h3>
                </div>
                <ul className="space-y-2">
                  {found.map((skill) => (
                    <li key={skill} className="bg-green-100 text-green-800 px-3 py-2 rounded-md shadow-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing */}
              <div className="bg-red-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 text-red-700 mb-4">
                  <XCircle className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Missing Skills</h3>
                </div>
                <ul className="space-y-2">
                  {missing.map((skill) => (
                    <li key={skill} className="bg-red-100 text-red-800 px-3 py-2 rounded-md shadow-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Suggestions Section */}
            {loadingAI && (
              <p className="text-center text-gray-500 mt-8 animate-pulse">Fetching AI suggestions...</p>
            )}

            {!loadingAI && Object.keys(aiSuggestions).length > 0 && (
              Object.entries(aiSuggestions).map(([skill, data]) => (
                <div key={skill} className="mt-12 space-y-4">
                  <h3 className="text-2xl font-bold text-center text-gray-800">📚 Learn {skill}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card title="YouTube Channels" items={data.youtube} color="blue" />
                    <Card title="GitHub Repos" items={data.github} color="green" />
                    <Card title="Docs" items={data.docs} color="purple" />
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
