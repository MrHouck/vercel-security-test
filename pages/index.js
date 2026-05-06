import { useState } from 'react'
import { useRouter } from 'next/router'

const FILES = [
  {
    id: 'OPS-001',
    classification: 'EYES ONLY',
    title: 'Project Nightfall',
    date: '2024-03-14',
    summary: 'Preliminary findings on the northern extraction route. Contact established with field operative █████. Awaiting confirmation from Brussels.',
    tags: ['ACTIVE', 'PRIORITY'],
  },
  {
    id: 'OPS-002',
    classification: 'RESTRICTED',
    title: 'Asset Registry — Sector 7',
    date: '2024-02-28',
    summary: 'Updated manifest following the ████████ incident. Three assets relocated. Communications blackout in effect until further notice.',
    tags: ['UPDATED'],
  },
  {
    id: 'OPS-003',
    classification: 'CONFIDENTIAL',
    title: 'Financial Routing — Q1',
    date: '2024-01-09',
    summary: 'Disbursement records for Q1 operations. Totals reconciled with ████ Holdings. See attachment 3-C for full breakdown.',
    tags: ['ARCHIVED'],
  },
  {
    id: 'OPS-004',
    classification: 'TOP SECRET',
    title: 'The Wren Correspondence',
    date: '2023-11-30',
    summary: 'Intercepted communiqués from the Vienna cell. Analyst notes appended. Translation of pages 4–7 still pending clearance.',
    tags: ['SENSITIVE', 'PENDING'],
  },
]

const TAG_COLORS = {
  ACTIVE:    { bg: '#f0e6d3', color: '#7a4a1e' },
  PRIORITY:  { bg: '#e8d5b0', color: '#5c3410' },
  UPDATED:   { bg: '#e6ede0', color: '#3a5a28' },
  ARCHIVED:  { bg: '#ede8e0', color: '#5a5040' },
  SENSITIVE: { bg: '#f0ddd0', color: '#7a3820' },
  PENDING:   { bg: '#ece4d8', color: '#6a5030' },
}

const CLASS_COLORS = {
  'EYES ONLY':   '#9b2335',
  'RESTRICTED':  '#8b4513',
  'CONFIDENTIAL':'#5c6e2e',
  'TOP SECRET':  '#7b0000',
}

