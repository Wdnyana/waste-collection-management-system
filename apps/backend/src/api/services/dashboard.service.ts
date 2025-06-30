import { Collection } from '../../models/collection.model'
import { Vehicle } from '../../models/vehicle.model'

export const getDashboardStats = async () => {
	const [collectionStats, vehicleStats] = await Promise.all([
		Collection.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
		Vehicle.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
	])

	const formattedCollectionStats = collectionStats.reduce((acc, item) => {
		acc[item._id] = item.count
		return acc
	}, {})

	const formattedVehicleStats = vehicleStats.reduce((acc, item) => {
		acc[item._id] = item.count
		return acc
	}, {})

	return {
		collections: formattedCollectionStats,
		vehicles: formattedVehicleStats,
	}
}
