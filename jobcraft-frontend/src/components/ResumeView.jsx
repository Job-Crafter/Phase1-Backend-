"use client";
import { useState } from "react";
import { runAudit, toggleRoadmap } from "@/lib/api";

export default function ResumeView({ initial }) {
  const [resume, setResume] = useState(initial);
  const { _id, filename, goal, audit, roadmap } = resume;

  async function auditNow() {
    const a = await runAudit(_id, goal);
    setResume((prev) => ({
      ...prev,
      audit: `Found: ${a.foundSkills.join(", ")}\nMissing: ${a.missingSkills.join(", ")}`
    }));
  }

  async function toggleStep(i) {
    const updated = { ...resume };
    updated.roadmap[i].completed = !updated.roadmap[i].completed;
    setResume(updated);
    await toggleRoadmap(_id, i, updated.roadmap[i].completed);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{filename}</h2>

      {!audit && (
        <button
          onClick={auditNow}
          className="rounded bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
        >
          Run Skill Audit
        </button>
      )}

      {audit && (
        <div className="whitespace-pre-wrap rounded border bg-white p-4">
          {audit}
        </div>
      )}

      {roadmap?.length > 0 && (
        <>
          <h3 className="text-xl font-semibold">Roadmap</h3>
          <ul className="space-y-2">
            {roadmap.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => toggleStep(i)}
                  className="mt-1"
                />
                <span className={step.completed ? "line-through opacity-70" : ""}>
                  {step.step}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
