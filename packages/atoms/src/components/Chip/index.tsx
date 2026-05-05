import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import { buildChipStyles, buildChipIconStyles } from './useChipStyles';

export type ChipType = 'black' | 'white' | 'coal' | 'blue' | 'success' | 'error' | 'warning' | 'legacy_blue' | 'dlv_red';
export type ChipVariant = 'standard' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps {
  chipType?: ChipType;
  chipVariant?: ChipVariant;
  size?: ChipSize;
  text?: string;
  children?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  statusLeft?: boolean;
  statusRight?: boolean;
  isDisabled?: boolean;
  isGhost?: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  className?: string;
  tabIndex?: number;
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

const Chip: React.FC<ChipProps> = ({
  chipType = 'black',
  chipVariant = 'standard',
  size = 'md',
  text,
  children,
  leadingIcon,
  trailingIcon,
  statusLeft = false,
  statusRight = false,
  isDisabled = false,
  isGhost = false,
  onClick,
  className = '',
  tabIndex,
}) => {
  const { theme } = useTheme();
  const chipConfig = theme.components?.chip || theme.components?.tag || defaultThemeConfig.components?.chip;

  const chipStyles = buildChipStyles({
    chipConfig,
    chipType,
    chipVariant,
    size,
    isDisabled,
    isGhost,
  });

  const iconStyles = buildChipIconStyles(chipConfig, size);
  const displayContent = text || children;

  const statusColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (chipConfig?.states?.disabled?.textColor || '#cdcbcb')
      : (chipConfig?.variants?.[chipVariant]?.[chipType]?.textColor || '#2b2b2b');

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (isDisabled || isGhost) return;
    onClick?.(e);
  };

  return (
    <span
      className={`${chipStyles} ${className}`.trim()}
      onClick={handleClick}
      tabIndex={isDisabled || isGhost ? -1 : (tabIndex ?? 0)}
      role={onClick ? 'button' : undefined}
      aria-disabled={isDisabled || undefined}
    >
      {statusLeft && <StatusDot color={statusColor} />}
      {leadingIcon && <span className={iconStyles}>{leadingIcon}</span>}
      {displayContent}
      {trailingIcon && <span className={iconStyles}>{trailingIcon}</span>}
      {statusRight && <StatusDot color={statusColor} />}
    </span>
  );
};

export default Chip;
