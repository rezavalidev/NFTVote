import Image from 'next/image'

type FullPageLoaderProps = {
  text: string
  subtext?: string
}

export default function FullPageLoader({ text, subtext }: FullPageLoaderProps) {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md transition-all duration-500">
      {/* Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#118ab2 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      <div className="relative mb-8">
        {/* Pulsing Glow */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-[#118ab2]/20 blur-2xl" />

        {/* Elegant Spinner Ring */}
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#118ab2] border-t-transparent" />

          {/* Brand Icon Centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="NFTVote Logo"
              width={32}
              height={32}
              priority
            />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-gray-900">
        {text}
      </h3>
      <p className="mt-2 animate-pulse text-base font-medium text-gray-500">
        {subtext}
      </p>
    </div>
  )
}
