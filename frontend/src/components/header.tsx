import Image from 'next/image'
import { CustomConnectButton } from './custom-connect-button'

export default function Header() {
  return (
    <div className="absolute inset-x-0 top-2 flex h-14 w-full items-center justify-between bg-white px-4 shadow-xs">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="NFTVote Logo"
          width={30}
          height={30}
          // className="object-contain"
        />
        <span className="text-xl font-bold">NFTVote</span>
      </div>
      <CustomConnectButton className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900" />
    </div>
  )
}
