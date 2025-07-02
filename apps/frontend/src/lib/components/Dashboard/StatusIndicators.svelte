<script lang="ts">
	import type { PageData } from './$types'

	import { StatusIndicator } from '@repo/ui'
	import MapView from './MapView.svelte'
	import VehicleTable from './VehicleTable.svelte'
	import type { LatLngExpression } from 'leaflet'

	const iniView: LatLngExpression = [-8.409518, 115.188919]
	export let data: PageData

	$: isLoading = !data.stats && !data.error
</script>

<div class="w-full px-3 lg:px-0 rounded-[10px] !shadow-lg">
	<StatusIndicator>
		{#snippet settings()}
			<div class="py-3 px-4 rounded-[10px] !shadow-lg">Setting Here !!</div>
		{/snippet}

		{#snippet monitoring()}
			<div class="py-3 px-4 rounded-[10px] !shadow-lg">
				<div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
					<div class="w-full h-[303px] md:h-[403px] mb-3 lg:mb-0 xl:h-[603px] col-span-1">
						<MapView vehicles={data.vehicles} collections={data.collections} />
					</div>

					<div class="col-span-1">
						<VehicleTable
							vehicles={data.vehicles}
							collections={data.collections}
							loading={isLoading}
						/>
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet reset()}
			<div class="py-3 px-4 rounded-[10px] !shadow-lg">Reset Here !!</div>
		{/snippet}
	</StatusIndicator>
</div>
