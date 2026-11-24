import { vehicles } from '../fleet/vehicles'
import type { ProtectionId, ProtectionOption, ReservationDraft, ReservationRecord } from './reservation.types'

export const protectionOptions: ProtectionOption[] = [
  { id: 'basic', name: 'Básica', description: 'Proteção contra furto|Proteção contra incêndio|Perda total do veículo', pricePerDay: 45 },
  { id: 'standard', name: 'Padrão', description: 'Proteção contra furto|Proteção contra incêndio|Perda total do veículo|Danos ao veículo por colisões ou eventos adversos|Redução da coparticipação', pricePerDay: 80 },
  { id: 'advanced', name: 'Avançada', description: 'Proteção contra roubo|Proteção contra furto|Proteção contra incêndio|Perda total do veículo|Danos ao veículo por colisões ou eventos adversos|Danos a vidros e pneus|Proteção contra terceiros|Isenção total da coparticipação', pricePerDay: 120 },
]

const noProtection: ProtectionOption = { id: 'none', name: 'Sem proteção', description: '', pricePerDay: 0 }
const reservationKey = (id: string) => `hermex.reservation.${id}`

/** Calcula as diárias usando as datas informadas, sempre com no mínimo uma diária. */
export function calculateRentalDays(pickupDate: string, returnDate: string) {
  const pickup = new Date(`${pickupDate}T00:00:00`).getTime()
  const returned = new Date(`${returnDate}T00:00:00`).getTime()
  if (!Number.isFinite(pickup) || !Number.isFinite(returned) || returned <= pickup) return 1
  return Math.max(1, Math.ceil((returned - pickup) / 86_400_000))
}

export function getProtection(protectionId: ProtectionId) {
  return protectionOptions.find((option) => option.id === protectionId) ?? noProtection
}

export function calculateReservationTotal(draft: Pick<ReservationDraft, 'vehicleId' | 'days' | 'protection'>) {
  const vehicle = vehicles.find((item) => item.id === draft.vehicleId)
  const protection = getProtection(draft.protection)
  return ((vehicle?.pricePerDay ?? 0) + protection.pricePerDay) * Math.max(1, draft.days)
}

export function createReservation(draft: ReservationDraft): ReservationRecord {
  const protection = getProtection(draft.protection)
  const id = globalThis.crypto?.randomUUID?.() ?? `reservation-${Date.now()}`

  return {
    ...draft,
    id,
    protectionPricePerDay: protection.pricePerDay,
    vehiclePricePerDay: vehicles.find((vehicle) => vehicle.id === draft.vehicleId)?.pricePerDay,
    total: calculateReservationTotal(draft),
    status: 'confirmed',
  }
}

export function saveReservation(reservation: ReservationRecord) {
  if (typeof window === 'undefined') throw new Error('A reserva precisa ser salva no navegador.')
  window.localStorage.setItem(reservationKey(reservation.id), JSON.stringify(reservation))
  return reservation
}

export function getReservation(id: string | null) {
  if (!id || typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(reservationKey(id))
  return stored ? (JSON.parse(stored) as ReservationRecord) : null
}

export function cancelReservation(id: string) {
  window.localStorage.removeItem(reservationKey(id))
}

export { formatCurrency } from '../../utils/formatCurrency'
