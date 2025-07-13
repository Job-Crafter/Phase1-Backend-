// utils/cohere.js
import axios from "axios";

const COHERE_API_KEY = process.env.COHERE_API_KEY; // Set in .env file

export async function rerankWithCohere(query, documents) {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/rerank",
      {
        query,
        documents,
        top_n: 3,
        model: "rerank-english-v2.0"
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.results.map((r) => documents[r.index]);
  } catch (err) {
    console.error("Cohere Rerank Error:", err.response?.data || err.message);
    return [];
  }
}
