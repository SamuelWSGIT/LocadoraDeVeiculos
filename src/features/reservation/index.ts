export type { ProtectionId, ProtectionOption, ReservationDraft, ReservationRecord } from './reservation.types'
export {
  calculateRentalDays,
  calculateReservationTotal,
  cancelReservation,
  createReservation,
  formatCurrency,
  getProtection,
  getReservation,
  protectionOptions,
  saveReservation,
} from './reservation.service'
