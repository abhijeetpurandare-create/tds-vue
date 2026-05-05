import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import { buildCellStyles, buildGhostStyles, buildIconStyles } from './useBreadcrumbCellStyles';

export type BreadcrumbCellStyle = 'black' | 'blue' | 'dlvRed' | (string & {});
export type BreadcrumbSize = 'lg' | 'sm';

export interface BreadcrumbCellProps {
  label?: string;
  style?: BreadcrumbCellStyle;
  size?: BreadcrumbSize;
  isDisabled?: boolean;
  isGhost?: boolean;
  isCurrent?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Pill slot — pass a <Pill> component directly */
  pill?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  className?: string;
  tabIndex?: number;
  'data-testid'?: string;
}

/** Figma add-circle-outline icon (20px) */
export const AddCircleIcon20: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8333 5.83335H9.16663V9.16669H5.83329V10.8334H9.16663V14.1667H10.8333V10.8334H14.1666V9.16669H10.8333V5.83335ZM9.99996 1.66669C5.39996 1.66669 1.66663 5.40002 1.66663 10C1.66663 14.6 5.39996 18.3334 9.99996 18.3334C14.6 18.3334 18.3333 14.6 18.3333 10C18.3333 5.40002 14.6 1.66669 9.99996 1.66669ZM9.99996 16.6667C6.32496 16.6667 3.33329 13.675 3.33329 10C3.33329 6.32502 6.32496 3.33335 9.99996 3.33335C13.675 3.33335 16.6666 6.32502 16.6666 10C16.6666 13.675 13.675 16.6667 9.99996 16.6667Z" fill="currentColor"/>
  </svg>
);

/** Figma add-circle-outline icon (16px) */
export const AddCircleIcon16: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.66671 4.66671H7.33337V7.33337H4.66671V8.66671H7.33337V11.3334H8.66671V8.66671H11.3334V7.33337H8.66671V4.66671ZM8.00004 1.33337C4.32004 1.33337 1.33337 4.32004 1.33337 8.00004C1.33337 11.68 4.32004 14.6667 8.00004 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00004C14.6667 4.32004 11.68 1.33337 8.00004 1.33337ZM8.00004 13.3334C5.06004 13.3334 2.66671 10.94 2.66671 8.00004C2.66671 5.06004 5.06004 2.66671 8.00004 2.66671C10.94 2.66671 13.3334 5.06004 13.3334 8.00004C13.3334 10.94 10.94 13.3334 8.00004 13.3334Z" fill="currentColor"/>
  </svg>
);

const BreadcrumbCell: React.FC<BreadcrumbCellProps> = ({
  label,
  style: cellStyle = 'black',
  size = 'lg',
  isDisabled = false,
  isGhost = false,
  isCurrent = false,
  leadingIcon,
  trailingIcon,
  pill,
  onClick,
  href,
  className = '',
  tabIndex,
  'data-testid': testId,
}) => {
  const { theme } = useTheme();
  const config = theme.components?.breadcrumbs || defaultThemeConfig.components?.breadcrumbs;

  if (isGhost) {
    const ghostCls = buildGhostStyles({ config, size });
    return <span className={`${ghostCls} ${className}`.trim()} data-testid={testId} aria-hidden="true" />;
  }

  const cellCls = buildCellStyles({ config, cellStyle, size, isDisabled, isCurrent });
  const iconCls = buildIconStyles(config, size);
  const Tag = href && !isDisabled ? 'a' : 'span';

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  return (
    <Tag
      href={href && !isDisabled ? href : undefined}
      onClick={handleClick}
      className={`${cellCls} ${className}`.trim()}
      tabIndex={isDisabled ? -1 : (tabIndex ?? 0)}
      aria-disabled={isDisabled || undefined}
      aria-current={isCurrent ? 'page' : undefined}
      data-testid={testId}
    >
      {leadingIcon && <span className={iconCls}>{leadingIcon}</span>}
      {label}
      {trailingIcon && <span className={iconCls}>{trailingIcon}</span>}
      {pill}
    </Tag>
  );
};

BreadcrumbCell.displayName = 'BreadcrumbCell';
export default BreadcrumbCell;
