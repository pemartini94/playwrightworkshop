import { useState } from 'react'
import { isValidEmail } from '../utils/utils'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) {
      errs.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) errs.message = 'Message is required'
    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const isDisabled = !formData.name || !formData.email || !formData.message

  if (submitted) {
    return (
      <div
        data-testid="success-message"
        className="p-8 bg-emerald-950 rounded-lg border border-emerald-700 text-center"
      >
        <p className="text-4xl">✅</p>
        <h2 className="text-emerald-400 text-xl font-semibold mt-2 mb-1">Message sent!</h2>
        <p className="text-emerald-300 text-sm">
          Thanks, <strong>{formData.name}</strong>! We'll get back to you at{' '}
          <strong>{formData.email}</strong>.
        </p>
        <button
          data-testid="reset-button"
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', message: '' })
          }}
          className="mt-4 px-6 py-2 bg-transparent border border-emerald-600 rounded-md text-emerald-400 hover:bg-emerald-900 transition-colors cursor-pointer"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      data-testid="contact-form"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-semibold text-slate-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          data-testid="input-name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'error-name' : undefined}
          className={`px-4 py-2.5 bg-slate-900 rounded-lg text-slate-100 text-sm outline-none focus:ring-2 focus:ring-sky-500 border transition-colors ${
            errors.name ? 'border-red-500' : 'border-slate-700'
          }`}
        />
        {errors.name && (
          <span id="error-name" data-testid="error-name" className="text-red-400 text-xs">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-semibold text-slate-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          data-testid="input-email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'error-email' : undefined}
          className={`px-4 py-2.5 bg-slate-900 rounded-lg text-slate-100 text-sm outline-none focus:ring-2 focus:ring-sky-500 border transition-colors ${
            errors.email ? 'border-red-500' : 'border-slate-700'
          }`}
        />
        {errors.email && (
          <span id="error-email" data-testid="error-email" className="text-red-400 text-xs">
            {errors.email}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-semibold text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          data-testid="input-message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here…"
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'error-message' : undefined}
          className={`px-4 py-2.5 bg-slate-900 rounded-lg text-slate-100 text-sm outline-none focus:ring-2 focus:ring-sky-500 border resize-y transition-colors ${
            errors.message ? 'border-red-500' : 'border-slate-700'
          }`}
        />
        {errors.message && (
          <span id="error-message" data-testid="error-message" className="text-red-400 text-xs">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        data-testid="submit-button"
        disabled={isDisabled}
        className={`py-3 rounded-lg text-sm font-bold transition-colors ${
          isDisabled
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-sky-500 text-white cursor-pointer hover:bg-sky-400'
        }`}
      >
        Send Message
      </button>
    </form>
  )
}
