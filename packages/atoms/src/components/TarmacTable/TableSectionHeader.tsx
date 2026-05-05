import React from 'react'
import { css, cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import type { TableSectionHeaderProps } from './types'
import type { TableConfig } from '../../types/types'

const TableSectionHeader: React.FC<TableSectionHeaderProps> = ({
  type = 'default',
  title = 'Title here',
  subtext,
  showLeadingIcon = false,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  badges,
  actions,
  slotContent,
  className,
}) => {
  const { theme } = useTheme()
  const tableConfig = (theme?.components?.table || defaultThemeConfig.components.table) as TableConfig
  const sh = tableConfig.sectionHeader
  const ct = sh?.container
  const tt = sh?.title
  const st = sh?.subtext
  const gh = sh?.ghost

  const containerStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: ct?.padding || '12px',
    backgroundColor: ct?.backgroundColor || 'white',
    borderTopLeftRadius: ct?.borderRadius || '8px',
    borderTopRightRadius: ct?.borderRadius || '8px',
    width: '100%',
    boxSizing: 'border-box',
  })

  if (type === 'ghost') {
    const barRadius = gh?.barRadius || '999px'
    const rectRadius = gh?.rectRadius || '4px'
    const barColor = gh?.barColor || '#e6e6e6'
    const rectColor = gh?.rectColor || '#dedede'

    return (
      <div className={cx(containerStyle, className)} data-testid="table-section-header">
        <div className={css({ display: 'flex', alignItems: 'center', gap: sh?.sectionGap || '16px', flexShrink: 0 })}>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' })}>
            <div className={css({ width: gh?.titleBarWidth || '55px', height: gh?.titleBarHeight || '12px', borderRadius: barRadius, backgroundColor: barColor })} />
            <div className={css({ width: gh?.subtextBarWidth || '104px', height: gh?.subtextBarHeight || '8px', borderRadius: barRadius, backgroundColor: barColor })} />
          </div>
          <div className={css({ display: 'flex', gap: sh?.badgesGap || '6px', alignItems: 'center' })}>
            <div className={css({ width: gh?.badgeWidth || '53px', height: gh?.badgeHeight || '20px', borderRadius: rectRadius, backgroundColor: barColor })} />
          </div>
        </div>
        <div className={css({ display: 'flex', gap: sh?.actionsGap || '8px', alignItems: 'center' })}>
          <div className={css({ width: '63px', height: '20px', borderRadius: rectRadius, backgroundColor: rectColor })} />
          <div className={css({ width: gh?.buttonWidth || '71px', height: gh?.buttonHeight || '36px', borderRadius: rectRadius, backgroundColor: rectColor })} />
          <div className={css({ width: gh?.buttonWidth || '71px', height: gh?.buttonHeight || '36px', borderRadius: rectRadius, backgroundColor: rectColor })} />
          <div className={css({ width: '36px', height: '36px', borderRadius: rectRadius, backgroundColor: rectColor })} />
        </div>
      </div>
    )
  }

  const titleStyle = css({
    fontFamily: tt?.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(tt?.fontWeight) || 500,
    fontSize: tt?.fontSize || '16px',
    lineHeight: tt?.lineHeight || '24px',
    color: tt?.color || '#121212',
  })

  const subtextStyle = css({
    fontFamily: st?.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(st?.fontWeight) || 400,
    fontSize: st?.fontSize || '14px',
    lineHeight: st?.lineHeight || '20px',
    color: st?.color || '#2b2b2b',
  })

  const iconSize = sh?.iconSize || '24px'
  const iconContainerStyle = css({
    width: iconSize,
    height: iconSize,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  })

  return (
    <div className={cx(containerStyle, className)} data-testid="table-section-header">
      <div className={css({ display: 'flex', alignItems: 'center', gap: sh?.sectionGap || '16px', flexShrink: 0 })}>
        <div className={css({ display: 'flex', gap: sh?.iconGap || '4px', alignItems: 'flex-start', flexShrink: 0 })}>
          {showLeadingIcon && leadingIcon && <div className={iconContainerStyle}>{leadingIcon}</div>}
          <div className={css({ display: 'flex', flexDirection: 'column', gap: sh?.titlesGap || '2px', alignItems: 'flex-start', flexShrink: 0, whiteSpace: 'nowrap' })}>
            <span className={titleStyle}>{title}</span>
            {subtext && <span className={subtextStyle}>{subtext}</span>}
          </div>
          {showTrailingIcon && trailingIcon && <div className={iconContainerStyle}>{trailingIcon}</div>}
        </div>
        {badges && <div className={css({ display: 'flex', gap: sh?.badgesGap || '6px', alignItems: 'center', flexShrink: 0 })}>{badges}</div>}
      </div>
      {type === 'slots' && slotContent ? (
        <div className={css({ flex: '1 0 0', minWidth: '1px', alignSelf: 'stretch', display: 'flex', alignItems: 'center' })}>{slotContent}</div>
      ) : (
        actions && <div className={css({ display: 'flex', gap: sh?.actionsGap || '8px', alignItems: 'center', flexShrink: 0 })}>{actions}</div>
      )}
    </div>
  )
}

export default TableSectionHeader
