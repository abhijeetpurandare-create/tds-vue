/**
 * TdsTimePickerView — The TDS rendering for TimePicker.
 *
 * This is a pure view component. All state lives in the parent TimePicker.
 * It renders: input trigger → dropdown with scroll wheels → Cancel/Save footer.
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { ScrollWheel } from './ScrollWheel';
import { buildTimePickerStyles } from './useTimePickerTarmacStyles';
import Button from '../Button';

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export interface TdsTimePickerViewProps {
  // State from parent
  isOpen: boolean;
  hour: number | null;
  minute: number | null;
  second: number | null;
  ampm: 'AM' | 'PM' | null;
  inputValue: string;
  isDoneDisabled: boolean;

  // Config
  use24Hour: boolean;
  showSeconds: boolean;
  placeholder: string;
  className: string;
  themeConfig: Record<string, any>;

  // Disabled checks from parent
  isHourDisabled?: (val: number) => boolean;
  isMinuteDisabled?: (val: number) => boolean;

  // Callbacks
  onToggle: () => void;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onSecondChange: (s: number) => void;
  onAmpmChange: (v: 'AM' | 'PM') => void;
  onSave: () => void;
  onCancel: () => void;
}

const HOURS_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const HOURS_24 = [...Array(24).keys()];
const MINS_5 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const SECS = [...Array(60).keys()];
const AMPM: ('AM' | 'PM')[] = ['AM', 'PM'];

export const TdsTimePickerView: React.FC<TdsTimePickerViewProps> = ({
  isOpen, hour, minute, second, ampm, inputValue, isDoneDisabled,
  use24Hour, showSeconds, placeholder, className, themeConfig,
  isHourDisabled, isMinuteDisabled,
  onToggle, onHourChange, onMinuteChange, onSecondChange, onAmpmChange,
  onSave, onCancel,
}) => {
  const ftConfig = themeConfig.footer || {};
  const ddConfig = themeConfig.dropdown || {};
  const s = buildTimePickerStyles({ config: themeConfig, isOpen, hasValue: inputValue !== '' });

  const hours = use24Hour ? HOURS_24 : HOURS_12;
  const displayHour = hour !== null ? (use24Hour ? hour : (hour % 12 || 12)) : null;

  // Find nearest 5-min value for the selected minute
  const selectedMin = minute !== null
    ? MINS_5.reduce((prev, curr) => Math.abs(curr - minute) < Math.abs(prev - minute) ? curr : prev, 0)
    : null;

  // Shared theme for scroll wheels
  const wheelTheme = {
    fontFamily: themeConfig.base?.fontFamily,
    fontSize: ddConfig.itemFontSize || '14px',
    baseColor: ddConfig.baseTextColor || '#808080',
    baseWeight: Number(ddConfig.baseFontWeight) || 300,
    activeColor: ddConfig.selectedTextColor || '#2b2b2b',
    activeWeight: Number(ddConfig.selectedFontWeight) || 600,
    disabledOpacity: 0.35,
    overlayBg: ddConfig.overlayBackgroundColor || 'rgba(35,150,251,0.1)',
  };

  return (
    <div className={`${s.wrapper} ${className}`}>
      {/* ── Input trigger ── */}
      <button
        type="button"
        className={s.inputField}
        onClick={onToggle}
        data-testid="timepicker-trigger"
      >
        <span className={s.inputText}>{inputValue || placeholder}</span>
        <span className={s.inputIcon}>
          <FontAwesomeIcon icon={faClock} />
        </span>
      </button>

      {/* ── Dropdown ── */}
      {isOpen && (
        <div className={s.dropdownContainer} data-testid="timepicker-dropdown">
          <div className={s.middleSection}>
            <div className={s.overlay} />

            {/* Hour wheel — key includes ampm so disabled state recalculates on AM/PM change */}
            <ScrollWheel
              key={`hour-${ampm}`}
              values={hours}
              selected={displayHour}
              onSelect={onHourChange}
              loop
              format={pad}
              isDisabled={isHourDisabled}
              theme={wheelTheme}
            />

            {/* Minute wheel — key includes hour+ampm so disabled state recalculates */}
            <ScrollWheel
              key={`min-${hour}-${ampm}`}
              values={MINS_5}
              selected={selectedMin}
              onSelect={onMinuteChange}
              loop
              format={pad}
              isDisabled={isMinuteDisabled}
              theme={wheelTheme}
            />

            {/* Seconds wheel (optional) */}
            {showSeconds && (
              <ScrollWheel
                values={SECS}
                selected={second}
                onSelect={onSecondChange}
                loop
                format={pad}
                theme={wheelTheme}
              />
            )}

            {/* AM/PM — scroll select like other columns */}
            {!use24Hour && (
              <ScrollWheel
                values={AMPM as any}
                selected={ampm}
                onSelect={onAmpmChange}
                loop={false}
                theme={wheelTheme}
              />
            )}
          </div>

          {/* ── Footer ── */}
          <div className={s.footerSection}>
            <Button
              buttonStyle={(ftConfig.cancelButtonStyle as any) || 'secondary'}
              variant={(ftConfig.cancelButtonVariant as any) || 'black'}
              size={(ftConfig.cancelButtonSize as any) || 'md'}
              text="Cancel"
              onClick={onCancel}
            />
            <Button
              buttonStyle={(ftConfig.saveButtonStyle as any) || 'primary'}
              variant={(ftConfig.saveButtonVariant as any) || 'black'}
              size={(ftConfig.saveButtonSize as any) || 'md'}
              text="Save"
              isDisabled={isDoneDisabled}
              onClick={onSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};
