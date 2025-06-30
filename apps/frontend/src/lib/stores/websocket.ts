import { PUBLIC_API_BASE_WEBSOCKET } from '$env/static/public'
import { writable } from 'svelte/store'
import { vehicles } from './vehicles'

export const socketStatus = writable<'connecting' | 'open' | 'closed'>('closed')

export function connectWebSocket() {
	socketStatus.set('connecting')
	const ws = new WebSocket(`${PUBLIC_API_BASE_WEBSOCKET}/ws/monitoring`)

	ws.onopen = () => {
		socketStatus.set('open')
		console.log('WebSocket connected!')
	}

	ws.onmessage = (event) => {
		const message = JSON.parse(event.data)
		if (message.vehicleId && message.location) {
			vehicles.updateLocation(message.vehicleId, message.location)
		}
	}

	ws.onclose = () => {
		socketStatus.set('closed')
		console.log('WebSocket disconnected.')
	}
}
