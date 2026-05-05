import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import {
  buildHeaderStyles, buildFooterStyles, buildTextsStyles,
  buildHeadingStyles, buildSubtextStyles, buildIconWrapStyles,
  buildCloseButtonStyles, buildBadgesStyles, buildButtonSetStyles,
  buildSlotWrapStyles,
  type PopupHeaderFooterConfig, type StyleParams,
} from './usePopupHeaderFooterStyles';

export type PopupHeaderFooterVariant = 'header' | 'footer' | (string & {});
export type PopupHeaderFooterSize = 'lg' | 'md' | 'sm' | (string & {});

export interface PopupHeaderFooterProps {
  variant?: PopupHeaderFooterVariant;
  size?: PopupHeaderFooterSize;
  title?: string;
  subtext?: string;
  showSubtext?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  badges?: React.ReactNode;
  slot?: React.ReactNode;
  showSlot?: boolean;
  ctaLeft?: React.ReactNode;
  ctasRight?: React.ReactNode;
  link?: React.ReactNode;
  className?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

/** Exact Figma close icon (24×24 filled) */
const CloseIcon24: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
  </svg>
);

/** Exact Figma close icon (20×20 filled) */
const CloseIcon20: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8334 5.34163L14.6584 4.16663L10.0001 8.825L5.34175 4.16663L4.16675 5.34163L8.82508 10L4.16675 14.6583L5.34175 15.8333L10.0001 11.175L14.6584 15.8333L15.8334 14.6583L11.1751 10L15.8334 5.34163Z" fill="currentColor"/>
  </svg>
);

const PopupHeaderFooter: React.FC<PopupHeaderFooterProps> = ({
  variant = 'header', size = 'md', title, subtext, showSubtext = true,
  leadingIcon, trailingIcon, badges, slot, showSlot = false,
  ctaLeft, ctasRight, link, className = '', onClose, children,
}) => {
  const { theme } = useTheme();
  const config: PopupHeaderFooterConfig =
    theme.components?.popupHeaderFooter || defaultThemeConfig?.components?.popupHeaderFooter || {};
  const sp: StyleParams = { config, size, variant: variant as 'header' | 'footer' };

  if (variant === 'footer') {
    return (
      <div className={`${buildFooterStyles(sp)} ${className}`} data-testid="popup-footer">
        {ctaLeft}
        {link}
        {ctasRight && <div className={buildButtonSetStyles()}>{ctasRight}</div>}
        {children}
      </div>
    );
  }

  const CloseIcon = size === 'sm' ? CloseIcon20 : CloseIcon24;

  return (
    <div className={`${buildHeaderStyles(sp)} ${className}`} data-testid="popup-header">
      {showSlot && slot && <div className={buildSlotWrapStyles(sp)}>{slot}</div>}
      {leadingIcon && <div className={buildIconWrapStyles(sp)}>{leadingIcon}</div>}
      <div className={buildTextsStyles(sp)}>
        {title && <div className={buildHeadingStyles(sp)}>{title}</div>}
        {showSubtext && subtext && <div className={buildSubtextStyles(sp)}>{subtext}</div>}
      </div>
      {badges && <div className={buildBadgesStyles({ config })}>{badges}</div>}
      {trailingIcon !== undefined ? (
        <div className={buildIconWrapStyles(sp)}>{trailingIcon}</div>
      ) : onClose ? (
        <button type="button" onClick={onClose} aria-label="Close"
          className={buildCloseButtonStyles(sp)}>
          <CloseIcon />
        </button>
      ) : null}
      {children}
    </div>
  );
};

export default PopupHeaderFooter;

PopupHeaderFooter.displayName = 'PopupHeaderFooter';
