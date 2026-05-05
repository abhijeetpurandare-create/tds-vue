import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import { TdsDatePickerView } from './TdsDatePickerView'

export type DatePickerVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'default'
export type DatePickerSize = 'sm' | 'md' | 'lg'

type DateRange = {
  start: Date | null
  end: Date | null
}

type Props = {
  dateFormat?: Intl.DateTimeFormatOptions // Changed to DateTimeFormatOptions for proper formatting
  calendarContainerClass?: string // New prop for outer calendar div
  calendarInnerClass?: string // New prop for inner calendar div
  calendarBorderClass?: string // New prop for calendar border
  variant?: DatePickerVariant // Theme variant
  size?: DatePickerSize // Size variant
  // New props for input mode
  mode?: 'dropdown' | 'input' // Choose between dropdown or input mode
  inputClass?: string // Custom class for input styling
  inputIcon?: React.ReactNode // Custom icon for input
  inputPlaceholder?: string // Placeholder for input mode
  onDateChange?: (range: DateRange) => void // Callback for date changes
  // New enhancement props
  enableQuickSelect?: boolean // Enable/disable quickSelect functionality
  singleDateMode?: boolean // Allow only single date selection instead of range
  minDate?: Date // Restrict selection before this date
  maxDate?: Date // Restrict selection after this date
  // Disable logic
  disabledWeekDays?: number[] // Array of weekdays to disable (0=Sun ... 6=Sat). e.g. [0] for Sundays, [0,6] for weekends
  disabledDates?: Date[] // Specific dates to disable
  popupWidth?: string // Custom width for calendar popup (CSS value like "400px" or "20rem")
  popupHeight?: string // Custom height for calendar popup (CSS value like "500px" or "30rem")
  autoScaleFont?: boolean // Automatically scale font size to fit popup container
  label?: string // Label for the date range picker
  rangeClassName?: string // Custom class for dropdown trigger (e.g. to match filter chip styling)
  appliedRangeClassName?: string // Custom class for trigger when a range is selected
  /** Activates the Tarmac TDS rendering path */
  pickerStyle?: 'tds' | (string & {})
  /** Controlled value — single Date for singleDateMode, or { start, end } for range mode */
  value?: Date | { start: Date | null; end: Date | null } | null
  /** Callback for cancel action */
  onCancel?: () => void
  /** Callback for apply/confirm — receives single Date in singleDateMode, range object otherwise */
  onApply?: (value: Date | { start: Date | null; end: Date | null } | null) => void
  /** Placeholder text for TDS input */
  placeholder?: string
  className?: string
  /** String-based display format for the trigger. Supports: 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', or pass Intl options via dateFormat */
  displayFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | (string & {})
}

export type DateRangePickerHandle = {
  clear: () => void
}

// Function to get theme colors for selected items — reads from config
const getSelectedItemColors = (
  config: typeof defaultThemeConfig.components.dateRangePicker,
  variant: DatePickerVariant
) => {
  const variants = config?.variants || {}
  return variants[variant] || variants['default'] || {
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    hoverColor: '#1D4ED8',
    lightBackground: '#93C5FD20',
    lightTextColor: '#1D4ED8',
  }
}

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const isSameDay = (d1: Date | null, d2: Date | null) => {
  return d1 && d2 ? d1.toDateString() === d2.toDateString() : false
}

const isInRange = (day: Date, start: Date | null, end: Date | null) => {
  if (!start || !end) return false

  const dayMs = new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate()
  ).getTime()

  const startMs = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  ).getTime()

  const endMs = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  ).getTime()

  return dayMs >= startMs && dayMs <= endMs
}

const formatDate = (date: Date, format?: Intl.DateTimeFormatOptions) => {
  return date.toLocaleDateString(
    'en-GB',
    format || { day: 'numeric', month: 'short', year: 'numeric' }
  )
}

const pad2 = (n: number) => String(n).padStart(2, '0')

const formatDateString = (date: Date, pattern?: string): string => {
  if (!pattern) return formatDate(date)
  const d = date.getDate()
  const m = date.getMonth() + 1
  const y = date.getFullYear()
  return pattern
    .replace('YYYY', String(y))
    .replace('MM', pad2(m))
    .replace('DD', pad2(d))
}

