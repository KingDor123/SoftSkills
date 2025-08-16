// src/services/llm.service.js
import { llmRepository } from "../repositories/llm.repository.js";

const DEFAULT_MODEL   = process.env.OPENAI_MODEL ;
const SYSTEM_PROMPT   = process.env.LLM_SYSTEM_PROMPT;
console.log("Using model:", DEFAULT_MODEL);
console.log("System prompt:", SYSTEM_PROMPT);
export async function chatWithModel({ userText, messages, model = DEFAULT_MODEL, temperature = 0.7 }) {
  const msgs = Array.isArray(messages) && messages.length
    ? messages
    : [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: userText || "" }
      ];

  const { reply, raw } = await llmRepository.chatCompletions({ model, messages: msgs, temperature });
  return { reply, raw };
}