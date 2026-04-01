// ─────────────────────────────────────────────────────────────────────────────
// e2e/form.spec.ts  —  End-to-end tests with Playwright
// ─────────────────────────────────────────────────────────────────────────────
import { test, expect } from '@playwright/test'

// ── APP SHELL ─────────────────────────────────────────────────────────────────

test.describe('App shell', () => {
  test('has the correct page title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Testing Workshop/)
  })

  test('shows the main heading', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByTestId('page-heading')
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Testing Workshop')
  })

  test('shows the navigation bar with three tabs', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('main-nav')).toBeVisible()
    await expect(page.getByTestId('nav-tab-dashboard')).toBeVisible()
    await expect(page.getByTestId('nav-tab-utils')).toBeVisible()
    await expect(page.getByTestId('nav-tab-contact')).toBeVisible()
  })

  test('defaults to the Dashboard tab on load', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('dashboard-page')).toBeVisible()
  })
})

// ── NAVIGATION ────────────────────────────────────────────────────────────────

test.describe('Tab navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('switches to the Utils Explorer tab', async ({ page }) => {
    await page.getByTestId('nav-tab-utils').click()
    await expect(page.getByTestId('utils-page')).toBeVisible()
    await expect(page.getByTestId('dashboard-page')).not.toBeVisible()
  })

  test('switches to the Contact tab', async ({ page }) => {
    await page.getByTestId('nav-tab-contact').click()
    await expect(page.getByTestId('contact-page')).toBeVisible()
    await expect(page.getByTestId('dashboard-page')).not.toBeVisible()
  })

  test('can switch back to Dashboard from another tab', async ({ page }) => {
    await page.getByTestId('nav-tab-contact').click()
    await page.getByTestId('nav-tab-dashboard').click()
    await expect(page.getByTestId('dashboard-page')).toBeVisible()
  })
})

// ── DASHBOARD ─────────────────────────────────────────────────────────────────

test.describe('Dashboard page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows all four stat cards', async ({ page }) => {
    await expect(page.getByTestId('stat-date')).toBeVisible()
    await expect(page.getByTestId('stat-days-to-year-end')).toBeVisible()
    await expect(page.getByTestId('stat-util-count')).toBeVisible()
    await expect(page.getByTestId('stat-days-since-workshop')).toBeVisible()
  })

  test('util count card shows 13', async ({ page }) => {
    await expect(page.getByTestId('stat-util-count')).toContainText('13')
  })

  test('text analyzer updates word count as you type', async ({ page }) => {
    await page.getByTestId('text-analyzer-input').fill('hello world foo')
    await expect(page.getByTestId('analyzer-word-count')).toHaveText('3')
  })

  test('text analyzer shows a truncated preview for long input', async ({ page }) => {
    await page.getByTestId('text-analyzer-input').fill('The quick brown fox jumps over the lazy dog')
    await expect(page.getByTestId('analyzer-preview')).toContainText('...')
  })

  test('text analyzer capitalizes the input', async ({ page }) => {
    await page.getByTestId('text-analyzer-input').fill('hello workshop')
    await expect(page.getByTestId('analyzer-capitalized')).toHaveText('Hello workshop')
  })

  test('text analyzer generates a slug', async ({ page }) => {
    await page.getByTestId('text-analyzer-input').fill('Hello World 2024')
    await expect(page.getByTestId('analyzer-slug')).toHaveText('hello-world-2024')
  })

  test('budget tracker shows the correct spend percentage', async ({ page }) => {
    // Default values: €320 spent of €500 budget = 64%
    await expect(page.getByTestId('budget-percentage')).toContainText('64.0%')
  })
})

// ── UTILS PAGE ────────────────────────────────────────────────────────────────

test.describe('Utils Explorer page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('nav-tab-utils').click()
  })

  test('shows all four function categories', async ({ page }) => {
    await expect(page.getByTestId('utils-category-dates')).toBeVisible()
    await expect(page.getByTestId('utils-category-strings')).toBeVisible()
    await expect(page.getByTestId('utils-category-validation')).toBeVisible()
    await expect(page.getByTestId('utils-category-numbers')).toBeVisible()
  })
})

