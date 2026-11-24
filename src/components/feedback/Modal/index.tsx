import type { ReactNode } from 'react'
import styles from './index.module.css'

type ModalProps = { title: string; children: ReactNode; open: boolean; onClose: () => void }

/** Modal base do design system, com foco inicial controlado pelo navegador. */
export function Modal({ title, children, open, onClose }: ModalProps) {
  if (!open) return null

  return (
    <div aria-labelledby="modal-title" aria-modal="true" className={styles.backdrop} role="dialog">
      <div className={styles.dialog}>
        <button aria-label="Fechar janela" className={styles.close} onClick={onClose} type="button">×</button>
        <h2 id="modal-title">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  )
}
