import { useSearchParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { ReservationConfirmationSection } from '../../features/reservation/components/ReservationConfirmationSection'
import { getReservation } from '../../features/reservation'
import styles from './index.module.css'

export function ConfirmationPage() {
  const [searchParams] = useSearchParams()
  const reservationId = searchParams.get('reservation')
  const reservation = getReservation(reservationId)

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumbs items={[...(reservation ? [{ label: 'Detalhes', to: `/veiculo/${reservation.vehicleId}` }] : []), { label: 'Reserva' }]} />
        <ReservationConfirmationSection key={reservationId} reservation={reservation} />
      </div>
    </div>
  )
}
