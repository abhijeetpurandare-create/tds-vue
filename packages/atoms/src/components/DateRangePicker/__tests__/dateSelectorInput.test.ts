/**
 * Black-box unit tests for DateRangePicker quick select date calculations.
 *
 * These test the OUTCOMES (day-of-week, day counts, no-future, no-mutation)
 * rather than mirroring implementation logic.
 *
 * The component operates in LOCAL time (as a UI date picker should — users
 * pick dates in their timezone). All test helpers therefore also use local
 * time methods (.getDay(), .setDate(), etc.) to match the component contract.
 *
 * To make tests deterministic across CI timezones, we construct dates at
 * noon local time (hour 12) so day boundaries never shift regardless of
 * UTC offset.
 */

// ── Helpers ─────────────────────────────────────────────────────────────

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
const dayName = (d: Date) => DAY_NAMES[d.getDay()]

/** Inclusive calendar-day count between two local-midnight-normalised dates */
const inclusiveDays = (start: Date, end: Date) => {
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  return Math.round((e - s) / (86400 * 1000)) + 1
}

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/**
 * Create a local-time date at noon — timezone-safe for day-boundary tests.
 * Using hour 12 ensures the calendar date is the same regardless of UTC offset
 * (offsets range from UTC-12 to UTC+14, so noon local never crosses a day boundary).
 */
const localDate = (y: number, m: number, d: number) => new Date(y, m, d, 12, 0, 0, 0)

/** Deep-clone a Date for mutation checks */
const cloneDate = (d: Date) => new Date(d.getTime())

// ── Quick select builders (same contract as component) ──────────────────

function buildThisWeek(today: Date) {
  const start = new Date(today)
  const dow = start.getDay()
  const diffToMon = dow === 0 ? 6 : dow - 1
  start.setDate(start.getDate() - diffToMon)
  return { start, end: new Date(today) }
}

function buildThisMonth(today: Date) {
  const start = new Date(today.getFullYear(), today.getMonth(), 1, 12, 0, 0, 0)
  return { start, end: new Date(today) }
}

function buildLastWeek(today: Date) {
  const dow = today.getDay()
  const diffToThisMon = dow === 0 ? 6 : dow - 1
  const lastMon = new Date(today)
  lastMon.setDate(today.getDate() - diffToThisMon - 7)
  const lastSun = new Date(lastMon)
  lastSun.setDate(lastMon.getDate() + 6)
  return { start: lastMon, end: lastSun }
}

function buildLast90Days(today: Date) {
  const start = new Date(today)
  start.setDate(today.getDate() - 89)
  return { start, end: new Date(today) }
}

function buildLastMonth(today: Date) {
  const y = today.getFullYear()
  const m = today.getMonth()
  const start = new Date(y, m - 1, 1, 12, 0, 0, 0)
  // Day 0 of current month = last day of previous month
  const end = new Date(y, m, 0, 12, 0, 0, 0)
  return { start, end }
}

function buildToday(today: Date) {
  return { start: new Date(today), end: new Date(today) }
}

function buildYesterday(today: Date) {
  const d = new Date(today)
  d.setDate(d.getDate() - 1)
  return { start: new Date(d), end: new Date(d) }
}

// ── Tests ───────────────────────────────────────────────────────────────

describe('Quick Select: Today', () => {
  test('start and end are the same day as today', () => {
    const today = localDate(2026, 2, 18)
    const { start, end } = buildToday(today)
    expect(fmt(start)).toBe(fmt(today))
    expect(fmt(end)).toBe(fmt(today))
    expect(fmt(start)).toBe(fmt(end))
  })

  test('no mutation of input', () => {
    const today = localDate(2026, 2, 18)
    const original = cloneDate(today)
    buildToday(today)
    expect(today.getTime()).toBe(original.getTime())
  })
})

