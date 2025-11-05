import { CustomConnectButton } from './custom-connect-button'

export default function Disconnected() {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-3xl font-bold">NFTVote</h1>
      <p className="mb-6 text-gray-600">
        Connect your wallet to vote on the latest community poll.
      </p>
      <CustomConnectButton />
    </div>
  )
}
