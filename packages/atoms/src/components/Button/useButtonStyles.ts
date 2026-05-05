import { css } from '@emotion/css';
import type { ButtonSize, ButtonStyle, ButtonType } from './index';

interface VariantConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  pressedColor?: string;
  pressedTextColor?: string;
  focusRingColor?: string;
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  disabledBorderColor?: string;
}

interface DisabledState {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  cursor?: string;
}

interface ButtonConfig {
  base: {
    fontFamily?: string;
    fontWeight?: string;
    focus?: { ring?: string };
    radius?: { default?: string; rounded?: string };
  };
  styles?: Record<string, Record<string, VariantConfig>>;
  variants: Record<string, VariantConfig>;
  sizes: Record<string, {
    padding?: string;
    fontSize?: string;
    iconSize?: string;
    gap?: string;
    iconButtonSize?: string;
    iconButtonIconSize?: string;
    iconButtonPadding?: string;
  }>;
  states: {
    disabled?: DisabledState;
    disabledSecondary?: DisabledState;
    disabledTertiary?: DisabledState;
    ghost?: { backgroundColor?: string; textColor?: string; borderColor?: string; cursor?: string };
    loading?: { opacity?: string; cursor?: string };
  };
}

export interface UseButtonStylesParams {
  buttonConfig: ButtonConfig;
  variant: string;
  size: ButtonSize;
  buttonStyle: ButtonStyle;
  buttonType: ButtonType;
  isRounded: boolean;
  isLoading: boolean;
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
  textColor?: string;
  radius?: string;
  border?: string;
}

function getVariantConfig(
  buttonConfig: ButtonConfig,
  buttonStyle: ButtonStyle,
  variant: string
): VariantConfig {
  if (buttonConfig.styles?.[buttonStyle]?.[variant]) {
    return buttonConfig.styles[buttonStyle][variant];
  }
  return buttonConfig.variants[variant] || {};
}

function getDisabledState(buttonConfig: ButtonConfig, buttonStyle: ButtonStyle, variantConfig: VariantConfig): DisabledState {
  let baseDisabled: DisabledState;
  if (buttonStyle === 'secondary' && buttonConfig.states.disabledSecondary) {
    baseDisabled = buttonConfig.states.disabledSecondary;
  } else if (buttonStyle === 'tertiary' && buttonConfig.states.disabledTertiary) {
    baseDisabled = buttonConfig.states.disabledTertiary;
  } else {
    baseDisabled = buttonConfig.states.disabled || {};
  }
  return {
    backgroundColor: variantConfig.disabledBackgroundColor || baseDisabled.backgroundColor,
    textColor: variantConfig.disabledTextColor || baseDisabled.textColor,
    borderColor: variantConfig.disabledBorderColor || baseDisabled.borderColor,
    cursor: baseDisabled.cursor,
  };
}

export function buildButtonStyles(params: UseButtonStylesParams): string {
  const {
    buttonConfig, variant, size, buttonStyle, buttonType, isRounded, isLoading,
    backgroundColor, borderColor, hoverColor, textColor, radius, border,
  } = params;

  const variantConfig = getVariantConfig(buttonConfig, buttonStyle, variant);
  const disabledState = getDisabledState(buttonConfig, buttonStyle, variantConfig);
  const ghostState = buttonConfig.states.ghost || {};
  const isSecondary = buttonStyle === 'secondary';
  const hasBorder = isSecondary || variant === 'outline' || Boolean(variantConfig.borderColor);
  const isIconButton = buttonType === 'iconButton';
  const iconBtnSize = buttonConfig.sizes[size]?.iconButtonSize;

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: buttonConfig.base.fontFamily?.replace('font-', '') || 'sans-serif',
    fontWeight: Number(buttonConfig.base.fontWeight?.replace('font-', '') || 500),
    transition: 'all 0.15s ease-in-out',
    outline: 'none',
    cursor: 'pointer',
    ...(isIconButton && iconBtnSize ? {
      width: iconBtnSize,
      height: iconBtnSize,
      padding: buttonConfig.sizes[size]?.iconButtonPadding || '0',
    } : {
      padding: buttonConfig.sizes[size]?.padding ||
        (size === 'sm' ? '0.375rem 0.75rem' : size === 'md' ? '0.5rem 1rem' : '0.625rem 1.25rem'),
    }),
    fontSize: buttonConfig.sizes[size]?.fontSize ||
      (size === 'sm' ? '0.875rem' : size === 'md' ? '1rem' : '1.125rem'),
    borderRadius: isRounded
      ? (buttonConfig.base.radius?.rounded || '9999px')
      : (radius || buttonConfig.base.radius?.default || '0.375rem'),
    backgroundColor: backgroundColor || variantConfig.backgroundColor || '#3B82F6',
    color: textColor || variantConfig.textColor || 'white',
    ...(hasBorder ? {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: borderColor || variantConfig.borderColor || 'transparent',
    } : {
      borderWidth: border || borderColor ? '1px' : '0',
      borderStyle: 'solid',
      borderColor: borderColor || 'transparent',
    }),
    '&:hover:not(:disabled):not(.disabled):not(.ghost)': {
      backgroundColor: hoverColor || variantConfig.hoverColor || variantConfig.backgroundColor,
      color: variantConfig.hoverTextColor || variantConfig.textColor,
      ...(hasBorder && variantConfig.hoverBorderColor && {
        borderColor: variantConfig.hoverBorderColor,
      }),
    },
    '&:active:not(:disabled):not(.disabled):not(.ghost)': {
      backgroundColor: variantConfig.pressedColor || variantConfig.hoverColor || variantConfig.backgroundColor,
      color: variantConfig.pressedTextColor || variantConfig.hoverTextColor || variantConfig.textColor,
    },
    '&:focus': {
      boxShadow: variantConfig.focusRingColor
        ? `0 0 0 2px ${variantConfig.focusRingColor}`
        : (buttonConfig.base.focus?.ring || '0 0 0 2px rgba(0, 0, 0, 0.4)'),
      outline: 'none',
    },
    '&:disabled, &.disabled': {
      cursor: disabledState.cursor || 'not-allowed',
      backgroundColor: disabledState.backgroundColor || '#E5E7EB',
      color: disabledState.textColor || '#9CA3AF',
      borderColor: disabledState.borderColor || 'transparent',
    },
    '&.ghost': {
      backgroundColor: ghostState.backgroundColor || '#dedede',
      color: ghostState.textColor || 'transparent',
      borderColor: ghostState.borderColor || 'transparent',
      cursor: ghostState.cursor || 'default',
      pointerEvents: 'none',
    },
    ...(isLoading && {
      opacity: buttonConfig.states.loading?.opacity ? Number(buttonConfig.states.loading.opacity) : 0.8,
      pointerEvents: 'none' as const,
    }),
  });
}

export function buildIconStyles(
  buttonConfig: ButtonConfig,
  size: ButtonSize,
  iconPosition: 'left' | 'right',
  hasContent: boolean
): string {
  const iconSize = buttonConfig.sizes[size]?.iconSize ||
    (size === 'sm' ? '1rem' : size === 'md' ? '1.25rem' : '1.5rem');
  const iconGap = buttonConfig.sizes[size]?.gap ||
    (size === 'sm' ? '0.375rem' : size === 'md' ? '0.5rem' : '0.625rem');
  return css({
    width: iconSize,
    height: iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(hasContent ? {
      marginRight: iconPosition === 'left' ? iconGap : 0,
      marginLeft: iconPosition === 'right' ? iconGap : 0,
    } : {}),
  });
}
