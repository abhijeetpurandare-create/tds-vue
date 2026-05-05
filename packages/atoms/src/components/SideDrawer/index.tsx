import React, {
  createContext, useContext, useMemo,
  useEffect, useRef, useCallback, useState,
} from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import PopupHeaderFooter from '../PopupHeaderFooter';
import type { PopupHeaderFooterSize } from '../PopupHeaderFooter';
import {
  buildOverlayStyles, buildDrawerStyles,
  buildContentStyles, buildInlineStyles,
  type SideDrawerConfig, type SideDrawerStyleParams,
} from './useSideDrawerStyles';

/* ─── Public types ──────────────────────────────────────────────────────────── */
export type SideDrawerVariant = 'narrow' | 'extended' | (string & {});

export interface SideDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  variant?: SideDrawerVariant;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  renderInline?: boolean;
  portalTarget?: HTMLElement;
  className?: string;
  children?: React.ReactNode;
}

/* ─── Context ───────────────────────────────────────────────────────────────── */
interface SideDrawerCtxValue {
  sp: SideDrawerStyleParams;
  onClose?: () => void;
}

const SideDrawerCtx = createContext<SideDrawerCtxValue>({
  sp: { config: {}, variant: 'narrow', isOpen: false },
});

/* ─── Sub-components ────────────────────────────────────────────────────────── */

/** Header — wraps PopupHeaderFooter variant="header" */
export interface SideDrawerHeaderProps {
  title?: string;
  subtext?: string;
  showSubtext?: boolean;
  leadingIcon?: React.ReactNode;
  /** Pass null to hide the default close button */
  trailingIcon?: React.ReactNode;
  badges?: React.ReactNode;
  slot?: React.ReactNode;
  showSlot?: boolean;
  size?: PopupHeaderFooterSize;
}

const Header: React.FC<SideDrawerHeaderProps> = ({
  title, subtext, showSubtext = true,
  leadingIcon, trailingIcon, badges,
  slot, showSlot = false, size = 'md',
}) => {
  const { onClose } = useContext(SideDrawerCtx);
  return (
    <PopupHeaderFooter
      variant="header"
      size={size}
      title={title}
      subtext={subtext}
      showSubtext={showSubtext}
      onClose={onClose}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
      badges={badges}
      slot={slot}
      showSlot={showSlot}
    />
  );
};
Header.displayName = 'SideDrawer.Header';

/** Snackbar — full-width slot, no padding */
const Snackbar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="sidedrawer-snackbar">{children}</div>
);
Snackbar.displayName = 'SideDrawer.Snackbar';

/** Tabs — full-width slot, no padding */
const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="sidedrawer-tabs">{children}</div>
);
Tabs.displayName = 'SideDrawer.Tabs';

/** Content — scrollable flex-grow area with horizontal padding */
const Content: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children, className = '',
}) => {
  const { sp } = useContext(SideDrawerCtx);
  return (
    <div
      className={`${buildContentStyles(sp)} ${className}`}
      data-testid="sidedrawer-content"
    >
      {children}
    </div>
  );
};
Content.displayName = 'SideDrawer.Content';

/** Footer — wraps PopupHeaderFooter variant="footer" */
export interface SideDrawerFooterProps {
  ctasRight?: React.ReactNode;
  ctaLeft?: React.ReactNode;
  link?: React.ReactNode;
  size?: PopupHeaderFooterSize;
}

const Footer: React.FC<SideDrawerFooterProps> = ({
  ctasRight, ctaLeft, link, size = 'md',
}) => (
  <PopupHeaderFooter
    variant="footer"
    size={size}
    ctaLeft={ctaLeft}
    ctasRight={ctasRight}
    link={link}
  />
);
Footer.displayName = 'SideDrawer.Footer';

/* ─── Root container ────────────────────────────────────────────────────────── */
const SideDrawerBase: React.FC<SideDrawerProps> = ({
  isOpen = false, onClose, variant = 'narrow',
  closeOnOverlay = true, closeOnEsc = true,
  renderInline = false, portalTarget, className = '', children,
}) => {
  const { theme } = useTheme();
  const config: SideDrawerConfig =
    (theme.components as Record<string, unknown>)?.sideDrawer as SideDrawerConfig ||
    (defaultThemeConfig?.components as Record<string, unknown>)?.sideDrawer as SideDrawerConfig || {};

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animating, setAnimating] = useState(isOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEsc && e.key === 'Escape') onClose?.();
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (isOpen && containerRef.current) containerRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (renderInline) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen, renderInline]);

  const sp: SideDrawerStyleParams = { config, variant, isOpen: animating };
  const ctx: SideDrawerCtxValue = useMemo(
    () => ({ sp, onClose }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animating, variant, config, onClose],
  );

  if (!shouldRender && !renderInline) return null;
  if (renderInline && !isOpen) return null;

  const drawerContent = (
    <SideDrawerCtx.Provider value={ctx}>
      <div
        ref={containerRef}
        role="dialog"
        aria-modal={!renderInline}
        tabIndex={-1}
        className={`${renderInline ? buildInlineStyles(sp) : buildDrawerStyles(sp)} ${className}`}
        data-testid="sidedrawer-container"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </SideDrawerCtx.Provider>
  );

  if (renderInline) return drawerContent;

  return ReactDOM.createPortal(
    <div
      className={buildOverlayStyles(sp)}
      data-testid="sidedrawer-overlay"
      onClick={closeOnOverlay ? onClose : undefined}
      role="presentation"
    >
      {drawerContent}
    </div>,
    portalTarget || document.body,
  );
};

/* ─── Compound export ───────────────────────────────────────────────────────── */
const SideDrawer = Object.assign(SideDrawerBase, {
  Header,
  Snackbar,
  Tabs,
  Content,
  Footer,
});

export default SideDrawer;
SideDrawer.displayName = 'SideDrawer';
