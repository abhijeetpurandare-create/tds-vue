import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';

export type TabGroupOrientation = 'horizontal' | 'vertical' | (string & {});
export type TabGroupSize = 'lg' | 'sm' | (string & {});

export interface TabGroupProps {
  orientation?: TabGroupOrientation;
  size?: TabGroupSize;
  tabType?: 'regular' | 'button' | (string & {});
  showDivider?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const TabGroup: React.FC<TabGroupProps> = ({
  orientation = 'horizontal', size = 'lg', tabType = 'regular', showDivider = false,
  className = '', children,
}) => {
  const { theme } = useTheme();
  const isH = orientation === 'horizontal';
  const cellOrientation = isH ? 'vertical' : 'horizontal';
  const hConfig = theme.components?.tabGroupHorizontal || defaultThemeConfig?.components?.tabGroupHorizontal || {};
  const vConfig = theme.components?.tabGroupVertical || defaultThemeConfig?.components?.tabGroupVertical || {};
  const hBase = hConfig.base || {};
  const vSizes = vConfig.sizes || {};
  const sc = vSizes[size] || {};
  const dividerColor = hBase.dividerColor || '#e6e6e6';

  const styles = css({
    display: 'flex',
    flexDirection: isH ? 'row' : 'column',
    width: isH ? '100%' : (sc.width || (size === 'sm' ? '264px' : '300px')),
    height: !isH ? '100%' : undefined,
    overflowX: isH ? 'auto' : undefined,
    overflowY: isH ? undefined : 'auto',
    '&::-webkit-scrollbar': { display: 'none' },
    scrollbarWidth: 'none' as any,
  });

  const dividerStyle = css({
    flexShrink: 0,
    backgroundColor: dividerColor,
    ...(isH ? { width: '1px', alignSelf: 'stretch' } : { height: '0.5px', alignSelf: 'stretch' }),
  });

  const items = React.Children.toArray(children);
  const showDiv = tabType === 'button' ? false : (isH ? showDivider : true);

  return (
    <div className={`${styles} ${className}`} role="tablist"
      aria-orientation={orientation} data-testid="tabgroup">
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { orientation: cellOrientation, _inGroup: true })
            : child}
          {showDiv && i < items.length - 1 && <div className={dividerStyle} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TabGroup;
TabGroup.displayName = 'TabGroup';
