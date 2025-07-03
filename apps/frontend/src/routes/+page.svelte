<script lang="ts">
	import { onMount } from 'svelte'
	import type { PageData } from './$types'
	import { connectWebSocket } from '../lib/stores/websocket'

	import { Breadcrumb, Tabs, CardStatistic, HeaderStatistic, Select } from '@repo/ui'
	import { breadcrumbItemsMobile } from '../lib/utils/breadcrumb'
	import StatusIndicators from '../lib/components/Dashboard/StatusIndicators.svelte'
	import ChartActivity from '../lib/components/Dashboard/ChartActivity.svelte'
	import CollectionTable from '../lib/components/Dashboard/CollectionTable.svelte'
	import { collections } from '../lib/stores/collections'
	import { vehicles } from '../lib/stores/vehicles'

	export let data: PageData

	$: if (data.vehicles) {
		vehicles.set(data.vehicles)
	}
	$: if (data.collections) {
		collections.set(data.collections)
	}

	$: isLoading = !data.stats && !data.error

	onMount(() => {
		connectWebSocket()
	})

	let selected: string | undefined
	const monthOptions = {
		Month: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September'],
	}

	const areaOptions = {
		area: [
			'Denpasar',
			'Badung',
			'Tabanan',
			'Jembrana',
			'Karangasem',
			'Bangli',
			'Gianyar',
			'Buleleng',
		],
	}
	const daysOptions = {
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	}
	const wasteOptions = {
		waste: ['Recyclable', 'Organic', 'General', 'Hazardous'],
	}
	const doctorOptions = {
		days: ['Doctor', 'Clinic', 'Vat'],
	}
</script>

<div class="overflow-x-hidden">
	<div class="mx-3 mb-5 md:hidden">
		<Breadcrumb items={breadcrumbItemsMobile} />
	</div>

	<div class="w-full">
		<Tabs>
			{#snippet realtime()}
				<StatusIndicators {isLoading} />
			{/snippet}

			{#snippet history()}
				<div class="grid grid-cols-1 w-full">
					<div
						class="w-full flex items-center gap-4 flex-wrap mb-5 bg-white shadow-lg px-3 py-5 rounded-[10px]"
					>
						<Select options={areaOptions} placeholder="Select Area" bind:value={selected} />
						<Select options={daysOptions} placeholder="Last 7 Days" bind:value={selected} />
						<Select options={wasteOptions} placeholder="Select Waste Type" bind:value={selected} />
						<Select
							options={doctorOptions}
							placeholder="Clinic, Docter, Vat"
							bind:value={selected}
						/>
					</div>
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
