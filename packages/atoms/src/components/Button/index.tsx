import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Spinner, { SpinnerVariant } from '../Spinner';
import { buildButtonStyles, buildIconStyles } from './useButtonStyles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'black' | 'white' | 'info' | 'success' | 'error' | 'warning' | 'dlv_red' | 'coal' | (string & {});
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonStyle = 'primary' | 'secondary' | 'tertiary';
export type ButtonType = 'button' | 'iconButton';

const spinnerVariantMap: Record<string, SpinnerVariant> = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'default',
};

const TARMAC_BUTTON_VARIANTS = new Set(['black', 'white', 'info', 'success', 'error', 'warning', 'dlv_red', 'coal']);

// Map Tarmac button style to spinner variant:
// primary style (filled bg) → tarmac-03 (white spinner on colored bg)
// secondary/tertiary style (transparent bg) → tarmac-01 (dark spinner on light bg)
function getTarmacSpinnerVariant(buttonStyle: string): string {
  return buttonStyle === 'primary' ? 'tarmac-03' : 'tarmac-01';
}

// Map Tarmac button size to spinner pixel size
function getTarmacSpinnerSize(buttonSize: string): string {
  return buttonSize === 'lg' ? '20px' : '16px';
}

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  buttonStyle?: ButtonStyle;
  buttonType?: ButtonType;
  isLoading?: boolean;
  disabled?: boolean;
  /** @deprecated Use leadingIcon/trailingIcon instead */
  icon?: React.ReactNode;
  /** @deprecated Use leadingIcon/trailingIcon instead */
  iconPosition?: 'left' | 'right';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  isDisabled?: boolean;
  isGhost?: boolean;
  text?: string;
  isRounded?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverColor?: string;
  radius?: string;
  border?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonText: React.FC<ButtonProps> = (props) => <Button {...props} />;
const ButtonIcon: React.FC<ButtonProps> = (props) => <Button {...props} />;

interface ButtonComponent extends React.FC<ButtonProps> {
  Text: typeof ButtonText;
  Icon: typeof ButtonIcon;
}

const ButtonBase: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  buttonStyle = 'primary',
  buttonType = 'button',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  leadingIcon,
  trailingIcon,
  className = '',
  children,
  isDisabled = false,
  isGhost = false,
  text,
  isRounded = false,
  backgroundColor,
  borderColor,
  hoverColor,
  radius,
  border,
  textColor,
  ...props
}) => {
  const { theme } = useTheme();
  const buttonConfig = theme.components?.button || defaultThemeConfig.components.button;

  const buttonStyles = buildButtonStyles({
    buttonConfig,
    variant,
    size,
    buttonStyle,
    buttonType,
    isRounded,
    isLoading,
    backgroundColor,
    borderColor,
    hoverColor,
    textColor,
    radius,
    border,
  });

  const resolvedLeading = leadingIcon ?? (icon && iconPosition === 'left' ? icon : undefined);
  const resolvedTrailing = trailingIcon ?? (icon && iconPosition === 'right' ? icon : undefined);
  const hasContent = Boolean(children || text);
  const leadingStyles = buildIconStyles(buttonConfig, size, 'left', hasContent);
  const trailingStyles = buildIconStyles(buttonConfig, size, 'right', hasContent);

  const isIconButton = buttonType === 'iconButton';
  const iconButtonIconSize = buttonConfig.sizes[size]?.iconButtonIconSize ||
    buttonConfig.sizes[size]?.iconSize || '20px';
  const iconBtnChildStyles = isIconButton ? css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: iconButtonIconSize,
    height: iconButtonIconSize,
    '& > svg': {
      width: iconButtonIconSize,
      height: iconButtonIconSize,
    },
  }) : '';

  const spinnerAnimation = css({
    animation: 'spin 1s linear infinite',
    marginRight: '0.5rem',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  });

  const displayChildren = text || children;
  const ghostClass = isGhost ? 'ghost' : '';

  return (
    <button
      className={`${buttonStyles} ${ghostClass} ${className}`.trim()}
      disabled={disabled || isDisabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          {TARMAC_BUTTON_VARIANTS.has(variant) ? (
            <Spinner
              tarmacVariant={getTarmacSpinnerVariant(buttonStyle)}
              tarmacSize={getTarmacSpinnerSize(size)}
              className={spinnerAnimation}
            />
          ) : (
            <Spinner
              size={size === 'lg' ? 'md' : 'sm'}
              variant={spinnerVariantMap[variant]}
              className={spinnerAnimation}
            />
          )}
          {displayChildren}
        </>
      ) : (
        <>
          {isIconButton ? (
            <span className={iconBtnChildStyles}>{resolvedLeading || displayChildren}</span>
          ) : (
            <>
              {resolvedLeading && <span className={leadingStyles}>{resolvedLeading}</span>}
              {displayChildren}
              {resolvedTrailing && <span className={trailingStyles}>{resolvedTrailing}</span>}
            </>
          )}
        </>
      )}
    </button>
  );
};

export const Button = Object.assign(ButtonBase, {
  Text: ButtonText,
  Icon: ButtonIcon,
}) as ButtonComponent;

export default Button;
