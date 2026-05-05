import React, { useEffect, useState, useCallback } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

export interface MobileSheetWrapperProps {
  /** Controls open/close state */
  isOpen: boolean;
  /** Called on overlay click and swipe-down dismiss */
  onClose?: () => void;
  /** Additional className on the sheet panel */
  className?: string;
  /** Inline style on the sheet panel */
  style?: React.CSSProperties;
  /** Content rendered inside the sliding panel */
  children?: React.ReactNode;
  /** Override overlay color */
  overlayColor?: string;
  /** Override sheet background */
  backgroundColor?: string;
  /** Override top border radius */
  borderRadius?: string | number;
  /** Override box-shadow */
  shadow?: string;
  /** Max width of the sheet (default 480px — mobile) */
  maxWidth?: string;
  /** Swipe-down threshold in px to trigger close (default 50) */
  swipeThreshold?: number;
  /** Duration of the close-to-unmount delay in ms (default 300) */
  unmountDelay?: number;
}

/* ── Style builders ── */

function buildOverlay(overlayColor: string, animateIn: boolean): string {
  return css({
    position: 'fixed',
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: overlayColor,
    backdropFilter: animateIn ? 'blur(4px)' : 'none',
    zIndex: 50,
    opacity: animateIn ? 1 : 0,
    transition: animateIn
      ? 'opacity 250ms cubic-bezier(0.0, 0.0, 0.2, 1)'
      : 'opacity 200ms cubic-bezier(0.4, 0.0, 1, 1), backdrop-filter 0ms 200ms',
    willChange: 'opacity',
  });
}

function buildPanel(
  bg: string, radius: string, shadow: string, maxWidth: string, animateIn: boolean,
): string {
  return css({
    position: 'fixed',
    bottom: 0,
    left: '50%',
    zIndex: 51,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: bg,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    boxShadow: shadow,
    transition: animateIn
      ? 'transform 350ms cubic-bezier(0.0, 0.0, 0.2, 1)'
      : 'transform 250ms cubic-bezier(0.4, 0.0, 1, 1)',
    transform: animateIn ? 'translate(-50%, 0)' : 'translate(-50%, 100%)',
    maxHeight: '90vh',
    width: '100%',
    maxWidth,
    willChange: 'transform',
  });
}

/* ── Component ── */

const MobileSheetWrapper: React.FC<MobileSheetWrapperProps> = ({
  isOpen,
  onClose,
  className = '',
  style,
  children,
  overlayColor,
  backgroundColor,
  borderRadius,
  shadow,
  maxWidth = '480px',
  swipeThreshold = 50,
  unmountDelay = 300,
}) => {
  const { theme } = useTheme();
  const sheetBase = theme.components?.bottomSheet?.base || {};

  const resolvedOverlay = overlayColor || sheetBase.overlayColor || 'rgba(0, 0, 0, 0.5)';
  const resolvedBg = backgroundColor || sheetBase.backgroundColor || '#ffffff';
  const resolvedRadius = dim(borderRadius ?? sheetBase.borderRadius, '6px');
  const resolvedShadow = shadow || sheetBase.shadow || '0px -2px 8px 0px rgba(0,0,0,0.1)';

  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setAnimateIn(false);
      const t = setTimeout(() => setVisible(false), unmountDelay);
      return () => clearTimeout(t);
    }
  }, [isOpen, unmountDelay]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEndY(e.touches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchEndY - touchStartY > swipeThreshold && onClose) onClose();
  }, [touchStartY, touchEndY, swipeThreshold, onClose]);

  if (!visible) return null;

  return (
    <>
      <div
        className={buildOverlay(resolvedOverlay, animateIn)}
        onClick={onClose}
        data-testid="mobilesheet-overlay"
      />
      <div
        className={`${buildPanel(resolvedBg, resolvedRadius, resolvedShadow, maxWidth, animateIn)} ${className}`}
        style={style}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        data-testid="mobilesheet-panel"
      >
        {children}
      </div>
    </>
  );
};

MobileSheetWrapper.displayName = 'MobileSheetWrapper';
export default MobileSheetWrapper;
