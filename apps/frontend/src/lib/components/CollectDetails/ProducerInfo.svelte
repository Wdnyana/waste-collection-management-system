<script lang="ts">
	import { Table } from '@repo/ui'
	import LocationMap from './LocationMap.svelte'

	import type { ICollection, IProducer, IVehicle } from '@repo/shared'

	const { details } = $props<{
		details: ICollection | null
	}>()

	const producerInfo = $derived(() => {
		if (!details || typeof details.producer !== 'object') return []
		const producer = details.producer as IProducer
		const vehicle = details.vehicleId as IVehicle
		return [
			{ label: 'Producer Name', value: producer.name || '-' },
			{ label: 'Collect Address', value: producer.address || '-' },
			{ label: 'City', value: producer.city || '-' },
			{ label: 'Province', value: producer.province || '-' },
			{ label: 'Postal Code', value: producer.postalCode || '-' },
			{ label: 'Phone', value: producer.phone || '-' },
			{ label: 'Driver', value: vehicle.driver || '-' },
			{ label: 'Proof Capture', value: '-' },
			{ label: 'Status', value: producer.status || '-' },
		]
	})

	const requestProducerInfo = $derived(() => {
		if (!details) return []

		return [
			{
				'Container Name': '-',
				Amount: '-',
				_id: details._id,
			},
		]
	})

	const requestCollectDriver = $derived(() => {
		if (!details) return []

		return [
			{
				'Product Name': '-',
				total: '-',
				'total Container': '-',
				'Price (KG)': '-',
				'total price': '-',
				_id: details._id,
			},
		]
	})

	const requestSessionDriverInfo = $derived(() => {
		if (!details) return []

		return [
			{
				Session: '-',
				weight: '-',
				'permanent id': '-',
				note: '-',
				photo: '-',
				_id: details._id,
			},
		]
	})

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active':
				return 'text-indicator-done'
			case 'idle':
				return 'text-orange-600'
			case 'maintenance':
				return 'text-yellow-600'
		}
	}
</script>

<div class="!w-full grid grid-cols-1 md:!grid-cols-6 xl:!grid-cols-12 gap-5">
	<div class="col-span-1 md:col-span-2 xl:col-span-5">
		<h2
			class="py-4 border-gray-300 border-b-2 text-start font-medium text-fluid-xs xl:text-fluid-base capitalize"
		>
			Producer
		</h2>
		{#each producerInfo() as info}
			<div class="grid grid-cols-3 py-4 gap-5 items-center">
				<p class="col-span-1 font-medium text-gray-900 text-fluid-xs">
					{info.label}
				</p>
				<div class="col-span-2">
					{#if info.label === 'Status'}
						<p class="font-normal text-fluid-xs capitalize {getStatusColor(info.value)}">
							{info.value}
						</p>
					{:else}
						<p class="font-normal text-gray-600 text-fluid-xs">{info.value}</p>
					{/if}
				</div>
			</div>
		{/each}

		<LocationMap {details} />
	</div>
	<div class="col-span-1 md:!col-span-3 xl:!col-span-7">
		<div class="w-full">
			<h2
				class="py-4 border-gray-300 border-b-2 text-start font-medium text-fluid-xs xl:text-fluid-base capitalize"
			>
				Collect Request from producer
			</h2>

			<div class="mb-2 pt-4 flex w-full flex-col justify-center">
				<Table data={requestProducerInfo()} />
			</div>
		</div>

		<div class="w-full">
			<h2
				class="py-4 border-gray-300 border-b-2 text-start font-medium text-fluid-xs xl:text-fluid-base capitalize"
			>
				Collect Data From Driver
			</h2>

			<div class="mb-2 pt-4 flex w-full flex-col justify-center">
				<Table data={requestCollectDriver()} />
			</div>
		</div>

		<div class="w-full py-4">
			<h2
				class="py-4 border-gray-300 border-b-2 text-start font-medium text-fluid-xs xl:text-fluid-base capitalize"
			>
				Weigh Session From Driver
			</h2>

			<div class="mb-2 pt-4 flex w-full flex-col justify-center">
				<Table data={requestSessionDriverInfo()} />
			</div>
		</div>
	</div>
</div>
