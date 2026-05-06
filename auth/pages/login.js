import { useState } from 'react'
import { useRouter } from 'next/router'
import config from '../config'

export default function Login() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      router.push('/')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #f5f0e8; min-height: 100vh; }
        .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f5f0e8; background-image: radial-gradient(ellipse at 20% 50%, rgba(180,130,80,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(120,70,30,0.06) 0%, transparent 50%); font-family: 'Jost', sans-serif; }
        .card { background: #fdfaf4; border: 1px solid rgba(150,100,50,0.18); padding: 56px 52px 48px; width: 100%; max-width: 400px; box-shadow: 0 2px 4px rgba(100,60,20,0.06), 0 12px 40px rgba(100,60,20,0.1); animation: fadeUp 0.6s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .ornament { text-align: center; color: #b8864e; font-size: 22px; letter-spacing: 8px; margin-bottom: 20px; opacity: 0.7; }
        .title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 32px; color: #3a2210; text-align: center; letter-spacing: 0.04em; line-height: 1.2; margin-bottom: 6px; }
        .subtitle { font-size: 11.5px; font-weight: 300; letter-spacing: 0.18em; text-transform: uppercase; color: #a07848; text-align: center; margin-bottom: 40px; }
        .divider { width: 40px; height: 1px; background: linear-gradient(to right, transparent, #b8864e, transparent); margin: 0 auto 40px; }
        .field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        label { font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400; color: #7a5535; }
        input[type="password"] { background: transparent; border: none; border-bottom: 1.5px solid rgba(150,100,50,0.35); padding: 10px 0; font-family: 'Jost', sans-serif; font-size: 15px; font-weight: 300; color: #3a2210; outline: none; transition: border-color 0.25s ease; letter-spacing: 0.08em; width: 100%; }
        input[type="password"]:focus { border-bottom-color: #8b5e2e; }
        .error { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #a0522d; text-align: center; margin-bottom: 16px; animation: fadeUp 0.3s ease both; opacity: 0.85; }
        button { width: 100%; padding: 14px; background: #6b3f1e; color: #f5ead8; border: none; font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; transition: background 0.25s ease; margin-top: 4px; }
        button:hover:not(:disabled) { background: #3a2210; }
        button:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>
      <div className="page">
        <div className="card">
          <div className="ornament">✦ ✦ ✦</div>
          <h1 className="title">Private Access</h1>
          <p className="subtitle">Enter password</p>
          <div className="divider" />
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false) }} placeholder="············" autoFocus />
            </div>
            {error && <p className="error">Incorrect password — try again</p>}
            <button type="submit" disabled={loading || !pw}>
              {loading ? 'Verifying...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}