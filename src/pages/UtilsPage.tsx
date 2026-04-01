import {
  formatDate,
  isFutureDate,
  daysBetween,
  capitalize,
  truncate,
  countWords,
  slugify,
  reverseString,
  isValidEmail,
  isValidNIF,
  formatCurrency,
  percentage,
  clamp,
} from '../utils/utils'

const today = new Date()

const categories = [
  {
    id: 'dates',
    title: 'Date Utilities',
    icon: '📅',
    color: 'text-sky-400',
    items: [
      { fn: 'formatDate(today)', result: formatDate(today) },
      { fn: "isFutureDate(new Date('2099-01-01'))", result: String(isFutureDate(new Date('2099-01-01'))) },
      { fn: "isFutureDate(new Date('2000-01-01'))", result: String(isFutureDate(new Date('2000-01-01'))) },
      {
        fn: "daysBetween('2024-01-01', '2024-03-01')",
        result: String(daysBetween(new Date('2024-01-01'), new Date('2024-03-01'))),
      },
    ],
  },
  {
    id: 'strings',
    title: 'String Utilities',
    icon: '🔤',
    color: 'text-indigo-400',
    items: [
      { fn: "capitalize('hello world')", result: capitalize('hello world') },
      { fn: "truncate('Unit Testing Workshop', 14)", result: truncate('Unit Testing Workshop', 14) },
      { fn: "countWords('the quick brown fox')", result: String(countWords('the quick brown fox')) },
      { fn: "slugify('Hello World! 2024')", result: slugify('Hello World! 2024') },
      { fn: "reverseString('playwright')", result: reverseString('playwright') },
    ],
  },
  {
    id: 'validation',
    title: 'Validation Utilities',
    icon: '✅',
    color: 'text-emerald-400',
    items: [
      { fn: "isValidEmail('dev@workshop.io')", result: String(isValidEmail('dev@workshop.io')) },
      { fn: "isValidEmail('not-an-email')", result: String(isValidEmail('not-an-email')) },
      { fn: "isValidNIF('545259045')", result: String(isValidNIF('545259045')) },
      { fn: "isValidNIF('123456789')", result: String(isValidNIF('123456789')) },
    ],
  },
  {
    id: 'numbers',
    title: 'Number Utilities',
    icon: '🔢',
    color: 'text-amber-400',
    items: [
      { fn: 'formatCurrency(1234.56)', result: formatCurrency(1234.56) },
      { fn: 'percentage(25, 200)', result: String(percentage(25, 200)) },
      { fn: 'clamp(150, 0, 100)', result: String(clamp(150, 0, 100)) },
      { fn: 'clamp(-5, 0, 100)', result: String(clamp(-5, 0, 100)) },
      { fn: 'clamp(42, 0, 100)', result: String(clamp(42, 0, 100)) },
    ],
  },
]

export function UtilsPage() {
  return (
    <div data-testid="utils-page" className="space-y-6">
      <p className="text-slate-400 text-sm">
        Live output of every utility function exported from{' '}
        <code className="text-sky-400 bg-slate-800 px-1.5 py-0.5 rounded">utils.ts</code>.
        These are the functions you will unit-test during the workshop.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <section
            key={cat.id}
            data-testid={`utils-category-${cat.id}`}
            className="bg-slate-800 rounded-xl p-5 border border-slate-700"
          >
            <h2 className={`${cat.color} font-semibold text-base mb-4 flex items-center gap-2`}>
              {cat.icon} {cat.title}
            </h2>
            <div className="flex flex-col gap-2">
              {cat.items.map(item => (
                <div
                  key={item.fn}
                  className="bg-slate-900 rounded-md px-4 py-2.5 border border-slate-700"
                >
                  <div className="text-xs text-slate-500 font-mono mb-1">{item.fn}</div>
                  <div className="text-emerald-400 font-mono font-semibold">{item.result}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
