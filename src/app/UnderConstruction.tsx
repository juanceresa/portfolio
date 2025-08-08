import { Metadata } from 'next'

interface UnderConstructionProps {
  title?: string
  description?: string
  pageTitle?: string
}

const ConstructionIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16L14 21H10L12 16Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12L12 16L16 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function generateMetadata({ 
  title = "Under Construction", 
  description = "This page is under construction" 
}: UnderConstructionProps = {}): Metadata {
  return {
    title,
    description,
  }
}

export default function UnderConstruction({ 
  title = "Under Construction",
  description = "This page is currently under construction. I'm working hard to bring something exciting here soon. Stay tuned!",
  pageTitle = "Under Construction"
}: UnderConstructionProps) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-4">
      <section className="flex min-h-[480px] flex-col items-center justify-center">
        <div className="w-fit rounded-2xl border-2 border-slate-800 bg-gradient-to-b from-slate-700 to-slate-900 p-3 animate-pulse">
          <ConstructionIcon className="size-16 text-white" />
        </div>
        <h1 className="mt-8 text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-tight">
          {pageTitle}
        </h1>
        <p className="mt-4 leading-relaxed text-zinc-400 max-sm:text-sm max-w-lg">
          {description}
        </p>
      </section>
    </div>
  )
}