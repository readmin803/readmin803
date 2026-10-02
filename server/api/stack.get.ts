import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getStackConfig } from '../utils/edit-auth'

const CACHE_TTL_MS = 30_000
const cache: { at: number; content: string | null } = { at: 0, content: null }

const fromDisk = async (path: string) => {
  try {
    return await readFile(resolve(process.cwd(), path), 'utf8')
  } catch {
    return null
  }
}

const fromGitHub = async (repo: string, branch: string, path: string, token?: string) => {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export default cachedEventHandler(
  async () => {
    const cfg = getStackConfig()

    if (cache.content !== null && Date.now() - cache.at < CACHE_TTL_MS) {
      return { content: cache.content }
    }

    let content = await fromDisk(cfg.path)

    if (content === null) {
      content = await fromGitHub(cfg.repo, cfg.branch, cfg.path, cfg.token)
    }

    if (content === null) {
      throw createError({ statusCode: 500, message: 'No se pudo cargar stack.txt' })
    }

    cache.at = Date.now()
    cache.content = content

    return { content }
  },
  { maxAge: 30, staleMaxAge: 60, swr: true }
)
