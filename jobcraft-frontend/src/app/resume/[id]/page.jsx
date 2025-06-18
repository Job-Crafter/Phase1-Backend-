// import { fetchResume } from "@/lib/api";
// import ResumeView from "@/components/ResumeView";

// export default async function ResumePage({ params }) {
//   const data = await fetchResume(params.id);   // params.id comes from the URL
//   return <ResumeView initial={data} />;
// }

import { fetchResume } from "@/lib/api";
import ResumeView from "@/components/ResumeView";

export default async function ResumePage({ params }) {
  const { id } = params; // destructure after awaiting if needed
  const data = await fetchResume(id);
  return <ResumeView initial={data} />;
}
