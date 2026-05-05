import React from 'react'
import { css, cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import type { TableHeaderCellProps } from './types'
import type { TableConfig } from '../../types/types'

/**
 * TableHeaderCell — Column header cell for the TDS Table.
 *
 * Types:
 * - default: Label with optional checkbox, leading/trailing icons, sort indicator
 * - loader: Skeleton placeholder for loading state
 *
 * Figma: "Table Header Cell" component set
 */
const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  type = 'default',
  label = 'NAME',
  showCheckbox = false,
  showLeadingIcon = false,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  checked = false,
  indeterminate = false,
  onCheckChange,
  onSort,
  className,
}) => {
  const { theme } = useTheme()
  const tableConfig = (theme?.components?.table || defaultThemeConfig.components.table) as TableConfig
  const hc = tableConfig.headerCell

  const containerStyle = css({
    display: 'flex',
    alignItems: 'center',
    gap: hc?.gap || '8px',
    padding: hc?.padding || '12px',
    backgroundColor: hc?.backgroundColor || '#F7F7F7',
    alignSelf: 'stretch',
    cursor: onSort ? 'pointer' : 'default',
  })

  // Loader variant
  if (type === 'loader') {
    const lc = hc?.loader
    return (
      <div className={cx(containerStyle, className)}>
        <div className={css({
          width: lc?.shortWidth || '16px',
          height: lc?.longHeight || '12px',
          borderRadius: lc?.borderRadius || '999px',
          backgroundColor: lc?.backgroundColor || '#DEDEDE',
        })} />
        <div className={css({
          flex: 1,
          height: lc?.longHeight || '12px',
          borderRadius: lc?.borderRadius || '999px',
          backgroundColor: lc?.backgroundColor || '#DEDEDE',
        })} />
      </div>
    )
  }

  const labelStyle = css({
    fontFamily: hc?.label?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: hc?.label?.fontSize || '12px',
    fontWeight: Number(hc?.label?.fontWeight) || 400,
    lineHeight: hc?.label?.lineHeight || '16px',
    color: hc?.label?.color || '#454545',
  })

  const checkboxSize = hc?.checkbox?.size || '16px'
  const checkboxStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: checkboxSize,
    height: checkboxSize,
    flexShrink: 0,
  })

  const checkboxInputStyle = css({
    width: checkboxSize,
    height: checkboxSize,
    margin: 0,
    cursor: 'pointer',
    accentColor: hc?.checkbox?.accentColor || '#000',
  })

  const iconStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: hc?.iconSize || '16px',
    height: hc?.iconSize || '16px',
    flexShrink: 0,
  })

  return (
    <div
      className={cx(containerStyle, className)}
      onClick={onSort}
      role={onSort ? 'button' : undefined}
      tabIndex={onSort ? 0 : undefined}
    >
      {showCheckbox && (
        <span className={checkboxStyle}>
          <input
            type="checkbox"
            checked={checked}
            ref={(el) => { if (el) el.indeterminate = !!indeterminate }}
            onChange={(e) => onCheckChange?.(e.target.checked)}
            className={checkboxInputStyle}
            onClick={(e) => e.stopPropagation()}
          />
        </span>
      )}
      {showLeadingIcon && leadingIcon && (
        <span className={iconStyle}>{leadingIcon}</span>
      )}
      <span className={labelStyle}>{label}</span>
      {showTrailingIcon && trailingIcon && (
        <span className={iconStyle}>{trailingIcon}</span>
      )}
    </div>
  )
}

export default TableHeaderCell
