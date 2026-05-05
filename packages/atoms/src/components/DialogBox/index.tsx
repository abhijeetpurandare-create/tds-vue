import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Snackbar from '../Snackbar';
import {
  buildOverlayStyles, buildContainerStyles, buildHeaderStyles,
  buildContentStyles, buildSlotStyles, buildFooterStyles,
  type DialogBoxConfig, type DialogBoxStyleParams,
} from './useDialogBoxStyles';

export type DialogBoxType = 'standard' | 'slots' | 'slotsx2' | (string & {});
export type DialogBoxSize = 'mobile' | 'web' | (string & {});
export type DialogBoxFooterStyle = 'type1' | 'type2' | (string & {});

export interface DialogBoxProps {
  isOpen?: boolean;
  onClose?: () => void;
  type?: DialogBoxType;
  size?: DialogBoxSize;
  footerStyle?: DialogBoxFooterStyle;
  title?: string;
  subtext?: string;
  showSubtext?: boolean;
  showHeader?: boolean;
  showSnackbar?: boolean;
  showFooter?: boolean;
  showCheckbox?: boolean;
  snackbarText?: string;
  snackbarIcon?: React.ReactNode;
  snackbar?: React.ReactNode;
  illustration?: React.ReactNode;
  heading?: string;
  description?: string;
  checkboxLabel?: string;
  checkboxChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  headerLeadingIcon?: React.ReactNode;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  footer?: React.ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  slotHeader?: React.ReactNode;
  slotMiddle?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  renderInline?: boolean;
  portalTarget?: HTMLElement;
}

const CloseIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
  </svg>
);

const InfoIcon16 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.33 4.67h1.34V6H7.33V4.67Zm0 2.66h1.34v4H7.33v-4ZM8 1.33A6.67 6.67 0 1 0 8 14.67 6.67 6.67 0 0 0 8 1.33Zm0 12A5.34 5.34 0 1 1 8 2.67a5.34 5.34 0 0 1 0 10.66Z" fill="currentColor"/>
  </svg>
);

const DialogBox: React.FC<DialogBoxProps> = ({
  isOpen = false, onClose, type = 'standard', size = 'web',
  footerStyle = 'type1', title, subtext, showSubtext = false,
  showHeader = true, showSnackbar = true, showFooter = true,
  showCheckbox = true, snackbarText, snackbarIcon, snackbar, illustration,
  heading, description, checkboxLabel = "Don't show this message again",
  checkboxChecked, onCheckboxChange, headerLeadingIcon,
  closeOnOverlay = true, closeOnEsc = true, footer, primaryLabel = 'Action',
  secondaryLabel = 'Cancel', onPrimaryClick, onSecondaryClick, slotHeader,
  slotMiddle, className = '', children, renderInline = false, portalTarget,
}) => {
  const { theme } = useTheme();
  const config: DialogBoxConfig = theme.components?.dialogBox || defaultThemeConfig?.components?.dialogBox || {};
  const sp: DialogBoxStyleParams = { config, size, footerStyle };
  const containerRef = useRef<HTMLDivElement>(null);
  const isSlots = type === 'slots' || type === 'slotsx2';

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEsc && e.key === 'Escape') onClose?.();
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useEffect(() => { if (isOpen) containerRef.current?.focus(); }, [isOpen]);

  if (!isOpen) return null;

  const headerIcon = isSlots && slotHeader
    ? <div className="dialogbox-header-icon">{slotHeader}</div>
    : headerLeadingIcon ? <div className="dialogbox-header-icon">{headerLeadingIcon}</div> : null;

  const snackbarEl = snackbar || (snackbarText && (
    <Snackbar variant="warning" snackbarStyle="filled" size="sm"
      message={snackbarText} leadingIcon={snackbarIcon ?? <InfoIcon16 />} duration={0} trailingIcon={false} />
  ));

  const defaultContent = (
    <div className={buildContentStyles(sp)} data-testid="dialogbox-content">
      {type === 'slotsx2' && slotMiddle && <div className={buildSlotStyles()} data-testid="dialogbox-slot-middle">{slotMiddle}</div>}
      {illustration && <div className="dialogbox-illustration">{illustration}</div>}
      {(heading || description) && (
        <div className="dialogbox-body">
          {heading && <div className="dialogbox-heading">{heading}</div>}
          {description && <div className="dialogbox-description">{description}</div>}
        </div>
      )}
      {type === 'slots' && slotMiddle && <div className={buildSlotStyles()} data-testid="dialogbox-slot-middle">{slotMiddle}</div>}
      {showCheckbox && (
        <div className="dialogbox-checkbox-row" data-testid="dialogbox-checkbox">
          <Checkbox tarmacVariant="standard" tarmacStyle="box" size="sm"
            checked={checkboxChecked} onChange={() => onCheckboxChange?.(!checkboxChecked)}>
            {checkboxLabel}
          </Checkbox>
        </div>
      )}
    </div>
  );

  const dialog = (
    <div ref={containerRef} role="dialog" aria-modal={!renderInline} aria-label={title || heading}
      tabIndex={-1} className={`${buildContainerStyles(sp)} ${className}`}
      data-testid="dialogbox-container" onClick={e => e.stopPropagation()}>
      {showHeader && (
        <div className={buildHeaderStyles(sp)} data-testid="dialogbox-header">
          <div className="dialogbox-header-left">
            {headerIcon}
            {(title || (showSubtext && subtext)) && (
              <div className="dialogbox-header-text">
                {title && <div className="dialogbox-title">{title}</div>}
                {showSubtext && subtext && <div className="dialogbox-subtext">{subtext}</div>}
              </div>
            )}
          </div>
          <div className="dialogbox-close-icon" onClick={onClose} role="button" tabIndex={0}
            aria-label="Close dialog" onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClose?.(); }}>
            <CloseIcon />
          </div>
        </div>
      )}
      {showSnackbar && snackbarEl}
      {children ? <div className={buildContentStyles(sp)} data-testid="dialogbox-content">{children}</div> : defaultContent}
      {showFooter && (
        <div className={buildFooterStyles(sp)} data-testid="dialogbox-footer">
          {footer || (<>
            <Button buttonStyle="tertiary" variant="black" size="md" text={secondaryLabel} onClick={onSecondaryClick || onClose} />
            <Button buttonStyle="primary" variant="black" size="md" text={primaryLabel} onClick={onPrimaryClick} />
          </>)}
        </div>
      )}
    </div>
  );

  if (renderInline) return dialog;
  return ReactDOM.createPortal(
    <div className={buildOverlayStyles(sp)} data-testid="dialogbox-overlay"
      onClick={closeOnOverlay ? onClose : undefined} role="presentation">{dialog}</div>,
    portalTarget || document.body,
  );
};

export default DialogBox;
DialogBox.displayName = 'DialogBox';
