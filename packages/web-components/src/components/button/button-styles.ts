/**
 * Button Style Builder — Web Component Edition
 *
 * This is a direct port of packages/atoms/src/components/Button/useButtonStyles.ts.
 * Instead of returning Emotion CSS class names, it returns CSS strings
 * that are injected into the Shadow DOM.
 *
 * The logic is intentionally kept 1:1 with the React version to guarantee
 * pixel-perfect visual parity.
 */

// ── Types (mirrored from React Button) ─────────────────────

export type ButtonVariant =
  | 'primary' | 'secondary' | 'outline'
  | 'black' | 'white' | 'info' | 'success' | 'error' | 'warning'
  | 'dlv_red' | 'coal';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonStyle = 'primary' | 'secondary' | 'tertiary';
export type ButtonType = 'button' | 'iconButton';

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

export interface ButtonConfig {
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

export interface BuildButtonStylesParams {
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

// ── Helpers (identical to React version) ────────────────────

function getVariantConfig(
  buttonConfig: ButtonConfig,
  buttonStyle: ButtonStyle,
  variant: string,
): VariantConfig {
  if (buttonConfig.styles?.[buttonStyle]?.[variant]) {
    return buttonConfig.styles[buttonStyle][variant];
  }
  return buttonConfig.variants[variant] || {};
}

function getDisabledState(
  buttonConfig: ButtonConfig,
  buttonStyle: ButtonStyle,
  variantConfig: VariantConfig,
): DisabledState {
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

// ── Main style builder ──────────────────────────────────────

/**
 * Build a CSS string for the button element.
 * This produces the exact same visual output as the Emotion-based
 * buildButtonStyles() in the React package.
 */
export function buildButtonCSS(params: BuildButtonStylesParams): string {
  const {
    buttonConfig, variant, size, buttonStyle, buttonType, isRounded, isLoading,
    backgroundColor, borderColor, hoverColor, textColor, radius, border,
  } = params;

  const vc = getVariantConfig(buttonConfig, buttonStyle, variant);
  const ds = getDisabledState(buttonConfig, buttonStyle, vc);
  const gs = buttonConfig.states.ghost || {};
  const isSecondary = buttonStyle === 'secondary';
  const hasBorder = isSecondary || variant === 'outline' || Boolean(vc.borderColor);
  const isIconButton = buttonType === 'iconButton';
  const iconBtnSize = buttonConfig.sizes[size]?.iconButtonSize;

  // Padding
  let padding: string;
  if (isIconButton && iconBtnSize) {
    padding = buttonConfig.sizes[size]?.iconButtonPadding || '0';
  } else {
    padding = buttonConfig.sizes[size]?.padding ||
      (size === 'sm' ? '0.375rem 0.75rem' : size === 'md' ? '0.5rem 1rem' : '0.625rem 1.25rem');
  }

  const fontSize = buttonConfig.sizes[size]?.fontSize ||
    (size === 'sm' ? '0.875rem' : size === 'md' ? '1rem' : '1.125rem');

  const borderRadiusVal = isRounded
    ? (buttonConfig.base.radius?.rounded || '9999px')
    : (radius || buttonConfig.base.radius?.default || '0.375rem');

  const bgColor = backgroundColor || vc.backgroundColor || '#3B82F6';
  const color = textColor || vc.textColor || 'white';

  // Border
  let borderWidth: string;
  let borderStyle = 'solid';
  let borderColorVal: string;
  if (hasBorder) {
    borderWidth = '1px';
    borderColorVal = borderColor || vc.borderColor || 'transparent';
  } else {
    borderWidth = (border || borderColor) ? '1px' : '0';
    borderColorVal = borderColor || 'transparent';
  }

  // Hover
  const hoverBg = hoverColor || vc.hoverColor || vc.backgroundColor || bgColor;
  const hoverText = vc.hoverTextColor || vc.textColor || color;
  const hoverBorder = hasBorder && vc.hoverBorderColor ? vc.hoverBorderColor : borderColorVal;

  // Active/Pressed
  const pressedBg = vc.pressedColor || vc.hoverColor || vc.backgroundColor || bgColor;
  const pressedText = vc.pressedTextColor || vc.hoverTextColor || vc.textColor || color;

  // Focus
  const focusRing = vc.focusRingColor
    ? `0 0 0 2px ${vc.focusRingColor}`
    : (buttonConfig.base.focus?.ring || '0 0 0 2px rgba(0, 0, 0, 0.4)');

  // Loading
  const loadingOpacity = buttonConfig.states.loading?.opacity
    ? Number(buttonConfig.states.loading.opacity)
    : 0.8;

  let css = `
    :host {
      display: inline-block;
    }

    .tarmac-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${buttonConfig.base.fontFamily?.replace('font-', '') || 'sans-serif'};
      font-weight: ${Number(buttonConfig.base.fontWeight?.replace('font-', '') || 500)};
      transition: all 0.15s ease-in-out;
      outline: none;
      cursor: pointer;
      padding: ${padding};
      font-size: ${fontSize};
      border-radius: ${borderRadiusVal};
      background-color: ${bgColor};
      color: ${color};
      border-width: ${borderWidth};
      border-style: ${borderStyle};
      border-color: ${borderColorVal};
      ${isIconButton && iconBtnSize ? `width: ${iconBtnSize}; height: ${iconBtnSize};` : ''}
      ${isLoading ? `opacity: ${loadingOpacity}; pointer-events: none;` : ''}
    }

    .tarmac-btn:hover:not(:disabled):not(.ghost) {
      background-color: ${hoverBg};
      color: ${hoverText};
      border-color: ${hoverBorder};
    }

    .tarmac-btn:active:not(:disabled):not(.ghost) {
      background-color: ${pressedBg};
      color: ${pressedText};
    }

    .tarmac-btn:focus {
      box-shadow: ${focusRing};
      outline: none;
    }

    .tarmac-btn:disabled,
    .tarmac-btn.disabled {
      cursor: ${ds.cursor || 'not-allowed'};
      background-color: ${ds.backgroundColor || '#E5E7EB'};
      color: ${ds.textColor || '#9CA3AF'};
      border-color: ${ds.borderColor || 'transparent'};
    }

    .tarmac-btn.ghost {
      background-color: ${gs.backgroundColor || '#dedede'};
      color: ${gs.textColor || 'transparent'};
      border-color: ${gs.borderColor || 'transparent'};
      cursor: ${gs.cursor || 'default'};
      pointer-events: none;
    }
  `;

  return css;
}

/**
 * Build CSS for icon wrapper (leading/trailing).
 * Mirrors buildIconStyles() from the React version.
 */
export function buildIconCSS(
  buttonConfig: ButtonConfig,
  size: ButtonSize,
  position: 'left' | 'right',
  hasContent: boolean,
): string {
  const iconSize = buttonConfig.sizes[size]?.iconSize ||
    (size === 'sm' ? '1rem' : size === 'md' ? '1.25rem' : '1.5rem');
  const iconGap = buttonConfig.sizes[size]?.gap ||
    (size === 'sm' ? '0.375rem' : size === 'md' ? '0.5rem' : '0.625rem');

  return `
    .icon-${position} {
      width: ${iconSize};
      height: ${iconSize};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      ${hasContent && position === 'left' ? `margin-right: ${iconGap};` : ''}
      ${hasContent && position === 'right' ? `margin-left: ${iconGap};` : ''}
    }

    .icon-${position} ::slotted(svg),
    .icon-${position} svg {
      width: ${iconSize};
      height: ${iconSize};
    }
  `;
}

/**
 * Spinner keyframes — shared across all button instances.
 */
export const SPINNER_CSS = `
  @keyframes tarmac-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .tarmac-spinner {
    display: inline-block;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: tarmac-spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  .tarmac-spinner--sm {
    width: 14px;
    height: 14px;
  }

  .tarmac-spinner--md {
    width: 16px;
    height: 16px;
  }

  .tarmac-spinner--lg {
    width: 20px;
    height: 20px;
  }
`;
