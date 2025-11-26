# NFTVote: Token-Gated Polling dApp

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Network](https://img.shields.io/badge/network-Sepolia-orange)
![Status](https://img.shields.io/badge/status-live-green)

A full-stack decentralized voting application that demonstrates token-gating, smart contract interaction, and modern Web3 frontend patterns. This dApp allows holders of a specific NFT collection to cast votes on governance proposals.

**Live Demo:** [https://nftvote.vercel.app/]

---

## 🏗 Tech Stack

**Frontend:**

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn/ui
- **Web3:** Wagmi v2, Viem, TanStack Query
- **Wallet Connection:** RainbowKit

**Smart Contracts:**

- **Language:** Solidity 0.8.28
- **Framework:** Foundry
- **Network:** Sepolia Testnet

---

## ✨ Key Features

### 1. 🔐 Token-Gated Access ("The Voting Booth")

The application uses a custom `VotingBooth` component that acts as a secure gatekeeper.

- **Read:** Queries the user's balance of the required ERC-721 NFT.
- **Logic:** If `balance > 0`, the voting interface is revealed.
- **Onboarding:** If `balance == 0`, users are presented with a seamless "Mint" UI to acquire a membership NFT directly within the app (no external OpenSea/Etherscan navigation required).

### 2. 🗳 On-Chain Voting ("Write")

- Interacts with a custom `NFTVote.sol` smart contract.
- Prevents double-voting using on-chain `hasVoted` mapping checks.
- Provides real-time feedback loop: **Wallet Signature -> Transaction Pending (Mining) -> Success Confirmation**.

### 3. 📊 Live Results ("Read")

- Fetches real-time vote counts directly from the blockchain using `useReadContracts`.
- Displays live progress bars and percentages.
- **Smart Memory:** Uses browser Local Storage to remember and badge the user's specific choice ("You Voted Here"), solving the UX gap of anonymous on-chain voting.

### 4. 🛠 Robust Engineering

- **SSR Safe:** Implements client-side mounting checks to safely read Local Storage, preventing Hydration Mismatches between server and client renders.
- **Error Handling:** Custom parsing for RPC errors and User Rejections to provide human-readable feedback.
- **Responsive:** Mobile-first design using Tailwind and Shadcn components.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- A browser wallet (MetaMask, Rainbow, etc.) with Sepolia ETH.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/rezavalidev/NFTVote.git
    cd NFTVote
    ```

2.  **Install dependencies** (Monorepo root)

    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the `frontend/` directory:

    ```bash
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_from_walletconnect
    NEXT_PUBLIC_SEPOLIA_RPC_URL=your_sepolia_rpc_url
    NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
    ```

4.  **Run the Frontend**
    ```bash
    pnpm -F frontend dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the dApp.

---

## 📜 Smart Contract

The contract is a simple governance tool deployed on Sepolia.

- **Contract Address:** `0x3Ab184f245b6385BFb652f2F8426fcA0c733D7B5`
- **Verified Code:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x3Ab184f245b6385BFb652f2F8426fcA0c733D7B5)

**Key Functions:**

- `voteCounts(uint256 option)`: Returns total votes for an option.
- `castVote(uint256 choiceId)`: Records a vote (Checks `hasVoted` registry).
- `hasVoted(address voter)`: Returns boolean status of a wallet.

To run contract tests:

```bash
pnpm -F contracts forge test
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
