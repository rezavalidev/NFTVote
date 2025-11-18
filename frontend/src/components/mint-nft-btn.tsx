'use client'

import { useEffect } from 'react'
import { Loader2, Gift, AlertCircle } from 'lucide-react'
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { NFT_CONTRACT_ADDRESS } from '@/lib/constants'
import { erc721abi } from '@/lib/erc721abi'

export function MintNFTButton({
  onMintSuccess,
}: {
  onMintSuccess: () => void
}) {
  const { address } = useAccount()

  const {
    data: hash,
    writeContractAsync,
    isPending: isWalletPending,
    error: writeError,
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    error: waitError,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const handleMint = async () => {
    try {
      await writeContractAsync({
        address: NFT_CONTRACT_ADDRESS,
        abi: erc721abi,
        functionName: 'mint',
        args: [address!],
        gas: 300000n,
      })
    } catch (error) {
      console.error('Mint failed', error)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      onMintSuccess()
    }
  }, [isSuccess, onMintSuccess])

  const getErrorMessage = () => {
    if (waitError) {
      return (
        (waitError as BaseError)?.shortMessage ||
        (waitError as Error)?.message ||
        'Transaction failed during confirmation.'
      )
    }

    if (writeError) {
      return (
        (writeError as BaseError)?.shortMessage ||
        (writeError as Error)?.message ||
        'Something went wrong while sending the transaction.'
      )
    }

    return null
  }

  const activeError = getErrorMessage()

  const isLoading = isWalletPending || isConfirming

  if (isSuccess) {
    return (
      <Alert className="mt-4 border-green-200 bg-green-50">
        <AlertTitle className="text-green-800">NFT Minted!</AlertTitle>
        <AlertDescription className="text-green-700">
          Welcome to the club. Your access is refreshing...
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-2">
      <Button
        onClick={handleMint}
        disabled={isLoading}
        className="w-full max-w-sm"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isWalletPending ? 'Checking Wallet...' : 'Minting...'}
          </>
        ) : (
          <>
            <Gift className="mr-2 h-4 w-4" />
            Mint Free Citizen NFT
          </>
        )}
      </Button>
      {activeError && (
        <Alert variant="destructive" className="w-fit border-none">
          <AlertCircle />
          <AlertTitle>{activeError}</AlertTitle>
        </Alert>
      )}
    </div>
  )
}
