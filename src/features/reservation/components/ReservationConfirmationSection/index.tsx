import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { vehicles } from '../../../fleet/vehicles'
import { cancelReservation, saveReservation } from '../../reservation.service'
import type { ReservationRecord } from '../../reservation.types'
import { Icon } from '../../../../components/ui/Icon'
import { ReservationSummary } from '../ReservationSummary'
import styles from './index.module.css'

type ReservationConfirmationSectionProps = { reservation: ReservationRecord | null }

export function ReservationConfirmationSection({ reservation: initialReservation }: ReservationConfirmationSectionProps) {
  const navigate = useNavigate()
  const [reservation, setReservation] = useState(initialReservation)

  if (!reservation) {
    return (
      <section aria-labelledby="confirmation-error-title" className={styles.errorState}>
        <h1 id="confirmation-error-title">Não foi possível confirmar sua reserva.</h1>
        <p>A reserva não foi localizada.</p>
        <Link to="/reservar">Voltar para a reserva</Link>
      </section>
    )
  }

  const vehicle = vehicles.find((item) => item.id === reservation.vehicleId)
  const editPath = `/reservar?reservation=${reservation.id}&vehicle=${reservation.vehicleId}`
  const vehiclePrice = reservation.vehiclePricePerDay ?? (reservation.total / reservation.days - reservation.protectionPricePerDay)

  function removeProtection() {
    if (!reservation) return
    setReservation(saveReservation({
      ...reservation,
      protection: 'none',
      protectionPricePerDay: 0,
      total: vehiclePrice * reservation.days,
    }))
  }

  function handleCancellation() {
    if (!reservation || !window.confirm('Deseja cancelar esta reserva?')) return
    cancelReservation(reservation.id)
    navigate('/', { replace: true })
  }

  const editLink = (label: string) => <Link aria-label={`Editar ${label}`} className={styles.edit} to={editPath}>✎ Editar</Link>

  return (
    <section aria-labelledby="confirmation-title" className={styles.section}>
      <h1 className={styles.success} id="confirmation-title"><Icon name="check" size={34} /> Reserva confirmada com sucesso!</h1>
      <ReservationSummary
        code={reservation.id}
        draft={reservation}
        pickupAction={editLink('retirada')}
        protectionAction={reservation.protection !== 'none' && <button className={styles.edit} onClick={removeProtection} type="button">Remover</button>}
        protectionPrice={reservation.protectionPricePerDay}
        returnAction={editLink('devolução')}
        total={reservation.total}
        vehicle={vehicle}
        vehicleAction={editLink('veículo')}
        vehiclePrice={vehiclePrice}
      />
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={handleCancellation} type="button">Cancelar reserva</button>
        <Link to="/">← Voltar para o início</Link>
      </div>
    </section>
  )
}
