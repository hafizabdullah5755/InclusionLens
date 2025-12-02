// api/adapt.js
// Serverless function for lesson adaptation suggestions

const OpenAI = require("openai");

// Configure OpenAI client using your Vercel env var
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// (Optional but useful) — tell Vercel which runtime to use
module.exports.config = {
  runtime: "nodejs20.x",
};

module.exports = async (req, res) => {
  // Allow only POST for real usage
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const { need, context, noise, time } = req.body || {};

    if (!need || !context) {
      return res.status(400).json({
        error: "Missing required fields: 'need' and 'context' are required.",
      });
    }

    const prompt = `
You are supporting a teacher in a mainstream classroom with mixed needs.

Learner need: ${need}
Activity context: ${context}
Noise level: ${noise || "not specified"}
Time pressure: ${time || "not specified"}

Give 5–7 very practical, classroom-ready adaptation strategies.
Each strategy should be:
- 1–2 sentences
- Concrete and specific (no generic advice)
- Focused on inclusive practice and reducing barriers

Return them as a numbered list.
    `.trim();

    // Call OpenAI Responses API
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const text =
      response.output &&
      response.output[0] &&
      response.output[0].content &&
      response.output[0].content[0].text
        ? response.output[0].content[0].text
        : "";

    // Split into individual strategies
    const suggestions = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && /\d\./.test(line)); // keep numbered lines

    return res.status(200).json({
      ok: true,
      need,
      context,
      noise,
      time,
      suggestions,
    });
  } catch (error) {
    console.error("ADAPT_FUNCTION_ERROR", error);

    // Make sure you still return JSON on error
    return res.status(500).json({
      ok: false,
      error: "Internal server error in /api/adapt",
      message: error.message,
    });
  }
};
