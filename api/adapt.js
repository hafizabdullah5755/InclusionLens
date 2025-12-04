// api/adapt.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Basic scrubber to remove obvious identifiers (very conservative)
function scrubText(input) {
  if (!input) return "";

  let text = String(input);

  // Remove email-like strings
  text = text.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]");

  // Remove long digit sequences (phone numbers)
  text = text.replace(/\b\d{7,}\b/g, "[redacted-number]");

  // Remove UK-style postcodes (rough pattern)
  text = text.replace(
    /\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/gi,
    "[redacted-postcode]"
  );

  // Remove phrases like "years old"
  text = text.replace(/\b\d{1,2}\s+years?\s+old\b/gi, "[redacted-age]");

  return text;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ ok: false, error: "Method not allowed. Use POST." });
  }

  try {
    const body = req.body || {};
    const {
      need,
      context,
      noise,
      time,
      learnerAlias,
      learnerNeeds,
      learnerSupports,
      learnerNotes,
      extraNotes,
    } = body;

    if (!need || !context) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields: need and context.",
      });
    }

    // Build anonymised description
    const safeAlias = learnerAlias ? scrubText(learnerAlias) : null;
    const safeNeeds = Array.isArray(learnerNeeds) ? learnerNeeds.join(", ") : need;
    const safeSupports = Array.isArray(learnerSupports)
      ? learnerSupports.join("; ")
      : "";
    const safeNotes = scrubText(learnerNotes || "");
    const safeExtra = scrubText(extraNotes || "");

    const learnerLine = safeAlias
      ? `Learner alias: ${safeAlias} (this is an anonymised label, not a real name).`
      : "No individual learner alias provided (class-level scenario).";

    const prompt = `
You are an inclusive education assistant supporting teachers in UK classrooms.

TASK:
Generate clear, practical, evidence-aligned classroom strategies that support inclusive practice.
Always present strategies in short, actionable bullet points suitable for a busy teacher.

Important ETHICS & PRIVACY constraints:
- You are working with anonymised data only.
- Do NOT ask for or assume any real names, addresses, dates of birth, or identifying details.
- Treat any alias (e.g. "Learner A") as an anonymous label only.
- Your job is ONLY to suggest teaching strategies, not to diagnose.

SCENARIO (anonymised):
- ${learnerLine}
- Main need(s): ${safeNeeds}
- Teaching context: ${context}
- Noise level: ${noise}
- Time pressure: ${time}

Additional classroom notes (already anonymised for you):
- Existing strategies that help: ${safeSupports || "None recorded yet."}
- Learner classroom notes: ${safeNotes || "None."}
- Extra teacher notes: ${safeExtra || "None."}

OUTPUT FORMAT:
Return 6–10 bullet points.
Each bullet:
- Starts with an imperative verb (e.g. "Provide", "Offer", "Reduce").
- Is specific enough to action in class within 5 minutes.
- Avoids jargon as much as possible.
- Focuses on adaptations the classroom teacher can make without extra resources.
`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const rawText =
      response.output?.[0]?.content?.[0]?.text || "No response text generated.";

    const suggestions = rawText
      .split(/\n+/)
      .map((line) => line.replace(/^[-*•]\s*/, "").trim())
      .filter((line) => line.length > 0);

    return res.status(200).json({
      ok: true,
      suggestions,
      rawText,
    });
  } catch (err) {
    console.error("Internal server error in /api/adapt", err);
    const status = err?.status || 500;
    const message =
      status === 429
        ? "The AI service has reached its usage limit. Please try again later or adjust your API quota."
        : "Internal server error in /api/adapt";

    return res.status(status).json({
      ok: false,
      error: message,
      message,
    });
  }
}
