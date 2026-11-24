import { Link } from 'react-router-dom'
import styles from './index.module.css'

export type BreadcrumbItem = { label: string; to?: string }
type BreadcrumbsProps = { items: BreadcrumbItem[] }

/** Trilha de navegação reutilizável nas telas internas do acervo. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Trilha de navegação" className={styles.breadcrumbs}>
      <Link to="/">Home</Link>
      {items.map((item, index) => (
        <span className={styles.item} key={`${item.label}-${index}`}>
          <span aria-hidden="true">/</span>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
