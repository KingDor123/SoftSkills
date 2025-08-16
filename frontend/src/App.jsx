import { useState } from "react";
import MessageList from "./components/MessageList.jsx";
import ChatInput from "./components/ChatInput.jsx";
import { chatLLM } from "./api/llm.js";
import "./index.css"; // אם יש Tailwind

export default function App() {
  const [messages, setMessages] = useState([
    { role: "system", content: "את/ה עוזר/ת מועיל/ה." },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSend(userText) {
    setError("");
    const next = [...messages, { role: "user", content: userText }];
    setMessages(next);
    setLoading(true);
    try {
      // אפשר גם לשלוח כ־messages: next  (שומר היסטוריה בבקאנד)
      const { reply } = await chatLLM({ text: userText });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError(e.message || "שגיאה בבקשה");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <header className="py-4">
          <h1 className="text-2xl font-semibold">SoftSkill — Chat</h1>
          <p className="text-slate-600 text-sm">
            מחובר לבקאנד ב־<code>/api/llm/chat</code>
          </p>
        </header>

        <main className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-4">
          {error ? (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
              {error}
            </div>
          ) : null}

          <div className="min-h-[300px]">
            <MessageList items={messages.filter(m => m.role !== "system")} />
            {loading && (
              <div className="mt-3 text-slate-500 text-sm">חושב…</div>
            )}
          </div>

          <ChatInput onSend={onSend} disabled={loading} />
        </main>

        <footer className="py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} – SoftSkill
        </footer>
      </div>
    </div>
  );
}