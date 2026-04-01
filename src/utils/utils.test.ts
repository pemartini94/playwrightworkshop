// ─────────────────────────────────────────────────────────────────────────────
// utils.test.ts  —  Complete unit test suite for utils.ts
// ─────────────────────────────────────────────────────────────────────────────
import { describe, it, expect } from 'vitest'
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
} from './utils'

// ── DATE UTILITIES ────────────────────────────────────────────────────────────

describe('formatDate', () => {
  it('formats a date as DD/MM/YYYY', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('15/01/2024')
  })

  it('pads single-digit day and month with a leading zero', () => {
    const date = new Date('2024-03-05')
    expect(formatDate(date)).toBe('05/03/2024')
  })

  it('correctly formats December 31st', () => {
    const date = new Date('2024-12-31')
    expect(formatDate(date)).toBe('31/12/2024')
  })

  it('throws for an invalid date', () => {
    expect(() => formatDate(new Date('not-a-date'))).toThrow('Invalid date')
  })

  // Uncomment to see what a failing test looks like:
  // it('INTENTIONAL FAIL: wrong format', () => {
  //   expect(formatDate(new Date('2024-01-15'))).toBe('2024-01-15') // ❌ ISO, not DD/MM/YYYY
  // })
})

describe('isFutureDate', () => {
  it('returns true for a date 10 years in the future', () => {
    const future = new Date()
    future.setFullYear(future.getFullYear() + 10)
    expect(isFutureDate(future)).toBe(true)
  })

  it('returns false for a date in the past', () => {
    expect(isFutureDate(new Date('2000-01-01'))).toBe(false)
  })

  it('returns false for the Unix epoch', () => {
    expect(isFutureDate(new Date(0))).toBe(false)
  })
})

describe('daysBetween', () => {
  it('calculates the number of days between two dates', () => {
    expect(daysBetween(new Date('2024-01-01'), new Date('2024-01-11'))).toBe(10)
  })

  it('returns the same result regardless of argument order', () => {
    const d1 = new Date('2024-01-01')
    const d2 = new Date('2024-03-01')
    expect(daysBetween(d1, d2)).toBe(daysBetween(d2, d1))
  })

  it('returns 0 for the same date', () => {
    const d = new Date('2024-06-15')
    expect(daysBetween(d, d)).toBe(0)
  })

  it('calculates across a year boundary', () => {
    expect(daysBetween(new Date('2023-12-25'), new Date('2024-01-01'))).toBe(7)
  })
})

// ── STRING UTILITIES ──────────────────────────────────────────────────────────

describe('capitalize', () => {
  it('uppercases the first character', () => {
    expect(capitalize('hello world')).toBe('Hello world')
  })

  it('leaves all other characters unchanged', () => {
    expect(capitalize('hELLO')).toBe('HELLO')
  })

  it('works with a single character', () => {
    expect(capitalize('a')).toBe('A')
  })

  it('throws for an empty string', () => {
    expect(() => capitalize('')).toThrow('String cannot be empty')
  })
})

describe('truncate', () => {
  it('truncates strings longer than maxLength and appends ...', () => {
    expect(truncate('Hello cruel world', 5)).toBe('Hello...')
  })

  it('returns the string unchanged when it fits within maxLength', () => {
    expect(truncate('Hi', 10)).toBe('Hi')
  })

  it('returns the string unchanged when length is exactly maxLength', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })

  it('throws when maxLength is zero', () => {
    expect(() => truncate('test', 0)).toThrow('maxLength must be positive')
  })

  it('throws when maxLength is negative', () => {
    expect(() => truncate('test', -5)).toThrow()
  })
})

describe('countWords', () => {
  it('counts words in a normal sentence', () => {
    expect(countWords('the quick brown fox')).toBe(4)
  })

  it('returns 0 for an empty string', () => {
    expect(countWords('')).toBe(0)
  })

  it('returns 0 for a whitespace-only string', () => {
    expect(countWords('   ')).toBe(0)
  })

  it('ignores leading, trailing, and extra spaces between words', () => {
    expect(countWords('  hello   world  ')).toBe(2)
  })

  it('counts a single word correctly', () => {
    expect(countWords('testing')).toBe(1)
  })
})

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('strips special characters', () => {
    expect(slugify('Hello World! 2024')).toBe('hello-world-2024')
  })

  it('collapses multiple spaces into a single hyphen', () => {
    expect(slugify('Hello   World')).toBe('hello-world')
  })

  it('trims leading and trailing whitespace', () => {
    expect(slugify('  hello world  ')).toBe('hello-world')
  })

  it('returns an empty string for an empty input', () => {
    expect(slugify('')).toBe('')
  })
})

