/**
 * TdsTimePickerBottomSheetView — Bottom sheet variant of the TDS TimePicker.
 *
 * Renders Hour / Minute / (Second) / AM-PM scroll wheels inside a MobileSheetWrapper.
 * All state lives in the parent TimePicker — this is a pure view component.
 */
import React from 'react';
import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';
import MobileSheetWrapper from '../MobileSheetWrapper';
import Button from '../Button';
import { ScrollWheel } from './ScrollWheel';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const HOURS_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const HOURS_24 = [...Array(24).keys()];
const MINS_5 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const SECS = [...Array(60).keys()];
const AMPM: ('AM' | 'PM')[] = ['AM', 'PM'];

// ── Close icon ──
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface TdsTimePickerBottomSheetViewProps {
  isOpen: boolean;
  hour: number | null;
  minute: number | null;
  second: number | null;
  ampm: 'AM' | 'PM' | null;
  isDoneDisabled: boolean;
  use24Hour: boolean;
  showSeconds: boolean;
  title?: string;
  subtext?: string;
  showSubtext?: boolean;
  themeConfig: Record<string, any>;
  isHourDisabled?: (val: number) => boolean;
  isMinuteDisabled?: (val: number) => boolean;
  onClose: () => void;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onSecondChange: (s: number) => void;
  onAmpmChange: (v: 'AM' | 'PM') => void;
  onSave: () => void;
  onCancel: () => void;
}

export const TdsTimePickerBottomSheetView: React.FC<TdsTimePickerBottomSheetViewProps> = ({
  isOpen, hour, minute, second, ampm, isDoneDisabled,
  use24Hour, showSeconds, title = 'Title goes here', subtext = 'Subtext goes here',
  showSubtext = true, themeConfig,
  isHourDisabled, isMinuteDisabled,
  onClose, onHourChange, onMinuteChange, onSecondChange, onAmpmChange,
  onSave, onCancel,
}) => {
  const bs = themeConfig.bottomSheet || {};
  const header = bs.header || {};
  const picker = bs.picker || {};
  const footer = bs.footer || {};

  // ── Style builders ──
  const sheet = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: bs.backgroundColor || '#ffffff',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    fontFamily: themeConfig.base?.fontFamily || 'sans-serif',
  });

  const headerRow = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: dim(header.padding, '16px'),
    alignSelf: 'stretch',
  });

  const titleBlock = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  });

  const titleText = css({
    fontSize: dim(header.titleFontSize, '14px'),
    lineHeight: dim(header.titleLineHeight, '20px'),
    fontWeight: header.titleFontWeight || '500',
    color: header.titleTextColor || '#2b2b2b',
    margin: 0,
  });

  const subtextText = css({
    fontSize: dim(header.subtextFontSize, '10px'),
    lineHeight: dim(header.subtextLineHeight, '12px'),
    fontWeight: header.subtextFontWeight || '400',
    color: header.subtextTextColor || '#2b2b2b',
    margin: 0,
  });

  const closeBtn = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(header.iconSize, '20px'),
    height: dim(header.iconSize, '20px'),
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: header.iconColor || '#2b2b2b',
    padding: 0,
    flexShrink: 0,
  });

  const pickerSection = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: dim(picker.padding, '16px'),
    alignSelf: 'stretch',
    position: 'relative',
  });

  const overlay = css({
    position: 'absolute',
    left: dim(picker.overlayInsetX, '21px'),
    right: dim(picker.overlayInsetX, '21px'),
    height: dim(picker.overlayHeight, '36px'),
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: picker.overlayBackgroundColor || 'rgba(35,150,251,0.1)',
    borderRadius: dim(picker.overlayBorderRadius, '4px'),
    pointerEvents: 'none',
    zIndex: 0,
  });

  const columnsRow = css({
    display: 'flex',
    flexDirection: 'row',
    gap: dim(picker.columnGap, '10px'),
    position: 'relative',
    zIndex: 1,
  });

  const makeCol = (width: string) => css({ width, flexShrink: 0, display: 'flex' });
  const hourCol = makeCol(dim(picker.hourColumnWidth, '73px'));
  const minuteCol = makeCol(dim(picker.minuteColumnWidth, '73px'));
  const secondCol = makeCol(dim(picker.secondColumnWidth, '73px'));
  const ampmCol = makeCol(dim(picker.ampmColumnWidth, '73px'));

  const footerRow = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: dim(footer.gap, '8px'),
    padding: dim(footer.padding, '8px'),
    alignSelf: 'stretch',
  });

  const wheelTheme = {
    fontFamily: themeConfig.base?.fontFamily,
    fontSize: picker.itemFontSize || '14px',
    baseColor: picker.baseTextColor || '#737373',
    baseWeight: Number(picker.baseFontWeight) || 300,
    activeColor: picker.selectedTextColor || '#2b2b2b',
    activeWeight: Number(picker.selectedFontWeight) || 600,
  };

  const hours = use24Hour ? HOURS_24 : HOURS_12;
  const displayHour = hour !== null ? (use24Hour ? hour : (hour % 12 || 12)) : null;

  const selectedMin = minute !== null
    ? MINS_5.reduce((prev, curr) => Math.abs(curr - minute) < Math.abs(prev - minute) ? curr : prev, 0)
    : null;

  return (
    <MobileSheetWrapper isOpen={isOpen} onClose={onClose}>
      <div className={sheet}>
        {/* Header */}
        <div className={headerRow}>
          <div className={titleBlock}>
            <div className={titleText}>{title}</div>
            {showSubtext && <div className={subtextText}>{subtext}</div>}
          </div>
          <button type="button" className={closeBtn} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Picker */}
        <div className={pickerSection}>
          <div className={overlay} />
          <div className={columnsRow}>
            {/* Hour */}
            <div className={hourCol}>
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
            </div>

            {/* Minute */}
            <div className={minuteCol}>
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
            </div>

            {/* Seconds (optional) */}
            {showSeconds && (
              <div className={secondCol}>
                <ScrollWheel
                  values={SECS}
                  selected={second}
                  onSelect={onSecondChange}
                  loop
                  format={pad}
                  theme={wheelTheme}
                />
              </div>
            )}

            {/* AM/PM */}
            {!use24Hour && (
              <div className={ampmCol}>
                <ScrollWheel
                  values={AMPM as any}
                  selected={ampm}
                  onSelect={onAmpmChange}
                  loop={false}
                  theme={wheelTheme}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={footerRow}>
          <Button
            buttonStyle={(footer.cancelButtonStyle as any) || 'secondary'}
            variant={(footer.cancelButtonVariant as any) || 'black'}
            size={(footer.cancelButtonSize as any) || 'md'}
            text="Cancel"
            onClick={onCancel}
          />
          <Button
            buttonStyle={(footer.saveButtonStyle as any) || 'primary'}
            variant={(footer.saveButtonVariant as any) || 'black'}
            size={(footer.saveButtonSize as any) || 'md'}
            text="Save"
            isDisabled={isDoneDisabled}
            onClick={onSave}
          />
        </div>
      </div>
    </MobileSheetWrapper>
  );
};
