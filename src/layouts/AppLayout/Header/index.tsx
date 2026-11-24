import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { clearSession, getSession, type AuthMode } from '../../../features/auth'
import { AuthForm } from '../../../features/auth/components/AuthForm'
import { Modal } from '../../../components/feedback/Modal'
import { BookingSearch } from '../../../features/reservation/components/BookingSearch'
import { Icon } from '../../../components/ui/Icon'
import { Logo } from '../../../components/ui/Logo'
import styles from './index.module.css'

export function Header() {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null)
  const [session, setSession] = useState(getSession)
  const { pathname } = useLocation()

  function handleAuthSuccess() {
    setSession(getSession())
    setAuthMode(null)
  }

  function handleLogout() {
    clearSession()
    setSession(null)
  }

  return (
    <>
      <header className={styles.siteHeader}>
        <div className={styles.siteHeaderInner}>
          <Logo />
          <form action="#frota" className={styles.headerSearch} method="get" role="search">
            <Icon name="search" size={16} />
            <input aria-label="Pesquisar na Hermex" name="search" placeholder="O que você procura?" type="search" />
          </form>
          <nav aria-label="Navegação principal" className={styles.siteNav}>
            {session ? (
              <>
                <span title={session.name}><Icon name="user" size={16} /></span>
                <button className={styles.authLink} onClick={handleLogout} type="button"><Icon name="log-out" size={16} /> Sair</button>
              </>
            ) : (
              <>
                <button className={styles.authLink} onClick={() => setAuthMode('login')} type="button"><Icon name="log-in" size={16} /> Login</button>
                <button className={styles.authLink} onClick={() => setAuthMode('register')} type="button"><Icon name="user" size={16} /> Cadastro</button>
              </>
            )}
          </nav>
        </div>
        <Modal onClose={() => setAuthMode(null)} open={authMode !== null} title={authMode === 'login' ? 'Login' : 'Crie sua conta'}>
          {authMode && <AuthForm mode={authMode} onSuccess={handleAuthSuccess} />}
        </Modal>
      </header>
      <BookingSearch showReturn={pathname === '/'} />
    </>
  )
}
