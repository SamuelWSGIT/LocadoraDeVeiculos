import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/formatCurrency'
import type { Vehicle } from '../../vehicle.types'
import styles from './index.module.css'

type VehicleCardProps = { vehicle: Vehicle }

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const detailsPath = `/veiculo/${vehicle.id}`

  return (
    <article className={styles.card}>
      <Link aria-label={`Ver detalhes de ${vehicle.name}`} className={styles.imageLink} to={detailsPath}>
        <img alt="" src={vehicle.image} />
      </Link>
      <div className={styles.info}>
        <h3><Link to={detailsPath}>{vehicle.name}</Link></h3>
        <p>{vehicle.subtitle ?? `${vehicle.category} ${vehicle.transmission}`}</p>
      </div>
      <p className={styles.price}><strong>{formatCurrency(vehicle.pricePerDay)}</strong>/diária</p>
      <Link className={styles.action} to={detailsPath}>Ver detalhes</Link>
    </article>
  )
}
