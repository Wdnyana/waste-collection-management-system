import { PUBLIC_API_BASE_URL } from '$env/static/public'
import type { IProducer, IVehicle, ICollection, DashboardStats, ChartData } from '@repo/shared'

const BASE_URL = PUBLIC_API_BASE_URL
type FetchOptions = { fetch?: typeof fetch; baseUrl?: string }

async function apiFetch<T>(
	endpoint: string,
	method: string = 'GET',
	body: unknown = null,
	options?: FetchOptions,
): Promise<T> {
	const fetcher = options?.fetch || fetch
	const baseUrl = options?.baseUrl || BASE_URL

	const reqOptions: RequestInit = {
		method,
		headers: { 'Content-Type': 'application/json' },
	}

	if (body) {
		reqOptions.body = JSON.stringify(body)
	}

	const response = await fetcher(`${baseUrl}${endpoint}`, reqOptions)

	if (!response.ok) {
		const errorData = await response
			.json()
			.catch(() => ({ message: `Request failed with status ${response.status}` }))
		throw new Error(errorData.message || 'An unknown API error occurred')
	}

	if (response.status === 204) return null as T
	return response.json() as Promise<T>
}

export const createProducer = (data: Partial<IProducer>) =>
	apiFetch<IProducer>('/api/producers', 'POST', data)

export const fetchProducers = (options?: FetchOptions) =>
	apiFetch<IProducer[]>('/api/producers', 'GET', null, options)

export const fetchProducerById = (id: string, options?: FetchOptions) =>
	apiFetch<IProducer>(`/api/producers/${id}`, 'GET', null, options)

export const updateProducer = (id: string, data: Partial<IProducer>) =>
	apiFetch<IProducer>(`/api/producers/${id}`, 'PUT', data)

export const updateProducerStatus = (id: string, status: string) =>
	apiFetch<IProducer>(`/api/producers/${id}/status`, 'PUT', { status })

export const deleteProducer = (id: string) => apiFetch<null>(`/api/producers/${id}`, 'DELETE')

export const createVehicle = (data: Partial<IVehicle>) =>
	apiFetch<IVehicle>('/api/vehicles', 'POST', data)

export const fetchVehicles = (options?: FetchOptions) =>
	apiFetch<IVehicle[]>('/api/vehicles', 'GET', null, options)

export const fetchVehicleById = (id: string) => apiFetch<IVehicle>(`/api/vehicles/${id}`)

export const updateVehicleStatus = (id: string, status: IVehicle['status']) =>
	apiFetch<IVehicle>(`/api/vehicles/${id}/status`, 'PUT', { status })

export const deleteVehicle = (id: string) => apiFetch<null>(`/api/vehicles/${id}`, 'DELETE')

export const createCollection = (data: Partial<ICollection>) =>
	apiFetch<ICollection>('/api/collections', 'POST', data)

export const fetchCollections = (options?: FetchOptions) =>
	apiFetch<ICollection[]>('/api/collections', 'GET', null, options)

export const updateCollectionStatus = (id: string, status: ICollection['status']) =>
	apiFetch<ICollection>(`/api/collections/${id}/status`, 'PUT', { status })

export const fetchCollectionDetails = (id: string) =>
	apiFetch<ICollection>(`/api/collections/${id}/details`)

export const fetchHistoryByProducer = (producerId: string) =>
	apiFetch<ICollection[]>(`/api/collections/${producerId}/history`)

export const deleteCollection = (id: string) => apiFetch<null>(`/api/collections/${id}`, 'DELETE')

export const fetchDashboardStats = (options?: FetchOptions) =>
	apiFetch<DashboardStats>('/api/dashboard/stats', 'GET', null, options)

export const fetchCollectionActivityChart = (options?: FetchOptions) =>
	apiFetch<ChartData>('/api/dashboard/activity-chart', 'GET', null, options)
