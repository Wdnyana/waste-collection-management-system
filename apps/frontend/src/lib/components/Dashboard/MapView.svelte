<script lang="ts">
	import { onMount } from 'svelte'
	import L from 'leaflet'

	let mapElement: HTMLElement
	let map: L.Map

	onMount(async (): Promise<any> => {
		map = L.map(mapElement).setView([-8.3405389, 115.0919509], 12)

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map)

		L.marker([-8.3405389, 115.0919509]).addTo(map).bindPopup('Hello Waste').openPopup()

		return () => {
			map.remove()
		}
	})
</script>

<div class="map-container h-full w-full" bind:this={mapElement}></div>
