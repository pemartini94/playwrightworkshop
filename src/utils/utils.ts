// ─────────────────────────────────────────────────────────────────────────────
// utils.ts  —  Utility functions for the testing workshop
// ─────────────────────────────────────────────────────────────────────────────

// ── DATES ────────────────────────────────────────────────────────────────────

/**
 * Formats a date as DD/MM/YYYY.
 * @example formatDate(new Date('2024-01-15')) → '15/01/2024'
 */
export function formatDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Returns true if the given date is in the future.
 * @example isFutureDate(new Date('2099-01-01')) → true
 */
export function isFutureDate(date: Date): boolean {
  return date.getTime() > Date.now()
}

/**
 * Returns the number of days between two dates.
 * @example daysBetween(new Date('2024-01-01'), new Date('2024-01-11')) → 10
 */
export function daysBetween(date1: Date, date2: Date): number {
  const diff = Math.abs(date2.getTime() - date1.getTime())
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// ── STRINGS ──────────────────────────────────────────────────────────────────

/**
 * Capitalizes the first letter of a string.
 * @example capitalize('hello world') → 'Hello world'
 */
export function capitalize(str: string): string {
  if (!str) throw new Error('String cannot be empty')
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncates a string to a maximum length, appending '...' if needed.
 * @example truncate('Hello cruel world', 7) → 'Hello c...'
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength <= 0) throw new Error('maxLength must be positive')
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

/**
 * Counts the number of words in a string.
 * @example countWords('hello world there') → 3
 */
export function countWords(str: string): number {
  if (!str.trim()) return 0
  return str.trim().split(/\s+/).length
}

/**
 * Converts a string to a URL-friendly slug.
 * @example slugify('Hello World!') → 'hello-world'
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Reverses a string.
 * @example reverseString('hello') → 'olleh'
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('')
}

// ── VALIDATION ────────────────────────────────────────────────────────────────

/**
 * Returns true if the given string is a valid email address.
 * @example isValidEmail('user@example.com') → true
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Returns true if the given string is a valid Portuguese NIF (9 digits).
 * @example isValidNIF('123456789') → true
 */
export function isValidNIF(nif: string): boolean {
  if (!/^\d{9}$/.test(nif)) return false
  const validStart = ['1', '2', '3', '5', '6', '7', '8', '9']
  if (!validStart.includes(nif[0])) return false

  let sum = 0
  for (let i = 0; i < 8; i++) {
    sum += parseInt(nif[i]) * (9 - i)
  }
  const remainder = sum % 11
  const checkDigit = remainder < 2 ? 0 : 11 - remainder
  return checkDigit === parseInt(nif[8])
}

// ── NUMBERS ───────────────────────────────────────────────────────────────────

/**
 * Formats a number as a EUR currency string.
 * @example formatCurrency(1234.56) → '€1,234.56'
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

/**
 * Calculates what percentage a value is of a total.
 * @example percentage(25, 200) → 12.5
 */
export function percentage(value: number, total: number): number {
  if (total === 0) throw new Error('Total cannot be zero')
  return (value / total) * 100
}

/**
 * Clamps a number between a minimum and maximum value.
 * @example clamp(150, 0, 100) → 100
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) throw new Error('min cannot be greater than max')
  return Math.min(Math.max(value, min), max)
}
