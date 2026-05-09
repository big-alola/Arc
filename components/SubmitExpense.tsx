"use client";
import { useState } from "react";
import { View } from "@/app/page";
import { Zap, CheckCircle, Bot, Upload } from "lucide-react";

const CATEGORIES = ["software", "travel", "meals", "equipment", "marketing", "other"];
const CHAINS = ["Arc Testnet", "Ethereum Mainnet", "Base", "Arbitrum", "Solana"];

export default function SubmitExpense({ setView }: { setView: (v: View) => void }) {
  const [form, setForm] = useState({ title: "", amount: "", category: "software", chain: "Arc Testnet", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiPreview, setAiPreview] = useState<{ action: string; reason: string; confidence: number } | null>(null);

  const field = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  // Simulate AI preview
  const handleAmountBlur = () => {
    const amt = parseFloat(form.amount);
    if (!amt) return;
    if (amt < 500) setAiPreview({ action: "Auto-Approve", reason: "Below $500 threshold. Will be settled instantly on Arc.", confidence: 97 });
    else if (amt < 5000) setAiPreview({ action: "Review", reason: "Mid-range expense. Will be reviewed against department budget.", confidence: 84 });
    else setAiPreview({ action: "Flag for Approval", reason: "Exceeds $5,000 threshold. Manager approval required before settlement.", confidence: 91 });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-6 slide-in">
        <div className="w-20 h-20 rounded-full flex items-center justify-center glow-green" style={{ background: "rgba(37,164,97,0.15)" }}>
          <CheckCircle size={40} style={{ color: "var(--accent)" }} />
        </div>
        <div className="text-center">
          <h2 className="font-display font-bold text-2xl" style={{ color: "var(--text)" }}>Expense Submitted</h2>
          <p className="text-sm mt-2" style={{ color: "var(--text2)" }}>The AI agent is reviewing your expense now</p>
        </div>
        <div className="p-4 rounded-2xl border max-w-sm w-full" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Bot size={14} style={{ color: "var(--accent)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Agent Decision (Simulated)</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text2)" }}>{aiPreview?.reason || "Expense queued for review."}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setView("expenses")} className="px-6 py-2.5 rounded-xl text-sm font-medium" style={{ background: "var(--accent)", color: "#fff" }}>
            View Expenses
          </button>
          <button onClick={() => { setSubmitted(false); setForm({ title: "", amount: "", category: "software", chain: "Arc Testnet", notes: "" }); setAiPreview(null); }}
            className="px-6 py-2.5 rounded-xl text-sm font-medium border" style={{ borderColor: "var(--border)", color: "var(--text2)" }}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6 slide-in">
      <div>
        <h1 className="font-display font-bold text-3xl" style={{ color: "var(--text)" }}>Submit Expense</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text2)" }}>AI agent will review and settle to your chain automatically</p>
      </div>

      <div className="p-6 rounded-2xl border space-y-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Title */}
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: "var(--text3)" }}>EXPENSE TITLE</label>
          <input value={form.title} onChange={field("title")} placeholder="e.g. AWS Infrastructure — May"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }} />
        </div>

        {/* Amount + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--text3)" }}>AMOUNT (USDC)</label>
            <input value={form.amount} onChange={field("amount")} onBlur={handleAmountBlur} placeholder="0.00" type="number"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none font-mono"
              style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--text3)" }}>CATEGORY</label>
            <select value={form.category} onChange={field("category")}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none capitalize"
              style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Chain */}
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: "var(--text3)" }}>SETTLEMENT CHAIN</label>
          <select value={form.chain} onChange={field("chain")}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }}>
            {CHAINS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <p className="text-xs mt-1.5" style={{ color: "var(--text3)" }}>
            Unified Balance handles cross-chain routing automatically
          </p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: "var(--text3)" }}>NOTES (OPTIONAL)</label>
          <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Add context for the AI agent…"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
            style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }} />
        </div>

        {/* Receipt upload */}
        <div className="flex items-center justify-center p-6 rounded-xl border border-dashed cursor-pointer hover:opacity-70 transition-opacity"
          style={{ borderColor: "var(--border2)" }}>
          <div className="text-center">
            <Upload size={20} className="mx-auto mb-2" style={{ color: "var(--text3)" }} />
            <p className="text-sm" style={{ color: "var(--text3)" }}>Upload receipt (optional)</p>
            <p className="text-xs mt-1" style={{ color: "var(--text3)" }}>PNG, JPG, PDF up to 5MB</p>
          </div>
        </div>

        {/* AI preview */}
        {aiPreview && (
          <div className="p-4 rounded-xl border" style={{ background: "rgba(37,164,97,0.06)", borderColor: "rgba(37,164,97,0.2)" }}>
            <div className="flex items-center gap-2 mb-1">
              <Bot size={13} style={{ color: "var(--accent)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>AI Agent Preview</span>
              <span className="ml-auto text-xs font-mono" style={{ color: "var(--text3)" }}>{aiPreview.confidence}% confidence</span>
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>Likely action: {aiPreview.action}</p>
            <p className="text-xs" style={{ color: "var(--text2)" }}>{aiPreview.reason}</p>
          </div>
        )}

        <button onClick={handleSubmit} disabled={!form.title || !form.amount || submitting}
          className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40"
          style={{ background: "var(--accent)", color: "#fff" }}>
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting to Arc…
            </>
          ) : (
            <>
              <Zap size={15} fill="#fff" />
              Submit for AI Review
            </>
          )}
        </button>
      </div>
    </div>
  );
}
