// src/lib/api.js   ←  make sure the file has .js (or .jsx) extension
const API = "http://localhost:5000/api";

/** Upload a PDF and goal, returns the saved resume record */
export async function uploadResume(file, goal) {
  const fd = new FormData();
  fd.append("resume", file);
  fd.append("goal", goal);

  const res = await fetch(`${API}/upload/resume`, { method: "POST", body: fd });
  if (!res.ok) throw await res.json();          // surface backend errors
  return (await res.json()).resume;             // { _id, filename, goal, ... }
}

/** Fetch one resume by MongoDB _id */
export async function fetchResume(id) {
  const res = await fetch(`${API}/resume/${id}`);
  if (!res.ok) throw await res.json();
  return res.json();
}

/** Run the skill‑audit endpoint */
export async function runAudit(id, goal) {
  const res = await fetch(`${API}/audit/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeId: id, goal })
  });
  if (!res.ok) throw await res.json();
  return res.json();                            // { foundSkills, missingSkills }
}

/** Toggle completion of one roadmap step */
export async function toggleRoadmap(id, index, completed) {
  await fetch(`${API}/resume/step`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeId: id, index, completed })
  });
}
