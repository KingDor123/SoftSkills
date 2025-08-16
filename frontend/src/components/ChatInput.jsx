import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  async function handleSend(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    await onSend(t);
    setText("");
  }

  return (
    <form onSubmit={handleSend} className="flex gap-2">
      <textarea
        className="flex-1 rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
        rows={3}
        placeholder="שאל/י שאלה…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button
        className="shrink-0 h-[3rem] self-end px-5 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50"
        disabled={disabled}
        type="submit"
      >
        שליחה
      </button>
    </form>
  );
}