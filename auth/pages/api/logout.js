import config from '../../config'

export default function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    `${config.cookieName}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
  )
  res.status(200).json({ ok: true })
}
export { default } from '../../auth/pages/api/logout'