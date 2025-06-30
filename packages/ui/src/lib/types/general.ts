/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Snippet } from 'svelte'

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
export type PropsTabs = {
  realtime: Snippet
  history: Snippet
  statistic: Snippet
  class?: string
}

export type PropsStatusIndicator = {
  settings: Snippet
  monitoring: Snippet
  reset: Snippet
  class?: string
}
