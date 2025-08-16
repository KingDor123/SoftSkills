export default function MessageList({ items = [] }) {
    return (
      <div className="space-y-3">
        {items.map((m, i) => (
          <div
            key={i}
            className={`rounded-2xl p-3 shadow-sm border ${
              m.role === "user" ? "bg-white" : "bg-slate-50"
            }`}
          >
            <div className="text-xs text-slate-500 mb-1">
              {m.role === "user" ? "You" : "Assistant"}
            </div>
            <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
          </div>
        ))}
      </div>
    );
  }