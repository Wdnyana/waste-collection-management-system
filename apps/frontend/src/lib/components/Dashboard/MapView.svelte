<script lang="ts">
	import { onMount } from 'svelte'
	import L from 'leaflet'
	import type { IVehicle, ICollection, IProducer } from '@repo/shared'

	export let vehicles: IVehicle[]
	export let collections: ICollection[]

	let mapElement: HTMLElement
	let map: L.Map

	const vehicleMarkers = new Map<string, L.Marker>()
	const createVehicleIcon = (color: string = 'blue') => {
		return L.divIcon({
			html: `<div class="p-1 rounded-full bg-blue-800 shadow-lg"><div class="w-4 h-4 rounded-full bg-${color}-500"></div></div>`,
			className: '',
			iconSize: [24, 24],
			iconAnchor: [12, 12],
		})
	}

	const createCollectionIcon = (status: ICollection['status']) => {
		let colorClass
		switch (status) {
			case 'todo':
				colorClass = 'bg-indicator-todo'
				break
			case 'next':
				colorClass = 'bg-indicator-next'
				break
			case 'done':
				colorClass = 'bg-indicator-done'
				break
			case 'anomaly':
				colorClass = 'bg-indicator-anomaly'
				break
		}
		return L.divIcon({
			html: `<div class="w-4 h-4 rounded-full ${colorClass} border-2 shadow-md"></div>`,
			className: '',
			iconSize: [12, 12],
		})
	}

	onMount(() => {
		map = L.map(mapElement).setView([-8.4095, 115.1889], 13)

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors',
		}).addTo(map)

		return () => {
			map.remove()
		}
	})

	$: if (map && collections) {
		collections.forEach((collection) => {
			const location = collection.location.coordinates
			const producer = collection.producer as IProducer

			const marker = L.marker([location[1], location[0]], {
				icon: createCollectionIcon(collection.status),
			}).addTo(map)

			marker.bindPopup(`
        <b>${producer?.name || 'Producer'}</b><br>
        Tipe: ${collection.wasteType}<br>
        Status: ${collection.status}
      `)
		})
	}

	$: if (map && vehicles) {
		vehicles.forEach((vehicle) => {
			const location: [number, number] = [
				vehicle.currentLocation.coordinates[1],
				vehicle.currentLocation.coordinates[0],
			]

			const existingMarker = vehicleMarkers.get(vehicle._id)

			if (existingMarker) {
				existingMarker.setLatLng(location)
			} else {
				const newMarker = L.marker(location, { icon: createVehicleIcon('blue') }).addTo(map)
				newMarker.bindPopup(`<b>Driver:</b> ${vehicle.driver}`)
				vehicleMarkers.set(vehicle._id, newMarker)
			}
		})
	}
</script>

<div class="map-container z-10 h-full w-full rounded-[8px]" bind:this={mapElement}></div>
