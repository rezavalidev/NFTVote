import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import Header from './header'
import { useAccount } from 'wagmi'
import { truncateAddress } from '@/lib/utils'

export default function NotNFTHolder() {
  const { address } = useAccount()

  return (
    <div>
      <Header />
      <Alert variant="destructive" className="mt-16">
        <AlertCircle />
        <AlertTitle>Not an NFT Holder</AlertTitle>
        <AlertDescription>
          Your wallet ({truncateAddress(address!)}) does not hold the required
          NFT to participate in this poll.
          <br />
          <a href="#" className="font-medium underline">
            View collection on OpenSea
          </a>
        </AlertDescription>
      </Alert>
    </div>
  )
}
