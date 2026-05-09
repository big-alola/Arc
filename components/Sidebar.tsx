"use client";
import { View } from "@/app/page";
import {
  LayoutDashboard, Receipt, Bot, ShieldCheck,
  PlusCircle, Zap, Circle, ChevronRight
} from "lucide-react";

const NAV = [
  { id: "dashboard",  label: "Dashboard",   icon: LayoutDashboard },
  { id: "expenses",   label: "Expenses",     icon: Receipt },
  { id: "agent-log",  label: "Agent Log",    icon: Bot },
  { id: "policies",   label: "Policies",     icon: ShieldCheck },
  { id: "submit",     label: "Submit Expense", icon: PlusCircle },
] as const;

export default function Sidebar({
  view, setView, agentActive, setAgentActive
}: {
  view: View;
  setView: (v: View) => void;
  agentActive: boolean;
  setAgentActive: (v: boolean) => void;
}) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col border-r" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center glow-green" style={{ background: "var(--accent)" }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <div>
            <p className="font-display font-bold text-lg leading-none" style={{ color: "var(--text)" }}>ExpenseAI</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text3)" }}>on Arc Network</p>
          </div>
        </div>
      </div>

      {/* Agent Status */}
      <div className="mx-4 mt-4 p-3 rounded-xl border" style={{ background: "var(--surface2)", borderColor: agentActive ? "rgba(37,164,97,0.3)" : "var(--border)" }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${agentActive ? "status-pulse" : ""}`} style={{ background: agentActive ? "var(--accent)" : "var(--text3)" }} />
            <span className="text-xs font-medium font-display" style={{ color: "var(--text2)" }}>AI Agent</span>
          </div>
          <button
            onClick={() => setAgentActive(!agentActive)}
            className="text-xs px-2 py-0.5 rounded-full transition-all"
            style={{
              background: agentActive ? "rgba(37,164,97,0.15)" : "rgba(107,114,128,0.15)",
              color: agentActive ? "var(--accent2)" : "var(--text3)",
              border: `1px solid ${agentActive ? "rgba(37,164,97,0.3)" : "var(--border)"}`,
            }}
          >
            {agentActive ? "Active" : "Paused"}
          </button>
        </div>
        <p className="text-xs" style={{ color: "var(--text3)" }}>
          {agentActive ? "Monitoring & auto-settling expenses" : "Manual review mode active"}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 mt-2">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = view === id;
          return (
            <button
              key={id}
              onClick={() => setView(id as View)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group"
              style={{
                background: active ? "rgba(37,164,97,0.12)" : "transparent",
                border: `1px solid ${active ? "rgba(37,164,97,0.25)" : "transparent"}`,
              }}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} style={{ color: active ? "var(--accent2)" : "var(--text3)" }} />
                <span className="text-sm font-medium" style={{ color: active ? "var(--text)" : "var(--text2)" }}>
                  {label}
                </span>
              </div>
              {active && <ChevronRight size={14} style={{ color: "var(--accent)" }} />}
            </button>
          );
        })}
      </nav>

      {/* Arc badge */}
      <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "var(--surface2)" }}>
          <Circle size={8} fill="var(--accent)" stroke="none" className="status-pulse" />
          <span className="text-xs font-mono" style={{ color: "var(--text3)" }}>Arc Testnet</span>
          <span className="ml-auto text-xs" style={{ color: "var(--accent)" }}>●</span>
        </div>
      </div>
    </aside>
  );
}
