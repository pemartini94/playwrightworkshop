import { ContactForm } from '../components/ContactForm'

export function ContactPage() {
  return (
    <div data-testid="contact-page" className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-200">Get in Touch</h2>
        <p className="text-slate-400 text-sm mt-1">
          Fill in the form below. This is the component you will test end-to-end with Playwright.
        </p>
      </div>

      <div
        data-testid="form-section"
        className="bg-slate-800 rounded-xl p-6 border border-slate-700"
      >
        <ContactForm />
      </div>

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="text-slate-300 font-medium mb-3 text-sm">Validation Rules</h3>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-sky-400 mt-0.5">→</span>
            <span><strong className="text-slate-300">Name</strong> — required, any non-empty string</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 mt-0.5">→</span>
            <span><strong className="text-slate-300">Email</strong> — required, validated with <code className="text-sky-400 bg-slate-900 px-1 rounded">isValidEmail()</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 mt-0.5">→</span>
            <span><strong className="text-slate-300">Message</strong> — required, any non-empty string</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 mt-0.5">→</span>
            <span>Submit button is <strong className="text-slate-300">disabled</strong> until all fields are filled</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
