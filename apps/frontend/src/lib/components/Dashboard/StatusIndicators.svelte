<script lang="ts">
	import { StatusIndicator } from '@repo/ui'
	import MapView from './MapView.svelte'
	import VehicleTable from './VehicleTable.svelte'
	import type { LatLngExpression } from 'leaflet'
	import ProducerInfo from '../CollectDetails/ProducerInfo.svelte'

	const iniView: LatLngExpression = [-8.409518, 115.188919]
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
						<MapView view={iniView} zoom={13} />
					</div>

					<div class="gap-4 col-span-1">
						<VehicleTable />
						<ProducerInfo />
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet reset()}
			<div class="py-3 px-4 rounded-[10px] !shadow-lg">Reset Here !!</div>
		{/snippet}
	</StatusIndicator>
</div>
