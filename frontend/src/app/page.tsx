'use client'

import { useAccount, useReadContract } from 'wagmi'
import { erc721abi } from '@/lib/erc721abi'
import Disconnected from '@/components/disconnected'
import CastVote from '@/components/cast-vote'
import NotNFTHolder from '@/components/not-nft-holder'
import { NFT_CONTRACT_ADDRESS } from '@/lib/constants'

export default function Home() {
  const { address, isConnected } = useAccount()

  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: erc721abi,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  })

  if (isLoading && isConnected) {
    return (
      <div className="mx-auto mt-10 w-full max-w-md rounded-lg border bg-white p-6 text-center shadow-md">
        <p className="text-gray-700">Checking your NFT balance...</p>
      </div>
    )
  }

  if (isConnected && balance !== undefined && balance > 0n) {
    return <CastVote />
  }

  if (isConnected) {
    return <NotNFTHolder onMintSuccess={() => refetch()} />
  }

  return <Disconnected />
}
