import { AlertCircle } from 'lucide-react'
import { useAccount } from 'wagmi'
import { truncateAddress } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import Header from './header'
import { MintNFTButton } from './mint-nft-btn'

export default function NotNFTHolder({
  onMintSuccess,
}: {
  onMintSuccess: () => void
}) {
  const { address } = useAccount()

  return (
    <div>
      <Header />
      <Alert variant="destructive" className="mb-4 border-red-200 bg-red-50">
        <AlertCircle />
        <AlertTitle>Not an NFT Holder</AlertTitle>
        <AlertDescription>
          Your wallet ({truncateAddress(address!)}) does not hold the required
          NFT to participate in this poll.
        </AlertDescription>
      </Alert>
      <MintNFTButton onMintSuccess={onMintSuccess} />
    </div>
  )
}
