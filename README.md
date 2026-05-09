# ExpenseAI — Autonomous Expense Agent on Arc Network

> AI-powered onchain expense management built with Circle's App Kit SDK on Arc Network. Approve, reject, and settle company expenses autonomously in USDC with sub-second finality.

![Arc Network](https://img.shields.io/badge/Arc-Network-25a461?style=flat-square)
![USDC](https://img.shields.io/badge/Gas-USDC-2775CA?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square)

## Features

- **AI Agent** — Autonomously reviews, approves, and rejects expenses based on configurable policies
- **Onchain Settlement** — USDC payments settled on Arc Testnet in under 1 second
- **Chain-Agnostic** — Employees receive USDC on any chain via Arc's Unified Balance
- **Policy Engine** — Configurable rules (amount thresholds, duplicate detection, vendor whitelist)
- **Full Audit Trail** — Every AI decision logged with onchain transaction hashes
- **Override Controls** — Managers can override AI decisions at any time

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Blockchain | Arc Network (EVM L1) |
| SDK | Circle App Kit SDK |
| Payments | USDC (native gas on Arc) |
| Settlement | Arc Unified Balance, Bridge, Send |

## Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/expense-ai
cd expense-ai
npm install

# Set up environment
cp .env.example .env.local
# Add your Circle Kit Key and Arc RPC URL

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file:

```env
# Circle App Kit SDK
NEXT_PUBLIC_KIT_KEY=your_circle_kit_key

# Arc Network
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.arc-testnet.network
NEXT_PUBLIC_CHAIN_ID=arc_testnet

# Contract Addresses (deploy PayrollVault.sol to Arc Testnet)
NEXT_PUBLIC_USDC_ADDRESS=0x...
NEXT_PUBLIC_EXPENSE_VAULT_ADDRESS=0x...
```

## Arc App Kit SDK Integration

This app uses four core capabilities:

### 1. Unified Balance — Cross-Chain Settlement
```typescript
import { AppKit } from '@circle-fin/app-kit';

const kit = new AppKit();

// Settle expense to employee on any chain
await kit.unifiedBalance.spend({
  from: { adapter },
  amountIn: expense.amount.toString(),
  to: {
    adapter,
    chain: employee.preferredChain,
    recipientAddress: employee.walletAddress,
  },
});
```

### 2. Send — Same-Chain Payments
```typescript
await kit.send({
  from: { adapter, chain: 'Arc_Testnet' },
  to: recipientAddress,
  amount: expense.amount.toString(),
  token: 'USDC',
});
```

### 3. Bridge — Treasury Routing
```typescript
await kit.bridge({
  from: { adapter, chain: 'Ethereum_Mainnet' },
  to:   { adapter, chain: 'Arc_Testnet' },
  amount: '50000.00',
});
```

### 4. Swap — Multi-Currency Support
```typescript
// Employee opts for EURC instead of USDC
await kit.swap({
  from: { adapter, chain: 'Arc_Testnet' },
  tokenIn: 'USDC',
  tokenOut: 'EURC',
  amountIn: expense.amount.toString(),
});
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/expense-ai)

Or manually:
```bash
npm install -g vercel
vercel
```

Add environment variables in the Vercel dashboard under **Settings → Environment Variables**.

## Smart Contract

Deploy `contracts/ExpenseVault.sol` to Arc Testnet using Hardhat or Foundry:

```bash
# Using Hardhat
npx hardhat run scripts/deploy.js --network arc-testnet
```

Arc Testnet config for `hardhat.config.js`:
```javascript
networks: {
  'arc-testnet': {
    url: 'https://rpc.arc-testnet.network',
    chainId: /* check docs.arc.network for current chain ID */,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

## Resources

- [Arc Network Docs](https://docs.arc.network)
- [Circle App Kit SDK](https://docs.arc.network/app-kit)
- [Unified Balance Guide](https://docs.arc.network/app-kit/unified-balance)
- [Arc Block Explorer](https://testnet.arcscan.app)
- [Arc Faucet](https://faucet.circle.com)

## License

MIT
