import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import PopupHeaderFooter from '../PopupHeaderFooter';
import type { PopupHeaderFooterSize } from '../PopupHeaderFooter';
import {
  buildOverlayStyles, buildInlineOverlayStyles, buildContainerStyles, buildContentStyles,
  type PopupConfig, type PopupStyleParams,
} from './usePopupStyles';

export type PopupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});

export interface PopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  size?: PopupSize;
  title?: string;
  subtext?: string;
  showSubtext?: boolean;
  showFooter?: boolean;
  showSnackbar?: boolean;
  showTabs?: boolean;
  snackbar?: React.ReactNode;
  tabs?: React.ReactNode;
  footerCtasRight?: React.ReactNode;
  footerCtaLeft?: React.ReactNode;
  footerLink?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  badges?: React.ReactNode;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  children?: React.ReactNode;
  renderInline?: boolean;
  portalTarget?: HTMLElement;
}

const Popup: React.FC<PopupProps> = ({
  isOpen = false, onClose, size = 'md', title, subtext, showSubtext = true,
  showFooter = true, showSnackbar = false, showTabs = false,
  snackbar, tabs, footerCtasRight, footerCtaLeft, footerLink,
  leadingIcon, trailingIcon, badges, closeOnOverlay = true, closeOnEsc = true,
  className = '', children, renderInline = false, portalTarget,
}) => {
  const { theme } = useTheme();
  const config: PopupConfig =
    theme.components?.popup || defaultThemeConfig?.components?.popup || {};
  const sp: PopupStyleParams = { config, size };
  const containerRef = useRef<HTMLDivElement>(null);

  // Read headerFooterSize from theme config — no hardcoded map
  const hfSize: PopupHeaderFooterSize =
    (config.sizes?.[size]?.headerFooterSize as PopupHeaderFooterSize) || 'md';

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEsc && e.key === 'Escape') onClose?.();
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (isOpen) containerRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayClass = renderInline ? buildInlineOverlayStyles() : buildOverlayStyles(sp);

  const content = (
    <div className={overlayClass}
      onClick={!renderInline && closeOnOverlay ? onClose : undefined} role="presentation">
      <div ref={containerRef} role="dialog" aria-modal="true" aria-label={title}
        tabIndex={-1} className={`${buildContainerStyles(sp)} ${className}`}
        onClick={(e) => e.stopPropagation()}>
        <PopupHeaderFooter variant="header" size={hfSize} title={title}
          subtext={subtext} showSubtext={showSubtext} onClose={onClose}
          leadingIcon={leadingIcon} trailingIcon={trailingIcon} badges={badges} />
        {showSnackbar && snackbar}
        {showTabs && tabs}
        <div className={buildContentStyles(sp)}>{children}</div>
        {showFooter && (
          <PopupHeaderFooter variant="footer" size={hfSize}
            ctaLeft={footerCtaLeft} ctasRight={footerCtasRight} link={footerLink} />
        )}
      </div>
    </div>
  );

  if (renderInline) return content;
  return ReactDOM.createPortal(content, portalTarget || document.body);
};

export default Popup;

Popup.displayName = 'Popup';
