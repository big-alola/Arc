export type ExpenseStatus = "pending" | "approved" | "rejected" | "processing" | "settled";
export type ExpenseCategory = "travel" | "software" | "meals" | "equipment" | "marketing" | "other";

export interface Expense {
  id: string;
  title: string;
  submittedBy: string;
  avatar: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  status: ExpenseStatus;
  submittedAt: string;
  settledAt?: string;
  txHash?: string;
  chain?: string;
  aiReason?: string;
  aiConfidence?: number;
  receipt?: string;
  policy?: string;
  flags?: string[];
}

export interface AgentAction {
  id: string;
  type: "approved" | "rejected" | "flagged" | "settled" | "batch";
  expenseId?: string;
  expenseTitle?: string;
  amount?: number;
  reason: string;
  timestamp: string;
  txHash?: string;
}

export interface PolicyRule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  triggeredCount: number;
}

export const MOCK_EXPENSES: Expense[] = [
  {
    id: "exp_001",
    title: "AWS Cloud Infrastructure — October",
    submittedBy: "Tunde Adeyemi",
    avatar: "TA",
    amount: 2480.00,
    currency: "USDC",
    category: "software",
    status: "pending",
    submittedAt: "2026-05-09T08:14:00Z",
    chain: "Arc Testnet",
    aiReason: "Recurring infrastructure cost. Within monthly budget allocation. Pre-approved vendor.",
    aiConfidence: 97,
    policy: "Software & Tools Policy",
    flags: [],
  },
  {
    id: "exp_002",
    title: "Team Offsite — Lagos Marriott",
    submittedBy: "Amaka Okonkwo",
    avatar: "AO",
    amount: 8750.00,
    currency: "USDC",
    category: "travel",
    status: "pending",
    submittedAt: "2026-05-09T07:30:00Z",
    chain: "Arc Testnet",
    aiReason: "Amount exceeds $5,000 travel threshold. Requires manager approval before settlement.",
    aiConfidence: 88,
    policy: "Travel & Entertainment Policy",
    flags: ["exceeds_threshold", "requires_approval"],
  },
  {
    id: "exp_003",
    title: "Figma Pro — Annual Subscription",
    submittedBy: "Emeka Nwosu",
    avatar: "EN",
    amount: 576.00,
    currency: "USDC",
    category: "software",
    status: "approved",
    submittedAt: "2026-05-08T14:22:00Z",
    settledAt: "2026-05-08T14:22:45Z",
    txHash: "0x7f4a2b9e1c3d5f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4",
    chain: "Arc Testnet",
    aiReason: "Annual design tool renewal. Matches last year's invoice. Auto-approved.",
    aiConfidence: 99,
    policy: "Software & Tools Policy",
    flags: [],
  },
  {
    id: "exp_004",
    title: "Client Dinner — Q2 Close",
    submittedBy: "Zainab Bello",
    avatar: "ZB",
    amount: 340.00,
    currency: "USDC",
    category: "meals",
    status: "approved",
    submittedAt: "2026-05-08T11:05:00Z",
    settledAt: "2026-05-08T11:05:22Z",
    txHash: "0x3a1b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    chain: "Arc Testnet",
    aiReason: "Meals within per-diem. Client entertainment category approved.",
    aiConfidence: 95,
    policy: "Meals & Entertainment Policy",
    flags: [],
  },
  {
    id: "exp_005",
    title: "MacBook Pro M4 — Engineering",
    submittedBy: "Chidi Okafor",
    avatar: "CO",
    amount: 2999.00,
    currency: "USDC",
    category: "equipment",
    status: "rejected",
    submittedAt: "2026-05-07T16:40:00Z",
    chain: "Arc Testnet",
    aiReason: "Duplicate submission detected. Same item submitted by same employee 3 days ago (exp_089). Rejected to prevent double payment.",
    aiConfidence: 93,
    policy: "Equipment Policy",
    flags: ["duplicate_detected"],
  },
  {
    id: "exp_006",
    title: "Google Ads Campaign — May",
    submittedBy: "Fatima Aliyu",
    avatar: "FA",
    amount: 1200.00,
    currency: "USDC",
    category: "marketing",
    status: "processing",
    submittedAt: "2026-05-09T09:00:00Z",
    chain: "Arc Testnet",
    aiReason: "Within marketing budget. Processing settlement to Base chain.",
    aiConfidence: 96,
    policy: "Marketing Policy",
    flags: [],
  },
  {
    id: "exp_007",
    title: "Notion Team Plan — Annual",
    submittedBy: "Tunde Adeyemi",
    avatar: "TA",
    amount: 480.00,
    currency: "USDC",
    category: "software",
    status: "settled",
    submittedAt: "2026-05-07T10:00:00Z",
    settledAt: "2026-05-07T10:00:18Z",
    txHash: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8",
    chain: "Arc Testnet",
    aiReason: "Recurring productivity tool. Auto-approved and settled.",
    aiConfidence: 99,
    policy: "Software & Tools Policy",
    flags: [],
  },
];

