import { Link, InertiaLinkProps } from '@inertiajs/react'

export default function Navlink({
  className = '',
  children,
  ...props
}: InertiaLinkProps) {
  return (
    <Link
      {...props}
      preserveScroll={true}
      className={'relative inline-flex items-center py-2 ' + className}
    >
      {children}
    </Link>
  )
}
