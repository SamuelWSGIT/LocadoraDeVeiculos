import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import styles from './index.module.css'

/** Estrutura compartilhada por todas as páginas públicas da aplicação. */
export function AppLayout() {
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#conteudo-principal">Ir para o conteúdo principal</a>
      <Header />
      <main id="conteudo-principal">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
