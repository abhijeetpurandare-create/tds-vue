import React, { ReactNode } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Spinner, { SpinnerVariant } from '../Spinner';

export type FloatingButtonVariant = 'primary' | 'secondary' | 'outline';
export type FloatingButtonSize = 'sm' | 'md' | 'lg';
export type FloatingButtonPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface FloatingButtonProps {
  variant?: FloatingButtonVariant;
  size?: FloatingButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  isDisabled?: boolean;
  text?: string;
  isRounded?: boolean;
  position?: FloatingButtonPosition;
  // Color and style props
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
  disabledColor?: string;
  radius?: string;
  border?: string;
  // Positioning props
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: string | number;
  // Shadow props
  shadow?: string;
  // Other props
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

type MergedHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLElement> &
  React.ButtonHTMLAttributes<HTMLElement> &
  React.AnchorHTMLAttributes<HTMLElement>,
  'type' | 'color' | 'onClick'
>;

export interface FloatingButtonElementProps extends FloatingButtonProps, MergedHTMLAttributes {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FloatingButton = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  className = '',
  children,
  isDisabled = false,
  disabledColor,
  text,
  isRounded = true, // Default to rounded for floating buttons
  position = 'bottom-right',
  backgroundColor,
  borderColor,
  hoverColor,
  radius,
  border,
  top,
  right,
  bottom,
  left,
  zIndex = 10,
  shadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Default shadow
  ...props
}: FloatingButtonElementProps) => {
  const { theme } = useTheme();
  const buttonConfig = theme.components?.floatingButton || theme.components?.button || defaultThemeConfig.components.button;
  
  // DYNAMIC STYLING WITH EMOTION
  
  // 1. Get variant configuration
  const variantConfig = buttonConfig.variants[variant] || {};
  
  // 2. Map variant to spinner variant
  const spinnerVariantMap: Record<FloatingButtonVariant, SpinnerVariant> = {
    primary: 'primary',
    secondary: 'secondary',
    outline: 'default'
  };
  
  // 3. Button styles with Emotion
  const buttonStyles = css({
    // Base styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: (buttonConfig.base.fontFamily?.replace('font-', '') || 'sans-serif'),
    fontWeight: (buttonConfig.base.fontWeight?.replace('font-', '') || '500'),
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    
    // Position
    position: 'fixed',
    zIndex: zIndex,
    
    // Default positioning based on position prop
    ...(top !== undefined ? { top } : 
      bottom !== undefined ? {} : 
      position === 'top-left' || position === 'top-right' ? { top: '1rem' } : {}),
      
    ...(right !== undefined ? { right } : 
      left !== undefined ? {} : 
      position === 'top-right' || position === 'bottom-right' ? { right: '1rem' } : {}),
      
    ...(bottom !== undefined ? { bottom } : 
      top !== undefined ? {} : 
      position === 'bottom-left' || position === 'bottom-right' ? { bottom: '1rem' } : {}),
      
    ...(left !== undefined ? { left } : 
      right !== undefined ? {} : 
      position === 'top-left' || position === 'bottom-left' ? { left: '1rem' } : {}),
    
    // Size-specific styles
    padding: size === 'sm' ? '0.5rem' : 
            size === 'md' ? '0.75rem' : 
            '1rem',
    
    // Size-based dimensions
    width: text ? 'auto' : 
          size === 'sm' ? '2.5rem' : 
          size === 'md' ? '3rem' : 
          '3.5rem',
    height: text ? 'auto' : 
           size === 'sm' ? '2.5rem' : 
           size === 'md' ? '3rem' : 
           '3.5rem',
    
    // Text size
    fontSize: size === 'sm' ? '0.875rem' : 
             size === 'md' ? '1rem' : 
             '1.125rem',
             
    // Border radius
    borderRadius: radius || (isRounded ? '9999px' : '0.375rem'),
    
    // Shadow
    boxShadow: shadow,
    
    // Colors and borders
    backgroundColor: backgroundColor || variantConfig.backgroundColor || '#3B82F6',
    color: variantConfig.textColor || 'white',
    
    // Handle borders
    borderWidth: border ? '1px' : borderColor ? '1px' : '0',
    borderStyle: 'solid',
    borderColor: borderColor || variantConfig.borderColor || 'transparent',
    
    // Disabled and loading states
    opacity: isLoading ? 0.8 : 1,
    cursor: (disabled || isDisabled || isLoading) ? 'not-allowed' : 'pointer',
    
    // Hover state
    '&:hover:not(:disabled):not(.disabled)': {
      backgroundColor: hoverColor || variantConfig.hoverColor || variantConfig.backgroundColor,
      color: variantConfig.hoverTextColor || variantConfig.textColor,
    },
    
    // Focus state
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${variantConfig.focusRingColor || buttonConfig.base.focusRingColor || 'rgba(59, 130, 246, 0.5)'}`,
      outline: 'none',
    },
    
    // Disabled state
    '&:disabled, &.disabled': {
      opacity: buttonConfig.states?.disabled?.opacity || 0.6,
      backgroundColor: disabledColor || buttonConfig.states?.disabled?.backgroundColor || '#E5E7EB',
      color: buttonConfig.states?.disabled?.textColor || '#9CA3AF',
      borderColor: 'transparent',
    }
  });
  
  // 4. Animation for spinner
  const spinnerStyles = css({
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  });

  // Content wrapper styles
  const contentWrapperStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  });
  
  // Text styles
  const textStyles = css({
    marginLeft: '0.5rem',
  });

  const displayChildren = text ? <span className={textStyles}>{text}</span> : children;

  return (
    <button
      className={`${buttonStyles} ${className}`}
      disabled={disabled || isDisabled || isLoading}
      onClick={props.onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner 
            size={size === 'lg' ? 'md' : 'sm'} 
            variant={spinnerVariantMap[variant]} 
            className={spinnerStyles}
          />
        </>
      ) : (
        <div className={contentWrapperStyles}>
          {icon}
          {displayChildren}
        </div>
      )}
    </button>
  );
};

export default FloatingButton;