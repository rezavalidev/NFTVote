import { Badge } from './ui/badge'
import { CustomConnectButton } from './custom-connect-button'

export default function Disconnected() {
  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-8 text-center duration-500">
      <Badge className="mb-4 border-transparent bg-[#118ab2]/10 px-4 py-1.5 text-sm text-[#118ab2]">
        NFTVote (Beta)
      </Badge>
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
        Your Voice,
        <br />
        <span className="bg-linear-to-r from-[#118ab2] to-cyan-500 bg-clip-text text-transparent">
          On Chain.
        </span>
      </h1>
      <p className="mx-auto max-w-lg text-lg leading-relaxed text-gray-500 md:text-xl">
        Connect your wallet to access token-gated polls and help shape the
        future of the protocol.
      </p>
      <div className="pt-4">
        <CustomConnectButton className="h-14 rounded-xl bg-[#118ab2] text-lg text-white shadow-xl shadow-[#118ab2]/20 hover:bg-[#0c6b8c] active:translate-y-px" />
      </div>
      <p className="pt-4 text-xs text-gray-400">Powered by Sepolia</p>
    </div>
  )
}
