/**
 * TdsDatePickerView — Clean TDS rendering for DateRangePicker.
 *
 * Pure view component. All state lives in the parent DateRangePicker.
 * Renders: input trigger → calendar dropdown → Cancel/Apply footer.
 */
import React from 'react';
import { buildDatePickerStyles } from './useDatePickerTarmacStyles';
import Button from '../Button';

// ── SVG Icons ──
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.667 1.667v2.5M13.333 1.667v2.5M2.917 7.575h14.166M17.5 7.083v7.084c0 2.5-1.25 4.166-4.167 4.166H6.667c-2.917 0-4.167-1.666-4.167-4.166V7.083c0-2.5 1.25-4.166 4.167-4.166h6.666c2.917 0 4.167 1.666 4.167 4.166Z" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.079 11.417h.008M13.079 13.917h.008M9.996 11.417h.008M9.996 13.917h.008M6.912 11.417h.008M6.912 13.917h.008" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
);
const DoubleChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/><path d="m11 18-6-6 6-6"/></svg>
);
const DoubleChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/><path d="m13 18 6-6-6-6"/></svg>
);

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const QUICK_SELECT_LABELS = [
  'Today', 'Yesterday', 'This Week', 'This Month',
  'Last Week', 'Last Month', 'Last 90 Days', 'Custom',
] as const;

// ── Types ──
export interface TdsDatePickerViewProps {
  // Display
  isOpen: boolean;
  displayValue: string;
  placeholder: string;
  className: string;
  themeConfig: Record<string, any>;

  // Calendar state
  currentMonth: number;
  currentYear: number;
  showMonthGrid: boolean;
  showYearGrid: boolean;
  months: string[];
  yearRange: number[];

  // Grid data (from legacy getCalendarGrid)
  calendarGrid: (Date | null)[];

  // Selection state
  tempStart: Date | null;
  tempEnd: Date | null;
  singleDateMode: boolean;
  isDoneDisabled: boolean;

  // Checks (from legacy)
  isSameDay: (d1: Date | null, d2: Date | null) => boolean;
  isInRange: (day: Date, start: Date | null, end: Date | null) => boolean;
  isDateDisabled: (date: Date) => boolean;

