'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const CustomConnectButton = ({ className }: { className?: string }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    className={className}
                    onClick={openConnectModal}
                    type="button"
                    size="lg"
                  >
                    <Wallet className="mr-2" />
                    Connect Wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    className={className}
                    onClick={openChainModal}
                    type="button"
                    variant="destructive"
                  >
                    Wrong network
                  </Button>
                )
              }

              return (
                <Button
                  className={className}
                  onClick={openAccountModal}
                  type="button"
                >
                  {account.displayName}
                </Button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
