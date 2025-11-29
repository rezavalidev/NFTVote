'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import FullPageLoader from '@/components/full-page-loader'

const DynamicProviders = dynamic(
  () => import('./providers').then((mod) => mod.Web3Providers),
  {
    ssr: false,
    loading: () => <FullPageLoader text="Loading..." />,
  },
)

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <DynamicProviders>{children}</DynamicProviders>
}
