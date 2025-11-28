// api/adapt.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Basic CORS (lets your GitHub Pages site call this)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const {
      learnerNeed = "",
      activityContext = "",
      noiseLevel = "",
      timePressure = "",
      subject = "",
      yearGroup = "",
    } = req.body || {};

    const prompt = `
You are InclusionLens, a teacher-centred assistant for real-time inclusive lesson adaptation in UK classrooms.
Give rapid, practical, evidence-aligned strategies.

Context:
- Learner need: ${learnerNeed}
- Activity context: ${activityContext}
- Noise level: ${noiseLevel}
- Time pressure: ${timePressure}
- Subject (if given): ${subject}
- Year group (if given): ${yearGroup}

Output format:
Return 5 short strategies as a JSON array of strings.
Each strategy must be classroom-ready, clear, and under 25 words.
No extra text. Only valid JSON.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You support inclusive teaching with fast, usable adaptations." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    });

    const raw = completion.choices?.[0]?.message?.content || "[]";

    // Parse safely (if model returns JSON)
    let strategies = [];
    try {
      strategies = JSON.parse(raw);
    } catch {
      strategies = [raw];
    }

    return res.status(200).json({ strategies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "AI request failed",
      details: err?.message || String(err),
    });
  }
}
