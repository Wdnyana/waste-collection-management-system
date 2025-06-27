import { Truck } from '@lucide/svelte'

export const breadcrumbItems = [
	{
		href: '/collector',
		label: 'Collector',
		icon: Truck,
		variant: 'button' as const,
		hasDropdown: true,
	},
	{
		label: 'Dashboard',
	},
]
