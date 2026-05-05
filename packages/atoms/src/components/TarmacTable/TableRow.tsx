import React from 'react'
import { css, cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Divider from '../Divider'
import type { TableRowProps } from './types'
import type { TableConfig } from '../../types/types'

function getConfig(theme: Record<string, unknown>): TableConfig {
  return (
    ((theme?.components as Record<string, unknown>)?.table as TableConfig) ||
    defaultThemeConfig?.components?.table ||
    {}
  )
}

const TableRow: React.FC<TableRowProps> = ({
  style = 'type1',
  cells,
  footerSlot,
  footerActions,
  showFooter = true,
  className,
  onClick,
}) => {
  const { theme } = useTheme()
  const cfg = getConfig(theme)
  const tr = cfg.tableRow || {}
  const ct = tr.container || {}
  const ft = tr.footer || {}
  const gh = tr.ghost || {}

  const isGhost = style === 'ghost'
  const hasFooter = showFooter && (footerSlot || footerActions || isGhost)

  // ── Shared styles (theme-driven) ──

  const outerWrapperCls = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: ct.backgroundColor,
    borderRadius: ct.borderRadius,
    width: '100%',
    boxSizing: 'border-box' as const,
  })

  const innerContainerCls = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: tr.innerGap,
    padding: tr.innerPadding,
    backgroundColor: ct.backgroundColor,
    border: `${ct.borderWidth} solid ${ct.borderColor}`,
    borderRadius: ct.borderRadius,
    width: '100%',
    boxSizing: 'border-box' as const,
  })

  const cellsRowCls = css({
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',
  })

  const footerCls = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: ft.backgroundColor,
    borderRadius: `0 0 ${ft.borderRadius} ${ft.borderRadius}`,
    width: '100%',
    boxSizing: 'border-box' as const,
  })

  const footerActionBarCls = css({
    display: 'flex',
    alignItems: 'center',
    padding: ft.actionBarPadding,
    gap: ft.actionBarGap,
    width: '100%',
    boxSizing: 'border-box' as const,
  })

  const footerSlotAreaCls = css({
    display: 'flex',
    alignItems: 'center',
    gap: ft.slotGap,
    flex: '1 0 0',
    minWidth: '1px',
  })

  const footerButtonsAreaCls = css({
    display: 'flex',
    alignItems: 'center',
    gap: ft.buttonsGap,
    flexShrink: 0,
  })

  // ── Ghost variant ──

  if (isGhost) {
    const ghostBar = (w: string, h: string) =>
      css({
        width: w,
        height: h,
        borderRadius: gh.barRadius,
        backgroundColor: gh.barColor,
        flexShrink: 0,
      })

    const ghostRect = (w: string, h: string) =>
      css({
        width: w,
        height: h,
        borderRadius: gh.rectRadius,
        backgroundColor: gh.rectColor,
        flexShrink: 0,
      })

    const ghostCellAddonCls = css({
      display: 'flex',
      alignItems: 'center',
      gap: gh.cellGap,
      padding: gh.cellPadding,
      flex: '1 0 0',
      minWidth: '1px',
      height: gh.cellHeight,
    })

    const ghostTextCellCls = css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: gh.textCellGap,
      padding: gh.textCellPadding,
      flex: '1 0 0',
      minWidth: '1px',
      height: '100%',
      backgroundColor: ct.backgroundColor,
    })

    const cellWrapperCls = css({
      display: 'flex',
      flex: '1 0 0',
      alignItems: 'center',
      alignSelf: 'stretch',
      minWidth: '1px',
    })

    return (
      <div className={cx(outerWrapperCls, className)} onClick={onClick} data-testid="table-row">
        <div className={innerContainerCls}>
          <div className={cellsRowCls}>
            <div className={ghostCellAddonCls}>
              <div className={css({ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' })}>
                <div className={ghostBar(gh.cellBarShortWidth || '54px', gh.cellBarShortHeight || '8px')} />
                <div className={ghostBar(gh.cellBarLongWidth || '137px', gh.cellBarLongHeight || '10px')} />
              </div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={cellWrapperCls}>
                <div className={ghostTextCellCls}>
                  <div className={ghostBar(gh.textBarShortWidth || '33px', gh.textBarShortHeight || '6px')} />
                  <div className={ghostBar(gh.textBarLongWidth || '83px', gh.textBarLongHeight || '8px')} />
                </div>
              </div>
            ))}
          </div>
          <Divider dividerType="dash" size="0.5" />
          <div className={footerCls}>
            <div className={footerActionBarCls}>
              <div className={footerSlotAreaCls} />
              <div className={footerButtonsAreaCls}>
                <div className={ghostRect(gh.buttonWidth || '71px', gh.buttonHeight || '36px')} />
                <div className={ghostRect(gh.buttonWidth || '71px', gh.buttonHeight || '36px')} />
                <div className={ghostRect(gh.iconButtonSize || '36px', gh.iconButtonSize || '36px')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Default / Type 1 / Type 2 / Type 3 ──

  return (
    <div className={cx(outerWrapperCls, className)} onClick={onClick} data-testid="table-row">
      <div className={innerContainerCls}>
        <div className={cellsRowCls}>{cells}</div>
        {hasFooter && (
          <>
            <Divider dividerType="dash" size="0.5" />
            <div className={footerCls}>
              <div className={footerActionBarCls}>
                <div className={footerSlotAreaCls}>
                  {footerSlot}
                </div>
                {footerActions && (
                  <div className={footerButtonsAreaCls}>{footerActions}</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TableRow
