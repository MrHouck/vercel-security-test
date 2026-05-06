import config from "../../config"

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body

  if (password === process.env.SITE_PASSWORD) {
    res.setHeader(
      'Set-Cookie',
      `${config.cookieName}=${process.env.AUTH_SECRET}; Path=/; HttpOnly; Secure; SameSite=Strict`
    )
    return res.status(200).json({ ok: true })
  }

  return res.status(401).json({ ok: false })
}
