import React, { useState, useEffect, forwardRef, ReactNode } from 'react';
import { css } from '@emotion/css';
import { createPortal } from 'react-dom';
import { useTheme } from '../ThemeProvider';
import Button from '../Button';
import type { ButtonVariant } from '../Button';
import {
  buildSnackbarContainerStyles,
  buildSnackbarIconWrapStyles,
  buildSnackbarTextBlockStyles,
  buildSnackbarTitleStyles,
  buildSnackbarDescriptionStyles,
  buildSnackbarSingleTextStyles,
  buildSnackbarCtaContainerStyles,
  buildSnackbarTrailingIconStyles,
} from './useSnackbarStyles';
import type { SnackbarThemeConfig, SnackbarVariant, SnackbarStyle, SnackbarSize } from './useSnackbarStyles';

export type { SnackbarVariant, SnackbarStyle, SnackbarSize };

export type SnackbarPosition =
  | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom';

export interface SnackbarProps {
  /** Primary text (Single Text mode) or description (Dual Text mode when title is provided) */
  message: ReactNode;
  /** When provided, enables Dual Text mode — title above, message below */
  title?: ReactNode;
  variant?: SnackbarVariant;
  snackbarStyle?: SnackbarStyle;
  size?: SnackbarSize;
  /** Optional leading icon slot */
  leadingIcon?: ReactNode;
  /** Show trailing icon (dismiss/close button). Alias: closable */
  trailingIcon?: boolean;
  /** @deprecated Use trailingIcon instead */
  closable?: boolean;
  /** Show Deny + Approve CTA buttons */
  ctAs?: boolean;
  denyText?: string;
  approveText?: string;
  onDeny?: () => void;
  onApprove?: () => void;
  duration?: number;
  pauseOnHover?: boolean;
  position?: SnackbarPosition;
  onClose?: () => void;
  className?: string;
}

/** Maps snackbar (style × variant) → Orca Button variant for CTA buttons per Figma spec */
type BtnMap = { deny: ButtonVariant; approve: ButtonVariant };
const CTA_BUTTON_MAP: Record<string, Record<string, BtnMap>> = {
  filled: {
    black:    { deny: 'white',   approve: 'white' },
    white:    { deny: 'black',   approve: 'black' },
    info:     { deny: 'white',   approve: 'white' },
    positive: { deny: 'white',   approve: 'white' },
    negative: { deny: 'white',   approve: 'white' },
    warning:  { deny: 'black',   approve: 'white' },
  },
  subtle: {
    black:    { deny: 'white',   approve: 'white' },
    white:    { deny: 'black',   approve: 'black' },
    info:     { deny: 'info',    approve: 'info' },
    positive: { deny: 'success', approve: 'success' },
    negative: { deny: 'error',   approve: 'error' },
    warning:  { deny: 'warning', approve: 'warning' },
  },
  outlined: {
    black:    { deny: 'black',   approve: 'black' },
    white:    { deny: 'black',   approve: 'white' },
    info:     { deny: 'info',    approve: 'info' },
    positive: { deny: 'success', approve: 'success' },
    negative: { deny: 'error',   approve: 'error' },
    warning:  { deny: 'warning', approve: 'warning' },
  },
};

function getCtaButtonVariants(snackbarStyle: string, variant: string): BtnMap {
  return CTA_BUTTON_MAP[snackbarStyle]?.[variant]
    || CTA_BUTTON_MAP.filled?.[variant]
    || { deny: 'black' as ButtonVariant, approve: 'black' as ButtonVariant };
}

const CloseIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  ({
    message,
    title,
    variant = 'black',
    snackbarStyle = 'filled',
    size = 'md',
    leadingIcon,
    trailingIcon,
    closable,
    ctAs = false,
    denyText = 'Deny',
    approveText = 'Approve',
    onDeny,
    onApprove,
    duration = 3000,
    pauseOnHover = true,
    position: _position = 'bottom',
    onClose,
    className = '',
  }, ref) => {
    const { theme } = useTheme();
    const snackbarConfig: SnackbarThemeConfig = theme.components?.snackbar || {};

    const [isVisible, setIsVisible] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    // trailingIcon and closable are aliases — either shows the dismiss button
    const showTrailingIcon = trailingIcon ?? closable ?? true;

    useEffect(() => {
      if (!isVisible || isPaused || duration === 0) return;
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }, [duration, isVisible, isPaused]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    };

    const isDualText = !!title;
    const styleParams = { snackbarConfig, variant: variant as string, snackbarStyle, size, isVisible };

    return (
      <div
        ref={ref}
        className={`${buildSnackbarContainerStyles(styleParams, isDualText)} ${className}`}
        onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
        role="status"
        aria-live="polite"
        data-testid="orca-snackbar"
      >
        {/* Leading Icon */}
        {leadingIcon && (
          <div
            className={buildSnackbarIconWrapStyles(styleParams, isDualText ? 'start' : 'center')}
            data-testid="orca-snackbar-icon"
          >
            {leadingIcon}
          </div>
        )}

        {/* Text */}
        {isDualText ? (
          <div className={buildSnackbarTextBlockStyles(styleParams)}>
            <div className={buildSnackbarTitleStyles(styleParams)} data-testid="orca-snackbar-title">
              {title}
            </div>
            <div className={buildSnackbarDescriptionStyles(styleParams)} data-testid="orca-snackbar-message">
              {message}
            </div>
          </div>
        ) : (
          <div className={buildSnackbarSingleTextStyles(styleParams)} data-testid="orca-snackbar-message">
            {message}
          </div>
        )}

        {/* CTA Buttons (Deny / Approve) */}
        {ctAs && (
          <div className={buildSnackbarCtaContainerStyles()} data-testid="orca-snackbar-ctas">
            {(() => {
              const btnMap = getCtaButtonVariants(snackbarStyle, variant);
              return (
                <>
                  <Button
                    buttonStyle="tertiary"
                    variant={btnMap.deny}
                    size="sm"
                    text={denyText}
                    onClick={onDeny}
                    data-testid="orca-snackbar-deny"
                  />
                  <Button
                    buttonStyle="primary"
                    variant={btnMap.approve}
                    size="sm"
                    text={approveText}
                    onClick={onApprove}
                    data-testid="orca-snackbar-approve"
                  />
                </>
              );
            })()}
          </div>
        )}

        {/* Trailing Icon (dismiss) */}
        {showTrailingIcon && (
          <button
            type="button"
            className={buildSnackbarTrailingIconStyles(styleParams)}
            onClick={handleClose}
            aria-label="Dismiss"
            data-testid="orca-snackbar-close"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';

// ─── Programmatic API ────────────────────────────────────────────────────────

type SnackbarItem = SnackbarProps & { id: string };

const POSITIONS: SnackbarPosition[] = [
  'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top', 'bottom',
];

const makeEmptyStore = (): Record<SnackbarPosition, SnackbarItem[]> => ({
  'top-right': [], 'top-left': [], 'bottom-right': [], 'bottom-left': [], top: [], bottom: [],
});

// Properly typed null-initialised — NOT using makeEmptyStore() here
const domContainers: Partial<Record<SnackbarPosition, HTMLDivElement>> = {};

const getContainer = (position: SnackbarPosition): HTMLDivElement => {
  if (!domContainers[position]) {
    const el = document.createElement('div');
    el.id = `orca-snackbar-container-${position}`;
    document.body.appendChild(el);
    domContainers[position] = el;
  }
  return domContainers[position]!;
};

let store = makeEmptyStore();
let listeners: Array<() => void> = [];

const subscribe = (cb: () => void) => {
  listeners.push(cb);
  return () => { listeners = listeners.filter((l) => l !== cb); };
};

const notify = () => listeners.forEach((cb) => cb());

const addSnackbar = (props: SnackbarProps): string => {
  const id = `snackbar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const position = props.position || 'bottom';
  store[position] = [...store[position], { ...props, id }];
  notify();
  return id;
};

const removeSnackbar = (id: string) => {
  POSITIONS.forEach((pos) => { store[pos] = store[pos].filter((s) => s.id !== id); });
  notify();
};

const removeAllSnackbars = () => {
  store = makeEmptyStore();
  notify();
};

// ── Internal container component ──────────────────────────────────────────────

interface SnackbarContainerProps {
  position: SnackbarPosition;
  items: SnackbarItem[];
  onRemove: (id: string) => void;
}

const SnackbarContainer: React.FC<SnackbarContainerProps> = ({ position, items, onRemove }) => {
  const containerStyles = css({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxWidth: '480px',
    width: '100%',
    zIndex: 9999,
    padding: '16px',
    pointerEvents: 'none',
    ...(position === 'top-right' && { top: 0, right: 0, alignItems: 'flex-end' }),
    ...(position === 'top-left' && { top: 0, left: 0, alignItems: 'flex-start' }),
    ...(position === 'bottom-right' && { bottom: 0, right: 0, alignItems: 'flex-end' }),
    ...(position === 'bottom-left' && { bottom: 0, left: 0, alignItems: 'flex-start' }),
    ...(position === 'top' && { top: 0, left: '50%', transform: 'translateX(-50%)', alignItems: 'center' }),
    ...(position === 'bottom' && { bottom: 0, left: '50%', transform: 'translateX(-50%)', alignItems: 'center' }),
  });

  const wrapStyles = css({ pointerEvents: 'auto', width: '100%' });

  return (
    <div className={containerStyles} data-testid={`orca-snackbar-container-${position}`}>
      {items.map((item) => (
        <div key={item.id} className={wrapStyles}>
          <Snackbar {...item} onClose={() => onRemove(item.id)} />
        </div>
      ))}
    </div>
  );
};

export const SnackbarManager: React.FC = () => {
  const [state, setState] = useState(store);

  useEffect(() => subscribe(() => setState({ ...store })), []);

  return (
    <>
      {(Object.entries(state) as [SnackbarPosition, SnackbarItem[]][]).map(([position, items]) => {
        if (items.length === 0) return null;
        return createPortal(
          <SnackbarContainer key={position} position={position} items={items} onRemove={removeSnackbar} />,
          getContainer(position)
        );
      })}
    </>
  );
};

export const snackbar = {
  show: (props: SnackbarProps) => addSnackbar(props),

  info: (message: ReactNode, props: Omit<SnackbarProps, 'message' | 'variant'> = {}) =>
    snackbar.show({ message, variant: 'info', ...props }),

  positive: (message: ReactNode, props: Omit<SnackbarProps, 'message' | 'variant'> = {}) =>
    snackbar.show({ message, variant: 'positive', ...props }),

  negative: (message: ReactNode, props: Omit<SnackbarProps, 'message' | 'variant'> = {}) =>
    snackbar.show({ message, variant: 'negative', ...props }),

  warning: (message: ReactNode, props: Omit<SnackbarProps, 'message' | 'variant'> = {}) =>
    snackbar.show({ message, variant: 'warning', ...props }),

  remove: (id: string) => removeSnackbar(id),
  removeAll: () => removeAllSnackbars(),
};

export default Snackbar;
