import * as React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import { buildPillStyles, buildPillIconStyles } from './usePillStyles';

/* ── Legacy types (backward compat) ── */
/** @deprecated Use PillVariant instead */
export type LegacyPillVariant = 'default' | 'success' | 'danger' | 'warning' | 'info';

/* ── Tarmac types ── */
export type PillVariant = 'black' | 'white' | 'coal' | 'blue' | 'success' | 'error' | 'warning' | 'legacy_blue';
export type PillSize = 'sm' | 'md' | 'lg';
export type PillType = 'solid' | 'subtle' | 'outlined';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  size?: PillSize;

  /* ── Tarmac props ── */
  /** Tarmac color variant */
  pillVariant?: PillVariant;
  /** Tarmac type: solid | subtle | outlined */
  pillType?: PillType;
  /** Leading icon slot */
  leadingIcon?: React.ReactNode;
  /** Trailing icon slot */
  trailingIcon?: React.ReactNode;
  /** Show status dot */
  showStatus?: boolean;
  /** Disabled state (Figma "Disabled" type) */
  isDisabled?: boolean;
  /** Ghost state (Figma "Ghost" type) */
  isGhost?: boolean;
  /** Label text */
  text?: string;
  children?: React.ReactNode;

  /* ── Legacy props (backward compat) ── */
  /** @deprecated Use pillVariant instead */
  variant?: LegacyPillVariant;
  /** @deprecated Use inline style or className */
  color?: string;
  /** @deprecated Use inline style or className */
  backgroundColor?: string;
  /** @deprecated Use inline style or className */
  borderColor?: string;
  /** @deprecated Use leadingIcon instead */
  icon?: React.ReactNode;
  onClick?: () => void;
  /** @deprecated */
  closable?: boolean;
  /** @deprecated */
  closeIcon?: React.ReactNode;
  /** @deprecated */
  visible?: boolean;
  /** @deprecated */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  /** @deprecated */
  bordered?: boolean;
}

const StatusDot: React.FC<{ color: string }> = ({ color }) => (
  <span
    style={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: color,
      flexShrink: 0,
    }}
  />
);

const Pill: React.FC<PillProps> = ({
  className = '',
  size = 'md',
  pillVariant,
  pillType = 'solid',
  leadingIcon,
  trailingIcon,
  showStatus = false,
  isDisabled = false,
  isGhost = false,
  text,
  children,
  /* legacy props */
  variant: legacyVariant,
  color,
  backgroundColor,
  borderColor,
  icon,
  onClick,
  closable = false,
  closeIcon,
  visible: initialVisible = true,
  onClose,
  bordered = true,
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const [visible, setVisible] = React.useState(initialVisible);

  React.useEffect(() => {
    if (initialVisible !== undefined) setVisible(initialVisible);
  }, [initialVisible]);

  if (!visible) return null;

  /* ── Detect mode: Tarmac vs Legacy ── */
  const isTarmacMode = pillVariant !== undefined;

  if (isTarmacMode) {
    /* ═══ TARMAC PATH ═══ */
    const tarmacConfig = theme.components?.pill_tarmac || defaultThemeConfig.components?.pill_tarmac;
    if (!tarmacConfig) return null;

    const resolvedLeading = leadingIcon ?? icon;
    const { className: pillStyleClass, iconColor } = buildPillStyles({
      pillConfig: tarmacConfig,
      variant: pillVariant!,
      size,
      pillType,
      isDisabled,
      isGhost,
    });
    const iconStyles = buildPillIconStyles(tarmacConfig, size, iconColor);
    const displayContent = text || children;

    const statusColor = isGhost
      ? 'transparent'
      : isDisabled
        ? (tarmacConfig.states?.disabled?.[pillVariant!]?.textColor
          || tarmacConfig.states?.disabled?.textColor
          || '#cdcbcb')
        : (tarmacConfig.types?.[pillType]?.[pillVariant!]?.textColor
          || tarmacConfig.variants?.[pillVariant!]?.textColor
          || '#2b2b2b');

    return (
      <span className={`${pillStyleClass} ${className}`.trim()} style={style} {...rest}>
        {showStatus && <StatusDot color={statusColor} />}
        {resolvedLeading && <span className={iconStyles}>{resolvedLeading}</span>}
        {displayContent}
        {trailingIcon && <span className={iconStyles}>{trailingIcon}</span>}
      </span>
    );
  }

  /* ═══ LEGACY PATH (unchanged behavior) ═══ */
  const pillConfig = theme.components?.pill || defaultThemeConfig.components.pill;
  const variantConfig = pillConfig.variants[legacyVariant || 'default'] || pillConfig.variants.default;
  const sizeConfig = pillConfig.sizes[size] || pillConfig.sizes.md;

  const pillStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    borderRadius: pillConfig.borderRadius,
    backgroundColor: backgroundColor || variantConfig.backgroundColor || '#E5E7EB',
    color: color || variantConfig.textColor || '#374151',
    borderWidth: bordered ? '1px' : '0',
    borderStyle: 'solid',
    borderColor: borderColor || variantConfig.borderColor || 'transparent',
    cursor: onClick ? 'pointer' : 'default',
    '&:hover': onClick ? { opacity: 0.85 } : {},
    ...(style || {}),
  });

  const iconCss = css({ display: 'flex', alignItems: 'center', justifyContent: 'center' });
  const closeCss = css({
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginLeft: '0.25rem', cursor: 'pointer',
    color: variantConfig.closeIconColor || '#6B7280',
    '&:hover': { color: '#374151' },
  });

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);
    if (!e.defaultPrevented) setVisible(false);
  };

  return (
    <span className={`${pillStyles} ${className}`} onClick={onClick} {...rest}>
      {icon && <span className={iconCss}>{icon}</span>}
      {text || children}
      {closable && (
        <span className={closeCss} onClick={handleClose} role="button" aria-label="close">
          {closeIcon || <span aria-hidden="true">&times;</span>}
        </span>
      )}
    </span>
  );
};

export default Pill;
