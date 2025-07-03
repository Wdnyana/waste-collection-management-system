<script lang="ts">
	import { Table } from '@repo/ui'
	import type { ICollection, IProducer, IVehicle } from '@repo/shared'

	const { vehicles, collections, loading } = $props<{
		vehicles: IVehicle[]
		collections: ICollection[]
		loading: boolean
	}>()

	const vehiclesTable = $derived(() => {
		if (!vehicles) return []

		return vehicles.map((vehicle: IVehicle) => ({
			Vehicle: vehicle.lisencePlate,
			Driver: vehicle.driver,
			'Total Stop': vehicle.totalStops,
			'Stops Done': vehicle.stopsDone,
			_id: vehicle._id,
		}))
	})

	const producerTable = $derived(() => {
		if (!collections) return []

		return collections.map((collection: ICollection) => {
			const producer =
				typeof collection.producer === 'object' ? (collection.producer as IProducer) : null

			return {
				Producer: producer?.name || '',
				'Waste Details': collection.wasteType + ', ' + collection.wasteDetail,
				Status: collection.status,
				_id: collection._id,
			}
		})
	})
</script>

{#if loading}
	{#each Array(3) as _}
		<p>Table Loading....</p>
	{/each}
{:else}
	<div class="grid grid-cols-1 gap-4 w-full">
		<Table
			data={vehiclesTable()}
			hrefPrefix="/collect"
			highlightColumns={{ 'Total Stop': 'text-gray-600', 'Stops Done': 'text-gray-600' }}
		/>

		<Table data={producerTable()} hrefPrefix="/collect" highlightColumns={{}} />
	</div>
{/if}