const DateRangePicker = forwardRef<DateRangePickerHandle, Props>(({
  dateFormat,
  calendarContainerClass,
  calendarInnerClass,
  calendarBorderClass,
  variant = 'default',
  size = 'md',
  mode = 'dropdown',
  inputClass = '',
  inputIcon,
  inputPlaceholder,
  onDateChange,
  enableQuickSelect = true,
  singleDateMode = false,
  minDate,
  maxDate,
  disabledWeekDays = [],
  disabledDates = [],
  popupWidth,
  popupHeight,
  autoScaleFont = false,
  label = '',
  rangeClassName = '',
  appliedRangeClassName = '',
  pickerStyle,
  value: controlledValue,
  onCancel,
  onApply,
  placeholder: tdsPlaceholder = 'Select dates',
  className: tdsClassName = '',
  displayFormat,
}, ref) => {
  // Default format
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  const [tempRange, setTempRange] = useState<DateRange>({
    start: null,
    end: null,
  })
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedQuick, setSelectedQuick] = useState<string | null>(null)
  const pickerRef = useRef<HTMLDivElement>(null)
  const [showMonthGrid, setShowMonthGrid] = useState(false)
  const [showYearGrid, setShowYearGrid] = useState(false)

  // Input mode specific state
  const [inputValue, setInputValue] = useState('')

  // Dynamic placeholder based on mode
  const dynamicPlaceholder =
    inputPlaceholder ??
    (singleDateMode ? 'Select date...' : 'Select date range...')

  // Theme and size configurations
  const { theme } = useTheme()
  const pickerConfig = theme?.components?.dateRangePicker || defaultThemeConfig.components.dateRangePicker

  const selectedColors = getSelectedItemColors(pickerConfig, variant)
  const sizeConfig = pickerConfig?.sizes?.[size] || pickerConfig?.sizes?.['md'] || {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    iconSize: '16px',
  }
  const calendarConfig = pickerConfig?.calendar
  const sidebarConfig = pickerConfig?.sidebar
  const footerConfig = pickerConfig?.footer
  const baseConfig = pickerConfig?.base
  const dropdownConfig = pickerConfig?.dropdown

  // Dynamic styles for selected dates
  const selectedDateStyles = css({
    backgroundColor: selectedColors.backgroundColor,
    color: selectedColors.textColor,
    borderRadius: '50%',
    zIndex: 10,
    '&:hover': {
      backgroundColor: selectedColors.hoverColor,
    },
  })

  // Dynamic styles for range dates
  const rangeDateStyles = css({
    backgroundColor: selectedColors.lightBackground,
    color: selectedColors.lightTextColor,
  })

  // Dynamic styles for quick select buttons (selected state — both text and dot use variant color per Figma)
  const quickSelectTextStyles = css({
    color: selectedColors.backgroundColor,
    fontWeight: 500,
  })

  // Dynamic styles for quick select dot (uses variant color)
  const quickSelectDotStyles = css({
    color: selectedColors.backgroundColor,
  })

  // Dynamic styles for quick select hover (applied to the button itself)
  const quickSelectHoverStyles = css({
    '&:hover': {
      backgroundColor: sidebarConfig?.hoverBackgroundColor,
    },
  })

  // Dynamic styles for month/year selection
  const monthYearStyles = css({
    backgroundColor: selectedColors.backgroundColor,
    color: selectedColors.textColor,
    '&:hover': {
      backgroundColor: selectedColors.hoverColor,
    },
  })

  // Dynamic styles for the main button
  const buttonStyles = css({
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    '& svg': {
      width: sizeConfig.iconSize,
      height: sizeConfig.iconSize,
    },
  })

  // Input styles for input mode
  const inputStyles = css({
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    border: `1px solid ${baseConfig?.borderColor}`,
    borderRadius: baseConfig?.borderRadius,
    backgroundColor: baseConfig?.backgroundColor,
    color: baseConfig?.textColor,
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    '&:focus': {
      borderColor: selectedColors.backgroundColor,
      boxShadow: `0 0 0 2px ${selectedColors.backgroundColor}20`,
    },
    '&::placeholder': {
      color: baseConfig?.placeholderColor,
    },
    '&:hover': {
      borderColor: baseConfig?.hoverBorderColor,
    },
  })

  // Dynamic styles for popup container
  const popupContainerStyles = css({
    ...(popupWidth && { width: popupWidth }),
    ...(popupHeight && { height: popupHeight }),
  })

  // Dynamic styles for font scaling
  const scaledFontStyles = css({
    ...(autoScaleFont &&
      popupHeight && {
        fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
        '& .text-sm': {
          fontSize: 'clamp(0.7rem, 2.2vw, 0.8rem)',
        },
        '& .text-xs': {
          fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
        },
      }),
  })

  // Dynamic styles for input icon color
  const iconColorStyles = css({ color: baseConfig?.iconColor })

  // Dynamic styles for calendar navigation arrows
  const navArrowStyles = css({
    color: calendarConfig?.weekDayTextColor,
    transition: 'color 0.2s',
    '&:hover': { color: calendarConfig?.navArrowHoverColor },
  })

  // Dynamic styles for calendar header text
  const headerTextStyles = css({
    color: calendarConfig?.headerTextColor,
    fontWeight: 600,
    cursor: 'pointer',
  })

  // Dynamic styles for week day labels
  const weekDayStyles = css({ color: calendarConfig?.weekDayTextColor })

  // Dynamic styles for sidebar quick-select items
  const sidebarItemStyles = css({
    color: sidebarConfig?.textColor,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: sidebarConfig?.borderColor,
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': { backgroundColor: sidebarConfig?.hoverBackgroundColor },
  })

  // Dynamic styles for month/year grid hover
  const gridItemHoverStyles = css({
    '&:hover': { backgroundColor: calendarConfig?.gridHoverBackgroundColor },
  })

  // Dynamic styles for today indicator (no border per Figma — today is just normal text)
  const todayStyles = css({
    color: calendarConfig?.dayTextColor,
  })

  // Dynamic styles for default day
  const defaultDayStyles = css({ color: calendarConfig?.dayTextColor })

  // Dynamic styles for disabled day
  const disabledDayStyles = css({
    color: calendarConfig?.disabledTextColor,
    cursor: pickerConfig?.states?.disabled?.cursor,
    opacity: pickerConfig?.states?.disabled?.opacity,
  })

  // Dynamic styles for day hover (uses variant color, not hardcoded calendar config)
  const dayHoverStyles = css({
    '&:hover': {
      backgroundColor: selectedColors.backgroundColor,
      color: selectedColors.textColor,
      borderRadius: '50%',
    },
  })

  // Dynamic styles for clear button
  const clearButtonStyles = css({ color: footerConfig?.clearTextColor })

  // Dynamic styles for done button
  const doneButtonStyles = css({
    backgroundColor: footerConfig?.doneBackgroundColor,
    color: footerConfig?.doneTextColor,
  })

  // Dynamic styles for footer/calendar borders
  const borderStyles = css({ borderColor: calendarConfig?.borderColor })

  // Dynamic styles for dropdown trigger
  const dropdownActiveStyles = css({
    backgroundColor: dropdownConfig?.activeBackgroundColor,
    color: dropdownConfig?.activeTextColor,
    borderRadius: baseConfig?.borderRadius,
  })

  const dropdownInactiveStyles = css({
    backgroundColor: dropdownConfig?.inactiveBackgroundColor,
    color: dropdownConfig?.inactiveTextColor,
    borderRadius: baseConfig?.borderRadius,
  })

  // Dynamic styles for dropdown clear (X) icon
  const clearIconStyles = css({
    color: dropdownConfig?.clearIconColor,
    '&:hover': { color: dropdownConfig?.clearIconHoverColor },
  })

  // Dynamic styles for outside-month days — use direct color instead of opacity
  const outsideMonthStyles = css({
    color: calendarConfig?.outsideMonthTextColor || '#A3AAC2',
    opacity: calendarConfig?.outsideMonthOpacity ?? 1,
  })

  // Dynamic styles for calendar/sidebar backgrounds
  const calendarBgStyles = css({ backgroundColor: calendarConfig?.backgroundColor })
  const sidebarBgStyles = css({ backgroundColor: sidebarConfig?.backgroundColor })

  // Dynamic styles for popup shadow
  const popupShadowStyles = css({ boxShadow: baseConfig?.shadow })

  // Dynamic styles for sidebar border-right
  const sidebarBorderStyles = css({
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: sidebarConfig?.borderColor,
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (pickerRef.current && !pickerRef.current.contains(target)) {
        setShowCalendar(false)
        setShowMonthGrid(false)
        setShowYearGrid(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Sync temporary range when opening the calendar; discard on close implicitly
  useEffect(() => {
    if (showCalendar) {
      setTempRange(range)
    }
  }, [showCalendar, range])

  // Expose imperative clear() method to parent via ref
  useImperativeHandle(ref, () => ({
    clear: () => {
      setRange({ start: null, end: null })
      setTempRange({ start: null, end: null })
      setSelectedQuick(null)
      if (mode === 'input') setInputValue('')
    },
  }), [mode])

  // Update input value when range changes and trigger onDateChange for all modes
  useEffect(() => {
    if (mode === "input") {
      const newInputValue = getRangeLabel();
      setInputValue(newInputValue);
    }
    // Trigger onDateChange for all modes when range changes
    if (range.start || range.end) {
      onDateChange?.(range);
    } else {
      onDateChange?.({ start: null, end: null });
    }
  }, [range, mode, onDateChange]);

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const generateYearRange = (centerYear: number, range = 12) => {
    const half = Math.floor(range / 2)
    return Array.from({ length: range }, (_, i) => centerYear - half + i)
  }

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Helper function to check if date is disabled
  const isDateDisabled = (date: Date) => {
    // Min/Max bounds
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true

    // Disabled weekdays (0=Sunday ... 6=Saturday)
    if (disabledWeekDays?.length) {
      if (disabledWeekDays.includes(date.getDay())) return true
    }

    // Disabled specific dates (compare by Y-M-D)
    if (disabledDates?.length) {
      const normalize = (d: Date) =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
      const target = normalize(date)
      if (disabledDates.some((d) => normalize(d) === target)) return true
    }
    return false
  }

  const handleDayClick = (day: Date) => {
    // Check if date is disabled
    if (isDateDisabled(day)) return

    // Normalize clicked day to start of day to avoid time component issues
    const clickedDay = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    )

    if (singleDateMode) {
      // Single date mode - set both start and end to the same date
      setTempRange({ start: clickedDay, end: clickedDay })
    } else {
      // Range mode - existing logic
      if (!tempRange.start || (tempRange.start && tempRange.end)) {
        setTempRange({ start: clickedDay, end: null })
      } else {
        // Ensure start and end are in correct order
        const newEnd = clickedDay
        const newStart = tempRange.start

        if (newEnd < newStart) {
          setTempRange({ start: newEnd, end: newStart })
        } else {
          setTempRange((prev) => ({
            start: prev.start,
            end: newEnd,
          }))
        }
      }
    }
  }

  // Reverse-map: when tempRange changes (from manual day clicks), check if it
  // matches any quick-select preset and auto-highlight the sidebar label.
  useEffect(() => {
    if (!enableQuickSelect) return
    if (!tempRange.start || !tempRange.end) return

    const labels = ['Today', 'Yesterday', 'This Week', 'This Month', 'Last Week', 'Last Month', 'Last 90 Days'] as const
    for (const label of labels) {
      const preset = computeQuickRange(label)
      if (preset && preset.start && preset.end
        && isSameDay(tempRange.start, preset.start)
        && isSameDay(tempRange.end, preset.end)) {
        setSelectedQuick(label)
        return
      }
    }
    // No preset matched — mark as Custom
    setSelectedQuick('Custom')
  }, [tempRange.start?.getTime(), tempRange.end?.getTime(), enableQuickSelect])

  const getCalendarGrid = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay() // 0 for Sunday, 6 for Saturday
    const daysInMonth = getDaysInMonth(month, year)
    const grid: (Date | null)[] = []

    // Fill leading empty cells for week alignment
    for (let i = 0; i < firstDay; i++) {
      grid.push(null)
    }
    // Fill days of the current month
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push(new Date(year, month, d))
    }

    return grid
  }

  // Quick select labels (range is computed fresh at click time to avoid stale dates)
  const quickSelectLabels = [
    'Today',
    'Yesterday',
    'This Week',
    'This Month',
    'Last Week',
    'Last Month',
    'Last 90 Days',
    'Custom',
  ] as const

  /**
   * Compute the date range for a quick-select label using a fresh `new Date()`
   * at call time. This avoids stale pre-computed ranges that can reference the
   * wrong month/year when the calendar view has been navigated (Bug 2) and
   * ensures "This Week" / "This Month" never extend past today (Bug 1).
   */
  const computeQuickRange = (label: string): DateRange | undefined => {
    const now = new Date()
    switch (label) {
      case 'Today':
        return { start: new Date(now), end: new Date(now) }
      case 'Yesterday': {
        const yesterday = new Date(now)
        yesterday.setDate(now.getDate() - 1)
        return { start: new Date(yesterday), end: new Date(yesterday) }
      }
      case 'This Week': {
        const startOfWeek = new Date(now)
        const dayOfWeek = now.getDay()
        const diffToMon = dayOfWeek === 0 ? 6 : dayOfWeek - 1
        startOfWeek.setDate(now.getDate() - diffToMon)
        return { start: startOfWeek, end: new Date(now) }
      }
      case 'This Month':
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: new Date(now),
        }
      case 'Last Week': {
        const dayOfWeek = now.getDay()
        const diffToThisMon = dayOfWeek === 0 ? 6 : dayOfWeek - 1
        const lastMon = new Date(now)
        lastMon.setDate(now.getDate() - diffToThisMon - 7)
        const lastSun = new Date(lastMon)
        lastSun.setDate(lastMon.getDate() + 6)
        return { start: lastMon, end: lastSun }
      }
      case 'Last Month': {
        const y = now.getFullYear()
        const m = now.getMonth()
        return {
          start: new Date(y, m - 1, 1),
          end: new Date(y, m, 0),
        }
      }
      case 'Last 90 Days': {
        const ninetyDaysAgo = new Date(now)
        ninetyDaysAgo.setDate(now.getDate() - 89)
        return { start: ninetyDaysAgo, end: new Date(now) }
      }
      default:
        return undefined
    }
  }

  const handleQuickSelect = (label: string) => {
    if (label === 'Custom') {
      setSelectedQuick('Custom')
      setTempRange({ start: null, end: null })
    } else {
      const range = computeQuickRange(label)
      if (range) {
        setTempRange(range)
        setSelectedQuick(label)
        if (range.start) {
          setCurrentMonth(range.start.getMonth())
          setCurrentYear(range.start.getFullYear())
        }
      }
    }

    setShowMonthGrid(false)
    setShowYearGrid(false)
  }

  const fmtDate = (d: Date) => displayFormat ? formatDateString(d, displayFormat) : formatDate(d, dateFormat)

  const getRangeLabel = () => {
    if (range.start && range.end) {
      if (isSameDay(range.start, range.end)) {
        return `${fmtDate(range.start)}`
      }
      return `${fmtDate(range.start)} - ${fmtDate(range.end)}`
    }
    if (range.start && !range.end) {
      return `${fmtDate(range.start)}`
    }
    return ''
  }

  const clearRange = () => {
    setRange({ start: null, end: null })
    setTempRange({ start: null, end: null })
    setSelectedQuick(null)
  }

  // ── Tarmac TDS rendering path ──
  // Delegates to TdsDatePickerView. All state/validation stays here.
  if (pickerStyle) {
    const dpConfig = theme?.components?.datePicker || {};

    // Normalize controlled value
    const ctrlSingle = controlledValue instanceof Date ? controlledValue : null;
    const ctrlRange = controlledValue && !(controlledValue instanceof Date)
      ? controlledValue as { start: Date | null; end: Date | null }
      : null;

    useEffect(() => {
      if (ctrlSingle) {
        setTempRange({ start: ctrlSingle, end: ctrlSingle });
        setRange({ start: ctrlSingle, end: ctrlSingle });
      } else if (ctrlRange) {
        setTempRange(ctrlRange);
        setRange(ctrlRange);
      }
    }, [controlledValue]);

    const displayValue = (() => {
      if (range.start && range.end && !isSameDay(range.start, range.end)) {
        return `${fmtDate(range.start)} - ${fmtDate(range.end)}`;
      }
      if (range.start) return fmtDate(range.start);
      return '';
    })();

    const isDoneDisabled = singleDateMode
      ? !tempRange.start
      : !tempRange.start || !tempRange.end;

    const handleTdsApply = () => {
      if (isDoneDisabled) return;
      setRange(tempRange);
      if (onApply) {
        onApply(singleDateMode ? tempRange.start : { start: tempRange.start, end: tempRange.end });
      } else if (onDateChange) {
        onDateChange(tempRange);
      }
      setShowCalendar(false);
    };

    return (
      <div ref={pickerRef} className={tdsClassName}>
        <TdsDatePickerView
          isOpen={showCalendar}
          displayValue={displayValue}
          placeholder={tdsPlaceholder}
          className=""
          themeConfig={dpConfig}
          currentMonth={currentMonth}
          currentYear={currentYear}
          showMonthGrid={showMonthGrid}
          showYearGrid={showYearGrid}
          months={MONTHS}
          yearRange={generateYearRange(currentYear)}
          calendarGrid={getCalendarGrid(currentMonth, currentYear)}
          tempStart={tempRange.start}
          tempEnd={tempRange.end}
          singleDateMode={singleDateMode}
          isDoneDisabled={isDoneDisabled}
          isSameDay={isSameDay}
          isInRange={isInRange}
          isDateDisabled={isDateDisabled}
          onToggle={() => setShowCalendar(!showCalendar)}
          onDayClick={handleDayClick}
          onPrevMonth={() => currentMonth === 0 ? (setCurrentMonth(11), setCurrentYear(currentYear - 1)) : setCurrentMonth(currentMonth - 1)}
          onNextMonth={() => currentMonth === 11 ? (setCurrentMonth(0), setCurrentYear(currentYear + 1)) : setCurrentMonth(currentMonth + 1)}
          onPrevYear={() => setCurrentYear(currentYear - 1)}
          onNextYear={() => setCurrentYear(currentYear + 1)}
          onMonthSelect={(m) => { setCurrentMonth(m); setShowMonthGrid(false); }}
          onYearSelect={(y) => { setCurrentYear(y); setShowYearGrid(false); }}
          onToggleMonthGrid={() => { setShowMonthGrid(p => !p); setShowYearGrid(false); }}
          onToggleYearGrid={() => { setShowYearGrid(p => !p); setShowMonthGrid(false); }}
          onApply={handleTdsApply}
          onCancel={() => { setShowCalendar(false); onCancel?.(); }}
          enableQuickSelect={enableQuickSelect}
          selectedQuick={selectedQuick}
          onQuickSelect={handleQuickSelect}
        />
      </div>
    );
  }

  return (
    <div
      ref={pickerRef}
      className='relative inline-block text-sm font-normal font-ibm'
    >
      {mode === 'input' ? (
        // Input mode
        <div className='relative'>
          <div className='relative flex items-center'>
            {inputIcon && (
              <div className={`absolute left-3 z-10 ${iconColorStyles}`}>
                {inputIcon}
              </div>
            )}
            <input
              type='text'
              readOnly
              value={inputValue}
              placeholder={dynamicPlaceholder}
              className={`${inputStyles} ${inputClass} ${
                inputIcon ? 'pl-10' : ''
              } cursor-pointer`}
              onClick={() => setShowCalendar((prev) => !prev)}
            />
            {!inputIcon && (
              <div className={`absolute right-3 ${iconColorStyles}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
                  <line x1='16' y1='2' x2='16' y2='6'></line>
                  <line x1='8' y1='2' x2='8' y2='6'></line>
                  <line x1='3' y1='10' x2='21' y2='10'></line>
                </svg>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Dropdown mode (existing implementation)
        <div
          className={`flex items-center gap-2 cursor-pointer w-max ${
            range.start
              ? appliedRangeClassName || dropdownActiveStyles
              : rangeClassName || dropdownInactiveStyles
          } ${(range.start && !appliedRangeClassName) || (!range.start && !rangeClassName) ? buttonStyles : ''}`}
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          {/* Calendar Icon */}
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-current"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg> */}
          <span className='whitespace-nowrap font-normal'>
            {label || (singleDateMode ? 'Date' : 'Date Range')}
            {range.start ? (
              <span className='ml-1'>{`: ${getRangeLabel()}`}</span>
            ) : null}
          </span>
          {!range.start ? "-" : null}
          {range.start ? (
            <button
              onClick={(e) => {
                e.stopPropagation() // Prevent closing calendar
                clearRange()
              }}
              className={`font-normal text-sm ml-1 ${clearIconStyles}`}
            > 
            x
            </button>
          ) : null}
        </div>
      )}

      {showCalendar ? (
        <div
          className={`absolute z-50 mt-2 left-0 ${
            calendarContainerClass || ''
          } ${popupContainerStyles}`}
        >
          <div
            className={`flex w-max text-sm font-normal overflow-hidden ${popupShadowStyles} ${calendarBgStyles} ${
              calendarInnerClass || ''
            } ${calendarBorderClass || ''} ${scaledFontStyles} ${
              popupHeight ? 'overflow-auto' : ''
            }`}
          >
            {/* Sidebar - Conditionally rendered */}
            {enableQuickSelect && (
              <div className={`flex flex-col py-4 min-w-[160px] ${sidebarBgStyles} ${sidebarBorderStyles}`}>
                {quickSelectLabels?.map((label) => {
                  const isSelected = selectedQuick === label
                  return (
                    <button
                      key={label}
                      onClick={() => handleQuickSelect(label)}
                      className={`text-left px-3 !py-[12px] rounded transition-colors duration-200 ${sidebarItemStyles}
                        ${isSelected ? quickSelectTextStyles : quickSelectHoverStyles}
                      `}
                    >
                      {isSelected ? (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='8'
                          height='8'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className={`inline-block mx-2 ${quickSelectDotStyles}`}
                        >
                          <circle cx='12' cy='12' r='10'></circle>
                        </svg>
                      ) : (
                        <span className='mr-4'></span> // Spacer for alignment
                      )}
                      <span>
                        {label}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Calendar */}
            <div className='p-3'>
              <div className='flex justify-between items-center'>
                {/* Header - Month Navigation */}
                <div className='flex items-center justify-between gap-1 mb-2 px-1'>
                  <button
                    className={`px-2 py-1 rounded-sm transition-colors duration-200 ${navArrowStyles}`}
                    onClick={() =>
                      currentMonth === 0
                        ? (setCurrentMonth(11), setCurrentYear(currentYear - 1))
                        : setCurrentMonth(currentMonth - 1)
                    }
                  >
                    {/* Left Chevron Icon */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-current'
                    >
                      <path d='m15 18-6-6 6-6'></path>
                    </svg>
                  </button>
                  <div
                    className={`text-center cursor-pointer ${headerTextStyles}`}
                    onClick={() => {
                      setShowMonthGrid((prev) => !prev)
                      setShowYearGrid(false)
                    }}
                  >
                    {new Date(currentYear, currentMonth).toLocaleString(
                      'default',
                      {
                        month: 'long',
                      }
                    )}{' '}
                  </div>
                  <button
                    className={`px-2 py-1 rounded-sm transition-colors duration-200 ${navArrowStyles}`}
                    onClick={() =>
                      currentMonth === 11
                        ? (setCurrentMonth(0), setCurrentYear(currentYear + 1))
                        : setCurrentMonth(currentMonth + 1)
                    }
                  >
                    {/* Right Chevron Icon */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-current'
                    >
                      <path d='m9 18 6-6-6-6'></path>
                    </svg>
                  </button>
                </div>
                {/* Header - Year Navigation (New row for image matching) */}
                <div className='flex items-center justify-between gap-1 mb-2 px-1'>
                  <button
                    className={`px-2 py-1 rounded-sm transition-colors duration-200 ${navArrowStyles}`}
                    onClick={() => setCurrentYear(currentYear - 1)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-current'
                    >
                      <path d='m15 18-6-6 6-6'></path>
                    </svg>
                  </button>
                  <div
                    className={`text-center cursor-pointer ${headerTextStyles}`}
                    onClick={() => {
                      setShowYearGrid((prev) => !prev)
                      setShowMonthGrid(false)
                    }}
                  >
                    {currentYear}
                  </div>
                  <button
                    className={`px-2 py-1 rounded-sm transition-colors duration-200 ${navArrowStyles}`}
                    onClick={() => setCurrentYear(currentYear + 1)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-current'
                    >
                      <path d='m9 18 6-6-6-6'></path>
                    </svg>
                  </button>
                </div>
              </div>
              {showMonthGrid ? (
                <div className={`absolute border rounded shadow-md z-50 grid grid-cols-3 gap-2 p-4 mt-1 ${calendarBgStyles}`}>
                  {MONTHS?.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => {
                        setCurrentMonth(index)
                        setShowMonthGrid(false)
                      }}
                      className={`px-4 py-2 rounded text-md ${gridItemHoverStyles} ${
                        currentMonth === index ? monthYearStyles : ''
                      }`}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              ) : null}
              {showYearGrid ? (
                <div className={`absolute right-4 border rounded shadow-md z-50 grid grid-cols-4 gap-2 p-4 mt-1 max-h-40 overflow-auto ${calendarBgStyles}`}>
                  {generateYearRange(currentYear)?.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => {
                        setCurrentYear(yr)
                        setShowYearGrid(false)
                      }}
                      className={`px-4 py-2 rounded text-sm ${gridItemHoverStyles} ${
                        currentYear === yr ? monthYearStyles : ''
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              ) : null}
              {/* Week Days */}
              <div className={`border-t mt-3 pt-3 grid grid-cols-7 text-center font-medium mb-1 text-xs ${weekDayStyles} ${borderStyles}`}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <div
                    key={d}
                    className='w-8 h-8 flex items-center justify-center'
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className='grid grid-cols-7 text-center relative'>
                {getCalendarGrid(currentMonth, currentYear)?.map((day, i) => {
                  const isSelectedStart = isSameDay(day, tempRange.start)
                  const isSelectedEnd = isSameDay(day, tempRange.end)
                  const inRange = day
                    ? isInRange(day, tempRange.start, tempRange.end)
                    : false
                  const isToday = day ? isSameDay(day, new Date()) : false
                  const isDisabled = day ? isDateDisabled(day) : false

                  return (
                    <div
                      key={i}
                      onClick={() =>
                        day && !isDisabled ? handleDayClick(day) : null
                      }
                      className={`
                        ${!day ? 'invisible' : ''}
                        relative w-10 h-10 text-sm flex items-center justify-center
                        ${
                          isDisabled
                            ? disabledDayStyles
                            : 'cursor-pointer'
                        }
                        ${
                          isSelectedStart || isSelectedEnd
                            ? selectedDateStyles
                            : inRange
                            ? rangeDateStyles
                            : isToday
                            ? todayStyles
                            : defaultDayStyles
                        } ${
                        day?.getMonth() !== currentMonth ? outsideMonthStyles : ''
                      } ${
                        !isDisabled
                          ? dayHoverStyles
                          : ''
                      }
                      `}
                    >
                      {day?.getDate()}
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className={`border-t mt-3 pt-3 flex justify-between items-center ${borderStyles}`}>
                <button
                  className={`text-sm font-normal px-2 py-1 rounded ${clearButtonStyles}`}
                  onClick={clearRange}
                >
                  Clear
                </button>
                <button
                  className={`px-4 py-2 rounded text-sm font-normal ${doneButtonStyles}`}
                  onClick={() => {
                    setRange(tempRange)
                    setShowCalendar(false)
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
})

export default DateRangePicker
