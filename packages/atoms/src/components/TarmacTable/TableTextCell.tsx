import React from 'react'
import { css, cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import type { TableTextCellProps } from './types'
import type { TableConfig } from '../../types/types'

/**
 * TableTextCell — The most fundamental cell in the TDS Table system.
 *
 * Variants:
 * - texts: Title with optional subtext top/bottom
 * - textsIcons: Title + subtexts with optional leading/trailing icons per line
 * - ghost: Loading skeleton placeholder
 *
 * Figma: "Table Text Cells" component set
 */
const TableTextCell: React.FC<TableTextCellProps> = ({
  variant = 'texts',
  title,
  subtextTop,
  subtextBottom,
  showTitle = true,
  showSubtextTop = true,
  showSubtextBottom = false,
  leadingIcon,
  trailingIcon,
  leadingSubtextIcon,
  trailingSubtextIcon,
  className,
}) => {
  const { theme } = useTheme()
  const tableConfig = (theme?.components?.table || defaultThemeConfig.components.table) as TableConfig
  const tc = tableConfig.textCell

  const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: tc?.container?.gap || '2px',
    padding: tc?.container?.padding || '8px 12px',
    flex: '1 0 0',
    alignSelf: 'stretch',
  })

  // Ghost variant — skeleton placeholders
  if (variant === 'ghost') {
    const gc = tc?.ghost
    return (
      <div className={cx(containerStyle, className)}>
        <div className={css({
          width: gc?.shortWidth || '33px',
          height: gc?.shortHeight || '6px',
          borderRadius: gc?.borderRadius || '999px',
          backgroundColor: gc?.backgroundColor || '#E6E6E6',
        })} />
        <div className={css({
          width: gc?.longWidth || '83px',
          height: gc?.longHeight || '8px',
          borderRadius: gc?.borderRadius || '999px',
          backgroundColor: gc?.backgroundColor || '#E6E6E6',
        })} />
      </div>
    )
  }

  const isIconVariant = variant === 'textsIcons'

  const titleStyle = css({
    fontFamily: tc?.title?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: tc?.title?.fontSize || '14px',
    fontWeight: Number(tc?.title?.fontWeight) || 500,
    lineHeight: tc?.title?.lineHeight || '20px',
    color: tc?.title?.color || '#2B2B2B',
  })

  const subtextStyle = css({
    fontFamily: tc?.subtext?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: tc?.subtext?.fontSize || '12px',
    fontWeight: Number(tc?.subtext?.fontWeight) || 300,
    lineHeight: tc?.subtext?.lineHeight || '16px',
    color: tc?.subtext?.color || '#454545',
  })

  const iconSmStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tc?.icon?.smSize || '16px',
    height: tc?.icon?.smSize || '16px',
    flexShrink: 0,
  })

  const iconMdStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: tc?.icon?.mdSize || '20px',
    height: tc?.icon?.mdSize || '20px',
    flexShrink: 0,
  })

  const rowStyle = css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  })

  return (
    <div className={cx(containerStyle, className)}>
      {showSubtextTop && subtextTop && (
        <div className={isIconVariant ? rowStyle : undefined}>
          {isIconVariant && leadingSubtextIcon && (
            <span className={iconSmStyle}>{leadingSubtextIcon}</span>
          )}
          <span className={subtextStyle}>{subtextTop}</span>
          {isIconVariant && trailingSubtextIcon && (
            <span className={iconSmStyle}>{trailingSubtextIcon}</span>
          )}
        </div>
      )}

      {showTitle && title && (
        <div className={isIconVariant ? rowStyle : undefined}>
          {isIconVariant && leadingIcon && (
            <span className={iconMdStyle}>{leadingIcon}</span>
          )}
          <span className={titleStyle}>{title}</span>
          {isIconVariant && trailingIcon && (
            <span className={iconMdStyle}>{trailingIcon}</span>
          )}
        </div>
      )}

      {showSubtextBottom && subtextBottom && (
        <div className={isIconVariant ? rowStyle : undefined}>
          {isIconVariant && leadingSubtextIcon && (
            <span className={iconSmStyle}>{leadingSubtextIcon}</span>
          )}
          <span className={subtextStyle}>{subtextBottom}</span>
          {isIconVariant && trailingSubtextIcon && (
            <span className={iconSmStyle}>{trailingSubtextIcon}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default TableTextCell
