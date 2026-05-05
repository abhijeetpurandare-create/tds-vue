/**
 * ScrollWheel — Scroll-to-select column for TDS TimePicker.
 *
 * - Looping: items 3×, teleports at edges.
 * - Highlight: value-based (all copies of selected value are bold).
 * - onSelect fires on scroll stop with the value at center.
 */
import { useRef, useEffect, useCallback } from 'react';
import { css } from '@emotion/css';

const ITEM_H = 28;
const COL_H = 264;
const CENTER = Math.floor((COL_H - ITEM_H) / 2);

export interface ScrollWheelProps {
  values: (number | string)[];
  selected: number | string | null;
  onSelect: (value: any) => void;
  loop?: boolean;
  format?: (value: any) => string;
  isDisabled?: (value: any) => boolean;
  theme?: {
    fontFamily?: string;
    fontSize?: string;
    baseColor?: string;
    baseWeight?: number;
    activeColor?: string;
    activeWeight?: number;
  };
}

export function ScrollWheel({
  values,
  selected,
  onSelect,
  loop = true,
  format = String,
  isDisabled,
  theme: t,
}: ScrollWheelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const jumping = useRef(false);
  const count = values.length;

  const colCss = css({
    height: `${COL_H}px`,
    flex: '1 0 0',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollSnapType: 'y mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none' as const,
    '&::-webkit-scrollbar': { display: 'none' },
    position: 'relative',
    zIndex: 1,
  });

  const innerCss = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    ...(loop ? {} : { paddingTop: `${CENTER}px`, paddingBottom: `${CENTER}px` }),
  });

  const itemCss = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left' as const,
    width: '100%',
    height: `${ITEM_H}px`,
    minHeight: `${ITEM_H}px`,
    flexShrink: 0,
    scrollSnapAlign: 'center',
    fontSize: t?.fontSize || '14px',
    lineHeight: `${ITEM_H}px`,
    fontWeight: t?.baseWeight || 300,
    color: t?.baseColor || '#808080',
    fontFamily: t?.fontFamily || 'sans-serif',
    cursor: 'pointer',
    userSelect: 'none' as const,
  });

  const disabledCss = css({ opacity: 0.35, cursor: 'default' });

  // Scroll position for a given render index
  const posFor = useCallback((ri: number) => loop ? ri * ITEM_H - CENTER : ri * ITEM_H, [loop]);

  // Real value index from render index
  const realIdx = useCallback((ri: number) => {
    if (!loop) return Math.max(0, Math.min(ri, count - 1));
    return ((ri % count) + count) % count;
  }, [loop, count]);

  // Read which render index is at center
  const centerIdx = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;
    return Math.round(loop ? (el.scrollTop + CENTER) / ITEM_H : el.scrollTop / ITEM_H);
  }, [loop]);

  // On scroll stop
  const onEnd = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const ri = centerIdx();
    const idx = realIdx(ri);
    const val = values[idx];

    // Teleport if in clone zone
    if (loop) {
      const pos = ri * ITEM_H;
      if (pos < count * ITEM_H || pos >= 2 * count * ITEM_H) {
        jumping.current = true;
        el.scrollTop = posFor(count + idx);
        requestAnimationFrame(() => { jumping.current = false; });
      }
    }

    if (isDisabled?.(val)) return;
    if (val !== selected) onSelect(val);
  }, [centerIdx, realIdx, values, count, loop, selected, onSelect, isDisabled, posFor]);

  const onScroll = useCallback(() => {
    if (jumping.current) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onEnd, 120);
  }, [onEnd]);

  // Scroll to selected on mount
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let idx = values.indexOf(selected as any);
    if (idx < 0) idx = 0;
    el.scrollTop = posFor(loop ? count + idx : idx);
  }, []);

  // Re-scroll when selected changes externally
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const idx = values.indexOf(selected as any);
    if (idx < 0) return;
    const target = posFor(loop ? count + idx : idx);
    if (Math.abs(el.scrollTop - target) > ITEM_H / 2) {
      el.scrollTop = target;
    }
  }, [selected]);

  // Click scrolls item to center
  const scrollTo = (ri: number) => {
    const el = ref.current;
    if (!el) return;
    const target = posFor(ri);
    if (typeof el.scrollTo === 'function') {
      el.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      el.scrollTop = target;
    }
  };

  const items = loop ? [...values, ...values, ...values] : values;

  return (
    <div ref={ref} className={colCss} onScroll={onScroll}>
      <div className={innerCss}>
        {items.map((_, ri) => {
          const val = values[realIdx(ri)];
          const active = val === selected;
          const disabled = isDisabled?.(val) ?? false;
          return (
            <div key={ri}
              className={`${itemCss} ${disabled ? disabledCss : ''}`}
              style={active ? { fontWeight: t?.activeWeight || 600, color: t?.activeColor || '#2b2b2b' } : undefined}
              onClick={() => { if (!disabled) scrollTo(ri); }}>
              {format(val)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ITEM_H, COL_H, CENTER };
