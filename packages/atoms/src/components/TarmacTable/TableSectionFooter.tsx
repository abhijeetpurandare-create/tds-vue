import React from 'react'
import { css, cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import type { TableSectionFooterProps } from './types'
import type { TableConfig } from '../../types/types'

const TableSectionFooter: React.FC<TableSectionFooterProps> = ({
  type = 'default',
  variant = '2-ctas',
  actions,
  slotContent,
  tabs,
  className,
}) => {
  const { theme } = useTheme()
  const tableConfig = (theme?.components?.table || defaultThemeConfig.components.table) as TableConfig
  const sf = tableConfig.sectionFooter
  const ct = sf?.container
  const ab = sf?.actionBar
  const tb = sf?.tabs
  const gh = sf?.ghost

  const isGhost = type === 'ghost' || variant === 'ghost'
  const hasSlot = variant?.includes('slot')
  const hasTabs = tabs && tabs.length > 0

  const containerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: ct?.backgroundColor || 'white',
    borderBottomLeftRadius: ct?.borderRadius || '8px',
    borderBottomRightRadius: ct?.borderRadius || '8px',
    width: '100%',
    boxSizing: 'border-box',
  })

  if (isGhost) {
    const rectRadius = gh?.rectRadius || '4px'
    const rectColor = gh?.rectColor || '#dedede'
    const btnW = gh?.buttonWidth || '71px'
    const btnH = gh?.buttonHeight || '36px'
    const iconSize = gh?.iconButtonSize || '36px'

    return (
      <div className={cx(containerStyle, className)} data-testid="table-section-footer">
        <div className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: ab?.padding || '12px',
          width: '100%',
          boxSizing: 'border-box',
          gap: ab?.gap || '24px',
        })}>
          <div className={css({ display: 'flex', gap: sf?.buttonsGap || '8px', alignItems: 'center', flexShrink: 0 })}>
            <div className={css({ width: btnW, height: btnH, borderRadius: rectRadius, backgroundColor: rectColor, flexShrink: 0 })} />
            <div className={css({ width: btnW, height: btnH, borderRadius: rectRadius, backgroundColor: rectColor, flexShrink: 0 })} />
            <div className={css({ width: btnW, height: btnH, borderRadius: rectRadius, backgroundColor: rectColor, flexShrink: 0 })} />
            <div className={css({ width: iconSize, height: iconSize, borderRadius: rectRadius, backgroundColor: rectColor, flexShrink: 0 })} />
          </div>
        </div>
      </div>
    )
  }

  const actionBarStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: hasSlot ? 'flex-start' : 'flex-end',
    padding: ab?.padding || '12px',
    width: '100%',
    boxSizing: 'border-box',
    gap: ab?.gap || '24px',
  })

  const buttonsStyle = css({
    display: 'flex',
    gap: sf?.buttonsGap || '8px',
    alignItems: 'center',
    flexShrink: 0,
  })

  const slotStyle = css({
    flex: '1 0 0',
    minWidth: '1px',
    height: sf?.slotHeight || '36px',
  })

  return (
    <div className={cx(containerStyle, className)} data-testid="table-section-footer">
      <div className={actionBarStyle}>
        {hasSlot && <div className={slotStyle}>{slotContent}</div>}
        {actions && <div className={buttonsStyle}>{actions}</div>}
      </div>
      {hasTabs && (
        <div className={css({
          display: 'flex',
          alignItems: 'center',
          padding: tb?.padding || '8px',
          width: '100%',
          boxSizing: 'border-box',
        })}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => tab.onClick(tab.key)}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: tb?.cellPadding || '8px 12px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                border: 'none',
                borderBottom: tab.active
                  ? `${tb?.activeBorderWidth || '2px'} solid ${tb?.activeBorderColor || '#1a1a1a'}`
                  : 'none',
                fontFamily: tb?.fontFamily || 'Noto Sans, sans-serif',
                fontWeight: tab.active
                  ? Number(tb?.activeFontWeight) || 600
                  : Number(tb?.fontWeight) || 500,
                fontSize: tb?.fontSize || '12px',
                lineHeight: tb?.lineHeight || '16px',
                color: tb?.textColor || '#2b2b2b',
              })}
            >
              <span style={{ padding: '4px 0' }}>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TableSectionFooter
