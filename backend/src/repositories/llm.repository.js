// src/repositories/llm.repository.js (ESM)
export class LlmRepository {
    constructor({
      baseUrl = process.env.OPENAI_BASE_URL ,
      apiKey  = process.env.OPENAI_API_KEY ,
    } = {}) {
      this.baseUrl = String(baseUrl).replace(/\/+$/, ""); 
      this.apiKey  = apiKey;
  
      console.log("[LlmRepository] init:", {
        baseUrl: this.baseUrl,
        apiKey: this.apiKey ? "***hidden***" : null,
      });
    }
  
    async chatCompletions({ model, messages, temperature = 0.7 }) {
      const url = `${this.baseUrl}/chat/completions`; 
      const body = { model, messages, temperature };
  
      console.log("[LlmRepository] Sending request:", { url, body });
  
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body, null, 2),
      });
  
      console.log("[LlmRepository] Response status:", res.status);
  
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error("[LlmRepository] Error response:", errText);
        const error = new Error(`DMR error ${res.status}: ${errText}`);
        error.status = res.status;
        throw error;
      }
  
      const data = await res.json();
      console.log("[LlmRepository] Parsed response:", JSON.stringify(data, null, 2));
  
      const reply = data?.choices?.[0]?.message?.content ?? "";
      console.log("[LlmRepository] Final reply:", reply);
  
      return { reply, raw: data };
    }
  }
  
  export const llmRepository = new LlmRepository();