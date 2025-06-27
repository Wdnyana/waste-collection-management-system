import { Dashboard, IdCard, FileText, Cube, Gear, Calendar } from 'radix-icons-svelte'
import { FileClock, Truck, LifeBuoy, UserRound, FileInput } from '@lucide/svelte'

export const menuGroups = [
  {
    title: 'general',
    items: [{ href: '#dashboard', label: 'Dashboard', icon: Dashboard }],
  },
  {
    title: 'operations',
    items: [
      { href: '#schedule-collect', label: 'Schedule Collection', icon: IdCard },
      { href: '#collect-history', label: 'Collect History', icon: FileText },
      { href: '#waybill', label: 'Waybill', icon: FileText },
      { href: '#report', label: 'Report', icon: FileText },
    ],
  },
  {
    title: 'waste management',
    items: [
      { href: '#wastes', label: 'Wastes', icon: Cube },
      { href: '#report2', label: 'Report', icon: FileText },
    ],
  },
  {
    title: 'fleet management',
    items: [
      { href: '#vehicle', label: 'Vehicles', icon: Truck },
      { href: '#driver', label: 'Drivers', icon: LifeBuoy },
      { href: '#report3', label: 'Report', icon: FileText },
    ],
  },
  {
    title: 'client management',
    items: [
      { href: '#producers', label: 'Producers', icon: UserRound },
      { href: '#contract', label: 'Contract', icon: FileText },
      { href: '#report4', label: 'Report', icon: FileText },
    ],
  },
  {
    title: 'providers management',
    items: [
      { href: '#contract', label: 'Contract', icon: FileText },
      { href: '#report5', label: 'Report', icon: FileText },
    ],
  },
  {
    title: 'CONTAINERS & SERVICES MANAGEMENT',
    items: [
      { href: '#schedule-delivery', label: 'Schedule Delivery', icon: Calendar },
      { href: '#order-history', label: 'Order History', icon: FileClock },
      { href: '#shipping', label: 'Shipping', icon: FileText },
      { href: '#report6', label: 'Report', icon: FileText },
    ],
  },
  {
    title: 'finance',
    items: [
      { href: '#receipts', label: 'Receipts', icon: FileInput },
      { href: '#invoice', label: 'Invoice', icon: FileText },
      { href: '#bills', label: 'Bills', icon: FileText },
      { href: '#report7', label: 'Report', icon: FileText },
    ],
  },
  {
    items: [{ href: '#settings', label: 'Settings', icon: Gear }],
  },
]
