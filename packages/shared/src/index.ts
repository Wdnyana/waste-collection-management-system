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
  wasteType: string
  weightInKg: number
  status: 'todo' | 'next' | 'done' | 'anomaly'
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
  scheduledTime?: Date
  completedTime?: Date
  vehicleId?: string | IVehicle
}

export type DashboardStats = {
  totalCollectedToday: StatDetail
  activeCollections: StatDetail
  producersServiced: StatDetail
  efficiencyRate: StatDetail
}

export type StatCard = {
  title: string
  value: string
  percentage: string
  percentageColor: string
  comparison: string
  icon: any
  iconBgColor: string
  iconColor: string
}

export type Category = {
  label: string
  colorClass: string
}

export interface StatDetail {
  value: string | number
  subtext: string
  change?: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    tension: number
  }[]
}