export const MOCK_ACTIONS: AgentAction[] = [
  {
    id: "act_001",
    type: "approved",
    expenseId: "exp_003",
    expenseTitle: "Figma Pro — Annual Subscription",
    amount: 576.00,
    reason: "Matched last year invoice. Within software budget.",
    timestamp: "2026-05-08T14:22:45Z",
    txHash: "0x7f4a2b9e1c3d5f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4",
  },
  {
    id: "act_002",
    type: "approved",
    expenseId: "exp_004",
    expenseTitle: "Client Dinner — Q2 Close",
    amount: 340.00,
    reason: "Meals within per-diem. Approved automatically.",
    timestamp: "2026-05-08T11:05:22Z",
    txHash: "0x3a1b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
  },
  {
    id: "act_003",
    type: "rejected",
    expenseId: "exp_005",
    expenseTitle: "MacBook Pro M4 — Engineering",
    amount: 2999.00,
    reason: "Duplicate submission detected. Same item found in exp_089.",
    timestamp: "2026-05-07T16:40:32Z",
  },
  {
    id: "act_004",
    type: "settled",
    expenseId: "exp_007",
    expenseTitle: "Notion Team Plan — Annual",
    amount: 480.00,
    reason: "USDC settled on Arc Testnet. Sub-second finality confirmed.",
    timestamp: "2026-05-07T10:00:18Z",
    txHash: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8",
  },
  {
    id: "act_005",
    type: "flagged",
    expenseId: "exp_002",
    expenseTitle: "Team Offsite — Lagos Marriott",
    amount: 8750.00,
    reason: "Flagged for manager review. Amount exceeds $5,000 travel threshold.",
    timestamp: "2026-05-09T07:30:45Z",
  },
];

export const MOCK_POLICIES: PolicyRule[] = [
  { id: "p1", name: "Auto-approve under $500", description: "Expenses below $500 in approved categories are settled instantly", active: true, triggeredCount: 47 },
  { id: "p2", name: "Travel threshold $5,000", description: "Travel expenses above $5,000 require manager approval", active: true, triggeredCount: 3 },
  { id: "p3", name: "Duplicate detection", description: "Flag expenses matching recent submissions by same employee", active: true, triggeredCount: 2 },
  { id: "p4", name: "Vendor whitelist", description: "Pre-approved vendors are auto-settled without review", active: true, triggeredCount: 18 },
  { id: "p5", name: "Budget cap enforcement", description: "Block expenses that would exceed monthly department budget", active: true, triggeredCount: 1 },
  { id: "p6", name: "Receipt required >$200", description: "Expenses above $200 must include a receipt", active: false, triggeredCount: 0 },
];

export function shortenTx(hash: string) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

export function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  travel: "#f59e0b",
  software: "#3b82f6",
  meals: "#ec4899",
  equipment: "#8b5cf6",
  marketing: "#06b6d4",
  other: "#6b7280",
};

export const STATUS_CONFIG: Record<ExpenseStatus, { label: string; color: string; bg: string }> = {
  pending:    { label: "Pending",    color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  approved:   { label: "Approved",   color: "#25a461", bg: "rgba(37,164,97,0.1)" },
  rejected:   { label: "Rejected",   color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  processing: { label: "Processing", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  settled:    { label: "Settled",    color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
};
