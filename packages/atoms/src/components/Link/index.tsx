import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import { buildLinkStyles, buildIconContainerStyles } from './useLinkStyles';

export type LinkStyle = 'blue' | 'black' | 'white' | (string & {});
export type LinkSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | (string & {});

export interface LinkProps {
  /** Color style variant */
  linkStyle?: LinkStyle;
  /** Size of the link */
  size?: LinkSize;
  /** Whether the link is disabled */
  isDisabled?: boolean;
  /** Link text content */
  text?: string;
  /** Children content (alternative to text) */
  children?: React.ReactNode;
  /** Leading icon slot */
  leadingIcon?: React.ReactNode;
  /** Trailing icon slot */
  trailingIcon?: React.ReactNode;
  /** URL to navigate to */
  href?: string;
  /** Target attribute for the anchor */
  target?: string;
  /** Rel attribute for the anchor */
  rel?: string;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Additional CSS class */
  className?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** data-testid for testing */
  'data-testid'?: string;
}

const Link: React.FC<LinkProps> = ({
  linkStyle = 'blue',
  size = 'md',
  isDisabled = false,
  text,
  children,
  leadingIcon,
  trailingIcon,
  href,
  target,
  rel,
  onClick,
  className = '',
  tabIndex,
  'data-testid': testId,
}) => {
  const { theme } = useTheme();
  const linkConfig = theme.components?.link || defaultThemeConfig.components?.link;

  const linkStyles = buildLinkStyles({
    linkConfig,
    linkStyle,
    size,
    isDisabled,
  });

  const iconStyles = buildIconContainerStyles(linkConfig, size);
  const displayContent = text || children;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      href={isDisabled ? undefined : href}
      target={target}
      rel={rel}
      onClick={handleClick}
      className={`${linkStyles} ${className}`.trim()}
      tabIndex={isDisabled ? -1 : (tabIndex ?? 0)}
      aria-disabled={isDisabled || undefined}
      data-testid={testId}
    >
      {leadingIcon && <span className={iconStyles}>{leadingIcon}</span>}
      {displayContent}
      {trailingIcon && <span className={iconStyles}>{trailingIcon}</span>}
    </a>
  );
};

export default Link;
