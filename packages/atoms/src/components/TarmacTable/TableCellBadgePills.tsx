import React from 'react'
import { css, cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import type { TableCellBadgePillsProps } from './types'
import type { TableConfig } from '../../types/types'

/**
 * TableCellBadgePills — Cell content showing badges or pills.
 *
 * Variants: badges | pills
 * Types: 1 (single) | 2 (double) | 3 (triple) | ghost (skeleton)
 *
 * Figma: "Table Cell Badge_pills" component set
 */
const TableCellBadgePills: React.FC<TableCellBadgePillsProps> = ({
  variant = 'badges',
  type = '1',
  items = [{ label: 'Badge' }],
  className,
}) => {
  const { theme } = useTheme()
  const tableConfig = (theme?.components?.table || defaultThemeConfig.components.table) as TableConfig
  const bp = tableConfig.cellBadgePills

  const containerStyle = css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: bp?.container?.gap || '4px',
    padding: bp?.container?.padding || '8px',
    alignItems: 'center',
  })

  // Ghost variant
  if (type === 'ghost') {
    const gc = bp?.ghost
    return (
      <div className={cx(containerStyle, className)}>
        {[0, 1].map((i) => (
          <span key={i} className={css({
            width: gc?.width || '40px',
            height: gc?.height || '20px',
            borderRadius: gc?.borderRadius || '4px',
            backgroundColor: gc?.backgroundColor || '#DEDEDE',
          })} />
        ))}
      </div>
    )
  }

  const maxItems = parseInt(type, 10) || 1
  const displayItems = items.slice(0, maxItems)

  const badgeConfig = bp?.badge
  const pillConfig = bp?.pill

  const badgeStyle = css({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2px',
    padding: badgeConfig?.padding || '4px',
    borderRadius: badgeConfig?.borderRadius || '4px',
    backgroundColor: badgeConfig?.backgroundColor || '#E6F3FE',
    border: `${badgeConfig?.borderWidth || '0.5px'} solid ${badgeConfig?.borderColor || '#48A7FC'}`,
    fontFamily: badgeConfig?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: badgeConfig?.fontSize || '10px',
    fontWeight: Number(badgeConfig?.fontWeight) || 500,
    lineHeight: badgeConfig?.lineHeight || '12px',
    color: badgeConfig?.color || '#2396FB',
  })

  const pillStyle = css({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2px',
    padding: pillConfig?.padding || '4px 8px',
    borderRadius: pillConfig?.borderRadius || '999px',
    backgroundColor: pillConfig?.backgroundColor || '#F4FBF8',
    fontFamily: pillConfig?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: pillConfig?.fontSize || '10px',
    fontWeight: Number(pillConfig?.fontWeight) || 500,
    lineHeight: pillConfig?.lineHeight || '12px',
    color: pillConfig?.color || '#127049',
  })

  return (
    <div className={cx(containerStyle, className)}>
      {displayItems.map((item, i) => (
        <span key={i} className={variant === 'pills' ? pillStyle : badgeStyle}>
          {item.label}
        </span>
      ))}
    </div>
  )
}

export default TableCellBadgePills
