// "use client";
// import { useState } from "react";
// import { uploadResume } from "@/lib/api";
// import { useRouter } from "next/navigation";

// export default function Upload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [goal, setGoal] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handle = async () => {
//     if (!file || !goal) return setError("Select PDF and enter goal.");
//     try {
//       const res = await uploadResume(file, goal);
//       router.push(`/resume/${res._id}`);
//     } catch (e: any) {
//       setError(e.error ?? "Upload failed");
//     }
//   };

//   return (
//     <section className="space-y-4 rounded-xl border bg-white p-6 shadow">
//       <h1 className="text-xl font-semibold">Upload your resume</h1>

//       <input type="file" accept=".pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
//       <input
//         value={goal}
//         onChange={e => setGoal(e.target.value)}
//         placeholder="Target role (e.g. React Developer)"
//         className="w-full rounded border p-2"
//       />

//       <button onClick={handle} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
//         Upload & Analyse
//       </button>

//       {error && <p className="text-red-600">{error}</p>}
//     </section>
//   );
// }


// "use client";
// import { useState } from "react";

// export default function UploadDebug() {
//   console.log("Upload component mounted");
//   const [file, setFile] = useState(null);
//   const [goal, setGoal] = useState("");

//   async function handleClick() {
//     console.log("handle called", { file, goal });
//   }

//   return (
//     <div className="p-6">
//       <input
//         type="file"
//         accept=".pdf"
//         onChange={(e) => {
//           console.log("file change", e.target.files);
//           setFile(e.target.files?.[0] || null);
//         }}
//       />
//       <input
//         className="border mx-2"
//         placeholder="goal"
//         value={goal}
//         onChange={(e) => setGoal(e.target.value)}
//       />
//       <button
//         type="button"
//         className="bg-blue-600 text-white px-4 py-2"
//         onClick={handleClick}
//       >
//         Test Upload
//       </button>
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";
// import { uploadResume } from "@/lib/api";
// import { useRouter } from "next/navigation";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [goal, setGoal] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!file || !goal) return setError("PDF + goal required");
//     try {
//       const saved = await uploadResume(file, goal);
//       router.push(`/resume/${saved._id}`);     // redirect to detail page
//     } catch (err) {
//       setError(err?.error || "Upload failed");
//     }
//   }

//   return (
//     <section className="max-w-md mx-auto mt-10 rounded-xl border bg-white p-6 shadow">
//       <h1 className="text-2xl font-semibold text-center mb-4">Upload Resume</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="w-full"
//         />

//         <input
//           value={goal}
//           onChange={(e) => setGoal(e.target.value)}
//           placeholder="Target role (e.g. React Developer)"
//           className="w-full rounded border p-2"
//         />

//         <button
//           type="submit"
//           className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//         >
//           Upload & Analyse
//         </button>

//         {error && <p className="text-red-600 text-sm">{error}</p>}
//       </form>
//     </section>
//   );
// }

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
