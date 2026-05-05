import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import { buildBadgeStyles, buildBadgeIconStyles } from './useBadgeStyles';

export type BadgeVariant = 'black' | 'white' | 'coal' | 'dlv_red' | 'info' | 'success' | 'warning' | 'error' | 'cardbox';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeType = 'solid' | 'subtle' | 'outlined';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  badgeType?: BadgeType;
  text?: string;
  children?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  showStatus?: boolean;
  isDisabled?: boolean;
  isGhost?: boolean;
  className?: string;
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

const Badge: React.FC<BadgeProps> = ({
  variant = 'black',
  size = 'md',
  badgeType = 'solid',
  text,
  children,
  leadingIcon,
  trailingIcon,
  showStatus = false,
  isDisabled = false,
  isGhost = false,
  className = '',
}) => {
  const { theme } = useTheme();
  const badgeConfig = theme.components?.badge || defaultThemeConfig.components?.badge;

  const badgeStyles = buildBadgeStyles({
    badgeConfig,
    variant,
    size,
    badgeType,
    isDisabled,
    isGhost,
  });

  const iconStyles = buildBadgeIconStyles(badgeConfig, size);
  const displayContent = text || children;

  // Status dot color matches the text color of the current variant config
  const statusColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (badgeConfig.states?.disabled?.textColor || '#cdcbcb')
      : (badgeConfig.types?.[badgeType]?.[variant]?.textColor
        || badgeConfig.variants?.[variant]?.textColor
        || '#2b2b2b');

  return (
    <span className={`${badgeStyles} ${className}`.trim()}>
      {showStatus && <StatusDot color={statusColor} />}
      {leadingIcon && <span className={iconStyles}>{leadingIcon}</span>}
      {displayContent}
      {trailingIcon && <span className={iconStyles}>{trailingIcon}</span>}
    </span>
  );
};

export default Badge;
