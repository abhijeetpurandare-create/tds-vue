import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultAlertStyles } from '../../config/config';
import Button from '../Button';
import {
  buildAlertContainerStyles, buildAlertInnerColumnStyles,
  buildAlertRowStyles, buildAlertTextColumnStyles, buildAlertTextBlockStyles,
  buildAlertTitleStyles, buildAlertDescriptionStyles, buildAlertSingleTextStyles,
  buildAlertIconWrapStyles, buildAlertCtaStyles, buildAlertCloseButtonStyles,
} from './useAlertStyles';
import type { TarmacAlertVariant, TarmacAlertStyle, TarmacAlertSize, AlertThemeConfig } from './useAlertStyles';
import type { ButtonVariant } from '../Button';

export type { TarmacAlertVariant, TarmacAlertStyle, TarmacAlertSize };

export type AlertVariant =
  | 'default' | 'primary' | 'destructive' | 'success' | 'warning' | 'info'
  | 'white' | 'black' | 'coal' | 'error';
export type AlertSize = 'sm' | 'md' | 'lg';

const TARMAC_VARIANTS: ReadonlySet<string> = new Set([
  'white', 'black', 'coal', 'success', 'error', 'info', 'warning',
]);

/** Maps alert variant → Orca Button variant for default CTAs (from Figma). */
const ALERT_TO_BUTTON_VARIANT: Record<string, ButtonVariant> = {
  white: 'black',
  black: 'white',
  coal: 'white',
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
};

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
  children?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  iconColor?: string;
  alertStyle?: TarmacAlertStyle;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  showBadge?: boolean;
  showCtas?: boolean;
  ctaActions?: React.ReactNode;
  onCancel?: () => void;
  onProceed?: () => void;
  cancelText?: string;
  proceedText?: string;
}

const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'default', size = 'md', icon, title, description,
    onClose, closable = false, className = '', children,
    backgroundColor, borderColor, textColor, iconColor,
    alertStyle = 'singleText', leadingIcon, trailingIcon,
    showCtas = false, ctaActions, onCancel, onProceed,
    cancelText = 'Cancel', proceedText = 'Proceed', ...props
  }, ref) => {
    const { theme } = useTheme();
    const isTarmac = TARMAC_VARIANTS.has(variant);

    if (isTarmac) {
      const tc: AlertThemeConfig = theme.components?.alerts || {};
      const tSize: TarmacAlertSize = size === 'sm' ? 'sm' : 'lg';
      const sp = { alertConfig: tc, variant: variant as TarmacAlertVariant, size: tSize };
      const isSingle = alertStyle === 'singleText';

      // Per Figma: trailing icon IS the dismiss mechanism.
      // When closable=true and no trailingIcon provided, render close X in trailing slot.
      const hasTrailingIcon = !!trailingIcon || closable;

      return (
        <div ref={ref} role="alert" className={`${buildAlertContainerStyles(sp)} ${className}`} {...props}>
          <div className={buildAlertInnerColumnStyles(sp)}>
            <div className={buildAlertRowStyles(sp)}>
              {leadingIcon && (
                <div className={buildAlertIconWrapStyles(sp)}>{leadingIcon}</div>
              )}
              <div className={buildAlertTextColumnStyles(sp)}>
                {isSingle ? (
                  (title || description) && (
                    <div className={buildAlertSingleTextStyles(sp)}>
                      {title || description}
                    </div>
                  )
                ) : (
                  <div className={buildAlertTextBlockStyles(sp)}>
                    {title && <div className={buildAlertTitleStyles(sp)}>{title}</div>}
                    {description && <div className={buildAlertDescriptionStyles(sp)}>{description}</div>}
                  </div>
                )}
                {children}
              </div>
              {hasTrailingIcon && (
                closable ? (
                  <button
                    type="button"
                    onClick={onClose}
                    className={buildAlertCloseButtonStyles(sp)}
                    aria-label="Close alert"
                  >
                    {trailingIcon || <CloseIcon />}
                  </button>
                ) : (
                  <div className={buildAlertIconWrapStyles(sp)}>{trailingIcon}</div>
                )
              )}
            </div>
            {showCtas && (
              <div className={buildAlertCtaStyles()}>
                {ctaActions || (
                  <>
                    <Button
                      buttonStyle="tertiary"
                      variant={ALERT_TO_BUTTON_VARIANT[variant] || 'black'}
                      size={tSize === 'sm' ? 'sm' : 'md'}
                      text={cancelText}
                      onClick={onCancel}
                    />
                    <Button
                      buttonStyle="primary"
                      variant={ALERT_TO_BUTTON_VARIANT[variant] || 'black'}
                      size={tSize === 'sm' ? 'sm' : 'md'}
                      text={proceedText}
                      onClick={onProceed}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Legacy path
    const alertConfig = theme.components?.alert || defaultAlertStyles;
    const variantConfig = alertConfig.variants[variant] || {};
    const sizeConfig = alertConfig.sizes[size] || {};
    const alertStyles = css({
      position: 'relative', width: '100%', display: 'flex', alignItems: 'flex-start',
      gap: '0.75rem', fontFamily: alertConfig.base.fontFamily, fontWeight: alertConfig.base.fontWeight,
      transition: alertConfig.base.transition, borderRadius: alertConfig.base.radius,
      border: '1px solid', padding: sizeConfig.padding, fontSize: sizeConfig.fontSize,
      backgroundColor: backgroundColor || variantConfig.backgroundColor,
      color: textColor || variantConfig.textColor,
      borderColor: borderColor || variantConfig.borderColor,
      '& .alert-icon': { flexShrink: 0, width: sizeConfig.iconSize, height: sizeConfig.iconSize, color: iconColor || variantConfig.iconColor },
      '& .alert-content': { flex: '1 1 0%' },
      '& .alert-title': { margin: 0, marginBottom: title && description ? '0.25rem' : 0, fontWeight: 600, lineHeight: 1.2 },
      '& .alert-description': { margin: 0, lineHeight: 1.5, color: variantConfig.textColor, opacity: 0.9 },
      '& .alert-close': {
        position: 'absolute', top: '0.75rem', right: '0.75rem', padding: '0.25rem',
        color: variantConfig.textColor, opacity: 0.5, cursor: 'pointer', transition: 'opacity 0.15s',
        border: 'none', background: 'none', outline: 'none', '&:hover': { opacity: 0.75 },
      },
    });

    return (
      <div ref={ref} role="alert" className={`${alertStyles} ${className}`} {...props}>
        {icon && <span className="alert-icon">{icon}</span>}
        <div className="alert-content">
          {(title || children) && <h5 className="alert-title">{title || children}</h5>}
          {description && <div className="alert-description">{description}</div>}
        </div>
        {closable && (
          <button type="button" onClick={onClose} className="alert-close" aria-label="Close alert">
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
export default Alert;