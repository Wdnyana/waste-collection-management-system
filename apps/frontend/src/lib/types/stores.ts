export interface IVehicle {
	_id: string
	driver: string
	totalStops: number
	stopsDone: number
	currentLocation: {
		type: 'Point'
		coordinates: [number, number]
	}
	status: 'active' | 'idle' | 'maintenance'
}

export interface IProducer {
	_id: string
	name: string
	address: string
	city: string
	province: string
	postalCode: string
	phone: string
	status: 'active' | 'idle' | 'maintenance'
	location: {
		type: 'Point'
		coordinates: [number, number]
	}
}

export interface ICollection {
	_id: string
	producer: string | IProducer
	wasteDetail: string
	status: 'todo' | 'next' | 'done' | 'anomaly'
	location: {
		type: 'Point'
		coordinates: [number, number]
	}
	scheduledTime?: Date
	completedTime?: Date
	vehicleId?: string | IVehicle
}
