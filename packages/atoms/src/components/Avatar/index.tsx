import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import {
  buildAvatarStyles,
  buildAvatarIconStyles,
  buildImageStyles,
  buildImageOverlayStyles,
  buildStatusDotStyles,
} from './useAvatarStyles';
import type {
  AvatarSize,
  AvatarShape,
  AvatarType,
  AvatarStatusDotType,
  AvatarConfig,
} from './useAvatarStyles';

export type { AvatarSize, AvatarShape, AvatarType, AvatarStatusDotType };

export interface AvatarProps {
  /** @deprecated Use avatarType="initials" with children instead */
  src?: string;
  /** Alt text for image type */
  alt?: string;
  /** Avatar type: initials, image, numeric, icon */
  avatarType?: AvatarType;
  /** Shape: round or square */
  shape?: AvatarShape;
  /** Size: sm (28px), md (36px), lg (40px), xl (48px) */
  size?: AvatarSize;
  /** Show status dot (round shape only) */
  showStatus?: boolean;
  /** Status dot type */
  statusType?: AvatarStatusDotType;
  /** Disabled state */
  isDisabled?: boolean;
  /** Ghost state — placeholder skeleton */
  isGhost?: boolean;
  /** Icon slot for icon type */
  icon?: React.ReactNode;
  /** Initials or numeric content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Tabindex for focus */
  tabIndex?: number;
}

function getRadius(config: AvatarConfig, shape: AvatarShape, size: AvatarSize): string {
  if (shape === 'round') return config.radius?.round || '999px';
  return config.radius?.square?.[size] || '8px';
}

const Avatar: React.FC<AvatarProps> = ({
  avatarType = 'initials',
  shape = 'round',
  size = 'md',
  src,
  alt = 'avatar',
  showStatus = false,
  statusType = 'active',
  isDisabled = false,
  isGhost = false,
  icon,
  children,
  className = '',
  onClick,
  tabIndex,
}) => {
  const { theme } = useTheme();
  const config: AvatarConfig = theme.components?.avatar || defaultThemeConfig.components?.avatar || {};

  const avatarStyles = buildAvatarStyles({ config, size, shape, isDisabled, isGhost });
  const iconStyles = buildAvatarIconStyles(config, size);
  const borderRadius = getRadius(config, shape, size);
  const overlayColor = config.states?.disabled?.imageOverlay || 'rgba(255,255,255,0.4)';

  const renderContent = () => {
    if (isGhost) return null;

    if (avatarType === 'image' && src) {
      return (
        <>
          <img src={src} alt={alt} className={buildImageStyles(isDisabled, borderRadius)} />
          {isDisabled && <span className={buildImageOverlayStyles(overlayColor)} />}
        </>
      );
    }

    if (avatarType === 'icon' && icon) {
      return <span className={iconStyles}>{icon}</span>;
    }

    return <span>{children}</span>;
  };

  const showDot = showStatus && shape === 'round' && !isGhost;

  return (
    <span
      className={`${avatarStyles} ${className}`.trim()}
      onClick={onClick}
      tabIndex={tabIndex ?? 0}
      role={onClick ? 'button' : undefined}
      aria-label={alt}
      data-testid="avatar"
    >
      {renderContent()}
      {showDot && (
        <span
          className={buildStatusDotStyles(config, size, statusType)}
          data-testid="avatar-status-dot"
        />
      )}
    </span>
  );
};

export default Avatar;
