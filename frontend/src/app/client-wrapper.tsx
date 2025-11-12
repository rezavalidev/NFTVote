'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const DynamicProviders = dynamic(
  () => import('./providers').then((mod) => mod.Web3Providers),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Loading...
      </div>
    ),
  },
)

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <DynamicProviders>{children}</DynamicProviders>
}
