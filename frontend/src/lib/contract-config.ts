import NFTVoteABI from '@/lib/NFTVote.json'
import { env } from './env'

const contractAddress = env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

if (!contractAddress) {
  throw new Error('NEXT_PUBLIC_CONTRACT_ADDRESS is not set in .env.local')
}

export const nftVoteContract = {
  address: contractAddress,
  abi: NFTVoteABI.abi,
} as const
