import { createHmac, createHash, timingSafeEqual } from 'node:crypto'

export const TOKEN_TTL_MS = 8 * 60 * 60 * 1000

export type EditConfig = {
  password?: string
  passwordHash?: string
  secret: string
}

const sha256Hex = (value: string) => createHash('sha256').update(value).digest('hex')

const constantTimeEqual = (a: string, b: string) => {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA)
    return false
  }
  return timingSafeEqual(bufA, bufB)
}

export const getEditConfig = (): EditConfig | null => {
  const secret = process.env.EDIT_SESSION_SECRET
  const password = process.env.EDIT_PASSWORD
  const passwordHash = process.env.EDIT_PASSWORD_SHA256?.toLowerCase().trim()

  if (!secret || (!password && !passwordHash)) return null
  return { secret, password, passwordHash }
}

export const checkEditPassword = (provided: string, cfg: EditConfig) => {
  const providedHash = sha256Hex(provided)
  if (cfg.passwordHash) return constantTimeEqual(providedHash, cfg.passwordHash)
  return constantTimeEqual(providedHash, sha256Hex(cfg.password as string))
}

export const signEditToken = (exp: number, secret: string) =>
  createHmac('sha256', secret).update(`edit:${exp}`).digest('hex')

export const isValidEditToken = (token: unknown): boolean => {
  const cfg = getEditConfig()
  if (!cfg || typeof token !== 'string') return false

  const [expRaw, sig] = token.split('.')
  const exp = Number(expRaw)
  if (!Number.isFinite(exp) || !sig || exp < Date.now()) return false

  return constantTimeEqual(sig, signEditToken(exp, cfg.secret))
}

export const getStackConfig = () => {
  const repo = process.env.GITHUB_REPO?.trim() || 'readmin803/readmin803'
  const branch = process.env.GITHUB_BRANCH?.trim() || 'main'
  const path = process.env.GITHUB_STACK_PATH?.trim() || 'data/stack.txt'
  const token = process.env.GITHUB_TOKEN?.trim()

  return { repo, branch, path, token }
}
