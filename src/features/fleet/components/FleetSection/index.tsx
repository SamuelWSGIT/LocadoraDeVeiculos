import { useState } from 'react'
import { vehicles } from '../../vehicles'
import { Icon } from '../../../../components/ui/Icon'
import { VehicleCard } from '../VehicleCard'
import styles from './index.module.css'

export function FleetSection() {
  const [category, setCategory] = useState('')
  const fleet = vehicles.filter((vehicle) => vehicle.subtitle)
  const categories = [...new Set(fleet.map((vehicle) => vehicle.category))]
  const filteredVehicles = category === 'all'
    ? vehicles
    : category ? vehicles.filter((vehicle) => vehicle.category === category) : fleet
  const sortedVehicles = filteredVehicles.toSorted((first, second) => first.pricePerDay - second.pricePerDay)

  return (
    <section className={styles.fleetSection} id="frota" aria-labelledby="fleet-title">
      <div className={styles.fleetContainer}>
        <h2 className={styles.visuallyHidden} id="fleet-title">Nossa frota de veículos</h2>
        <div className={styles.filterRow}>
          <select aria-label="Filtrar por categoria" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">Selecione a categoria</option>
            <option value="all">Todos os veículos</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <Icon name="chevron-down" size={14} />
        </div>
        <div className={styles.fleetGrid}>
          {sortedVehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
        </div>
      </div>
    </section>
  )
}
