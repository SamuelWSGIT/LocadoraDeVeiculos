import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { VehicleDetailsSection } from '../../features/fleet/components/VehicleDetailsSection'
import { vehicles } from '../../features/fleet/vehicles'
import styles from './index.module.css'

/** Página de detalhes do veículo selecionado no catálogo. */
export function VehicleDetailsPage() {
  const { vehicleId } = useParams()
  const vehicle = vehicles.find((item) => item.id === vehicleId)

  if (!vehicle) {
    return (
      <div className={styles.notFound}>
        <p className="eyebrow">Veículo não encontrado</p>
        <h1>Não encontramos esse carro.</h1>
        <Link to="/">Voltar para a página inicial</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Detalhes' }]} />
        <VehicleDetailsSection key={vehicle.id} vehicle={vehicle} />
      </div>
    </div>
  )
}
