import type { AuthCredentials, AuthResult } from './auth.types'

const SESSION_KEY = 'hermex.auth.session'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Valida o acesso da interface. Em produção, esta função deve chamar a API
 * de autenticação; por enquanto ela mantém o fluxo pronto para integração.
 */
export function authenticate({ email, password }: AuthCredentials): AuthResult {
  if (!isValidEmail(email)) return { success: false, message: 'Informe um e-mail válido.' }
  if (password.length < 6) return { success: false, message: 'A senha deve ter pelo menos 6 caracteres.' }

  const user = { name: email.split('@')[0], email: email.toLowerCase() }
  saveSession(user)
  return { success: true, message: 'Login realizado com sucesso.', user }
}

/** Valida e cria uma sessão de demonstração para o cadastro. */
export function register({ name = '', email, password }: AuthCredentials): AuthResult {
  if (name.trim().length < 2) return { success: false, message: 'Informe seu nome completo.' }
  if (!isValidEmail(email)) return { success: false, message: 'Informe um e-mail válido.' }
  if (password.length < 6) return { success: false, message: 'A senha deve ter pelo menos 6 caracteres.' }

  const user = { name: name.trim(), email: email.toLowerCase() }
  saveSession(user)
  return { success: true, message: 'Cadastro realizado com sucesso.', user }
}

function saveSession(user: { name: string; email: string }) {
  if (typeof window !== 'undefined') window.localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function getSession() {
  if (typeof window === 'undefined') return null
  const session = window.localStorage.getItem(SESSION_KEY)
  return session ? (JSON.parse(session) as { name: string; email: string }) : null
}

export function clearSession() {
  if (typeof window !== 'undefined') window.localStorage.removeItem(SESSION_KEY)
}
