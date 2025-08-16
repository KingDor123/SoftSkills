const API_BASE =  import.meta.env.VITE_API_BASE ;
console.log("API_BASE:", API_BASE);
export async function chatLLM({ text, messages, model, temperature } = {}) {
    const res = await fetch(`${API_BASE}/api/llm/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, messages, model, temperature }),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`LLM error ${res.status}: ${err}`);
  }
  return res.json(); // => { reply }
}