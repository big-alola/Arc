"use client";
import { View } from "@/app/page";
import { MOCK_EXPENSES, MOCK_ACTIONS, formatAmount, formatDate, shortenTx, STATUS_CONFIG, CATEGORY_COLORS } from "@/lib/data";
import { TrendingUp, Clock, CheckCircle, XCircle, Zap, ExternalLink, ArrowRight } from "lucide-react";

export default function Dashboard({ setView, agentActive }: { setView: (v: View) => void; agentActive: boolean }) {
  const total = MOCK_EXPENSES.reduce((s, e) => s + e.amount, 0);
  const pending = MOCK_EXPENSES.filter(e => e.status === "pending");
  const approved = MOCK_EXPENSES.filter(e => e.status === "approved" || e.status === "settled");
  const rejected = MOCK_EXPENSES.filter(e => e.status === "rejected");
  const settled = MOCK_EXPENSES.filter(e => e.status === "settled");
  const settledTotal = settled.reduce((s, e) => s + e.amount, 0);

  const stats = [
    { label: "Total Submitted", value: `$${formatAmount(total)}`, sub: `${MOCK_EXPENSES.length} expenses`, icon: TrendingUp, color: "var(--accent)" },
    { label: "Pending Review", value: pending.length.toString(), sub: "awaiting agent", icon: Clock, color: "#f59e0b" },
    { label: "Auto-Approved", value: approved.length.toString(), sub: "by AI agent", icon: CheckCircle, color: "var(--accent2)" },
    { label: "Settled Onchain", value: `$${formatAmount(settledTotal)}`, sub: "on Arc Testnet", icon: Zap, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-8 slide-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl" style={{ color: "var(--text)" }}>Command Center</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text2)" }}>
            {agentActive ? "AI agent is actively monitoring and settling expenses" : "Manual mode — AI agent is paused"}
          </p>
        </div>
        <button
          onClick={() => setView("submit")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:opacity-90 glow-green"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          <Zap size={15} fill="#fff" />
          Submit Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="p-5 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium" style={{ color: "var(--text3)" }}>{label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon size={15} style={{ color }} />
              </div>
            </div>
            <p className="font-display font-bold text-2xl" style={{ color: "var(--text)" }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text3)" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Expenses */}
        <div className="col-span-2 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="font-display font-semibold" style={{ color: "var(--text)" }}>Recent Expenses</h2>
            <button onClick={() => setView("expenses")} className="flex items-center gap-1 text-xs hover:opacity-80" style={{ color: "var(--accent)" }}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {MOCK_EXPENSES.slice(0, 5).map(exp => {
              const st = STATUS_CONFIG[exp.status];
              return (
                <div key={exp.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display flex-shrink-0"
                    style={{ background: `${CATEGORY_COLORS[exp.category]}20`, color: CATEGORY_COLORS[exp.category] }}>
                    {exp.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{exp.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text3)" }}>{exp.submittedBy} · {formatDate(exp.submittedAt)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-mono font-medium" style={{ color: "var(--text)" }}>${formatAmount(exp.amount)}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Feed */}
        <div className="rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full status-pulse" style={{ background: "var(--accent)" }} />
              <h2 className="font-display font-semibold" style={{ color: "var(--text)" }}>Agent Feed</h2>
            </div>
            <button onClick={() => setView("agent-log")} className="text-xs hover:opacity-80" style={{ color: "var(--accent)" }}>
              Full log →
            </button>
          </div>
          <div className="p-3 space-y-2">
            {MOCK_ACTIONS.map(action => (
              <div key={action.id} className="p-3 rounded-xl border" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0`} style={{
                    background: action.type === "approved" || action.type === "settled" ? "var(--accent)"
                      : action.type === "rejected" ? "#ef4444" : "#f59e0b"
                  }} />
                  <span className="text-xs font-medium font-display capitalize" style={{ color: "var(--text2)" }}>{action.type}</span>
                  {action.amount && <span className="ml-auto text-xs font-mono" style={{ color: "var(--text3)" }}>${formatAmount(action.amount)}</span>}
                </div>
                <p className="text-xs truncate" style={{ color: "var(--text)" }}>{action.expenseTitle}</p>
                {action.txHash && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>{shortenTx(action.txHash)}</span>
                    <ExternalLink size={10} style={{ color: "var(--accent)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arc Network Banner */}
      <div className="p-5 rounded-2xl border flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, rgba(37,164,97,0.08), rgba(37,164,97,0.03))", borderColor: "rgba(37,164,97,0.2)" }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,164,97,0.15)" }}>
            <Zap size={20} style={{ color: "var(--accent)" }} fill="var(--accent)" />
          </div>
          <div>
            <p className="font-display font-semibold" style={{ color: "var(--text)" }}>Powered by Arc Network</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text3)" }}>Sub-second USDC settlement · EVM compatible · Circle App Kit SDK</p>
          </div>
        </div>
        <a href="https://docs.arc.network" target="_blank" rel="noreferrer"
          className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl border transition-all hover:opacity-80"
          style={{ borderColor: "rgba(37,164,97,0.3)", color: "var(--accent)" }}>
          Arc Docs <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
