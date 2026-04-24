const OpenAI = require("openai");
require("dotenv").config();

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("❌ OPENROUTER_API_KEY missing in .env");
}

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// تنظيف SQL
function cleanSQL(text) {
  return text
    .replace(/```sql/g, "")
    .replace(/```/g, "")
    .replace(/Here is.*:/i, "")
    .trim();
}

// ✅ 1. Generate SQL Query
async function getBestQuery(dataset, schema, userInput) {
  try {
    const prompt = `
You are an expert MySQL assistant.

Schema:
${JSON.stringify(schema)}

Dataset:
${JSON.stringify(dataset)}

User Query:
"${userInput}"

Instructions:
- Return ONLY valid MySQL query
- Do NOT explain anything
- Do NOT add comments
- Use correct table and column names
`;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        { role: "system", content: "You generate only SQL queries." },
        { role: "user", content: prompt },
      ],
    });

    const text = response.choices[0].message.content;

    return cleanSQL(text);

  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    throw new Error("AI query generation failed");
  }
}

// ✅ 2. Explain SQL Query (NEW FEATURE)
async function explainQuery(sql) {
  try {
    const prompt = `
You are an expert SQL teacher.

Explain the following SQL query in simple terms.

SQL Query:
${sql}

Rules:
- Keep it short (3-5 lines)
- Use simple English
- No technical jargon
`;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        { role: "system", content: "You explain SQL queries simply." },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content.trim();

  } catch (error) {
    console.error("Explain Error:", error.response?.data || error.message);
    throw new Error("Query explanation failed");
  }
}

// ✅ EXPORT BOTH
module.exports = { getBestQuery, explainQuery };