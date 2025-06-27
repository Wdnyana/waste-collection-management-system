/* eslint-disable @typescript-eslint/no-explicit-any */

export type MenuItem = {
  href?: string
  label?: string
  title?: string
  melt: any
  children: any
}

export type BreadcrumbItem = {
  href?: string
  label: string
  icon?: any
  variant?: 'button' | 'default'
  hasDropdown?: boolean
}
