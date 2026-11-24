import { useState, type FormEvent, type ReactNode, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { vehicles } from '../../../fleet/vehicles'
import {
  calculateRentalDays, calculateReservationTotal, createReservation, formatCurrency,
  getProtection, protectionOptions, saveReservation,
} from '../../reservation.service'
import type { ReservationDraft, ReservationRecord } from '../../reservation.types'
import type { Vehicle } from '../../../fleet/vehicle.types'
import { ReservationSummary } from '../ReservationSummary'
import styles from './index.module.css'

type ReservationFormProps = { initialVehicle?: Vehicle; existingReservation?: ReservationRecord; booking?: Partial<ReservationDraft> }

function dateToInput(date: Date) {
  return date.toISOString().slice(0, 10)
}

function TripFields({ title, children }: { title: string; children: ReactNode }) {
  return <details className={styles.editor}><summary aria-label={`Editar ${title}`}>Editar</summary><div className={styles.fields}>{children}</div></details>
}

function openInvalidEditor(event: SyntheticEvent<HTMLFormElement>) {
  if (event.target instanceof HTMLElement) {
    const editor = event.target.closest('details')
    if (editor) editor.open = true
  }
}

export function ReservationForm({ initialVehicle, existingReservation, booking }: ReservationFormProps) {
  const navigate = useNavigate()
  const today = dateToInput(new Date())
  const [draft, setDraft] = useState<ReservationDraft>(() => {
    if (existingReservation) return existingReservation

    const pickupDate = booking?.pickupDate && booking.pickupDate >= today ? booking.pickupDate : today
    const returnDate = booking?.returnDate && booking.returnDate >= pickupDate
      ? booking.returnDate
      : dateToInput(new Date(new Date(pickupDate).getTime() + 86_400_000))

    return {
      vehicleId: initialVehicle?.id ?? vehicles[0].id,
      pickupLocation: booking?.pickupLocation ?? '',
      returnLocation: booking?.returnLocation ?? '',
      pickupDate,
      returnDate,
      pickupTime: booking?.pickupTime ?? '10:00',
      returnTime: booking?.returnTime ?? '10:00',
      days: calculateRentalDays(pickupDate, returnDate),
      protection: 'basic',
    }
  })
  const [submitError, setSubmitError] = useState('')
  const vehicle = vehicles.find((item) => item.id === draft.vehicleId) ?? vehicles[0]
  const protection = getProtection(draft.protection)
  const total = calculateReservationTotal(draft)

  function updateDraft<K extends keyof ReservationDraft>(field: K, value: ReservationDraft[K]) {
    setDraft((current) => {
      const updated = { ...current, [field]: value }
      if (field === 'pickupDate' || field === 'returnDate') {
        updated.days = calculateRentalDays(updated.pickupDate, updated.returnDate)
      }
      return updated
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')

    try {
      const record = createReservation(draft)
      const reservation = saveReservation(existingReservation ? { ...record, id: existingReservation.id } : record)
      navigate(`/confirmacao?reservation=${reservation.id}&vehicle=${vehicle.id}`)
    } catch {
      setSubmitError('Não foi possível finalizar a reserva. Tente novamente.')
    }
  }

  return (
    <form className={styles.form} onInvalid={openInvalidEditor} onSubmit={handleSubmit}>
      <aside aria-labelledby="protection-title" className={styles.protectionPanel}>
        <h2 id="protection-title">Adicione mais segurança</h2>
        <div className={styles.protectionList}>
          <p>Para uma viagem mais segura, escolha uma proteção para o seu aluguel (opcional):</p>
          {protectionOptions.map((option) => {
            const selected = draft.protection === option.id
            return (
              <section className={styles.protectionOption} key={option.id}>
                <h3>{option.name}</h3>
                <ul>{option.description.split('|').map((item) => <li key={item}>{item}</li>)}</ul>
                <p><strong>R${option.pricePerDay}</strong>/diária</p>
                <button aria-label={`${selected ? 'Remover' : 'Adicionar'} proteção ${option.name}`} className={selected ? styles.selected : ''} onClick={() => updateDraft('protection', selected ? 'none' : option.id)} type="button">{selected ? 'Remover' : 'Adicionar'}</button>
              </section>
            )
          })}
        </div>
      </aside>
      <div className={styles.main}>
        <ReservationSummary
          draft={draft}
          protectionPrice={protection.pricePerDay}
          total={total}
          vehicle={vehicle}
          vehiclePrice={vehicle.pricePerDay}
          vehicleAction={(
            <TripFields title="veículo">
              <label>Veículo<select name="vehicle" onChange={(event) => updateDraft('vehicleId', event.target.value)} value={vehicle.id}>{vehicles.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            </TripFields>
          )}
          pickupAction={(
            <TripFields title="retirada">
              <label>Data de retirada<input min={existingReservation?.pickupDate ?? today} name="pickupDate" onChange={(event) => updateDraft('pickupDate', event.target.value)} required type="date" value={draft.pickupDate} /></label>
              <label>Horário de retirada<input name="pickupTime" onChange={(event) => updateDraft('pickupTime', event.target.value)} type="time" value={draft.pickupTime ?? ''} /></label>
              <label>Local de retirada<input name="pickup" onChange={(event) => updateDraft('pickupLocation', event.target.value)} required value={draft.pickupLocation} /></label>
            </TripFields>
          )}
          returnAction={(
            <TripFields title="devolução">
              <label>Data de devolução<input min={draft.pickupDate} name="returnDate" onChange={(event) => updateDraft('returnDate', event.target.value)} required type="date" value={draft.returnDate} /></label>
              <label>Horário de devolução<input name="returnTime" onChange={(event) => updateDraft('returnTime', event.target.value)} type="time" value={draft.returnTime ?? ''} /></label>
              <label>Local de devolução<input name="return" onChange={(event) => updateDraft('returnLocation', event.target.value)} required value={draft.returnLocation} /></label>
            </TripFields>
          )}
          daysAction={(
            <TripFields title="diárias">
              <label>Diárias<input min="1" name="days" onChange={(event) => updateDraft('days', Number(event.target.value) || 1)} required type="number" value={draft.days} /></label>
            </TripFields>
          )}
        />
        {submitError && <p role="alert">{submitError}</p>}
        <button className={styles.submit} type="submit">Finalizar reserva<span className={styles.screenReaderOnly}> de {formatCurrency(total)}</span></button>
      </div>
    </form>
  )
}
