import { Button } from '@/components/ui/button' // Our shadcn button
import ConnectWalletButton from '@/components/connect-wallet-button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <header className="mb-10 flex w-full max-w-5xl items-center justify-between">
        <h1 className="text-3xl font-bold">NFTVote</h1>

        {/* The default RainbowKit button */}
        <ConnectWalletButton />

        {/* Or, if you want to test your custom Shadcn one later:
        <CustomConnectButton /> 
        (You'd need to re-add that component) */}
      </header>

      <div className="w-full max-w-5xl">
        <h2 className="text-xl">Poll Details</h2>
        <Button>Shadcn Button</Button> {/* Test button from earlier */}
      </div>
    </main>
  )
}
