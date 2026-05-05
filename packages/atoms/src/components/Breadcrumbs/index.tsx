import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import BreadcrumbCell from '../BreadcrumbCell';
import type { BreadcrumbCellProps, BreadcrumbSize } from '../BreadcrumbCell';

export type BreadcrumbDividerStyle = 'slash' | 'chevron';

export interface BreadcrumbsProps {
  items?: Array<BreadcrumbCellProps & { key?: string }>;
  dividerStyle?: BreadcrumbDividerStyle;
  size?: BreadcrumbSize;
  showDivider?: boolean;
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
}

/* Figma divider SVGs — exact paths */
const SlashLg: React.FC = () => <svg width="8" height="44" viewBox="0 0 9 44" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0.231248" y1="31.1509" x2="7.84917" y2="12.6586" stroke="#2B2B2B" strokeWidth="0.5"/></svg>;
const ChevronLg: React.FC = () => <svg width="8" height="44" viewBox="0 0 8 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12L7 22L1 32" stroke="#2B2B2B" strokeWidth="0.5"/></svg>;
const SlashSm: React.FC = () => <svg width="8" height="32" viewBox="0 0 8 32" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1.29007" y1="23.5312" x2="6.23434" y2="8.3143" stroke="#2B2B2B" strokeWidth="0.5"/></svg>;
const ChevronSm: React.FC = () => <svg width="8" height="32" viewBox="0 0 8 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6L7 16L1 26" stroke="#2B2B2B" strokeWidth="0.5"/></svg>;

const DIVIDERS: Record<string, Record<string, React.FC>> = {
  slash: { lg: SlashLg, sm: SlashSm },
  chevron: { lg: ChevronLg, sm: ChevronSm },
};

const containerCls = css({ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' });

const Breadcrumbs: React.FC<BreadcrumbsProps> & { Cell: typeof BreadcrumbCell } = ({
  items, dividerStyle = 'slash', size = 'lg', showDivider = true,
  className = '', children, 'aria-label': ariaLabel = 'Breadcrumb',
}) => {
  const { theme } = useTheme();
  const config = theme.components?.breadcrumbs || defaultThemeConfig.components?.breadcrumbs;
  const dc = config?.divider || {};
  const divCls = css({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: dc.width || '8px', flexShrink: 0, userSelect: 'none', lineHeight: 0 });
  const Div = DIVIDERS[dividerStyle]?.[size] || DIVIDERS.slash[size];

  const content = children || items?.map((item, i) => (
    <React.Fragment key={item.key ?? i}>
      {showDivider && i > 0 && <span className={divCls} aria-hidden="true"><Div /></span>}
      <BreadcrumbCell {...item} size={item.size ?? size} isCurrent={item.isCurrent ?? i === 0} />
    </React.Fragment>
  ));

  return <nav aria-label={ariaLabel} className={`${containerCls} ${className}`.trim()}>{content}</nav>;
};

Breadcrumbs.Cell = BreadcrumbCell;
Breadcrumbs.displayName = 'Breadcrumbs';
export default Breadcrumbs;
