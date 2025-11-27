import Image from 'next/image'
import { CustomConnectButton } from './custom-connect-button'

export default function Disconnected() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <Image
        src="/logo.png"
        alt="NFTVote Logo"
        width={100}
        height={100}
        // className="object-contain"
      />
      <h1 className="text-3xl font-bold">NFTVote</h1>
      <p className="mb-2 text-gray-600">
        Connect your wallet to vote on the latest community poll.
      </p>
      <CustomConnectButton />
    </div>
  )
}
