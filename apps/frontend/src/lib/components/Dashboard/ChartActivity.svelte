<script lang="ts">
	import { onMount, tick } from 'svelte'
	import { Line } from 'svelte-chartjs'
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement,
	} from 'chart.js'
	import type { ChartData } from '@repo/shared'
	import { fetchCollectionActivityChart } from '../../services/api'
	import { Chart } from '@repo/ui'

	ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

	let chartData: ChartData | null = null
	let loading = true
	let error: string | null = null

	onMount(async () => {
		try {
			const data = await fetchCollectionActivityChart()

			await tick()
			chartData = data
		} catch (e: any) {
			error = e.message || 'Failed to load chart data.'
		} finally {
			loading = false
		}
	})

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom' as const,
			},
			title: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: (tickValue: string | number) => `${tickValue}KG`,
				},
			},
		},
	}
</script>

<Chart
	title="Realtime Collection Activity"
	subtitle="Waste collection volume overtime (Kg)"
	{loading}
	{error}
	{chartData}
>
	{#if chartData}
		<Line data={chartData} {options} />
	{/if}
</Chart>
