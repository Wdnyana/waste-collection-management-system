import { PUBLIC_API_BASE_URL } from '$env/static/public'
import type { IProducer, IVehicle, ICollection, DashboardStats } from '@repo/shared'

const BASE_URL = PUBLIC_API_BASE_URL

async function apiFetch<T>(
	endpoint: string,
	method: string = 'GET',
	body: unknown = null,
): Promise<T> {
	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	}

	if (body && (method === 'POST' || method === 'PUT')) {
		options.body = JSON.stringify(body)
	}

	const response = await fetch(`${BASE_URL}${endpoint}`, options)

	if (!response.ok) {
		const errorData = await response
			.json()
			.catch(() => ({ message: `Request failed with status ${response.status}` }))
		throw new Error(errorData.message || 'An unknown API error occurred')
	}

	if (response.status === 204) {
		return null as T
	}

	return response.json() as Promise<T>
}

export const createProducer = (data: Partial<IProducer>) =>
	apiFetch<IProducer>('/api/producers', 'POST', data)

export const fetchProducers = () => apiFetch<IProducer[]>('/api/producers')

export const fetchProducerById = (id: string) => apiFetch<IProducer>(`/api/producers/${id}`)

export const updateProducer = (id: string, data: Partial<IProducer>) =>
	apiFetch<IProducer>(`/api/producers/${id}`, 'PUT', data)

export const updateProducerStatus = (id: string, status: string) =>
	apiFetch<IProducer>(`/api/producers/${id}/status`, 'PUT', { status })

export const deleteProducer = (id: string) => apiFetch<null>(`/api/producers/${id}`, 'DELETE')

export const createVehicle = (data: Partial<IVehicle>) =>
	apiFetch<IVehicle>('/api/vehicles', 'POST', data)

export const fetchVehicles = () => apiFetch<IVehicle[]>('/api/vehicles')

export const fetchVehicleById = (id: string) => apiFetch<IVehicle>(`/api/vehicles/${id}`)

export const updateVehicleStatus = (id: string, status: IVehicle['status']) =>
	apiFetch<IVehicle>(`/api/vehicles/${id}/status`, 'PUT', { status })

export const deleteVehicle = (id: string) => apiFetch<null>(`/api/vehicles/${id}`, 'DELETE')

export const createCollection = (data: Partial<ICollection>) =>
	apiFetch<ICollection>('/api/collections', 'POST', data)

export const fetchCollections = () => apiFetch<ICollection[]>('/api/collections')

export const updateCollectionStatus = (id: string, status: ICollection['status']) =>
	apiFetch<ICollection>(`/api/collections/${id}/status`, 'PUT', { status })

export const fetchCollectionDetails = (id: string) =>
	apiFetch<ICollection>(`/api/collections/${id}/details`)

export const fetchHistoryByProducer = (producerId: string) =>
	apiFetch<ICollection[]>(`/api/collections/${producerId}/history`)

export const deleteCollection = (id: string) => apiFetch<null>(`/api/collections/${id}`, 'DELETE')

export const fetchDashboardStats = () => apiFetch<DashboardStats>('/api/dashboard/stats')
