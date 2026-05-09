"use client";
import { useState } from "react";
import { MOCK_POLICIES, PolicyRule } from "@/lib/data";
import { ShieldCheck, ToggleLeft, ToggleRight, Zap } from "lucide-react";

export default function Policies() {
  const [policies, setPolicies] = useState<PolicyRule[]>(MOCK_POLICIES);

  const toggle = (id: string) => {
    setPolicies(p => p.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const active = policies.filter(p => p.active).length;

  return (
    <div className="space-y-6 slide-in">
      <div>
        <h1 className="font-display font-bold text-3xl" style={{ color: "var(--text)" }}>Agent Policies</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text2)" }}>
          {active} of {policies.length} rules active · Governs all autonomous AI decisions
        </p>
      </div>

      {/* Info box */}
      <div className="p-4 rounded-2xl border flex items-start gap-4"
        style={{ background: "rgba(37,164,97,0.06)", borderColor: "rgba(37,164,97,0.2)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,164,97,0.15)" }}>
          <ShieldCheck size={16} style={{ color: "var(--accent)" }} />
        </div>
        <div>
          <p className="font-medium text-sm" style={{ color: "var(--text)" }}>How policies work</p>
          <p className="text-xs mt-1" style={{ color: "var(--text2)" }}>
            The AI agent evaluates every expense submission against these rules in order of priority. Matching rules
            trigger automatic approval, rejection, or escalation. All decisions are logged onchain for full auditability.
          </p>
        </div>
      </div>

      {/* Policies */}
      <div className="space-y-3">
        {policies.map(policy => (
          <div key={policy.id} className="flex items-center gap-4 p-5 rounded-2xl border transition-all"
            style={{ background: "var(--surface)", borderColor: policy.active ? "rgba(37,164,97,0.2)" : "var(--border)" }}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium" style={{ color: "var(--text)" }}>{policy.name}</p>
                {policy.active && (
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(37,164,97,0.1)", color: "var(--accent)", border: "1px solid rgba(37,164,97,0.2)" }}>
                    Active
                  </span>
                )}
              </div>
              <p className="text-sm" style={{ color: "var(--text2)" }}>{policy.description}</p>
              <div className="flex items-center gap-1 mt-2">
                <Zap size={11} style={{ color: "var(--text3)" }} />
                <span className="text-xs" style={{ color: "var(--text3)" }}>Triggered {policy.triggeredCount} times this month</span>
              </div>
            </div>
            <button onClick={() => toggle(policy.id)} className="flex-shrink-0 transition-all hover:opacity-80">
              {policy.active
                ? <ToggleRight size={32} style={{ color: "var(--accent)" }} />
                : <ToggleLeft size={32} style={{ color: "var(--text3)" }} />}
            </button>
          </div>
        ))}
      </div>

      {/* Add new policy teaser */}
      <button className="w-full p-4 rounded-2xl border border-dashed text-sm font-medium transition-all hover:opacity-70"
        style={{ borderColor: "var(--border2)", color: "var(--text3)" }}>
        + Add custom policy rule
      </button>
    </div>
  );
}
