"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import ExpenseList from "@/components/ExpenseList";
import AgentLog from "@/components/AgentLog";
import Policies from "@/components/Policies";
import SubmitExpense from "@/components/SubmitExpense";

export type View = "dashboard" | "expenses" | "agent-log" | "policies" | "submit";

export default function Home() {
  const [view, setView] = useState<View>("dashboard");
  const [agentActive, setAgentActive] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen grid-bg">
      <Sidebar view={view} setView={setView} agentActive={agentActive} setAgentActive={setAgentActive} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {view === "dashboard"  && <Dashboard setView={setView} agentActive={agentActive} />}
        {view === "expenses"   && <ExpenseList />}
        {view === "agent-log"  && <AgentLog />}
        {view === "policies"   && <Policies />}
        {view === "submit"     && <SubmitExpense setView={setView} />}
      </main>
    </div>
  );
}
