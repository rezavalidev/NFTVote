import { CustomConnectButton } from './custom-connect-button'

export default function Header() {
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-3">
      <CustomConnectButton className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900" />
    </div>
  )
}
