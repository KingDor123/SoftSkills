// src/controllers/llm.controller.js
import { chatWithModel } from "../services/llm.service.js";

export async function chat(req, res) {
  try {
    const { text, messages, model, temperature } = req.body || {};
    if ((!text || typeof text !== "string") && !Array.isArray(messages)) {
      return res.status(400).json({ error: "Send 'text' (string) or 'messages' (array) in body." });
    }
    const { reply } = await chatWithModel({ userText: text, messages, model, temperature });
    res.json({ reply });
  } catch (err) {
    console.error("LLM chat error:", err);
    res.status(err.status || 500).json({ error: err.message || "LLM call failed" });
  }
}