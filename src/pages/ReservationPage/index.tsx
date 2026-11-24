import { useLocation, useSearchParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { ReservationForm } from '../../features/reservation/components/ReservationForm'
import { vehicles } from '../../features/fleet/vehicles'
import { getReservation, type ReservationDraft } from '../../features/reservation'
import styles from './index.module.css'

export function ReservationPage() {
  const [searchParams] = useSearchParams()
  const { key, state } = useLocation()
  const reservation = getReservation(searchParams.get('reservation'))
  const vehicle = vehicles.find((item) => item.id === (reservation?.vehicleId ?? searchParams.get('vehicle')))

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumbs items={[...(vehicle ? [{ label: 'Detalhes', to: `/veiculo/${vehicle.id}` }] : []), { label: 'Reserva' }]} />
        <h1 className={styles.hidden}>Reserva</h1>
        <ReservationForm booking={(state as { booking?: Partial<ReservationDraft> } | null)?.booking} existingReservation={reservation ?? undefined} initialVehicle={vehicle} key={key} />
      </div>
    </div>
  )
}
