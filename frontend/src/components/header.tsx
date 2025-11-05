import { Button } from './ui/button'

export default function Header() {
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-3">
      <span className="rounded-md bg-gray-100 px-3 py-1.5 font-mono text-sm">
        dlj4...ls3
      </span>
      <Button variant="outline" size="sm">
        Disconnect
      </Button>
    </div>
  )
}
