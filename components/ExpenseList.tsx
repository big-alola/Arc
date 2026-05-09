"use client";
import { useState } from "react";
import { MOCK_EXPENSES, formatAmount, formatDate, shortenTx, STATUS_CONFIG, CATEGORY_COLORS, Expense, ExpenseStatus } from "@/lib/data";
import { ExternalLink, ChevronDown, ChevronUp, Bot, Flag, CheckCircle, XCircle } from "lucide-react";

const FILTERS: { label: string; value: ExpenseStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Processing", value: "processing" },
  { label: "Settled", value: "settled" },
  { label: "Rejected", value: "rejected" },
];

export default function ExpenseList() {
  const [filter, setFilter] = useState<ExpenseStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const expenses = filter === "all" ? MOCK_EXPENSES : MOCK_EXPENSES.filter(e => e.status === filter);

  return (
    <div className="space-y-6 slide-in">
      <div>
        <h1 className="font-display font-bold text-3xl" style={{ color: "var(--text)" }}>Expense Requests</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text2)" }}>{MOCK_EXPENSES.length} total expenses · AI agent processing</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              background: filter === f.value ? "var(--accent)" : "var(--surface)",
              color: filter === f.value ? "#fff" : "var(--text2)",
              border: `1px solid ${filter === f.value ? "var(--accent)" : "var(--border)"}`,
            }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {expenses.map(exp => {
          const st = STATUS_CONFIG[exp.status];
          const isOpen = expanded === exp.id;
          return (
            <div key={exp.id} className="rounded-2xl border overflow-hidden transition-all"
              style={{ background: "var(--surface)", borderColor: isOpen ? "rgba(37,164,97,0.3)" : "var(--border)" }}>
              {/* Row */}
              <button className="w-full flex items-center gap-4 px-5 py-4 text-left" onClick={() => setExpanded(isOpen ? null : exp.id)}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-display flex-shrink-0"
                  style={{ background: `${CATEGORY_COLORS[exp.category]}20`, color: CATEGORY_COLORS[exp.category] }}>
                  {exp.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" style={{ color: "var(--text)" }}>{exp.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text3)" }}>
                    {exp.submittedBy} · {formatDate(exp.submittedAt)} · {exp.category}
                  </p>
                </div>
                {exp.flags && exp.flags.length > 0 && (
                  <Flag size={14} style={{ color: "#f59e0b" }} />
                )}
                <div className="text-right flex-shrink-0 mr-2">
                  <p className="font-mono font-semibold" style={{ color: "var(--text)" }}>${formatAmount(exp.amount)} USDC</p>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                </div>
                {isOpen ? <ChevronUp size={16} style={{ color: "var(--text3)" }} /> : <ChevronDown size={16} style={{ color: "var(--text3)" }} />}
              </button>

              {/* Expanded */}
              {isOpen && (
                <div className="px-5 pb-5 border-t space-y-4" style={{ borderColor: "var(--border)" }}>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {/* AI Decision */}
                    <div className="p-4 rounded-xl border" style={{ background: "var(--surface2)", borderColor: "rgba(37,164,97,0.2)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Bot size={14} style={{ color: "var(--accent)" }} />
                        <span className="text-xs font-medium font-display" style={{ color: "var(--accent)" }}>AI Agent Decision</span>
                        {exp.aiConfidence && (
                          <span className="ml-auto text-xs font-mono" style={{ color: "var(--text3)" }}>{exp.aiConfidence}% confidence</span>
                        )}
                      </div>
                      <p className="text-sm" style={{ color: "var(--text2)" }}>{exp.aiReason || "Awaiting agent analysis…"}</p>
                      {exp.flags && exp.flags.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {exp.flags.map(f => (
                            <span key={f} className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                              {f.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4 rounded-xl border" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
                      <p className="text-xs font-medium font-display mb-3" style={{ color: "var(--text3)" }}>TRANSACTION DETAILS</p>
                      <div className="space-y-2">
                        <Row label="Policy" value={exp.policy || "General Policy"} />
                        <Row label="Category" value={exp.category} />
                        <Row label="Chain" value={exp.chain || "Arc Testnet"} />
                        {exp.settledAt && <Row label="Settled" value={formatDate(exp.settledAt)} />}
                        {exp.txHash && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs" style={{ color: "var(--text3)" }}>Tx Hash</span>
                            <a href={`https://testnet.arcscan.app/tx/${exp.txHash}`} target="_blank" rel="noreferrer"
                              className="flex items-center gap-1 text-xs font-mono hover:opacity-80"
                              style={{ color: "var(--accent)" }}>
                              {shortenTx(exp.txHash)} <ExternalLink size={10} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions for pending */}
                  {exp.status === "pending" && (
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                        style={{ background: "rgba(37,164,97,0.15)", color: "var(--accent)", border: "1px solid rgba(37,164,97,0.3)" }}>
                        <CheckCircle size={14} /> Override — Approve
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                        <XCircle size={14} /> Override — Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs" style={{ color: "var(--text3)" }}>{label}</span>
      <span className="text-xs font-medium capitalize" style={{ color: "var(--text2)" }}>{value}</span>
    </div>
  );
}
