import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { env } from '@/lib/env'

export const config = getDefaultConfig({
  appName: 'NFTVote',
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? 'https://rpc.sepolia.org',
    ),
  },
  ssr: true,
})
