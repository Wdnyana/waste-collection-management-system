<script lang="ts">
	import type { PageData } from './$types'

	import CollectionHistory from '../../../lib/components/CollectDetails/CollectionHistory.svelte'
	import ProducerInfo from '../../../lib/components/CollectDetails/ProducerInfo.svelte'

	export let data: PageData
</script>

<div class="w-full px-4 py-5 bg-white shadow-lg rounded-[10px]">
	<h2 class="mb-1 text-start font-semibold text-fluid-base xl:text-fluid-md capitalize">
		Collect Details
	</h2>
	<p class="text-gray-500 mb-4 text-start font-normal text-[14px mt-2">Detail of collect</p>

	<div
		class="mt-5 lg:mt-8 grid grid-cols-1 md:!grid-cols-6 xl:!grid-cols-12 xl:!cols-span-9 gap-5 w-full"
	>
		{#if data.error}
			<div
				class="col-span-1 md:!col-span-6 xl:!col-span-12 p-4 text-red-700 bg-red-100 rounded-[8px] !w-full"
			>
				<strong>Error:&ensp;</strong>
				{data.error}
			</div>
		{:else if data.details}
			<div class="col-span-1 md:!col-span-4 xl:!col-span-10">
				<ProducerInfo details={data.details} />
			</div>
			<div class="col-span-1 md:!col-span-2 xl:!col-span-2 w-full">
				<CollectionHistory history={data.history} />
			</div>
		{:else}
			<p>Memuat detail pengambilan...</p>
		{/if}
	</div>
</div>
