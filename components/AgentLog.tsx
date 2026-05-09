"use client";
import { MOCK_ACTIONS, formatAmount, formatDate, shortenTx } from "@/lib/data";
import { Bot, CheckCircle, XCircle, Flag, Zap, ExternalLink, Hash } from "lucide-react";

const ACTION_CONFIG = {
  approved: { icon: CheckCircle, color: "#25a461", bg: "rgba(37,164,97,0.1)", label: "Auto-Approved" },
  rejected: { icon: XCircle,    color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Rejected" },
  flagged:  { icon: Flag,       color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "Flagged" },
  settled:  { icon: Zap,        color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", label: "Settled Onchain" },
  batch:    { icon: Bot,        color: "#3b82f6", bg: "rgba(59,130,246,0.1)", label: "Batch Action" },
};

export default function AgentLog() {
  return (
    <div className="space-y-6 slide-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl" style={{ color: "var(--text)" }}>Agent Activity Log</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text2)" }}>Full audit trail of every AI agent decision</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border"
          style={{ background: "rgba(37,164,97,0.08)", borderColor: "rgba(37,164,97,0.2)" }}>
          <div className="w-2 h-2 rounded-full status-pulse" style={{ background: "var(--accent)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>Agent Online</span>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Actions", value: MOCK_ACTIONS.length.toString(), color: "var(--text)" },
          { label: "Auto-Approved", value: MOCK_ACTIONS.filter(a => a.type === "approved").length.toString(), color: "var(--accent)" },
          { label: "Rejected", value: MOCK_ACTIONS.filter(a => a.type === "rejected").length.toString(), color: "#ef4444" },
          { label: "Settled Onchain", value: MOCK_ACTIONS.filter(a => a.type === "settled").length.toString(), color: "#8b5cf6" },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <p className="text-2xl font-display font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text3)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
        <div className="space-y-4 pl-14">
          {MOCK_ACTIONS.map(action => {
            const cfg = ACTION_CONFIG[action.type];
            const Icon = cfg.icon;
            return (
              <div key={action.id} className="relative">
                {/* Icon on line */}
                <div className="absolute -left-9 w-8 h-8 rounded-full flex items-center justify-center border"
                  style={{ background: cfg.bg, borderColor: `${cfg.color}40` }}>
                  <Icon size={14} style={{ color: cfg.color }} />
                </div>

                <div className="p-4 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium font-display px-2 py-0.5 rounded-full"
                          style={{ background: cfg.bg, color: cfg.color }}>
                          {cfg.label}
                        </span>
                        {action.amount && (
                          <span className="text-sm font-mono font-semibold" style={{ color: "var(--text)" }}>
                            ${formatAmount(action.amount)} USDC
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-sm" style={{ color: "var(--text)" }}>{action.expenseTitle}</p>
                      <div className="mt-2 p-3 rounded-xl" style={{ background: "var(--surface2)" }}>
                        <div className="flex items-start gap-2">
                          <Bot size={12} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                          <p className="text-xs" style={{ color: "var(--text2)" }}>{action.reason}</p>
                        </div>
                      </div>
                      {action.txHash && (
                        <div className="flex items-center gap-2 mt-2">
                          <Hash size={12} style={{ color: "var(--text3)" }} />
                          <a href={`https://testnet.arcscan.app/tx/${action.txHash}`} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1 text-xs font-mono hover:opacity-80 transition-opacity"
                            style={{ color: "var(--accent)" }}>
                            {shortenTx(action.txHash)}
                            <ExternalLink size={10} />
                          </a>
                          <span className="text-xs" style={{ color: "var(--text3)" }}>· Arc Testnet</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: "var(--text3)" }}>{formatDate(action.timestamp)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
