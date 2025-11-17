'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Loader, Loader2, XCircle } from 'lucide-react'
import {
  type BaseError,
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { nftVoteContract } from '@/lib/contract-config'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import Header from './header'
import { PollResults } from './poll-results'

export default function CastVote() {
  const { address, isConnected } = useAccount()
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)

  const {
    data: hash,
    error: writeError,
    isPending,
    writeContractAsync,
  } = useWriteContract()

  const {
    // data: receipt,
    error: waitError,
    isLoading: isConfirming,
    isSuccess: isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const { data: hasVoted, refetch: refetchHasVoted } = useReadContract({
    ...nftVoteContract,
    functionName: 'hasVoted',
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  })

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

  const handleVote = async (choiceId: number) => {
    if (!isConnected) return
    setSelectedChoice(choiceId)

    try {
      await writeContractAsync({
        ...nftVoteContract,
        functionName: 'castVote',
        args: [choiceId],
      })
    } catch (err) {
      console.error('Transaction failed:', err)
      setSelectedChoice(null)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      refetchHasVoted()
    }
  }, [isSuccess, refetchHasVoted])

  if (hasVoted) {
    return (
      <div className="w-full max-w-2xl space-y-4">
        <Header />
        <Alert variant="default" className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 stroke-green-700" />
          <AlertTitle className="text-green-800">
            You have already voted!
          </AlertTitle>
          <AlertDescription className="text-green-700">
            Your vote has been securely recorded.
          </AlertDescription>
        </Alert>
        <PollResults />
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl">
      <Header />

      <Card className="mt-16 w-full">
        <CardHeader>
          <CardTitle>Poll: New Community Roadmap</CardTitle>
          <CardDescription>
            Do you approve the proposed Q4 roadmap?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Cast Your Vote</h4>
            <RadioGroup
              value={selectedChoice?.toString()}
              onValueChange={(value) => setSelectedChoice(Number(value))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="yes" />
                <Label htmlFor="yes" className="cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="no" />
                <Label htmlFor="no" className="cursor-pointer">
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="abstain" />
                <Label htmlFor="abstain" className="cursor-pointer">
                  Abstain
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => handleVote(selectedChoice!)}
            disabled={selectedChoice === null || isPending || isConfirming}
          >
            {(isPending || isConfirming) && (
              <Loader className="mr-2 animate-spin" />
            )}
            {isPending
              ? 'Voting...'
              : isConfirming
                ? 'Confirming...'
                : 'Cast Vote'}
          </Button>
        </CardFooter>
      </Card>
      <StatusAlerts
        isConfirming={isConfirming}
        isSuccess={isSuccess}
        error={activeError}
        hash={hash}
      />
    </div>
  )
}

type StatusAlertsProps = {
  isConfirming: boolean
  isSuccess: boolean
  hash: `0x${string}` | undefined
  error: string | null
}

function StatusAlerts({
  isConfirming,
  isSuccess,
  error,
  hash,
}: StatusAlertsProps) {
  if (isConfirming) {
    return (
      <Alert variant="default" className="mt-4 border-blue-200 bg-blue-50">
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertTitle>Transaction Pending</AlertTitle>
        <AlertDescription>
          Your vote is being confirmed on the blockchain...
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 font-medium text-blue-600 underline"
          >
            View on Etherscan
          </a>
        </AlertDescription>
      </Alert>
    )
  }

  if (isSuccess) {
    return (
      <Alert variant="default" className="mt-4 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 stroke-green-700" />
        <AlertTitle className="text-green-800">Success!</AlertTitle>
        <AlertDescription className="text-green-700">
          Your vote has been cast successfully.
        </AlertDescription>
      </Alert>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4 border-red-200 bg-red-50">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Transaction Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }
}
