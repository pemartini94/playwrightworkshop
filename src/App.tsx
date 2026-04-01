import { useState } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { UtilsPage } from './pages/UtilsPage'
import { ContactPage } from './pages/ContactPage'

type Tab = 'dashboard' | 'utils' | 'contact'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'utils', label: 'Utils Explorer', icon: '⚙️' },
  { id: 'contact', label: 'Contact', icon: '📋' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Top bar */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-sm font-bold text-white">
            W
          </div>
          <div>
            <h1
              data-testid="page-heading"
              className="text-sm font-bold text-slate-100 leading-none"
            >
              Testing Workshop
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">React 19 + TypeScript</p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-xs text-slate-500 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
          Vitest + Playwright
        </span>
      </header>

      {/* Navigation tabs */}
      <nav
        data-testid="main-nav"
        className="border-b border-slate-800 px-6 flex gap-1"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            data-testid={`nav-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Page content */}
      <main className="px-6 py-8 max-w-5xl mx-auto">
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'utils' && <UtilsPage />}
        {activeTab === 'contact' && <ContactPage />}
      </main>

      <footer className="text-center py-6 text-slate-600 text-xs border-t border-slate-800">
        Testing Workshop · Vitest + Playwright · {new Date().getFullYear()}
      </footer>
    </div>
  )
}
