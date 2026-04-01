import { useState } from 'react'
import {
  formatDate,
  daysBetween,
  countWords,
  truncate,
  capitalize,
  slugify,
  formatCurrency,
  percentage,
} from '../utils/utils'

const today = new Date()
const yearEnd = new Date(today.getFullYear(), 11, 31)
const workshopStart = new Date('2026-04-01')

const stats = [
  {
    id: 'stat-date',
    label: "Today's Date",
    value: formatDate(today),
    icon: '📅',
    color: 'text-sky-400',
    border: 'border-sky-900',
  },
  {
    id: 'stat-days-to-year-end',
    label: 'Days Left in Year',
    value: String(daysBetween(today, yearEnd)),
    icon: '⏳',
    color: 'text-indigo-400',
    border: 'border-indigo-900',
  },
  {
    id: 'stat-util-count',
    label: 'Utility Functions',
    value: '13',
    icon: '⚙️',
    color: 'text-emerald-400',
    border: 'border-emerald-900',
  },
  {
    id: 'stat-days-since-workshop',
    label: 'Workshop Age (days)',
    value: String(daysBetween(workshopStart, today)),
    icon: '🎓',
    color: 'text-amber-400',
    border: 'border-amber-900',
  },
]

export function DashboardPage() {
  const [inputText, setInputText] = useState('')
  const [budget, setBudget] = useState(500)
  const [spent, setSpent] = useState(320)

  const wordCount = countWords(inputText)
  const preview = inputText ? truncate(inputText, 40) : '—'
  const capitalized = inputText ? capitalize(inputText) : '—'
  const slug = inputText ? slugify(inputText) : '—'
  const spentPct = percentage(spent, budget || 1)

  return (
    <div data-testid="dashboard-page" className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div
            key={stat.id}
            data-testid={stat.id}
            className={`bg-slate-800 rounded-xl p-5 border ${stat.border} flex flex-col gap-2`}
          >
            <span className="text-2xl">{stat.icon}</span>
            <span className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</span>
            <span className="text-slate-400 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Text Analyzer */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">Text Analyzer</h2>
        <textarea
          data-testid="text-analyzer-input"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Type something to analyze…"
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 resize-none outline-none focus:ring-2 focus:ring-sky-500 mb-4"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ResultCard label="Word Count" value={String(wordCount)} testId="analyzer-word-count" />
          <ResultCard label="Preview (40 chars)" value={preview} testId="analyzer-preview" />
          <ResultCard label="Capitalized" value={capitalized} testId="analyzer-capitalized" />
          <ResultCard label="Slug" value={slug} testId="analyzer-slug" />
        </div>
      </div>

      {/* Budget Tracker */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">Budget Tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Total Budget (€)</label>
              <input
                data-testid="budget-input"
                type="number"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Amount Spent (€)</label>
              <input
                data-testid="spent-input"
                type="number"
                value={spent}
                onChange={e => setSpent(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Spent</span>
              <span data-testid="budget-percentage">{spentPct.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
              <div
                data-testid="budget-bar"
                className={`h-full rounded-full transition-all ${spentPct > 90 ? 'bg-red-500' : spentPct > 70 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                style={{ width: `${Math.min(spentPct, 100)}%` }}
              />
            </div>
            <div className="flex justify-between">
              <span data-testid="budget-spent" className="text-slate-200 font-mono font-semibold">
                {formatCurrency(spent)}
              </span>
              <span data-testid="budget-total" className="text-slate-400 font-mono">
                / {formatCurrency(budget)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({
  label,
  value,
  testId,
}: {
  label: string
  value: string
  testId: string
}) {
  return (
    <div className="bg-slate-900 rounded-lg px-4 py-3 border border-slate-700">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div data-testid={testId} className="text-emerald-400 font-mono font-semibold truncate">
        {value}
      </div>
    </div>
  )
}
