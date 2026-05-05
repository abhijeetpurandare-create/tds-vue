import React from 'react';
import { css, injectGlobal } from '@emotion/css';

/**
 * Scrollbar thumb color style.
 * - `grey`  — #d3d3d3
 * - `black` — #333333
 * - `coal`  — #dfe3eb
 */
export type TdsScrollbarVariant = 'grey' | 'black' | 'coal';

/**
 * Scrollbar track width/height.
 * - `large` — 6px
 * - `small` — 4px
 */
export type TdsScrollbarSize = 'large' | 'small';

export interface TdsScrollbarProps {
  /** Thumb color variant. Default: `'grey'` */
  variant?: TdsScrollbarVariant;
  /** Track size. Default: `'small'` */
  size?: TdsScrollbarSize;
  children?: React.ReactNode;
}

const THUMB_COLORS: Record<TdsScrollbarVariant, string> = {
  grey: '#d3d3d3',
  black: '#333333',
  coal: '#dfe3eb',
};

const TRACK_SIZES: Record<TdsScrollbarSize, string> = {
  large: '6px',
  small: '4px',
};

const THUMB_RADIUS = '999px';
const TRACK_BG = 'transparent';

/**
 * Wrap your application (or any subtree) with `<TdsScrollbar>` to apply
 * TDS-compliant custom scrollbar styles to every scrollable element inside.
 *
 * No ThemeProvider needed — styles are self-contained.
 *
 * @example
 * ```tsx
 * import { TdsScrollbar } from '@delhivery/tarmac';
 *
 * <TdsScrollbar variant="grey" size="small">
 *   <App />
 * </TdsScrollbar>
 * ```
 */
const TdsScrollbar: React.FC<TdsScrollbarProps> = ({
  variant = 'grey',
  size = 'small',
  children,
}) => {
  const thumbColor = THUMB_COLORS[variant] ?? THUMB_COLORS.grey;
  const trackSize = TRACK_SIZES[size] ?? TRACK_SIZES.small;

  const scopeClass = css({
    /* Firefox */
    scrollbarWidth: 'thin',
    scrollbarColor: `${thumbColor} ${TRACK_BG}`,

    /* Webkit (Chrome, Safari, Edge) */
    '&::-webkit-scrollbar': {
      width: trackSize,
      height: trackSize,
    },
    '&::-webkit-scrollbar-track': {
      background: TRACK_BG,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: thumbColor,
      borderRadius: THUMB_RADIUS,
    },

    /* Apply to ALL descendants */
    '& *': {
      scrollbarWidth: 'thin',
      scrollbarColor: `${thumbColor} ${TRACK_BG}`,
    },
    '& *::-webkit-scrollbar': {
      width: trackSize,
      height: trackSize,
    },
    '& *::-webkit-scrollbar-track': {
      background: TRACK_BG,
    },
    '& *::-webkit-scrollbar-thumb': {
      backgroundColor: thumbColor,
      borderRadius: THUMB_RADIUS,
    },
  });

  return <div className={scopeClass}>{children}</div>;
};

export default TdsScrollbar;