export default function Home() {
  const [expanded, setExpanded] = useState(null)
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background-color: #ede8de;
          min-height: 100vh;
          font-family: 'Jost', sans-serif;
        }

        .page {
          background-color: #ede8de;
          background-image:
            radial-gradient(ellipse at 10% 80%, rgba(160, 110, 50, 0.07) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 10%, rgba(100, 60, 20, 0.05) 0%, transparent 50%);
          min-height: 100vh;
          padding: 48px 24px;
        }

        .container {
          max-width: 780px;
          margin: 0 auto;
        }

        /* Header */
        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 48px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(140, 90, 40, 0.2);
        }

        .header-left {}

        .eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #a07040;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .header-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: 38px;
          color: #2e1a0a;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 6px;
        }

        .header-sub {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8a6040;
        }

        .logout-btn {
          background: transparent;
          border: 1px solid rgba(140, 90, 40, 0.35);
          padding: 8px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a5535;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 6px;
        }

        .logout-btn:hover {
          background: rgba(140, 90, 40, 0.08);
          border-color: rgba(140, 90, 40, 0.6);
        }

        /* Stats row */
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 36px;
        }

        .stat-card {
          background: rgba(253, 248, 238, 0.7);
          border: 1px solid rgba(140, 90, 40, 0.15);
          padding: 16px 20px;
        }

        .stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a07848;
          margin-bottom: 6px;
        }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: #2e1a0a;
          line-height: 1;
        }

        /* File list */
        .section-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #a07848;
          margin-bottom: 14px;
        }

        .file-item {
          background: rgba(253, 248, 238, 0.75);
          border: 1px solid rgba(140, 90, 40, 0.15);
          margin-bottom: 8px;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
          animation: fadeUp 0.5s ease both;
        }

        .file-item:nth-child(1) { animation-delay: 0.05s }
        .file-item:nth-child(2) { animation-delay: 0.1s }
        .file-item:nth-child(3) { animation-delay: 0.15s }
        .file-item:nth-child(4) { animation-delay: 0.2s }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .file-item:hover {
          border-color: rgba(140, 90, 40, 0.4);
          background: rgba(253, 248, 238, 1);
        }

        .file-item.open {
          border-color: rgba(140, 90, 40, 0.45);
        }

        .file-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
        }

        .file-id {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #a07848;
          letter-spacing: 0.1em;
          min-width: 64px;
        }

        .file-meta { flex: 1; }

        .file-classification {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          font-weight: bold;
          margin-bottom: 2px;
        }

        .file-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 400;
          color: #2e1a0a;
          letter-spacing: 0.02em;
        }

        .file-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .file-date {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          color: #b09070;
          letter-spacing: 0.08em;
        }

        .tag-row {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8.5px;
          letter-spacing: 0.12em;
          padding: 2px 7px;
        }

        .file-expand {
          border-top: 1px solid rgba(140, 90, 40, 0.12);
          padding: 16px 20px 18px 100px;
          font-size: 13.5px;
          font-weight: 300;
          color: #5a3e28;
          line-height: 1.75;
          letter-spacing: 0.02em;
        }

        .chevron {
          font-size: 11px;
          color: #b09070;
          transition: transform 0.2s ease;
          line-height: 1;
        }

        .chevron.open { transform: rotate(180deg); }

        /* Footer */
        .footer {
          margin-top: 48px;
          padding-top: 20px;
          border-top: 1px solid rgba(140, 90, 40, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          color: #b8986a;
          text-transform: uppercase;
        }
      `}</style>

      <div className="page">
        <div className="container">

          <header className="header">
            <div className="header-left">
              <div className="eyebrow">// Classified Repository — Access Granted</div>
              <h1 className="header-title">The Archive</h1>
              <p className="header-sub">Secure Document Vault · Level 4 Clearance</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              ⎋ Logout
            </button>
          </header>

          <div className="stats">
            <div className="stat-card">
              <div className="stat-label">Total Files</div>
              <div className="stat-value">{FILES.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Ops</div>
              <div className="stat-value">{FILES.filter(f => f.tags.includes('ACTIVE')).length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending</div>
              <div className="stat-value">{FILES.filter(f => f.tags.includes('PENDING')).length}</div>
            </div>
          </div>

          <div className="section-label">// Operational Files</div>

          <div>
            {FILES.map(file => (
              <div
                key={file.id}
                className={`file-item ${expanded === file.id ? 'open' : ''}`}
                onClick={() => setExpanded(expanded === file.id ? null : file.id)}
              >
                <div className="file-header">
                  <div className="file-id">{file.id}</div>
                  <div className="file-meta">
                    <div
                      className="file-classification"
                      style={{ color: CLASS_COLORS[file.classification] }}
                    >
                      {file.classification}
                    </div>
                    <div className="file-title">{file.title}</div>
                  </div>
                  <div className="file-right">
                    <div className="file-date">{file.date}</div>
                    <div className="tag-row">
                      {file.tags.map(tag => (
                        <span
                          key={tag}
                          className="tag"
                          style={TAG_COLORS[tag]}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`chevron ${expanded === file.id ? 'open' : ''}`}>▼</div>
                </div>

                {expanded === file.id && (
                  <div className="file-expand">
                    {file.summary}
                  </div>
                )}
              </div>
            ))}
          </div>

          <footer className="footer">
            <span className="footer-text">// Unauthorized reproduction is a federal offense</span>
            <span className="footer-text">SYS-NODE: 04-A · {new Date().toISOString().split('T')[0]}</span>
          </footer>

        </div>
      </div>
    </>
  )
}