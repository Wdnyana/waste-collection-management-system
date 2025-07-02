<script lang="ts">
	import { Table } from '@repo/ui'
	import type { ICollection, IProducer, IVehicle } from '@repo/shared'

	const { collections, loading } = $props<{
		collections: ICollection[]
		loading: boolean
	}>()

	let hoveredId: string | null = null
	const handleRowHover = (id: string | null) => {
		hoveredId = id
	}

	const producerTableData = $derived(() => {
		if (!collections) return []

		return collections.map((collection: ICollection) => {
			const producer =
				typeof collection.producer === 'object' ? (collection.producer as IProducer) : null

			return {
				Producer: producer?.name || '',
				Category: collection.wasteType,
				_id: collection._id,
			}
		})
	})

	const detailsTableData = $derived(() => {
		if (!collections) return []

		return collections.map((collection: ICollection) => {
			const vehicle =
				typeof collection.vehicleId === 'object' ? (collection.vehicleId as IVehicle) : null

			return {
				Date: collection.completedTime
					? new Date(collection.completedTime).toLocaleString('id-ID', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})
					: 'Pending',
				Vehicle: vehicle?.lisencePlate || 'Unassigned',
				Driver: vehicle?.driver || 'Unassigned',
				'Waste Details': collection.wasteType + ', ' + collection.wasteDetail,
				Status: collection.status,
				_id: collection._id,
			}
		})
	})
</script>

{#if loading}
	{#each Array(5) as _}
		<p>Table Loading....</p>
	{/each}
{:else}
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 lg:p-2 shadow-lg">
		<div class="lg:!col-span-5 xl:!col-span-4 shadow-lg rounded-[10px] !h-full bg-white">
			<Table
				data={producerTableData()}
				hrefPrefix="/collections"
				highlightColumns={{ Category: 'text-gray-500' }}
				{hoveredId}
				onRowHover={handleRowHover}
			/>
		</div>

		<div class="lg:!col-span-7 xl:!col-span-8 shadow-lg rounded-[10px] !h-full bg-white">
			<Table
				data={detailsTableData()}
				hrefPrefix="/collections"
				highlightColumns={{
					Status: 'text-green-800',
					Date: 'text-gray-900',
				}}
				{hoveredId}
				onRowHover={handleRowHover}
			/>
		</div>
	</div>
{/if}
