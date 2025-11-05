'use client'

import { CheckCircle, Loader } from 'lucide-react'
import Header from './header'
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
import { useState } from 'react'

export default function IsNFTHolder() {
  const [selectedVote, setSelectedVote] = useState<'yes' | 'no' | 'abstain'>(
    'yes',
  )
  const [hasVoted, setHasVoted] = useState(false)
  const [votingStatus, setVotingStatus] = useState<'idle' | 'pending'>('idle')

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
          {/* Voting Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Your Vote</h4>
            {hasVoted ? (
              <Alert>
                <CheckCircle className="text-green-500" />
                <AlertTitle>You have already voted!</AlertTitle>
                <AlertDescription>
                  Your vote has been securely recorded.
                </AlertDescription>
              </Alert>
            ) : (
              <RadioGroup
                value={selectedVote}
                // onValueChange={setSelectedVote}
                disabled={hasVoted}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer">
                    No
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="abstain" id="abstain" />
                  <Label htmlFor="abstain" className="cursor-pointer">
                    Abstain
                  </Label>
                </div>
              </RadioGroup>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Live Results</h4>
            {/* <MockBarChart data={pollResults} /> */}
          </div>
        </CardContent>
        {!hasVoted && (
          <CardFooter>
            <Button
              className="w-full"
              // onClick={handleVote}
              disabled={!selectedVote || votingStatus === 'pending'}
            >
              {votingStatus === 'pending' && <Loader className="mr-2" />}
              Cast Vote
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
