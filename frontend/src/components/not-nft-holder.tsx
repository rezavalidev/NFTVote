import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import Header from './header'

export default function NotNFTHolder() {
  return (
    <div>
      <Header />
      <Alert variant="destructive" className="mt-16">
        <AlertCircle />
        <AlertTitle>Not an NFT Holder</AlertTitle>
        <AlertDescription>
          Your wallet (23bs....djcb) does not hold the required NFT to
          participate in this poll.
          <br />
          <a href="#" className="font-medium underline">
            View collection on OpenSea
          </a>
        </AlertDescription>
      </Alert>
    </div>
  )
}
