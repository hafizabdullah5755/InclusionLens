// src/api/adaptClient.js
// Small helper to talk to your Vercel AI backend from the frontend.
// No API key is exposed here – the key stays safely on the server.

const API_BASE = "https://inclusionlens-clean.vercel.app";

/**
 * Ask the backend for AI-generated strategies.
 * @param {Object} params
 * @param {string} params.need     - e.g. "ADHD"
 * @param {string} params.context  - e.g. "Whole class"
 * @param {string} params.noise    - "Low" | "Medium" | "High"
 * @param {string} params.time     - "Low" | "Normal" | "High"
 */
export async function askAdaptation({ need, context, noise, time }) {
  try {
    const response = await fetch(`${API_BASE}/api/adapt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ need, context, noise, time }),
    });

    // If server responded but not 2xx
    if (!response.ok) {
      // Try to read extra info, but don't break if it's not JSON
      let errorText = "";
      try {
        errorText = await response.text();
      } catch {
        // ignore
      }

      // 429 is the "no credits" case – give a friendly message
      if (response.status === 429) {
        throw new Error(
          "The AI service has no remaining credits. Please top up your OpenAI balance to test live suggestions."
        );
      }

      throw new Error(
        errorText || `AI server error – status ${response.status}`
      );
    }

    const data = await response.json();

    // Backend wraps success in { ok: true/false }
    if (!data.ok) {
      throw new Error(
        data.error || "AI service returned an error. Please try again later."
      );
    }

    // Always return an array (could be empty)
    return Array.isArray(data.suggestions) ? data.suggestions : [];
  } catch (err) {
    console.error("askAdaptation error:", err);
    throw err;
  }
}
