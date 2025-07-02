import type { Category } from '@repo/shared'

export const categories: Category[] = [
  { label: 'Recyclable', colorClass: 'bg-indigo-500' },
  { label: 'Organic', colorClass: 'bg-emerald-500' },
  { label: 'General', colorClass: 'bg-orange-400' },
  { label: 'Hazardous', colorClass: 'bg-red-500' },
]

export const bgCharts: Category[] = [
  { label: 'Recyclable', bgClass: 'bg-indigo-500/15', txtClass: 'text-indigo-500' },
  { label: 'Organic', bgClass: 'bg-emerald-500/15', txtClass: 'text-emerald-500' },
  { label: 'General', bgClass: 'bg-orange-400/15', txtClass: 'text-orange-400' },
  { label: 'Hazardous', bgClass: 'bg-red-500/15', txtClass: 'text-red-500' },
]
