<script lang="ts">
	import { onMount } from 'svelte'
	import L from 'leaflet'
	import type { ICollection } from '@repo/shared'

	const { details } = $props<{
		details: ICollection
	}>()

	let mapElement: HTMLElement | null = null
	let map: L.Map | undefined = undefined

	const coordinates = $derived(() => {
		if (!details?.location?.coordinates) return null
		return [details.location.coordinates[1], details.location.coordinates[0]] as L.LatLngExpression
	})

	onMount(() => {
		if (mapElement && coordinates()) {
			map = L.map(mapElement).setView(coordinates()!, 15)

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; OpenStreetMap contributors',
			}).addTo(map)

			L.marker(coordinates()!).addTo(map)
		}

		return () => {
			map?.remove()
		}
	})
</script>

{#if coordinates()}
	<div
		class="map-container z-[5] h-[200px] mt-5 xl:w-3/4 rounded-[8px]"
		bind:this={mapElement}
	></div>
{:else}
	<p class="font-normal text-gray-600 text-fluid-xs">Lokasi tidak tersedia.</p>
{/if}