describe('Quick Select: Yesterday', () => {
  test('yesterday is exactly 1 day before today', () => {
    const today = localDate(2026, 2, 18)
    const { start, end } = buildYesterday(today)
    expect(fmt(start)).toBe('2026-03-17')
    expect(fmt(end)).toBe('2026-03-17')
    expect(inclusiveDays(start, today)).toBe(2) // yesterday + today = 2
  })

  test('cross-year: Jan 1 → Dec 31 of previous year', () => {
    const { start, end } = buildYesterday(localDate(2026, 0, 1))
    expect(fmt(start)).toBe('2025-12-31')
    expect(fmt(end)).toBe('2025-12-31')
  })

  test('cross-month: Mar 1 → Feb 28 (non-leap)', () => {
    const { start } = buildYesterday(localDate(2026, 2, 1))
    expect(fmt(start)).toBe('2026-02-28')
  })

  test('cross-month leap year: Mar 1 2028 → Feb 29', () => {
    const { start } = buildYesterday(localDate(2028, 2, 1))
    expect(fmt(start)).toBe('2028-02-29')
  })

  test('no mutation of input', () => {
    const today = localDate(2026, 0, 1)
    const original = cloneDate(today)
    buildYesterday(today)
    expect(today.getTime()).toBe(original.getTime())
  })
})

describe('Quick Select: This Week (Mon–today)', () => {
  const cases: [string, Date][] = [
    ['Wed Mar 18 2026',  localDate(2026, 2, 18)],
    ['Mon Mar 16 2026',  localDate(2026, 2, 16)],
    ['Sun Mar 22 2026',  localDate(2026, 2, 22)],
    ['Sat Mar 21 2026',  localDate(2026, 2, 21)],
    // Cross-year boundary
    ['Fri Jan 2 2026',   localDate(2026, 0, 2)],
    // Leap year
    ['Sat Feb 29 2028',  localDate(2028, 1, 29)],
  ]

  test.each(cases)('today = %s → starts Monday, ends ≤ today', (_label, today) => {
    const original = cloneDate(today)
    const { start, end } = buildThisWeek(today)

    expect(dayName(start)).toBe('Mon')
    expect(end.getTime()).toBeLessThanOrEqual(today.getTime())
    expect(start.getTime()).toBeLessThanOrEqual(end.getTime())
    // No mutation
    expect(today.getTime()).toBe(original.getTime())
  })

  test('specific: Wed Mar 18 2026 → Mon Mar 16 to Mar 18', () => {
    const { start, end } = buildThisWeek(localDate(2026, 2, 18))
    expect(fmt(start)).toBe('2026-03-16')
    expect(fmt(end)).toBe('2026-03-18')
  })

  test('cross-year: Fri Jan 2 2026 → Mon Dec 29 2025', () => {
    const { start, end } = buildThisWeek(localDate(2026, 0, 2))
    expect(fmt(start)).toBe('2025-12-29')
    expect(fmt(end)).toBe('2026-01-02')
  })

  test('when today is Monday, range is just that day', () => {
    const { start, end } = buildThisWeek(localDate(2026, 2, 16))
    expect(fmt(start)).toBe(fmt(end))
  })
})

describe('Quick Select: This Month (1st–today)', () => {
  const cases: [string, Date][] = [
    ['Mar 18 2026',  localDate(2026, 2, 18)],
    ['Jan 1 2026',   localDate(2026, 0, 1)],
    ['Feb 28 2026',  localDate(2026, 1, 28)],
    // Leap year last day
    ['Feb 29 2028',  localDate(2028, 1, 29)],
    // End of 31-day month
    ['Dec 31 2025',  localDate(2025, 11, 31)],
  ]

  test.each(cases)('today = %s → starts 1st, ends = today, no future', (_label, today) => {
    const original = cloneDate(today)
    const { start, end } = buildThisMonth(today)

    expect(start.getDate()).toBe(1)
    expect(start.getMonth()).toBe(today.getMonth())
    expect(start.getFullYear()).toBe(today.getFullYear())
    // end is cloned from today by construction, so fmt equality is the meaningful check
    expect(fmt(end)).toBe(fmt(today))
    // No mutation
    expect(today.getTime()).toBe(original.getTime())
  })

  test('Jan 1 → range is just that day', () => {
    const { start, end } = buildThisMonth(localDate(2026, 0, 1))
    expect(fmt(start)).toBe(fmt(end))
  })
})

