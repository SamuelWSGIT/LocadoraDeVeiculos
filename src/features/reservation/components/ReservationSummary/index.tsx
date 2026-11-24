import type { ReactNode } from 'react'
import { formatCurrency, getProtection } from '../../reservation.service'
import type { ReservationDraft } from '../../reservation.types'
import type { Vehicle } from '../../../fleet/vehicle.types'
import styles from './index.module.css'

type SummaryProps = {
  draft: ReservationDraft
  vehicle?: Vehicle
  vehiclePrice: number
  protectionPrice: number
  total: number
  code?: string
  vehicleAction?: ReactNode
  pickupAction?: ReactNode
  returnAction?: ReactNode
  daysAction?: ReactNode
  protectionAction?: ReactNode
}

function SummaryRow({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className={styles.row}>
      <div className={styles.rowHeading}><h3>{title}</h3>{action}</div>
      {children}
    </section>
  )
}

function TripDetails({ date, time, location }: { date: string; time?: string; location: string }) {
  const formattedDate = date ? new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T00:00:00`)) : 'A definir'
  return (
    <dl className={styles.trip}>
      <div><dt>Data:</dt><dd>{formattedDate}</dd></div>
      <div><dt>Horário:</dt><dd>{time || 'A definir'}</dd></div>
      <div><dt>Local:</dt><dd>{location || 'A definir'}</dd></div>
    </dl>
  )
}

function PriceLine({ days, price }: { days: number; price: number }) {
  return <p className={styles.priceLine}><span>{days}x{formatCurrency(price)}</span><span>{formatCurrency(days * price)}</span></p>
}

export function ReservationSummary({ draft, vehicle, vehiclePrice, protectionPrice, total, code, vehicleAction, pickupAction, returnAction, daysAction, protectionAction }: SummaryProps) {
  return (
    <section aria-label="Resumo da sua reserva" className={styles.card}>
      {code
        ? <h2 className={styles.code}>Código de reserva:<br /><span title={code}>{code.replaceAll('-', '').slice(0, 8).toUpperCase()}</span></h2>
        : <h2 className={styles.banner}>Resumo da sua reserva</h2>}
      <div className={styles.content}>
        <SummaryRow action={vehicleAction} title="Veículo">
          <p className={styles.vehicle}>{vehicle?.name ?? 'Veículo'}</p>
          {vehicle?.subtitle && (
            <p>{vehicle.id === 'hb20' ? 'Intermediário Hatch Manual' : vehicle.subtitle}.{vehicle.id === 'hb20' && <><br />Grupo C - Econômico Sedan com ar condicionado.</>}</p>
          )}
        </SummaryRow>
        <SummaryRow action={pickupAction} title="Retirada">
          <TripDetails date={draft.pickupDate} location={draft.pickupLocation} time={draft.pickupTime} />
        </SummaryRow>
        <SummaryRow action={returnAction} title="Devolução">
          <TripDetails date={draft.returnDate} location={draft.returnLocation} time={draft.returnTime} />
        </SummaryRow>
        <SummaryRow action={daysAction} title="Diárias">
          <PriceLine days={draft.days} price={vehiclePrice} />
        </SummaryRow>
        <SummaryRow action={protectionAction} title="Proteção">
          <p className={styles.vehicle}>{getProtection(draft.protection).name}</p>
          {draft.protection !== 'none' && <PriceLine days={draft.days} price={protectionPrice} />}
        </SummaryRow>
      </div>
      <p className={code ? styles.confirmedTotal : styles.banner}><span>{code ? 'Valor total previsto' : 'Valor total:'}</span><strong>{formatCurrency(total)}</strong></p>
    </section>
  )
}
