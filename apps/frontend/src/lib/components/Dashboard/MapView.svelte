<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte'
	import L from 'leaflet'

	let map: L.Map | undefined
	let mapElement: HTMLElement

	export let bounds: L.LatLngBoundsExpression | undefined = undefined
	export let view: L.LatLngExpression | undefined = undefined
	export let zoom: number | undefined = undefined

	onMount(async (): Promise<any> => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Bounds atau View dan Zoom harus di set!')
		}

		map = L.map(mapElement)

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map)
	})

	onDestroy(() => {
		map?.remove()
		map = undefined
	})

	setContext('map', {
		getMap: () => map,
	})

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds)
		} else if (view && zoom) {
			map.setView(view, zoom)
		}
	}
</script>

<div class="map-container z-10 h-full w-full rounded-[8px]" bind:this={mapElement}></div>
