"use client"

import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { sepolia } from "wagmi/chains"
import { http } from "viem"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactNode } from "react"
import { env } from "@/lib/env"

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}

const config = getDefaultConfig({
  appName: "DeFi Protocol Lens",
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? "https://rpc.sepolia.org"
    ),
  },
  ssr: true,
})

const queryClient = new QueryClient()

export function Web3Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
