import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import MobileSheetWrapper from '../MobileSheetWrapper';
import Button from '../Button';
import { ScrollWheel } from '../TimePicker/ScrollWheel';
import { buildDatePickerBottomSheetStyles, type DatePickerBottomSheetConfig } from './useDatePickerBottomSheetStyles';

export interface DatePickerBottomSheetProps {
  /** Controls open/close state */
  isOpen: boolean;
  /** Called when user closes the sheet (Cancel or overlay click) */
  onClose?: () => void;
  /** Called when user clicks Save with the selected date */
  onSave?: (date: Date) => void;
  /** Initial/controlled date value */
  value?: Date | null;
  /** Title text in header */
  title?: string;
  /** Subtext below title */
  subtext?: string;
  /** Show subtext row */
  showSubtext?: boolean;
  /** Min selectable date */
  minDate?: Date;
  /** Max selectable date */
  maxDate?: Date;
  /** Additional className on the sheet panel */
  className?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DatePickerBottomSheet: React.FC<DatePickerBottomSheetProps> = ({
  isOpen,
  onClose,
  onSave,
  value,
  title = 'Title goes here',
  subtext = 'Subtext goes here',
  showSubtext = true,
  minDate,
  maxDate,
  className = '',
}) => {
  const { theme } = useTheme();
  const config = (theme.components?.datePickerBottomSheet || (defaultThemeConfig.components as any)?.datePickerBottomSheet || {}) as DatePickerBottomSheetConfig;
  const s = buildDatePickerBottomSheetStyles({ config });

  const today = new Date();
  const initialDate = value || today;

  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

  // Reset internal state when value changes externally
  useEffect(() => {
    if (value) {
      setSelectedDay(value.getDate());
      setSelectedMonth(value.getMonth());
      setSelectedYear(value.getFullYear());
    }
  }, [value]);

  // Generate year range (±50 years from today)
  const yearRange = useMemo(() => {
    const start = today.getFullYear() - 50;
    const end = today.getFullYear() + 50;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [today]);

  // Days in selected month/year
  const daysInMonth = useMemo(() => {
    const count = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [selectedMonth, selectedYear]);

  // Clamp day if it exceeds the new month's max
  useEffect(() => {
    if (selectedDay > daysInMonth.length) {
      setSelectedDay(daysInMonth.length);
    }
  }, [selectedDay, daysInMonth]);

  const handleSave = () => {
    const date = new Date(selectedYear, selectedMonth, selectedDay);
    onSave?.(date);
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  // Disabled checks
  const isDayDisabled = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isMonthDisabled = (month: number) => {
    // Check if any day in this month is selectable
    const firstDay = new Date(selectedYear, month, 1);
    const lastDay = new Date(selectedYear, month + 1, 0);
    if (minDate && lastDay < minDate) return true;
    if (maxDate && firstDay > maxDate) return true;
    return false;
  };

  const isYearDisabled = (year: number) => {
    // Check if any day in this year is selectable
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);
    if (minDate && lastDay < minDate) return true;
    if (maxDate && firstDay > maxDate) return true;
    return false;
  };

  const pickerConfig = config.picker || {};
  const footerConfig = config.footer || {};

  const wheelTheme = {
    fontFamily: config.base?.fontFamily,
    fontSize: pickerConfig.itemFontSize || '14px',
    baseColor: pickerConfig.baseTextColor || '#737373',
    baseWeight: Number(pickerConfig.baseFontWeight) || 300,
    activeColor: pickerConfig.selectedTextColor || '#2b2b2b',
    activeWeight: Number(pickerConfig.selectedFontWeight) || 600,
    disabledOpacity: 0.35,
    overlayBg: pickerConfig.overlayBackgroundColor || 'rgba(35,150,251,0.1)',
  };

  return (
    <MobileSheetWrapper isOpen={isOpen} onClose={onClose} className={className}>
      <div className={s.sheet}>
        {/* Header */}
        <div className={s.headerRow}>
          <div className={s.titleBlock}>
            <div className={s.titleText}>{title}</div>
            {showSubtext && <div className={s.subtextText}>{subtext}</div>}
          </div>
          <button type="button" className={s.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Picker Section */}
        <div className={s.pickerSection}>
          <div className={s.overlay} />
          <div className={s.columnsRow}>
            {/* Day Column */}
            <div className={s.dayColumn}>
              <ScrollWheel
                values={daysInMonth}
                selected={selectedDay}
                onSelect={setSelectedDay}
                loop
                isDisabled={isDayDisabled}
                theme={wheelTheme}
              />
            </div>

            {/* Month Column */}
            <div className={s.monthColumn}>
              <ScrollWheel
                values={MONTHS.map((_, i) => i)}
                selected={selectedMonth}
                onSelect={setSelectedMonth}
                loop
                format={(i: number) => MONTHS[i]}
                isDisabled={isMonthDisabled}
                theme={wheelTheme}
              />
            </div>

            {/* Year Column */}
            <div className={s.yearColumn}>
              <ScrollWheel
                values={yearRange}
                selected={selectedYear}
                onSelect={setSelectedYear}
                loop={false}
                isDisabled={isYearDisabled}
                theme={wheelTheme}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={s.footerRow}>
          <Button
            buttonStyle={(footerConfig.cancelButtonStyle as any) || 'secondary'}
            variant={(footerConfig.cancelButtonVariant as any) || 'black'}
            size={(footerConfig.cancelButtonSize as any) || 'md'}
            text="Cancel"
            onClick={handleCancel}
          />
          <Button
            buttonStyle={(footerConfig.saveButtonStyle as any) || 'primary'}
            variant={(footerConfig.saveButtonVariant as any) || 'black'}
            size={(footerConfig.saveButtonSize as any) || 'md'}
            text="Save"
            onClick={handleSave}
          />
        </div>
      </div>
    </MobileSheetWrapper>
  );
};

export default DatePickerBottomSheet;
