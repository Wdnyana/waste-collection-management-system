import { ChartNoAxesCombined, Truck, ChartLine } from '@lucide/svelte'
import type { StatCard, Category } from '@repo/shared'

export const statCards: StatCard[] = [
  {
    title: 'Total Collected Today',
    value: '1,245 KG',
    percentage: 18,
    percentageColor: 'text-green-500',
    comparison: 'from yesterday',
    icon: ChartNoAxesCombined,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    title: 'Active Collections',
    value: '7',
    percentage: '2',
    percentageColor: 'text-green-500',
    comparison: 'from last hour',
    icon: Truck,
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Producers Serviced',
    value: '12/24',
    percentage: '50%',
    percentageColor: 'text-gray-900',
    comparison: 'completion rate',
    icon: ChartLine,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    title: 'Efficiency Rate',
    value: '93.2%',
    percentage: '3.1%',
    percentageColor: 'text-green-500',
    comparison: 'new this month',
    icon: ChartLine,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  },
]

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
