import { ReactNode, AnchorHTMLAttributes } from 'react'
import Link from './Link'
import { cn } from '@/lib/utils'

interface FancyLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  className?: string
  href?: string
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    className={cn('w-6 h-6', className)}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z' />
  </svg>
)

export default function FancyLink({ 
  children, 
  className, 
  href,
  ...rest 
}: FancyLinkProps) {
  return (
    <Link 
      className={cn('group', className)} 
      href={href}
      {...rest}
    >
      <div className={cn(
        'animated-button',
        'relative flex items-center gap-1',
        'px-8 py-3',
        'border-4 border-transparent',
        'text-sm font-medium',
        'bg-inherit rounded-full',
        'cursor-pointer overflow-hidden',
        'text-[var(--color)] shadow-[0_0_0_1px_var(--color)]',
        'transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
        'hover:shadow-[0_0_0_8px_transparent] hover:text-[#212121] hover:rounded-xl',
        'active:scale-95 active:shadow-[0_0_0_4px_var(--color)]',
        '[--color:ghostwhite]'
      )}>
        <ArrowIcon className={cn(
          'arr-2 absolute -left-1/4',
          'w-6 fill-[var(--color)] z-[9]',
          'transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
          'group-hover:left-4 group-hover:fill-[#212121]'
        )} />
        
        <span className={cn(
          'text relative z-[1]',
          '-translate-x-3',
          'transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
          'group-hover:translate-x-3'
        )}>
          {children}
        </span>
        
        <span className={cn(
          'circle absolute top-1/2 left-1/2',
          '-translate-x-1/2 -translate-y-1/2',
          'w-5 h-5 bg-[var(--color)] rounded-full',
          'opacity-0',
          'transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
          'group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100'
        )} />
        
        <ArrowIcon className={cn(
          'arr-1 absolute right-4',
          'w-6 fill-[var(--color)] z-[9]',
          'transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
          'group-hover:-right-1/4 group-hover:fill-[#212121]'
        )} />
      </div>
    </Link>
  )
}