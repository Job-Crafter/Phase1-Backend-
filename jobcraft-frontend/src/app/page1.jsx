"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !goal) return setError("Select PDF and enter a goal.");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("goal", goal);

    try {
      const res = await fetch("http://localhost:5000/api/upload/resume", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      router.push(`/resume/${data.resume._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10 space-y-4 rounded-xl border bg-white p-6 shadow">
      <h1 className="text-2xl font-bold text-center">Upload Resume</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="w-full"
        />
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter goal (e.g. React Developer)"
          className="w-full rounded border p-2"
        />
        <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
          Upload & Analyse
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </section>
  );
}