// ── CONTACT FORM — INITIAL STATE ──────────────────────────────────────────────

test.describe('Contact form — initial state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('nav-tab-contact').click()
  })

  test('submit button is disabled when the form is empty', async ({ page }) => {
    await expect(page.getByTestId('submit-button')).toBeDisabled()
  })

  test('shows no validation errors on first load', async ({ page }) => {
    await expect(page.getByTestId('error-name')).not.toBeVisible()
    await expect(page.getByTestId('error-email')).not.toBeVisible()
    await expect(page.getByTestId('error-message')).not.toBeVisible()
  })

  test('all form fields start empty', async ({ page }) => {
    await expect(page.getByTestId('input-name')).toHaveValue('')
    await expect(page.getByTestId('input-email')).toHaveValue('')
    await expect(page.getByTestId('input-message')).toHaveValue('')
  })
})

// ── CONTACT FORM — VALIDATION ─────────────────────────────────────────────────

test.describe('Contact form — validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('nav-tab-contact').click()
  })

  test('submit button becomes enabled only when all fields are filled', async ({ page }) => {
    const btn = page.getByTestId('submit-button')
    await expect(btn).toBeDisabled()

    await page.getByTestId('input-name').fill('Alice')
    await expect(btn).toBeDisabled()

    await page.getByTestId('input-email').fill('alice@example.com')
    await expect(btn).toBeDisabled()

    await page.getByTestId('input-message').fill('Hello!')
    await expect(btn).toBeEnabled()
  })

  test('shows an email validation error when submit is clicked with an invalid email', async ({ page }) => {
    await page.getByTestId('input-name').fill('Alice')
    await page.getByTestId('input-email').fill('not-valid')
    await page.getByTestId('input-message').fill('Hello!')

    // All fields are non-empty so button is enabled — submit to trigger validation
    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('error-email')).toBeVisible()
    await expect(page.getByTestId('error-email')).toContainText('valid email')
  })

  test('clears the error when the user corrects the field', async ({ page }) => {
    await page.getByTestId('input-name').fill('Alice')
    await page.getByTestId('input-email').fill('bad-email')
    await page.getByTestId('input-message').fill('Hello!')
    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('error-email')).toBeVisible()

    await page.getByTestId('input-email').fill('alice@example.com')
    await expect(page.getByTestId('error-email')).not.toBeVisible()
  })
})

// ── CONTACT FORM — SUCCESSFUL SUBMISSION ──────────────────────────────────────

test.describe('Contact form — submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('nav-tab-contact').click()
  })

  test('shows the success message after a valid submission', async ({ page }) => {
    await page.getByTestId('input-name').fill('Alice Smith')
    await page.getByTestId('input-email').fill('alice@example.com')
    await page.getByTestId('input-message').fill('Hello, this is my message!')

    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('success-message')).toBeVisible()
  })

  test('success message shows the submitted name and email', async ({ page }) => {
    await page.getByTestId('input-name').fill('Alice Smith')
    await page.getByTestId('input-email').fill('alice@example.com')
    await page.getByTestId('input-message').fill('Hello!')

    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('success-message')).toContainText('Alice Smith')
    await expect(page.getByTestId('success-message')).toContainText('alice@example.com')
  })

  test('clicking "Send another message" resets the form to its initial state', async ({ page }) => {
    await page.getByTestId('input-name').fill('Alice Smith')
    await page.getByTestId('input-email').fill('alice@example.com')
    await page.getByTestId('input-message').fill('Hello!')
    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('success-message')).toBeVisible()
    await page.getByTestId('reset-button').click()

    await expect(page.getByTestId('contact-form')).toBeVisible()
    await expect(page.getByTestId('input-name')).toHaveValue('')
    await expect(page.getByTestId('submit-button')).toBeDisabled()
  })
})

// ── ACCESSIBILITY ─────────────────────────────────────────────────────────────

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('nav-tab-contact').click()
  })

  test('form fields can be targeted by their visible label text', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Message').fill('Testing labels')

    await expect(page.getByTestId('submit-button')).toBeEnabled()
  })
})