import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/formatCurrency'
import { Icon } from '../../../../components/ui/Icon'
import type { Vehicle } from '../../vehicle.types'
import styles from './index.module.css'

type VehicleDetailsSectionProps = { vehicle: Vehicle }

export function VehicleDetailsSection({ vehicle }: VehicleDetailsSectionProps) {
  const [photo, setPhoto] = useState(0)
  const isHb20 = vehicle.id === 'hb20'
  const gallery = isHb20 ? ['/images/vehicles/hb20-1.png', '/images/vehicles/hb20-2.png', '/images/vehicles/hb20-3.png'] : [vehicle.image]

  function movePhoto(offset: number) {
    setPhoto((current) => (current + offset + gallery.length) % gallery.length)
  }

  return (
    <section aria-labelledby="vehicle-title" className={styles.section}>
      <div className={styles.imageFrame}>
        <img alt={`${vehicle.name} — foto ${photo + 1} de ${gallery.length}`} src={gallery[photo]} />
        {gallery.length > 1 && (
          <>
            <button aria-label="Foto anterior" className={styles.previous} onClick={() => movePhoto(-1)} type="button" />
            <button aria-label="Próxima foto" className={styles.next} onClick={() => movePhoto(1)} type="button" />
          </>
        )}
      </div>
      <div className={styles.content}>
        <h1 id="vehicle-title">{vehicle.name}</h1>
        <p>{isHb20 ? 'Intermediário Hatch Manual' : vehicle.subtitle ?? `${vehicle.category} ${vehicle.transmission}`}.{isHb20 && <><br />Grupo C - Econômico Sedan com ar condicionado.</>}</p>
        <p className={styles.price}><strong>{formatCurrency(vehicle.pricePerDay)}</strong>/diária</p>
        <Link className={styles.cta} to={`/reservar?vehicle=${vehicle.id}`}>Reservar o veículo</Link>
        <ul className={styles.specs} aria-label={`Características do ${vehicle.name}`}>
          {isHb20 && (
            <>
              <li><Icon name="snowflake" size={34} /> Ar condicionado</li>
              <li><Icon name="lock" size={34} /> Trava elétrica</li>
              <li><Icon name="car" size={34} /> Carro elétrico</li>
              <li><strong>ABS</strong> Freio ABS</li>
            </>
          )}
          <li><Icon name="briefcase" size={34} /> {vehicle.luggage} Malas</li>
          <li><Icon name="transmission" size={34} /> Câmbio {vehicle.transmission.toLowerCase()}</li>
          {isHb20 && <li><Icon name="steering-wheel" size={34} /> Direção hidráulica</li>}
          <li><Icon name="users" size={34} /> {vehicle.passengers} pessoas</li>
        </ul>
      </div>
    </section>
  )
}
