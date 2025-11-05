import Disconnected from '@/components/disconnected'
import IsNFTHolder from '@/components/is-nft-holder'
import NotNFTHolder from '@/components/not-nft-holder'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* <Disconnected /> */}
      {/* <NotNFTHolder /> */}
      <IsNFTHolder />
    </div>
  )
}
