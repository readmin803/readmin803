import {
  getEditConfig,
  checkEditPassword,
  signEditToken,
  isValidEditToken,
  TOKEN_TTL_MS
} from '../utils/edit-auth'

const MAX_ATTEMPTS = 8
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000

const attempts = new Map<string, { count: number; until: number }>()

const getClientKey = (event: Parameters<typeof getRequestIP>[0]) =>
  getRequestIP(event, { xForwardedFor: true }) || 'unknown'

const registerFailure = (key: string) => {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || entry.until < now) {
    attempts.set(key, { count: 1, until: now + ATTEMPT_WINDOW_MS })
    return 1
  }
  entry.count += 1
  return entry.count
}

export default defineEventHandler(async (event) => {
  const cfg = getEditConfig()

  if (!cfg) {
    throw createError({
      statusCode: 503,
      message: 'Edicion no configurada: define EDIT_PASSWORD y EDIT_SESSION_SECRET en el entorno'
    })
  }

  const clientKey = getClientKey(event)

  if (event.method === 'GET') {
    const token = getQuery(event).token
    return { valid: isValidEditToken(token) }
  }

  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, message: 'Metodo no permitido' })
  }

  const blocked = attempts.get(clientKey)
  if (blocked && blocked.count >= MAX_ATTEMPTS && blocked.until > Date.now()) {
    throw createError({ statusCode: 429, message: 'Demasiados intentos. Espera unos minutos.' })
  }

  const body = await readBody(event)
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!password || !checkEditPassword(password, cfg)) {
    const count = registerFailure(clientKey)
    await new Promise(resolve => setTimeout(resolve, 400))
    if (count >= MAX_ATTEMPTS) {
      throw createError({ statusCode: 429, message: 'Demasiados intentos. Espera unos minutos.' })
    }
    throw createError({ statusCode: 401, message: 'Contrasena incorrecta' })
  }

  attempts.delete(clientKey)

  const exp = Date.now() + TOKEN_TTL_MS
  return { token: `${exp}.${signEditToken(exp, cfg.secret)}`, exp }
})
