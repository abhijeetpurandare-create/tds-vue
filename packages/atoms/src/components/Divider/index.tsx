import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import { buildDividerStyles } from './useDividerStyles';

export type DividerType = 'line' | 'dash' | (string & {});
export type DividerSize = '0.5' | '1' | '1.5' | (string & {});

export interface DividerProps {
  /** Divider type: solid line or dashed */
  dividerType?: DividerType;
  /** Stroke weight */
  size?: DividerSize;
  /** Custom color override */
  color?: string;
  /** Additional CSS class */
  className?: string;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
}

const Divider: React.FC<DividerProps> = ({
  dividerType = 'line',
  size = '1',
  color,
  className = '',
  orientation = 'horizontal',
}) => {
  const { theme } = useTheme();
  const dividerConfig =
    theme.components?.divider || defaultThemeConfig.components?.divider;

  const styles = buildDividerStyles({
    dividerConfig,
    dividerType,
    size,
    color,
    orientation,
  });

  return (
    <hr
      data-testid="divider"
      role="separator"
      aria-orientation={orientation}
      className={`${styles} ${className}`.trim()}
    />
  );
};

export default Divider;
