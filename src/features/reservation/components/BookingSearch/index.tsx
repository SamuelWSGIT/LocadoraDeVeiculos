import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../../components/ui/Icon'
import styles from './index.module.css'

type BookingRowProps = { title: string; direction: 'pickup' | 'return' }

function BookingRow({ title, direction }: BookingRowProps) {
  const locationId = useId()
  const dateId = useId()
  const timeId = useId()
  const [dateChanged, setDateChanged] = useState(false)
  const today = new Date()
  const suggestedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (direction === 'return' ? 1 : 0))
  const dateValue = new Intl.DateTimeFormat('sv-SE').format(suggestedDate)

  return (
    <div className={styles.bookingRow}>
      <label className={`${styles.field} ${styles.locationField}`} htmlFor={locationId}>
        <Icon name="pin" size={14} className={styles.icon} />
        <input id={locationId} name={`${direction}Location`} aria-label={title} placeholder={title} required />
      </label>
      <label className={`${styles.field} ${styles.picker}`} htmlFor={dateId}>
        <Icon name="calendar" size={14} className={styles.icon} />
        <input
          id={dateId}
          name={`${direction}Date`}
          type="date"
          aria-label={`Data — ${title}`}
          defaultValue={dateValue}
          min={new Intl.DateTimeFormat('sv-SE').format(today)}
          onChange={() => setDateChanged(true)}
          required
        />
        {!dateChanged && <span className={styles.pickerLabel} aria-hidden="true">Data</span>}
      </label>
      <label className={`${styles.field} ${styles.picker} ${styles.timeField}`} htmlFor={timeId}>
        <input id={timeId} name={`${direction}Time`} type="time" aria-label={`Horário — ${title}`} required />
        <span className={styles.pickerLabel} aria-hidden="true">Horário</span>
        <Icon name="chevron-down" size={12} className={styles.chevron} />
      </label>
    </div>
  )
}

export function BookingSearch({ showReturn }: { showReturn: boolean }) {
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/reservar', { state: { booking: Object.fromEntries(new FormData(event.currentTarget)) } })
  }

  return (
    <section className={styles.bookingSection} id="reservar" aria-labelledby="booking-title">
      <h2 className={styles.visuallyHidden} id="booking-title">Encontre um carro para alugar</h2>
      <form className={styles.bookingForm} onSubmit={handleSubmit}>
        <BookingRow direction="pickup" title="Local de retirada" />
        {showReturn && <BookingRow direction="return" title="Local de devolução" />}
        <button className={styles.submitButton} type="submit">Buscar</button>
      </form>
    </section>
  )
}