describe('reverseString', () => {
  it('reverses a simple string', () => {
    expect(reverseString('hello')).toBe('olleh')
  })

  it('returns an empty string unchanged', () => {
    expect(reverseString('')).toBe('')
  })

  it('returns a single character unchanged', () => {
    expect(reverseString('a')).toBe('a')
  })

  it('is its own inverse — double reverse equals the original', () => {
    const str = 'playwright'
    expect(reverseString(reverseString(str))).toBe(str)
  })
})

// ── VALIDATION UTILITIES ──────────────────────────────────────────────────────

describe('isValidEmail', () => {
  it('accepts a standard email address', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
  })

  it('accepts an email with dots in the local part', () => {
    expect(isValidEmail('first.last@company.io')).toBe(true)
  })

  it('rejects a string with no @ symbol', () => {
    expect(isValidEmail('not-an-email')).toBe(false)
  })

  it('rejects a string with no domain extension', () => {
    expect(isValidEmail('user@domain')).toBe(false)
  })

  it('rejects a string with no local part', () => {
    expect(isValidEmail('@example.com')).toBe(false)
  })

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })
})

describe('isValidNIF', () => {
  it('accepts a known-valid NIF (545259045)', () => {
    expect(isValidNIF('545259045')).toBe(true)
  })

  it('accepts another known-valid NIF (123456789)', () => {
    expect(isValidNIF('123456789')).toBe(true)
  })

  it('rejects a NIF with letters', () => {
    expect(isValidNIF('12345678A')).toBe(false)
  })

  it('rejects a NIF that is too short', () => {
    expect(isValidNIF('12345')).toBe(false)
  })

  it('rejects a NIF that is too long', () => {
    expect(isValidNIF('1234567890')).toBe(false)
  })

  it('rejects a NIF starting with 0', () => {
    expect(isValidNIF('012345678')).toBe(false)
  })

  it('rejects a NIF with a wrong check digit', () => {
    // 545259045 is valid — changing the last digit breaks the checksum
    expect(isValidNIF('545259046')).toBe(false)
  })
})

// ── NUMBER UTILITIES ──────────────────────────────────────────────────────────

describe('formatCurrency', () => {
  it('formats a number as a EUR currency string', () => {
    const result = formatCurrency(1234.56)
    expect(result).toContain('1,234.56')
    expect(result).toContain('€')
  })

  it('formats zero', () => {
    const result = formatCurrency(0)
    expect(result).toContain('0')
    expect(result).toContain('€')
  })

  it('formats a negative value', () => {
    const result = formatCurrency(-99.99)
    expect(result).toContain('99.99')
  })
})

describe('percentage', () => {
  it('calculates what percent a value is of a total', () => {
    expect(percentage(25, 200)).toBe(12.5)
  })

  it('returns 50 for half', () => {
    expect(percentage(50, 100)).toBe(50)
  })

  it('returns 100 when value equals total', () => {
    expect(percentage(100, 100)).toBe(100)
  })

  it('returns values greater than 100 when value exceeds total', () => {
    expect(percentage(150, 100)).toBe(150)
  })

  it('throws when total is zero', () => {
    expect(() => percentage(10, 0)).toThrow('Total cannot be zero')
  })
})

describe('clamp', () => {
  it('returns the value unchanged when it is within range', () => {
    expect(clamp(42, 0, 100)).toBe(42)
  })

  it('returns max when value exceeds it', () => {
    expect(clamp(150, 0, 100)).toBe(100)
  })

  it('returns min when value is below it', () => {
    expect(clamp(-5, 0, 100)).toBe(0)
  })

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 100)).toBe(0)
  })

  it('returns max when value equals max', () => {
    expect(clamp(100, 0, 100)).toBe(100)
  })

  it('throws when min is greater than max', () => {
    expect(() => clamp(50, 100, 0)).toThrow('min cannot be greater than max')
  })
})