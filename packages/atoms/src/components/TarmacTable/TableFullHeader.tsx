import React from 'react'
import { css, cx } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import type { TableConfig } from '../../types/types'
import Button from '../Button'
import Chip from '../Chip'

// ============================================
// Types
// ============================================

export interface TableFullHeaderTab {
  key: string
  label: React.ReactNode
  active?: boolean
  onClick: (key: string) => void
}

export interface TableFullHeaderSearch {
  placeholder?: string
  value?: string
  onChange: (value: string) => void
}

export interface TableFullHeaderFilter {
  label: string
  expanded?: boolean
  onToggle: (index: number) => void
}

export interface TableFullHeaderAction {
  label?: string
  variant: 'primary' | 'secondary' | 'icon'
  onClick: () => void
  icon?: React.ReactNode
}

export interface TableFullHeaderProps {
  title?: string
  subtext?: string
  showLeadingIcon?: boolean
  showTrailingIcon?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  badges?: React.ReactNode
  sectionActions?: React.ReactNode
  tabsTop?: TableFullHeaderTab[]
  tabsBottom?: TableFullHeaderTab[]
  snackbar?: React.ReactNode
  search?: TableFullHeaderSearch
  filters?: TableFullHeaderFilter[]
  actions?: TableFullHeaderAction[]
  isGhost?: boolean
  className?: string
}

// ============================================
// Icons
// ============================================