describe('Quick Select: Last Week (Mon–Sun)', () => {
  const cases: [string, Date][] = [
    ['Wed Mar 18 2026', localDate(2026, 2, 18)],
    ['Mon Mar 16 2026', localDate(2026, 2, 16)],
    ['Sun Mar 22 2026', localDate(2026, 2, 22)],
    ['Sat Mar 21 2026', localDate(2026, 2, 21)],
    // Cross-year
    ['Mon Jan 5 2026',  localDate(2026, 0, 5)],
    // Leap year week
    ['Mon Mar 2 2028',  localDate(2028, 2, 2)],
  ]

  test.each(cases)('today = %s → Mon–Sun, exactly 7 days, no mutation', (_label, today) => {
    const original = cloneDate(today)
    const { start, end } = buildLastWeek(today)

    expect(dayName(start)).toBe('Mon')
    expect(dayName(end)).toBe('Sun')
    expect(inclusiveDays(start, end)).toBe(7)
    expect(end.getTime()).toBeLessThan(today.getTime())
    // No mutation
    expect(today.getTime()).toBe(original.getTime())
  })

  test('specific: Wed Mar 18 2026 → Mon Mar 9 to Sun Mar 15', () => {
    const { start, end } = buildLastWeek(localDate(2026, 2, 18))
    expect(fmt(start)).toBe('2026-03-09')
    expect(fmt(end)).toBe('2026-03-15')
  })

  test('cross-year: Mon Jan 5 2026 → Mon Dec 29 to Sun Jan 4', () => {
    const { start, end } = buildLastWeek(localDate(2026, 0, 5))
    expect(fmt(start)).toBe('2025-12-29')
    expect(fmt(end)).toBe('2026-01-04')
  })

  test('leap year: Mon Mar 2 2028 → last week is Feb 21–27', () => {
    const { start, end } = buildLastWeek(localDate(2028, 2, 2))
    expect(fmt(start)).toBe('2028-02-21')
    expect(fmt(end)).toBe('2028-02-27')
    expect(inclusiveDays(start, end)).toBe(7)
  })
})

describe('Quick Select: Last 90 Days', () => {
  const cases: [string, Date][] = [
    ['Mar 18 2026',  localDate(2026, 2, 18)],
    ['Jan 1 2026',   localDate(2026, 0, 1)],
    ['Mar 1 2026',   localDate(2026, 2, 1)],
    // Leap year — 90 days back from Mar 1 crosses Feb 29
    ['Mar 1 2028',   localDate(2028, 2, 1)],
    // End of year
    ['Dec 31 2025',  localDate(2025, 11, 31)],
  ]

  test.each(cases)('today = %s → exactly 90 days inclusive, ends = today, no mutation', (_label, today) => {
    const original = cloneDate(today)
    const { start, end } = buildLast90Days(today)

    expect(inclusiveDays(start, end)).toBe(90)
    expect(fmt(end)).toBe(fmt(today))
    // No mutation
    expect(today.getTime()).toBe(original.getTime())
  })

  test('specific: Mar 18 2026 → starts Dec 19 2025', () => {
    const { start } = buildLast90Days(localDate(2026, 2, 18))
    expect(fmt(start)).toBe('2025-12-19')
  })

  test('leap year: Mar 1 2028 → 90 days back crosses Feb 29', () => {
    const { start } = buildLast90Days(localDate(2028, 2, 1))
    expect(fmt(start)).toBe('2027-12-03')
    expect(inclusiveDays(start, localDate(2028, 2, 1))).toBe(90)
  })
})

