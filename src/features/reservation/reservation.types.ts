export type ProtectionId = 'none' | 'basic' | 'standard' | 'advanced'

export type ProtectionOption = {
  id: ProtectionId
  name: string
  description: string
  pricePerDay: number
}

export type ReservationDraft = {
  vehicleId: string
  pickupLocation: string
  returnLocation: string
  pickupDate: string
  returnDate: string
  pickupTime?: string
  returnTime?: string
  days: number
  protection: ProtectionId
}

export type ReservationRecord = ReservationDraft & {
  id: string
  protectionPricePerDay: number
  total: number
  vehiclePricePerDay?: number
  status: 'confirmed'
}
