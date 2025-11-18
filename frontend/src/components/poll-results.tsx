'use client'

import { useEffect, useState } from 'react'
import { useAccount, useReadContracts } from 'wagmi'
import { Check, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { nftVoteContract } from '@/lib/contract-config'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'

type PollResultsData = {
  name: 'Yes' | 'No' | 'Abstain'
  value: string
  color: string
  id: number
}[]

export function PollResults() {
  const {
    data: results,
    isPending,
    error,
  } = useReadContracts({
    contracts: [
      {
        ...nftVoteContract,
        functionName: 'option0Votes',
        args: [],
      },
      {
        ...nftVoteContract,
        functionName: 'option1Votes',
        args: [],
      },
      {
        ...nftVoteContract,
        functionName: 'option2Votes',
        args: [],
      },
    ],
    // query: { refetchInterval: 5000 },
  })

  const pollResultsData: PollResultsData = [
    {
      name: 'Yes',
      value: results?.[0]?.result?.toString() ?? '0',
      color: 'bg-green-500',
      id: 0,
    },
    {
      name: 'No',
      value: results?.[1]?.result?.toString() ?? '0',
      color: 'bg-red-500',
      id: 1,
    },
    {
      name: 'Abstain',
      value: results?.[2]?.result?.toString() ?? '0',
      color: 'bg-gray-400',
      id: 2,
    },
  ]

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Results</CardTitle>
        </CardHeader>
        <CardContent className="flex h-24 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground">
            Could not fetch results: {error.message}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Poll Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PollResultsDisplay data={pollResultsData} />
      </CardContent>
    </Card>
  )
}

function PollResultsDisplay({ data }: { data: PollResultsData }) {
  const [userVote, setUserVote] = useState<number | null>(null)

  const { address } = useAccount()

  const totalVotes = data.reduce((acc, item) => acc + Number(item.value), 0)

  useEffect(() => {
    const getUserVote = () => {
      const vote = localStorage.getItem(`vote_${address}`)
      if (vote !== null) {
        setUserVote(Number(vote))
      }
    }

    if (address) {
      getUserVote()
    }
  }, [address])

  if (totalVotes === 0) {
    return <div className="text-sm text-gray-500">No votes cast yet.</div>
  }

  return (
    <div className="w-full space-y-3">
      {data.map((item) => {
        const percentage =
          totalVotes === 0 ? 0 : (Number(item.value) / totalVotes) * 100
        return (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span>
                {item.name}
                {userVote === item.id && <UserBadge />}
              </span>
              <span className="text-gray-600">
                {item.value} ({percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200">
              <div
                className={cn(
                  'h-2.5 rounded-full transition-all duration-500',
                  item.color,
                )}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function UserBadge() {
  return (
    <Badge
      variant="outline"
      className="ml-2 border-green-200 bg-green-50 text-green-700"
    >
      <Check className="mr-1 h-3 w-3" /> You
    </Badge>
  )
}
