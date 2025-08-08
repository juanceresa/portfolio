import NextLink from 'next/link'
import { ReactNode, AnchorHTMLAttributes, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  styled?: boolean
  hoverStyled?: boolean
  hoverEffectOffsetStart?: string
  hoverEffectOffsetEnd?: string
  className?: string
}

function generateCustomEvent(path: string) {
  return new CustomEvent('local-navigation', {
    bubbles: true,
    detail: { path }
  })
}

function eventHandler(event: Event) {
  if (!event.currentTarget) return

  const href = (event.currentTarget as HTMLAnchorElement).href

  if (!href.startsWith(location.origin)) return

  const customEvent = generateCustomEvent(href.replace(location.origin, ''))

  event.currentTarget.dispatchEvent(customEvent)
}

export default function Link({
  children,
  styled,
  hoverStyled,
  hoverEffectOffsetStart,
  hoverEffectOffsetEnd,
  className,
  href,
  ...rest
}: LinkProps) {
  useEffect(() => {
    const links = document.querySelectorAll('a.custom-link')
    links.forEach((link) => {
      link.addEventListener('click', eventHandler)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', eventHandler)
      })
    }
  }, [])

  const linkClasses = cn(
    'custom-link',
    {
      'text-primary-gradient underline-offset-2 hover:underline': styled,
      'link-hover-animation hover:link-hovered-animation': hoverStyled
    },
    className
  )

  const isExternal = href?.startsWith('http') || href?.startsWith('mailto:')

  if (isExternal || !href) {
    return (
      <a
        className={linkClasses}
        href={href}
        style={{
          '--offset-start': hoverEffectOffsetStart,
          '--offset-end': hoverEffectOffsetEnd,
        } as React.CSSProperties}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink
      href={href}
      className={linkClasses}
      style={{
        '--offset-start': hoverEffectOffsetStart,
        '--offset-end': hoverEffectOffsetEnd,
      } as React.CSSProperties}
      {...rest}
    >
      {children}
    </NextLink>
  )
}