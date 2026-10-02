import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getStackConfig, isValidEditToken } from '../utils/edit-auth'

const MAX_LENGTH = 200000

const githubHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'readmin803-portfolio',
  'X-GitHub-Api-Version': '2022-11-28'
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = typeof body?.token === 'string' ? body.token : ''
  const content = typeof body?.content === 'string' ? body.content : ''

  if (!isValidEditToken(token)) {
    throw createError({ statusCode: 401, message: 'Sesion de edicion no valida' })
  }

  if (!content || content.length > MAX_LENGTH || content.includes(String.fromCharCode(0))) {
    throw createError({ statusCode: 400, message: 'Contenido no valido' })
  }

  const cfg = getStackConfig()
  const normalized = content.replace(/\r\n/g, '\n').replace(/\n*$/, '\n')

  if (!cfg.token) {
    if (!process.dev) {
      throw createError({ statusCode: 503, message: 'GITHUB_TOKEN no configurado en el entorno' })
    }
    await writeFile(resolve(process.cwd(), cfg.path), normalized, 'utf8')
    return { ok: true, scope: 'local', message: 'Guardado en data/stack.txt (haz commit para publicarlo)' }
  }

  const apiUrl = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.path}`

  const current = await fetch(`${apiUrl}?ref=${encodeURIComponent(cfg.branch)}`, {
    headers: githubHeaders(cfg.token)
  })

  if (!current.ok) {
    throw createError({ statusCode: 502, message: `GitHub: no se pudo leer el archivo (${current.status})` })
  }

  const meta = await current.json() as { sha?: string }

  const put = await fetch(apiUrl, {
    method: 'PUT',
    headers: githubHeaders(cfg.token),
    body: JSON.stringify({
      message: `chore(stack): actualizar ${cfg.path} desde el editor web`,
      content: Buffer.from(normalized, 'utf8').toString('base64'),
      sha: meta.sha,
      branch: cfg.branch
    })
  })

  if (!put.ok) {
    const detail = await put.text().catch(() => '')
    throw createError({
      statusCode: 502,
      message: `GitHub: no se pudo guardar (${put.status}) ${detail.slice(0, 200)}`
    })
  }

  const saved = await put.json() as { html_url?: string; commit?: { html_url?: string } }

  return {
    ok: true,
    scope: 'github',
    commitUrl: saved.commit?.html_url || saved.html_url,
    message: 'Guardado en GitHub'
  }
})
