import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import Checkbox from '../Checkbox';
import {
  buildTabCellStyles, buildTitleStyles, buildSubtextStyles, buildGhostSkeletonStyles,
  type TabCellConfig, type TabCellStyleParams,
} from './useTabCellStyles';

export type TabCellType = 'regular' | 'button' | (string & {});
export type TabCellOrientation = 'horizontal' | 'vertical' | (string & {});
export type TabCellStyle = 'black' | 'blue' | 'dlvRed' | (string & {});
export type TabCellSize = 'lg' | 'sm' | (string & {});

export interface TabCellProps {
  tabType?: TabCellType;
  orientation?: TabCellOrientation;
  tabStyle?: TabCellStyle;
  size?: TabCellSize;
  isPressed?: boolean;
  /** Alias for isPressed */
  isSelected?: boolean;
  isDisabled?: boolean;
  isGhost?: boolean;
  title?: string;
  subtext?: string;
  /** Show internal Checkbox (hidden in vertical orientation) */
  showCheckbox?: boolean;
  /** Tarmac Checkbox variant — e.g. 'standard', 'blue', 'green', 'dlv_red' */
  checkboxVariant?: string;
  /** Tarmac Checkbox style — 'box' | 'rounded' */
  checkboxStyle?: string;
  checkboxChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  /** Leading icon slot */
  leadingIcon?: React.ReactNode;
  /** Trailing icon slot */
  trailingIcon?: React.ReactNode;
  /** Badge slot — pass a <Badge> component */
  badge?: React.ReactNode;
  /** Pill slot — pass a <Pill> component */
  pill?: React.ReactNode;
  /** Status slot — pass a <StatusIndicator> component */
  status?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
  /** @internal Injected by TabGroup */
  _inGroup?: boolean;
}

const TabCell: React.FC<TabCellProps> = ({
  tabType = 'regular', orientation = 'horizontal', tabStyle = 'black',
  size = 'lg', isPressed = false, isSelected = false, isDisabled = false, isGhost = false,
  title = 'Tab', subtext,
  showCheckbox = false, checkboxVariant = 'standard', checkboxStyle = 'box',
  checkboxChecked, onCheckboxChange,
  leadingIcon, trailingIcon, badge, pill, status,
  onClick, className = '', children, _inGroup = false,
}) => {
  const { theme } = useTheme();
  const config: TabCellConfig = theme.components?.tabCell || defaultThemeConfig?.components?.tabCell || {};
  const sc = config.sizes?.[size] || {};
  const active = isPressed || isSelected;
  const sp: TabCellStyleParams = { config, tabStyle, size, tabType, orientation, isPressed: active, isGhost, isDisabled, inGroup: _inGroup };

  if (isGhost) {
    return (
      <div className={`${buildTabCellStyles(sp)} ${className}`} data-testid="tabcell" role="tab" aria-disabled>
        <div className={buildGhostSkeletonStyles(size, config)}>
          <div style={{ width: 94 }} /><div style={{ width: 164 }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${buildTabCellStyles(sp)} ${className}`} data-testid="tabcell"
      role="tab" aria-selected={active} aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : 0} onClick={isDisabled ? undefined : onClick}
      onKeyDown={isDisabled ? undefined : (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(e as any); } }}>
      {showCheckbox && (
        <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}>
          <Checkbox tarmacVariant={checkboxVariant} tarmacStyle={checkboxStyle} size={sc.checkboxSize || 'sm'}
            checked={checkboxChecked} disabled={isDisabled}
            onChange={() => onCheckboxChange?.(!checkboxChecked)} />
        </div>
      )}
      {status && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'self-start' as any, padding: sc.statusPadding || '8px 2px' }}>{status}</div>}
      {leadingIcon && <div style={{ display: 'flex', width: sc.iconSize || '24px', height: sc.iconSize || '24px', justifyContent: 'center', alignSelf: 'self-start' as any, flexShrink: 0 }}>{leadingIcon}</div>}
      {(title || subtext) && (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 0', flex: 1 }}>
          {title && <span className={buildTitleStyles(sp)}>{title}</span>}
          {subtext && <span className={buildSubtextStyles(sp)}>{subtext}</span>}
        </div>
      )}
      {children}
      {badge && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>{badge}</div>}
      {pill && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>{pill}</div>}
      {trailingIcon && <div style={{ display: 'flex', width: sc.iconSize || '24px', height: sc.iconSize || '24px', justifyContent: 'center', alignSelf: 'self-start' as any, flexShrink: 0 }}>{trailingIcon}</div>}
    </div>
  );
};

export default TabCell;
TabCell.displayName = 'TabCell';
