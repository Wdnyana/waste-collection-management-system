<script lang="ts">
	import { onMount } from 'svelte'
	import type { PageData } from './$types'
	import { connectWebSocket } from '../lib/stores/websocket'

	import { Breadcrumb, Tabs, CardStatistic, HeaderStatistic } from '@repo/ui'
	import { breadcrumbItemsMobile } from '../lib/utils/breadcrumb'
	import StatusIndicators from '../lib/components/Dashboard/StatusIndicators.svelte'
	import ChartActivity from '../lib/components/Dashboard/ChartActivity.svelte'
	import CollectionTable from '../lib/components/Dashboard/CollectionTable.svelte'

	export let data: PageData

	$: isLoading = !data.stats && !data.error

	onMount(() => {
		connectWebSocket()
	})
</script>

<div class="overflow-x-hidden">
	<div class="mx-3 mb-5 md:hidden">
		<Breadcrumb items={breadcrumbItemsMobile} />
	</div>

	<div class="w-full">
		<Tabs>
			{#snippet realtime()}
				<StatusIndicators {data} />
			{/snippet}

			{#snippet history()}
				<div class="grid grid-cols-1 w-full">
					<CollectionTable collections={data.collections} loading={isLoading} />
				</div>
			{/snippet}

			{#snippet statistic()}
				<div class="w-full px-3 lg:px-0 rounded-[10px] !shadow-lg">
					<HeaderStatistic />
					<CardStatistic stats={data.stats} loading={isLoading} />
					<ChartActivity chartData={data.chartData} error={data.error} loading={isLoading} />
				</div>
			{/snippet}
		</Tabs>
	</div>
</div>
