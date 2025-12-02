// api/adapt.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { need, context, noise, time } = req.body || {};

    if (!need || !context) {
      return res
        .status(400)
        .json({ error: "Missing required fields: need, context." });
    }

    const prompt = `You are an inclusion specialist helping a teacher plan quick, practical classroom adaptations.

Return 4–6 bullet-point strategies only. No intro, no closing sentence.

Each bullet should:
- Be specific and classroom-ready
- Be suitable for mainstream UK classrooms
- Focus on inclusive practice

Learner profile:
- Need: ${need}
- Activity context: ${context}
- Noise level: ${noise || "not given"}
- Time pressure: ${time || "not given"}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You generate concise inclusive strategies." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 400,
    });

    const text = completion.choices?.[0]?.message?.content || "";

    return res.status(200).json({
      suggestions: text,
    });
  } catch (error) {
    console.error("Adapt API error:", error);
    return res.status(500).json({
      error: "Server error while generating strategies.",
      details: error.message,
    });
  }
}
