'use client'

import { useAccount, useReadContract } from 'wagmi'
import { erc721abi } from '@/lib/erc721abi'
import Disconnected from '@/components/disconnected'
import CastVote from '@/components/cast-vote'
import NotNFTHolder from '@/components/not-nft-holder'
import { NFT_CONTRACT_ADDRESS } from '@/lib/constants'
import FullPageLoader from '@/components/full-page-loader'

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
      <FullPageLoader
        text="Checking your NFT balance..."
        subtext="Please wait."
      />
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
