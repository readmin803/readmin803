export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const name = String(body?.name ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const subject = String(body?.subject ?? '').trim()
  const message = String(body?.message ?? '').trim()

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Faltan campos obligatorios' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL

  if (!apiKey || !to) {
    throw createError({ statusCode: 500, statusMessage: 'Configuración de email incompleta' })
  }

  const from = process.env.RESEND_FROM || 'onboarding@resend.dev'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: subject || 'Nuevo contacto desde el portafolio',
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    })
  })

  if (!res.ok) {
    const detail = await res.text()
    throw createError({ statusCode: res.status, statusMessage: `Error al enviar el email: ${detail}` })
  }

  return { ok: true }
})
