export type AuthMode = 'login' | 'register'

export type AuthCredentials = {
  email: string
  password: string
  name?: string
}

export type AuthResult = {
  success: boolean
  message: string
  user?: { name: string; email: string }
}
