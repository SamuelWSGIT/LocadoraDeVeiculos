import { Link } from 'react-router-dom'
import styles from './index.module.css'

/** Rota de fallback para endereços inexistentes. */
export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <p className="eyebrow">Erro 404</p>
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe ou foi movido.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </section>
  )
}
