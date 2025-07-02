<script lang="ts">
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement,
		LineController,
	} from 'chart.js'
	import type { ChartData } from '@repo/shared'
	import { Chart } from '@repo/ui'
	import { onDestroy, onMount } from 'svelte'

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement,
		LineController,
	)

	export let chartData: ChartData | null = null
	export let loading = true
	export let error: string | null = null

	let canvasElement: HTMLCanvasElement
	let chartInstance: ChartJS | null = null

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
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

	$: if (chartData && chartInstance) {
		;((chartInstance.data = chartData), chartInstance.update())
	}

	onMount(() => {
		if (canvasElement && chartData) {
			chartInstance = new ChartJS(canvasElement, {
				type: 'line',
				data: chartData,
				options: options,
			})
		}
	})

	onDestroy(() => {
		if (chartInstance) {
			chartInstance.destroy()
		}
	})
</script>

<Chart
	title="Realtime Collection Activity"
	subtitle="Waste collection volume overtime (Kg)"
	{loading}
	{error}
	{chartData}
>
	{#if chartData}
		<canvas bind:this={canvasElement} style="display: block; width: 100%; height: 100%;"></canvas>
	{/if}
</Chart>
