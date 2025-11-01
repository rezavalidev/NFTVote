import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z
    .string()
    .min(1, 'WalletConnect projectId is required'),
  NEXT_PUBLIC_SEPOLIA_RPC_URL: z.string().min(1, 'Sepolia RPC URL is required'),
  NEXT_PUBLIC_CONTRACT_ADDRESS: z
    .string()
    .min(1, 'Contract address is required'),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  NEXT_PUBLIC_SEPOLIA_RPC_URL: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
  NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
})
