'use client'

import { useAccount, useReadContract } from 'wagmi'
import { erc721abi } from '@/lib/erc721abi'
import Disconnected from '@/components/disconnected'
import IsNFTHolder from '@/components/is-nft-holder'
import NotNFTHolder from '@/components/not-nft-holder'

const NFT_CONTRACT_ADDRESS = '0x1E8C104D068F22D351859cdBfE41A697A98E6EA2'

export default function Home() {
  const { address, isConnected } = useAccount()

  const { data: balance, isLoading } = useReadContract({
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
    return <IsNFTHolder />
  }

  if (isConnected) {
    return <NotNFTHolder />
  }

  return <Disconnected />
}