  // Callbacks
  onToggle: () => void;
  onDayClick: (day: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onMonthSelect: (month: number) => void;
  onYearSelect: (year: number) => void;
  onToggleMonthGrid: () => void;
  onToggleYearGrid: () => void;
  onApply: () => void;
  onCancel: () => void;

  // Sidebar (quick select)
  enableQuickSelect?: boolean;
  selectedQuick?: string | null;
  onQuickSelect?: (label: string) => void;
}

export const TdsDatePickerView: React.FC<TdsDatePickerViewProps> = ({
  isOpen, displayValue, placeholder, className, themeConfig,
  currentMonth, currentYear, showMonthGrid, showYearGrid, months, yearRange,
  calendarGrid, tempStart, tempEnd, singleDateMode, isDoneDisabled,
  isSameDay, isInRange, isDateDisabled,
  onToggle, onDayClick, onPrevMonth, onNextMonth, onPrevYear, onNextYear,
  onMonthSelect, onYearSelect, onToggleMonthGrid, onToggleYearGrid,
  onApply, onCancel,
  enableQuickSelect = false, selectedQuick, onQuickSelect,
}) => {
  const ftConfig = themeConfig.footer || {};
  const s = buildDatePickerStyles({
    config: themeConfig,
    isOpen,
    hasValue: displayValue !== '',
    enableQuickSelect,
  });

  return (
    <div className={`${s.wrapper} ${className}`}>
      {/* ── Input Trigger ── */}
      <button type="button" className={s.inputField} onClick={onToggle} data-testid="datepicker-trigger">
        <span className={s.inputText}>{displayValue || placeholder}</span>
        <span className={s.inputIcon}><CalendarIcon /></span>
      </button>

      {/* ── Calendar Dropdown ── */}
      {isOpen && (
        <div className={s.calendarContainer} data-testid="datepicker-calendar">

          {/* Sidebar — quick select filters */}
          {enableQuickSelect && (
            <div className={s.sidebar} data-testid="datepicker-sidebar">
              {QUICK_SELECT_LABELS.map((label) => {
                const isSelected = selectedQuick === label;
                return (
                  <button
                    key={label}
                    type="button"
                    className={`${s.sidebarItem} ${isSelected ? s.sidebarItemActive : ''}`}
                    onClick={() => onQuickSelect?.(label)}
                  >
                    {isSelected && (
                      <span className={s.sidebarDot}>
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                      </span>
                    )}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Calendar panel */}
          <div className={s.calendarPanel}>
          <div className={s.calendarHeader}>
            <div className={s.navButtonGroup}>
              <button type="button" className={s.navButton} onClick={onPrevYear}>
                <DoubleChevronLeft className={s.navButtonIcon} />
              </button>
              <button type="button" className={s.navButton} onClick={onPrevMonth}>
                <ChevronLeft className={s.navButtonIcon} />
              </button>
            </div>

            <span className={s.headerText} style={{ cursor: 'pointer' }}>
              <span onClick={onToggleMonthGrid}>
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}
              </span>
              {' '}
              <span onClick={onToggleYearGrid}>{currentYear}</span>
            </span>

            <div className={s.navButtonGroup}>
              <button type="button" className={s.navButton} onClick={onNextMonth}>
                <ChevronRight className={s.navButtonIcon} />
              </button>
              <button type="button" className={s.navButton} onClick={onNextYear}>
                <DoubleChevronRight className={s.navButtonIcon} />
              </button>
            </div>
          </div>

          {/* Month picker grid */}
          {showMonthGrid && (
            <div className={s.monthYearGrid}>
              {months.map((m, i) => (
                <button key={m} type="button"
                  className={`${s.monthYearCell} ${currentMonth === i ? s.monthYearCellActive : ''}`}
                  onClick={() => onMonthSelect(i)}>
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          )}

          {/* Year picker grid */}
          {showYearGrid && (
            <div className={s.monthYearGrid}>
              {yearRange.map(yr => (
                <button key={yr} type="button"
                  className={`${s.monthYearCell} ${currentYear === yr ? s.monthYearCellActive : ''}`}
                  onClick={() => onYearSelect(yr)}>
                  {yr}
                </button>
              ))}
            </div>
          )}

          {/* Weekday labels */}
          <div className={s.weekRow}>
            {WEEKDAYS.map(d => <div key={d} className={s.weekDayLabel}>{d}</div>)}
          </div>

          {/* Days grid */}
          <div className={s.daysGrid}>
            {calendarGrid.map((day, i) => {
              const cellStyle = getDayCellStyle(day, tempStart, tempEnd, singleDateMode, currentMonth, isSameDay, isInRange, isDateDisabled, s);
              return (
                <div key={i}
                  onClick={() => day && !isDateDisabled(day) ? onDayClick(day) : undefined}
                  className={`${s.dayCell} ${cellStyle}`}>
                  {day?.getDate()}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className={s.footerRow}>
            <Button
              buttonStyle={(ftConfig.cancelButtonStyle as any) || 'secondary'}
              variant={(ftConfig.cancelButtonVariant as any) || 'black'}
              size={(ftConfig.cancelButtonSize as any) || 'md'}
              text="Cancel"
              onClick={onCancel}
            />
            <Button
              buttonStyle={(ftConfig.applyButtonStyle as any) || 'primary'}
              variant={(ftConfig.applyButtonVariant as any) || 'black'}
              size={(ftConfig.applyButtonSize as any) || 'md'}
              text="Apply"
              isDisabled={isDoneDisabled}
              onClick={onApply}
            />
          </div>
          </div>{/* end calendarPanel */}
        </div>
      )}
    </div>
  );
};

// ── Helper: determine day cell style class ──
function getDayCellStyle(
  day: Date | null,
  tempStart: Date | null,
  tempEnd: Date | null,
  _singleDateMode: boolean,
  currentMonth: number,
  isSameDay: (d1: Date | null, d2: Date | null) => boolean,
  isInRange: (day: Date, start: Date | null, end: Date | null) => boolean,
  isDateDisabled: (date: Date) => boolean,
  s: ReturnType<typeof buildDatePickerStyles>,
): string {
  if (!day) return s.dayCellEmpty;
  if (isDateDisabled(day)) return s.dayCellDisabled;

  const isStart = isSameDay(day, tempStart);
  const isEnd = isSameDay(day, tempEnd);
  const inRange = isInRange(day, tempStart, tempEnd);
  const isSingle = tempStart && tempEnd && isSameDay(tempStart, tempEnd);
  const isOutside = day.getMonth() !== currentMonth;

  if (isStart && isEnd) return s.dayCellSelected;
  if (isStart) return s.dayCellRangeStart;
  if (isEnd) return s.dayCellRangeEnd;
  if (inRange && !isSingle) return s.dayCellInRange;
  if (isOutside) return s.dayCellOutside;

  return '';
}
