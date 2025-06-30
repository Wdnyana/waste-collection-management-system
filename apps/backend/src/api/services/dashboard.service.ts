import { Collection } from '../../models/collection.model'
import { Producer } from '../../models/producer.model'
import type { DashboardStats, StatDetail } from '@repo/shared'

export const getDashboardStats = async (): Promise<DashboardStats> => {
	const today = new Date()
	const startOfToday = new Date(today.setHours(0, 0, 0, 0))
	const endOfToday = new Date(today.setHours(23, 59, 59, 999))

	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0))
	const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999))

	const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

	const [
		totalWeightToday,
		totalWeightYesterday,
		activeCollectionsCount,
		collectionsLastHour,
		servicedProducersTodayCount,
		totalProducersCount,
	] = await Promise.all([
		Collection.aggregate([
			{ $match: { status: 'done', completedTime: { $gte: startOfToday, $lte: endOfToday } } },
			{ $group: { _id: null, total: { $sum: '$weightInKg' } } },
		]),
		Collection.aggregate([
			{
				$match: { status: 'done', completedTime: { $gte: startOfYesterday, $lte: endOfYesterday } },
			},
			{ $group: { _id: null, total: { $sum: '$weightInKg' } } },
		]),

		Collection.countDocuments({ status: { $in: ['next', 'anomaly'] } }),
		Collection.countDocuments({ status: 'next', createdAt: { $gte: oneHourAgo } }),

		Collection.distinct('producer', {
			status: 'done',
			completedTime: { $gte: startOfToday, $lte: endOfToday },
		}).then((docs) => docs.length),
		Producer.countDocuments(),
	])

	const collectedToday = totalWeightToday[0]?.total || 0
	const collectedYesterday = totalWeightYesterday[0]?.total || 0
	let changeFromYesterday = 0
	if (collectedYesterday > 0) {
		changeFromYesterday = parseFloat(
			(((collectedToday - collectedYesterday) / collectedYesterday) * 100).toFixed(1),
		)
	} else if (collectedToday > 0) {
		changeFromYesterday = 100
	}
	const totalCollectedToday: StatDetail = {
		value: collectedToday.toLocaleString('id-ID'),
		subtext: 'from yesterday',
		change: changeFromYesterday,
	}

	const activeCollections: StatDetail = {
		value: activeCollectionsCount,
		subtext: `${collectionsLastHour} from last hour`,
	}

	const completionRate =
		totalProducersCount > 0
			? ((servicedProducersTodayCount / totalProducersCount) * 100).toFixed(0)
			: 0
	const producersServiced: StatDetail = {
		value: `${servicedProducersTodayCount}/${totalProducersCount}`,
		subtext: `${completionRate}% completion rate`,
	}

	const efficiencyRate: StatDetail = {
		value: 93.2,
		subtext: 'from last week',
		change: 3.1,
	}

	return {
		totalCollectedToday,
		activeCollections,
		producersServiced,
		efficiencyRate,
	}
}
export const getCollectionActivityChart = async () => {
	const thirtyDaysAgo = new Date()
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

	const results = await Collection.aggregate([
		{
			$match: {
				status: 'done',
				completedTime: { $exists: true, $ne: null, $gte: thirtyDaysAgo },
			},
		},

		{
			$addFields: {
				validCompletedTime: { $toDate: '$completedTime' },
			},
		},
		{
			$match: {
				validCompletedTime: { $ne: null },
			},
		},
		{
			$project: {
				day: { $dateToString: { format: '%Y-%m-%d', date: '$validCompletedTime' } },
				wasteType: '$wasteType',
				weight: '$weightInKg',
				_id: 0,
			},
		},
		{
			$group: {
				_id: { day: '$day', type: '$wasteType' },
				totalWeight: { $sum: '$weight' },
			},
		},
		{
			$group: {
				_id: '$_id.day',
				dailyData: {
					$push: {
						k: '$_id.type',
						v: '$totalWeight',
					},
				},
			},
		},
		{
			$addFields: {
				data: { $arrayToObject: '$dailyData' },
			},
		},
		{
			$sort: { _id: 1 },
		},
	])

	const labels = results.map((r) => new Date(r._id).toLocaleDateString('id-ID', { day: '2-digit' }))
	const datasets = {
		Recyclable: new Array(labels.length).fill(0),
		Organic: new Array(labels.length).fill(0),
		General: new Array(labels.length).fill(0),
		Hazardous: new Array(labels.length).fill(0),
	}

	results.forEach((dayResult, index) => {
		if (dayResult.data.Recyclable) datasets.Recyclable[index] = dayResult.data.Recyclable
		if (dayResult.data.Organic) datasets.Organic[index] = dayResult.data.Organic
		if (dayResult.data.General) datasets.General[index] = dayResult.data.General
		if (dayResult.data.Hazardous) datasets.Hazardous[index] = dayResult.data.Hazardous
	})

	return {
		labels,
		datasets: [
			{ label: 'Recyclable', data: datasets.Recyclable, borderColor: '#8b5cf6', tension: 0.4 },
			{ label: 'Organic', data: datasets.Organic, borderColor: '#22c55e', tension: 0.4 },
			{ label: 'General', data: datasets.General, borderColor: '#f97316', tension: 0.4 },
			{ label: 'Hazardous', data: datasets.Hazardous, borderColor: '#ef4444', tension: 0.4 },
		],
	}
}
