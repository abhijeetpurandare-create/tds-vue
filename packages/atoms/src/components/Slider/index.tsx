import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import {
  buildContainerStyles,
  buildTrackStyles,
  buildFillStyles,
  buildKnobStyles,
} from './useSliderStyles';
import type { SliderThemeConfig } from './useSliderStyles';

export type SliderVariant = 'black' | 'coal' | 'dlv_red' | (string & {});
export type SliderSize = 'sm' | 'lg';
export type SliderType = 'single' | 'dual';

export type { SliderThemeConfig };

export interface SliderProps {
  /** Slider style variant */
  variant?: SliderVariant;
  /** Size of the slider */
  size?: SliderSize;
  /** Single value or range */
  sliderType?: SliderType;
  /** Current value (single) or [min, max] (dual) */
  value?: number | [number, number];
  /** Default value when uncontrolled */
  defaultValue?: number | [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  isDisabled?: boolean;
  /** Change handler */
  onChange?: (value: number | [number, number]) => void;
  /** Called when drag ends */
  onChangeEnd?: (value: number | [number, number]) => void;
  /** Additional class name */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
  /** Accessible label for min thumb (dual) */
  'aria-label-min'?: string;
  /** Accessible label for max thumb (dual) */
  'aria-label-max'?: string;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function snapToStep(val: number, min: number, step: number): number {
  return Math.round((val - min) / step) * step + min;
}

const Slider: React.FC<SliderProps> = ({
  variant = 'black',
  size = 'sm',
  sliderType = 'single',
  value: controlledValue,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  isDisabled = false,
  onChange,
  onChangeEnd,
  className = '',
  'aria-label': ariaLabel,
  'aria-label-min': ariaLabelMin,
  'aria-label-max': ariaLabelMax,
}) => {
  const { theme } = useTheme();
  const config: SliderThemeConfig = theme.components?.slider || {};

  const isDual = sliderType === 'dual';
  const initialDefault = isDual
    ? (defaultValue as [number, number]) ?? [min + (max - min) * 0.25, min + (max - min) * 0.75]
    : (defaultValue as number) ?? min + (max - min) * 0.5;

  const [internalValue, setInternalValue] = useState<number | [number, number]>(initialDefault);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const trackRef = useRef<HTMLDivElement>(null);
  const [focusedThumb, setFocusedThumb] = useState<'min' | 'max' | null>(null);
  const [hoveredThumb, setHoveredThumb] = useState<'min' | 'max' | null>(null);
  const draggingRef = useRef<'min' | 'max' | null>(null);

  const getPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = min + ratio * (max - min);
      return clamp(snapToStep(raw, min, step), min, max);
    },
    [min, max, step],
  );