const SearchIcon: React.FC<{ size?: string }> = ({ size = '20' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
    <line x1="13.5" y1="13.5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ChevronDownIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 5.73L8 10.67L12 5.73" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ============================================
// Component
// ============================================

const TableFullHeader: React.FC<TableFullHeaderProps> = ({
  title = 'Title here',
  subtext,
  showLeadingIcon = false,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  badges,
  sectionActions,
  tabsTop,
  tabsBottom,
  snackbar,
  search,
  filters,
  actions,
  isGhost = false,
  className,
}) => {
  const { theme } = useTheme()
  const tableConfig = (theme.components?.table || defaultThemeConfig.components.table) as TableConfig
  const th = tableConfig.tableHeader
  const sh = th?.sectionHeader
  const gh = th?.ghost
  const tabs = th?.tabs
  const sr = th?.search
  const ab = th?.actionBar

  const hasTabsTop = tabsTop && tabsTop.length > 0
  const hasTabsBottom = tabsBottom && tabsBottom.length > 0
  const hasSearch = !!search
  const hasFilters = filters && filters.length > 0
  const hasActions = actions && actions.length > 0
  const hasActionBar = hasSearch || hasFilters || hasActions
  const hasSectionHeader = title || subtext || badges || sectionActions

  const cappedFilters = hasFilters ? filters!.slice(0, 5) : []
  const cappedActions = hasActions ? actions!.slice(0, 3) : []

  // ── Container ──
  const containerCls = css({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: th?.container?.backgroundColor,
    borderTopLeftRadius: th?.container?.borderRadius,
    borderTopRightRadius: th?.container?.borderRadius,
    width: '100%',
    boxSizing: 'border-box',
  })

  // ── Section header row ──
  const sectionHeaderCls = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: sh?.padding,
  })

  const headingAreaCls = css({
    display: 'flex',
    alignItems: 'center',
    gap: sh?.gap,
    flexShrink: 0,
  })

  const titlesContainerCls = css({
    display: 'flex',
    gap: sh?.titlesContainerGap,
    alignItems: 'flex-start',
    flexShrink: 0,
  })

  const titlesCls = css({
    display: 'flex',
    flexDirection: 'column',
    gap: sh?.titlesGap,
    whiteSpace: 'nowrap',
  })

  const titleTextCls = css({
    fontFamily: sh?.titleFontFamily,
    fontWeight: sh?.titleFontWeight,
    fontSize: sh?.titleFontSize,
    lineHeight: sh?.titleLineHeight,
    color: sh?.titleColor,
  })

  const subtextCls = css({
    fontFamily: sh?.subtextFontFamily,
    fontWeight: sh?.subtextFontWeight,
    fontSize: sh?.subtextFontSize,
    lineHeight: sh?.subtextLineHeight,
    color: sh?.subtextColor,
  })

  const iconContainerCls = css({
    width: sh?.iconSize,
    height: sh?.iconSize,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  })

  const badgesCls = css({
    display: 'flex',
    gap: sh?.badgesGap,
    alignItems: 'center',
    flexShrink: 0,
  })

  const sectionActionsCls = css({
    display: 'flex',
    gap: sh?.actionsGap,
    alignItems: 'center',
    flexShrink: 0,
  })

  // ── Tab group ──
  const tabGroupCls = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: tabs?.groupPadding,
  })

  const tabCellCls = css({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: tabs?.padding,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontFamily: tabs?.fontFamily,
    fontWeight: tabs?.inactiveFontWeight,
    fontSize: tabs?.fontSize,
    lineHeight: tabs?.lineHeight,
    color: tabs?.inactiveTextColor,
  })

  const tabCellActiveCls = css({
    fontWeight: tabs?.activeFontWeight,
    color: tabs?.activeTextColor,
    borderBottom: `${tabs?.activeBorderWidth ?? '2px'} solid ${tabs?.activeBorderColor ?? 'transparent'}`,
  })

  // ── Action bar ──
  const actionBarCls = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    padding: ab?.padding,
    gap: ab?.gap,
  })

  const searchFiltersCls = css({
    display: 'flex',
    alignItems: 'center',
    gap: ab?.itemGap,
    flex: '1 0 0',
  })

  const searchFieldCls = css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: sr?.padding,
    border: `${sr?.borderWidth ?? '1px'} solid ${sr?.borderColor ?? 'transparent'}`,
    borderRadius: sr?.borderRadius,
    backgroundColor: sr?.backgroundColor,
    fontSize: sr?.fontSize,
    lineHeight: sr?.lineHeight,
    color: sr?.textColor,
    fontFamily: sr?.fontFamily,
    outline: 'none',
    width: sr?.width,
    boxSizing: 'border-box' as const,
    '&::placeholder': {
      color: sr?.placeholderColor,
    },
  })

  const actionButtonsCls = css({
    display: 'flex',
    gap: ab?.itemGap,
    alignItems: 'center',
    flexShrink: 0,
  })

  // ── Ghost helpers (theme-driven) ──
  const ghostPill = (w: string, h: string) =>
    css({ width: w, height: h, borderRadius: gh?.pillRadius, backgroundColor: gh?.pillColor, flexShrink: 0 })

  const ghostRect = (w: string, h: string) =>
    css({ width: w, height: h, borderRadius: gh?.rectRadius, backgroundColor: gh?.rectColor, flexShrink: 0 })

  // ── Ghost state ──
  if (isGhost) {
    return (
      <div className={cx(containerCls, className)} data-testid="table-full-header">
        <div className={sectionHeaderCls}>
          <div className={headingAreaCls}>
            <div className={titlesContainerCls}>
              <div className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
                <div className={ghostPill('55px', '12px')} />
                <div className={ghostPill('104px', '8px')} />
              </div>
            </div>
            <div className={badgesCls}>
              <div className={ghostRect('53px', '20px')} />
            </div>
          </div>
          <div className={sectionActionsCls}>
            <div className={ghostRect('63px', '20px')} />
            <div className={ghostRect('71px', '36px')} />
            <div className={ghostRect('71px', '36px')} />
            <div className={ghostRect('36px', '36px')} />
          </div>
        </div>
        <div className={actionBarCls}>
          <div className={searchFiltersCls}>
            <div className={ghostRect(sr?.width ?? '208px', '36px')} />
            <div className={ghostRect('100px', '36px')} />
            <div className={ghostRect('100px', '36px')} />
          </div>
          <div className={actionButtonsCls}>
            <div className={ghostRect('71px', '36px')} />
            <div className={ghostRect('71px', '36px')} />
            <div className={ghostRect('36px', '36px')} />
          </div>
        </div>
      </div>
    )
  }

  // ── Render tab group ──
  const renderTabGroup = (tabItems: TableFullHeaderTab[]) => (
    <div className={tabGroupCls} data-testid="tab-group">
      {tabItems.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={cx(tabCellCls, tab.active && tabCellActiveCls)}
          data-testid="tab-cell"
          onClick={() => tab.onClick(tab.key)}
        >
          <span style={{ padding: '4px 0' }}>{tab.label}</span>
        </button>
      ))}
    </div>
  )

  // ── Render action bar ──
  const actionBar = hasActionBar ? (
    <div className={actionBarCls} data-testid="action-bar">
      <div className={searchFiltersCls}>
        {hasSearch && (
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }} data-testid="search-field">
            <span style={{ position: 'absolute', left: '8px', display: 'flex', pointerEvents: 'none', color: sr?.placeholderColor }}>
              <SearchIcon size={sr?.iconSize} />
            </span>
            <input
              className={searchFieldCls}
              style={{ paddingLeft: '32px' }}
              placeholder={search!.placeholder ?? 'Search'}
              value={search!.value ?? ''}
              onChange={(e) => search!.onChange(e.target.value)}
            />
          </div>
        )}
        {cappedFilters.map((filter, index) => (
          <span
            key={index}
            data-testid="filter-dropdown"
            onClick={() => filter.onToggle(index)}
          >
            <Chip
              chipType={filter.expanded ? 'blue' : 'white'}
              chipVariant="outlined"
              size="sm"
              text={filter.label}
              trailingIcon={<ChevronDownIcon />}
            />
          </span>
        ))}
      </div>
      {cappedActions.length > 0 && (
        <div className={actionButtonsCls}>
          {cappedActions.map((action, index) => {
            if (action.variant === 'icon') {
              return (
                <span key={index} data-testid="action-button">
                  <Button
                    variant="info"
                    buttonStyle="tertiary"
                    buttonType="iconButton"
                    size="sm"
                    onClick={action.onClick}
                    leadingIcon={action.icon}
                  />
                </span>
              )
            }
            return (
              <span key={index} data-testid="action-button">
                <Button
                  variant="black"
                  buttonStyle={action.variant === 'primary' ? 'primary' : 'secondary'}
                  size="sm"
                  text={action.label}
                  onClick={action.onClick}
                  leadingIcon={action.icon}
                />
              </span>
            )
          })}
        </div>
      )}
    </div>
  ) : null

  return (
    <div className={cx(containerCls, className)} data-testid="table-full-header">
      {hasSectionHeader && (
        <div className={sectionHeaderCls} data-testid="section-header">
          <div className={headingAreaCls}>
            <div className={titlesContainerCls}>
              {showLeadingIcon && leadingIcon && (
                <div className={iconContainerCls}>{leadingIcon}</div>
              )}
              <div className={titlesCls}>
                {title && <span className={titleTextCls}>{title}</span>}
                {subtext && <span className={subtextCls}>{subtext}</span>}
              </div>
              {showTrailingIcon && trailingIcon && (
                <div className={iconContainerCls}>{trailingIcon}</div>
              )}
            </div>
            {badges && <div className={badgesCls}>{badges}</div>}
          </div>
          {sectionActions && <div className={sectionActionsCls}>{sectionActions}</div>}
        </div>
      )}
      {hasTabsTop && renderTabGroup(tabsTop!)}
      {snackbar}
      {actionBar}
      {hasTabsBottom && renderTabGroup(tabsBottom!)}
    </div>
  )
}

export default TableFullHeader
