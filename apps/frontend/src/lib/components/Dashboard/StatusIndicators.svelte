<script lang="ts">
	import { StatusIndicator } from '@repo/ui'
	import MapView from './MapView.svelte'
	import VehicleTable from './VehicleTable.svelte'

	import { vehicles } from '../../stores/vehicles'
	import { collections } from '../../stores/collections'

	export let isLoading: boolean
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
						<MapView vehicles={$vehicles} collections={$collections} />
					</div>

					<div class="col-span-1">
						<VehicleTable vehicles={$vehicles} collections={$collections} loading={isLoading} />
					</div>
				</div>
			</div>
		{/snippet}

		{#snippet reset()}
			<div class="py-3 px-4 rounded-[10px] !shadow-lg">Reset Here !!</div>
		{/snippet}
	</StatusIndicator>
</div>