  const updateValue = useCallback(
    (newVal: number, thumb: 'min' | 'max') => {
      if (isDisabled) return;
      let next: number | [number, number];
      if (isDual) {
        const [lo, hi] = currentValue as [number, number];
        if (thumb === 'min') {
          next = [Math.min(newVal, hi), hi];
        } else {
          next = [lo, Math.max(newVal, lo)];
        }
      } else {
        next = newVal;
      }
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [isDual, currentValue, controlledValue, isDisabled, onChange],
  );

  const handlePointerDown = useCallback(
    (thumb: 'min' | 'max') => (e: React.PointerEvent) => {
      if (isDisabled) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      draggingRef.current = thumb;
    },
    [isDisabled],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current || isDisabled) return;
      const val = getValueFromPosition(e.clientX);
      updateValue(val, draggingRef.current);
    },
    [isDisabled, getValueFromPosition, updateValue],
  );

  const handlePointerUp = useCallback(() => {
    if (draggingRef.current) {
      draggingRef.current = null;
      onChangeEnd?.(controlledValue !== undefined ? controlledValue : internalValue);
    }
  }, [controlledValue, internalValue, onChangeEnd]);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (isDisabled) return;
      // Don't handle if the click was on a knob (it handles its own events)
      if ((e.target as HTMLElement).closest('[role="slider"]')) return;
      const val = getValueFromPosition(e.clientX);
      if (isDual) {
        const [lo, hi] = currentValue as [number, number];
        const distToLo = Math.abs(val - lo);
        const distToHi = Math.abs(val - hi);
        const thumb = distToLo <= distToHi ? 'min' : 'max';
        updateValue(val, thumb);
      } else {
        updateValue(val, 'min');
      }
    },
    [isDisabled, isDual, currentValue, getValueFromPosition, updateValue],
  );

  const handleKeyDown = useCallback(
    (thumb: 'min' | 'max') => (e: React.KeyboardEvent) => {
      if (isDisabled) return;
      let delta = 0;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step;
      else if (e.key === 'Home') {
        updateValue(min, thumb);
        return;
      } else if (e.key === 'End') {
        updateValue(max, thumb);
        return;
      } else return;

      e.preventDefault();
      const cur = isDual
        ? (thumb === 'min' ? (currentValue as [number, number])[0] : (currentValue as [number, number])[1])
        : (currentValue as number);
      updateValue(clamp(cur + delta, min, max), thumb);
    },
    [isDisabled, step, min, max, isDual, currentValue, updateValue],
  );

  // Sync internal state when controlled value changes
  useEffect(() => {
    if (controlledValue !== undefined) setInternalValue(controlledValue);
  }, [controlledValue]);

  const styleParams = { config, variant, size, isDisabled };
  const containerCls = buildContainerStyles(styleParams);
  const trackCls = buildTrackStyles(styleParams);
  const fillCls = buildFillStyles(styleParams);

  let fillLeft: string;
  let fillWidth: string;
  let thumbPositions: { thumb: 'min' | 'max'; percent: number }[];

  if (isDual) {
    const [lo, hi] = currentValue as [number, number];
    fillLeft = `${getPercent(lo)}%`;
    fillWidth = `${getPercent(hi) - getPercent(lo)}%`;
    thumbPositions = [
      { thumb: 'min', percent: getPercent(lo) },
      { thumb: 'max', percent: getPercent(hi) },
    ];
  } else {
    const val = currentValue as number;
    fillLeft = '0%';
    fillWidth = `${getPercent(val)}%`;
    thumbPositions = [{ thumb: 'min', percent: getPercent(val) }];
  }

  return (
    <div
      className={`${containerCls} ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        ref={trackRef}
        className={trackCls}
        onClick={handleTrackClick}
        data-testid="slider-track"
      >
        <div
          className={fillCls}
          style={{ left: fillLeft, width: fillWidth }}
          data-testid="slider-fill"
        />
        {thumbPositions.map(({ thumb, percent }) => {
          const knobCls = buildKnobStyles(
            styleParams,
            focusedThumb === thumb,
            hoveredThumb === thumb,
          );
          const val = isDual
            ? (thumb === 'min' ? (currentValue as [number, number])[0] : (currentValue as [number, number])[1])
            : (currentValue as number);

          return (
            <div
              key={thumb}
              role="slider"
              tabIndex={isDisabled ? -1 : 0}
              aria-valuenow={val}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-disabled={isDisabled}
              aria-label={
                isDual
                  ? (thumb === 'min' ? (ariaLabelMin || 'Minimum value') : (ariaLabelMax || 'Maximum value'))
                  : (ariaLabel || 'Slider')
              }
              className={knobCls}
              style={{ left: `${percent}%` }}
              onPointerDown={handlePointerDown(thumb)}
              onKeyDown={handleKeyDown(thumb)}
              onFocus={() => setFocusedThumb(thumb)}
              onBlur={() => setFocusedThumb(null)}
              onMouseEnter={() => setHoveredThumb(thumb)}
              onMouseLeave={() => setHoveredThumb(null)}
              data-testid={isDual ? `slider-thumb-${thumb}` : 'slider-thumb'}
            >
              <span />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Slider.displayName = 'Slider';

export default Slider;