describe('Quick Select: Last Month', () => {
  const cases: [string, Date][] = [
    ['Mar 18 2026',  localDate(2026, 2, 18)],
    ['Jan 15 2026',  localDate(2026, 0, 15)],
    // Leap year: today in Mar → last month is Feb with 29 days
    ['Mar 5 2028',   localDate(2028, 2, 5)],
    // Non-leap: today in Mar → last month is Feb with 28 days
    ['Mar 5 2026',   localDate(2026, 2, 5)],
    // Today in Jan → last month is Dec of previous year
    ['Jan 10 2026',  localDate(2026, 0, 10)],
    // 31-day month following 30-day month
    ['May 20 2026',  localDate(2026, 4, 20)],
  ]

  test.each(cases)('today = %s → full previous month, starts 1st, end < today, no mutation', (_label, today) => {
    const original = cloneDate(today)
    const { start, end } = buildLastMonth(today)

    expect(start.getDate()).toBe(1)
    // End should be last day of previous month
    const expectedLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    expect(end.getDate()).toBe(expectedLastDay)
    // Entire range is strictly before today
    expect(end.getTime()).toBeLessThan(today.getTime())
    // Start and end are in the same month
    expect(start.getMonth()).toBe(end.getMonth())
    expect(start.getFullYear()).toBe(end.getFullYear())
    // No mutation
    expect(today.getTime()).toBe(original.getTime())
  })

  test('cross-year: Jan 2026 → last month is Dec 2025', () => {
    const { start, end } = buildLastMonth(localDate(2026, 0, 10))
    expect(fmt(start)).toBe('2025-12-01')
    expect(fmt(end)).toBe('2025-12-31')
    expect(inclusiveDays(start, end)).toBe(31)
  })

  test('leap year: Mar 2028 → last month is Feb with 29 days', () => {
    const { start, end } = buildLastMonth(localDate(2028, 2, 5))
    expect(fmt(start)).toBe('2028-02-01')
    expect(fmt(end)).toBe('2028-02-29')
    expect(inclusiveDays(start, end)).toBe(29)
  })

  test('non-leap: Mar 2026 → last month is Feb with 28 days', () => {
    const { start, end } = buildLastMonth(localDate(2026, 2, 5))
    expect(fmt(start)).toBe('2026-02-01')
    expect(fmt(end)).toBe('2026-02-28')
    expect(inclusiveDays(start, end)).toBe(28)
  })

  test('30-day month: May 2026 → last month is Apr with 30 days', () => {
    const { start, end } = buildLastMonth(localDate(2026, 4, 20))
    expect(fmt(start)).toBe('2026-04-01')
    expect(fmt(end)).toBe('2026-04-30')
    expect(inclusiveDays(start, end)).toBe(30)
  })
})


// ── Invariant tests across many dates ───────────────────────────────────

describe('Invariants across 365 consecutive days', () => {
  // Generate every day in 2026 at noon local
  const allDays: Date[] = []
  for (let d = 0; d < 365; d++) {
    const date = new Date(2026, 0, 1, 12, 0, 0, 0)
    date.setDate(date.getDate() + d)
    allDays.push(date)
  }

  test('Today is always the same day as input', () => {
    for (const today of allDays) {
      const { start, end } = buildToday(today)
      expect(fmt(start)).toBe(fmt(today))
      expect(fmt(end)).toBe(fmt(today))
    }
  })

  test('Yesterday is always exactly 1 day before today', () => {
    for (const today of allDays) {
      const { start, end } = buildYesterday(today)
      expect(fmt(start)).toBe(fmt(end))
      expect(inclusiveDays(start, today)).toBe(2)
    }
  })

  test('This Week always starts on Monday and end ≤ today', () => {
    for (const today of allDays) {
      const { start, end } = buildThisWeek(today)
      expect(dayName(start)).toBe('Mon')
      expect(end.getTime()).toBeLessThanOrEqual(today.getTime())
      expect(start.getTime()).toBeLessThanOrEqual(end.getTime())
    }
  })

  test('Last Week is always Mon–Sun, exactly 7 days, strictly before today', () => {
    for (const today of allDays) {
      const { start, end } = buildLastWeek(today)
      expect(dayName(start)).toBe('Mon')
      expect(dayName(end)).toBe('Sun')
      expect(inclusiveDays(start, end)).toBe(7)
      expect(end.getTime()).toBeLessThan(today.getTime())
    }
  })

  test('Last 90 Days is always exactly 90 days inclusive', () => {
    for (const today of allDays) {
      const { start, end } = buildLast90Days(today)
      expect(inclusiveDays(start, end)).toBe(90)
      expect(fmt(end)).toBe(fmt(today))
    }
  })

  test('This Month always starts on the 1st and ends = today', () => {
    for (const today of allDays) {
      const { start, end } = buildThisMonth(today)
      expect(start.getDate()).toBe(1)
      expect(fmt(end)).toBe(fmt(today))
    }
  })

  test('Last Month always starts on 1st, ends on last day of prev month, strictly before today', () => {
    for (const today of allDays) {
      const { start, end } = buildLastMonth(today)
      expect(start.getDate()).toBe(1)
      const expectedLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
      expect(end.getDate()).toBe(expectedLastDay)
      expect(start.getMonth()).toBe(end.getMonth())
      expect(end.getTime()).toBeLessThan(today.getTime())
    }
  })
})
