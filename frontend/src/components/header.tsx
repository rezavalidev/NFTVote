import Image from 'next/image'
import { CustomConnectButton } from './custom-connect-button'

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 z-40 flex w-full items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="NFTVote Logo" width={30} height={30} />
        <span className="text-lg font-bold tracking-tight">NFTVote</span>
      </div>
      <CustomConnectButton className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900" />
    </nav>
  )
}
