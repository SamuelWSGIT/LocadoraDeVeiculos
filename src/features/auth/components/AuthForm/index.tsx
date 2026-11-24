import { useId, useState, type FormEvent } from 'react'
import { authenticate, register } from '../../auth.service'
import type { AuthMode } from '../../auth.types'
import styles from './index.module.css'

type AuthFormProps = {
  mode: AuthMode
  onSuccess: () => void
}

/** Formulário de acesso preparado para receber a integração com uma API. */
export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const result = mode === 'login'
      ? authenticate({ email: String(data.get('email') ?? ''), password: String(data.get('password') ?? '') })
      : register({ name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''), password: String(data.get('password') ?? '') })

    setMessage(result.message)
    setIsError(!result.success)
    if (result.success) onSuccess()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {mode === 'register' && <label htmlFor={nameId}>Nome completo<input id={nameId} name="name" autoComplete="name" required /></label>}
      <label htmlFor={emailId}>E-mail<input id={emailId} name="email" type="email" autoComplete="email" required /></label>
      <label htmlFor={passwordId}>Senha<input id={passwordId} name="password" type="password" minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required /></label>
      {message && <p aria-live="polite" className={isError ? styles.error : styles.success}>{message}</p>}
      <button type="submit">{mode === 'login' ? 'Entrar' : 'Criar cadastro'}</button>
    </form>
  )
}
