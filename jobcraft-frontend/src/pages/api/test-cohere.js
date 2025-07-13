import { rerankWithCohere } from "@/utils/cohere";

export default async function handler(req, res) {
  const query = "Best YouTube channel to learn Redux in 2025";
  const documents = [
    "Codevolution Redux tutorial",
    "freeCodeCamp Redux crash course",
    "Net Ninja Redux Toolkit series",
    "Academind Redux in 1 hour"
  ];

  const topResults = await rerankWithCohere(query, documents);
  res.status(200).json({ topResults });
}
