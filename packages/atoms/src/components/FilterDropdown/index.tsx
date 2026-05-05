import React, { useState, useRef, useEffect, useCallback } from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Checkbox from '../Checkbox'
import Button from '../Button'
import { toCssDimension } from '../../utils/toCssDimension'
import { DropdownStateContext, useDropdownState } from './useDropdownState'
export type { SelectionValue } from './useDropdownState'

// ─── Search icon ──────────────────────────────────────────────────────────────
const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
)

// ─── Dimension helper ─────────────────────────────────────────────────────────
function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback
  return String(toCssDimension(v) ?? fallback)
}

// ─── Color helper — returns fallback if token is unresolved (still contains {{ }}) ──
function clr(v: string | undefined, fallback: string): string {
  if (!v || v.includes('{{')) return fallback
  return v
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterDropdownSize = 'sm' | 'lg'

export interface FilterOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface FilterDropdownProps {
  /** Placeholder shown in the trigger when nothing is committed */
  placeholder?: string
  /** List of filter options */
  options?: FilterOption[]
  /**
   * Pre-selected / externally committed values.
   * Seeds the committed state on mount and whenever it changes.
   */
  value?: (string | number)[]
  /**
   * Fired on every option click with the current in-panel selection.
   * - Single select: fires with the committed value immediately.
   * - Multi + no Apply: fires on each toggle (committed immediately).
   * - Multi + Apply: fires on each toggle (informational, not yet committed).
   */
  onChange?: (pending: (string | number)[]) => void
  /**
   * Fired when Apply is clicked with the confirmed selection.
   * Only relevant when `multiple` and `hasApply` are both true (the default).
   */
  onApply?: (confirmed: (string | number)[]) => void
  /** Size variant */
  size?: FilterDropdownSize
  /** Leading icon inside the trigger */
  leadingIcon?: React.ReactNode
  /** Trailing icon override (defaults to chevron) */
  trailingIcon?: React.ReactNode
  /** Disabled state */
  isDisabled?: boolean
  /** Ghost/skeleton state */
  isGhost?: boolean
  /** Max selected labels shown before overflow count pill */
  maxVisibleLabels?: number
  /** Label for the Apply button */
  applyLabel?: string
  /** Show a search input inside the panel to filter options */
  searchable?: boolean
  /** Placeholder for the search input */
  searchPlaceholder?: string
  /**
   * Allow selecting multiple options.
   * @default true
   */
  multiple?: boolean
  /**
   * When true (and multiple=true), selection stays in a "draft" state until
   * Apply is clicked. When false, each checkbox click commits immediately.
   * Has no effect when multiple=false (single select always commits immediately).
   * @default true
   */
  hasApply?: boolean
  className?: string
}

// ─── Chevrons ─────────────────────────────────────────────────────────────────
const ChevronDown = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
)
const ChevronUp = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
  </svg>
)

// ─── FilterDropdown ───────────────────────────────────────────────────────────

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  placeholder = 'Filter',
  options = [],
  value,
  onChange,
  onApply,
  size = 'lg',
  leadingIcon,
  trailingIcon,
  isDisabled = false,
  isGhost = false,
  maxVisibleLabels = 1,
  applyLabel = 'Apply',
  searchable = false,
  searchPlaceholder = 'Search',
  multiple = true,
  hasApply = true,
  className,
}) => {
  const { theme } = useTheme()
  const config = (theme.components as any)?.filterDropdown_tarmac ||
    (defaultThemeConfig.components as any)?.filterDropdown_tarmac || {}

  const base = config.base || {}
  const sc = config.sizes?.[size] || {}
  const defaultSt = config.states?.default || {}
  const hoverSt = config.states?.hover || {}
  const filteredSt = config.states?.filtered || {}
  const focusedSt = config.states?.focused || {}
  const disabledSt = config.states?.disabled || {}
  const ghostSt = config.states?.ghost || {}
  const listCfg = config.list || {}
  const pillCfg = config.overflowPill || {}
  const footerCfg = config.footer || {}
  const sdField = (theme.components as any)?.searchDropdown_tarmac?.searchField || {}

  // ── Selection state via shared hook ───────────────────────────────────────
  const state = useDropdownState({ value, onChange, onApply, multiple, hasApply })
  const { draftValue, committedValue, handleSelect, apply, discard, isOpen, setIsOpen } = state

  // ── UI-only state ─────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // ── Dismiss: close without applying ───────────────────────────────────────
  const dismiss = useCallback(() => {
    discard()
    setSearchQuery('')
  }, [discard])

  // Outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        dismiss()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, dismiss])

  // Focus search input when panel opens
  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 0)
    }
  }, [isOpen, searchable])

  // ── Toggle open/close ─────────────────────────────────────────────────────
  const toggle = useCallback(() => {
    if (isDisabled || isGhost) return
    if (isOpen) dismiss()
    else setIsOpen(true)
  }, [isDisabled, isGhost, isOpen, dismiss, setIsOpen])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
    else if (e.key === 'Escape' && isOpen) dismiss()
  }, [toggle, isOpen, dismiss])

  // ── Derived ───────────────────────────────────────────────────────────────
  const isFiltered = committedValue.length > 0
  const iconSize = parseInt(dim(sc.iconSize, size === 'lg' ? '20' : '16'), 10)

  const visibleOptions = searchable && searchQuery
    ? options.filter(o => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  const selectedLabels = committedValue
    .map(v => options.find(o => o.value === v)?.label)
    .filter(Boolean) as string[]
  const visibleLabels = selectedLabels.slice(0, maxVisibleLabels)
  const overflowCount = selectedLabels.length - visibleLabels.length

  // ── Ghost ─────────────────────────────────────────────────────────────────
  if (isGhost) {
    return (
      <div
        className={`${css({ position: 'relative', display: 'inline-flex', flexDirection: 'column', fontFamily: base.fontFamily || 'Noto Sans, sans-serif' })}${className ? ` ${className}` : ''}`}
        data-testid="filter-dropdown"
      >
        <div
          className={css({
            height: size === 'lg' ? '44px' : '36px',
            borderRadius: dim(base.borderRadius, '4px'),
            backgroundColor: ghostSt.backgroundColor || '#E6E6E6',
            minWidth: sc.minWidth || (size === 'lg' ? '140px' : '120px'),
            animation: 'pulse 1.5s ease-in-out infinite',
          })}
          data-testid="filter-dropdown-ghost"
        />
      </div>
    )
  }

  // ── Styles ────────────────────────────────────────────────────────────────
  const triggerBg = isFiltered ? clr(filteredSt.backgroundColor, '#D0D5E1') : clr(defaultSt.backgroundColor, '#ffffff')
  const triggerBorder = isFiltered ? clr(filteredSt.borderColor, '#98A2BC') : clr(defaultSt.borderColor, '#e6e6e6')
  // Active (open) and hover both show dark text (#2B2B2B); default shows placeholder grey (#808080)
  const triggerText = isFiltered
    ? clr(filteredSt.textColor, '#2b2b2b')
    : isOpen
      ? clr(hoverSt.textColor, '#2b2b2b')
      : clr(defaultSt.placeholderColor, '#808080')
  const triggerWeight = isFiltered ? (filteredSt.fontWeight || '600') : (defaultSt.fontWeight || '500')

  const containerCls = css({
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
  })

  const triggerCls = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    padding: sc.padding || (size === 'lg' ? '12px' : '8px 12px'),
    backgroundColor: isDisabled ? clr(disabledSt.backgroundColor, '#ffffff') : triggerBg,
    border: `${base.borderWidth || '1px'} solid ${isDisabled ? clr(disabledSt.borderColor, '#D9D9D9') : triggerBorder}`,
    borderRadius: isOpen
      ? `${dim(base.borderRadius, '4px')} ${dim(base.borderRadius, '4px')} 0 0`
      : dim(base.borderRadius, '4px'),
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    minWidth: sc.minWidth || (size === 'lg' ? '140px' : '120px'),
    transition: base.transition || 'border-color 0.15s ease, background-color 0.15s ease',
    '&:hover': {
      borderColor: isDisabled ? clr(disabledSt.borderColor, '#D9D9D9') : clr(hoverSt.borderColor, '#e6e6e6'),
    },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${focusedSt.focusRingColor || 'rgba(35,149,250,0.40)'}`,
    },
  })

  const labelTextCls = css({
    flex: '1 1 0',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: dim(sc.fontSize, size === 'lg' ? '14px' : '12px'),
    lineHeight: dim(sc.lineHeight, size === 'lg' ? '20px' : '16px'),
    fontWeight: isDisabled ? '500' : triggerWeight,
    color: isDisabled ? clr(disabledSt.textColor, '#CDCBCB') : triggerText,
  })

  const listPanelCls = css({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: listCfg.backgroundColor || '#ffffff',
    borderLeft: `${base.borderWidth || '1px'} solid ${listCfg.borderColor || '#e6e6e6'}`,
    borderRight: `${base.borderWidth || '1px'} solid ${listCfg.borderColor || '#e6e6e6'}`,
    borderBottom: `${base.borderWidth || '1px'} solid ${listCfg.borderColor || '#e6e6e6'}`,
    borderRadius: `0 0 ${dim(base.borderRadius, '4px')} ${dim(base.borderRadius, '4px')}`,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  })

  const listScrollCls = css({ overflowY: 'auto', maxHeight: '200px' })

  const cellCls = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    padding: sc.listCellPadding || (size === 'lg' ? '12px' : '8px 12px'),
    backgroundColor: listCfg.backgroundColor || '#ffffff',
    cursor: 'pointer',
    borderBottom: `${base.borderWidth || '1px'} solid ${listCfg.dividerColor || '#e6e6e6'}`,
    '&:last-child': { borderBottom: 'none' },
    '&:hover': { backgroundColor: listCfg.cellHoverColor || '#f7f7f7' },
  })

  const cellTextCls = css({
    flex: '1 1 0',
    fontSize: dim(sc.listFontSize, size === 'lg' ? '14px' : '12px'),
    lineHeight: dim(sc.listLineHeight, size === 'lg' ? '20px' : '16px'),
    fontWeight: 500,
    color: listCfg.textColor || '#2b2b2b',
  })

  const footerCls = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: footerCfg.padding || '8px 12px',
    borderTop: `${base.borderWidth || '1px'} solid ${footerCfg.borderColor || '#e6e6e6'}`,
  })

  const overflowPillCls = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: clr(pillCfg.backgroundColor, '#000000'),
    color: clr(pillCfg.textColor, '#ffffff'),
    fontSize: dim(pillCfg.fontSize, '12px'),
    lineHeight: dim(pillCfg.lineHeight, '16px'),
    fontWeight: 500,
    padding: pillCfg.padding || '4px 8px',
    borderRadius: pillCfg.borderRadius || '999px',
    flexShrink: 0,
  })

  const searchRowCls = css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: size === 'lg' ? '8px 12px' : '6px 12px',
    borderBottom: `1px solid ${listCfg.borderColor || '#e6e6e6'}`,
    backgroundColor: sdField.backgroundColor || '#ffffff',
    '& input': {
      flex: '1 0 0',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
      fontWeight: 500,
      fontSize: dim(sc.listFontSize, size === 'lg' ? '14px' : '12px'),
      lineHeight: dim(sc.listLineHeight, size === 'lg' ? '20px' : '16px'),
      color: sdField.textColor || '#2b2b2b',
      minWidth: 0,
      padding: 0,
    },
    '& input::placeholder': { color: sdField.placeholderColor || '#808080' },
  })

  const searchIconCls = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: sdField.iconColor || '#808080',
  })

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <DropdownStateContext.Provider value={state}>
      <div
        className={`${containerCls}${className ? ` ${className}` : ''}`}
        ref={containerRef}
        data-testid="filter-dropdown"
      >
        {/* Trigger — reflects committedValue only */}
        <div
          className={triggerCls}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          tabIndex={isDisabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={isDisabled}
          style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
          data-testid="filter-dropdown-trigger"
        >
          {leadingIcon && (
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: iconSize, height: iconSize }} data-testid="filter-dropdown-leading-icon">
              {leadingIcon}
            </span>
          )}

          {selectedLabels.length === 0
            ? <span className={labelTextCls} data-testid="filter-dropdown-placeholder">{placeholder}</span>
            : (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px', flex: '1 1 0', minWidth: 0, overflow: 'hidden' }} data-testid="filter-dropdown-selected">
                <span className={labelTextCls}>{visibleLabels.join(', ')}</span>
                {overflowCount > 0 && (
                  <span className={overflowPillCls} data-testid="filter-dropdown-overflow-count">
                    +{overflowCount}
                  </span>
                )}
              </div>
            )
          }

          <span
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: isDisabled ? clr(disabledSt.textColor, '#CDCBCB') : isFiltered ? clr(filteredSt.textColor, '#2b2b2b') : isOpen ? clr(hoverSt.textColor, '#2b2b2b') : clr(defaultSt.iconColor, '#808080') }}
            data-testid="filter-dropdown-chevron"
          >
            {trailingIcon ?? (isOpen ? <ChevronUp size={iconSize} /> : <ChevronDown size={iconSize} />)}
          </span>
        </div>

        {/* Panel — checkboxes reflect draftValue */}
        {isOpen && (
          <div className={listPanelCls} role="listbox" data-testid="filter-dropdown-panel">

            {searchable && (
              <div className={searchRowCls} data-testid="filter-dropdown-search-row">
                <span className={searchIconCls} aria-hidden="true">
                  <SearchIcon size={size === 'lg' ? 16 : 14} />
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Escape') dismiss() }}
                  data-testid="filter-dropdown-search-input"
                  aria-label={searchPlaceholder}
                />
              </div>
            )}

            <div className={listScrollCls}>
              {visibleOptions.map(option => (
                <div
                  key={String(option.value)}
                  className={cellCls}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  role="option"
                  aria-selected={draftValue.includes(option.value)}
                  aria-disabled={option.disabled}
                  data-testid={`filter-option-${option.value}`}
                >
                  {multiple && (
                    <Checkbox
                      tarmacVariant="standard"
                      tarmacStyle="box"
                      size={"sm"}
                      checked={draftValue.includes(option.value)}
                      disabled={option.disabled}
                      onChange={() => !option.disabled && handleSelect(option.value)}
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    />
                  )}
                  <span className={cellTextCls}>{option.label}</span>
                </div>
              ))}
              {visibleOptions.length === 0 && (
                <div
                  style={{ padding: sc.listCellPadding || '12px', textAlign: 'center', fontSize: dim(sc.listFontSize, '14px'), color: defaultSt.placeholderColor || '#808080' }}
                  data-testid="filter-dropdown-empty"
                >
                  {searchable && searchQuery ? 'No results found' : 'No options'}
                </div>
              )}
            </div>

            {/* Footer: only shown for multi-select with Apply */}
            {multiple && hasApply && (
              <div className={footerCls} data-testid="filter-dropdown-footer">
                <Button
                  buttonStyle="primary"
                  variant="black"
                  size={"sm"}
                  text={applyLabel}
                  onClick={apply}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </DropdownStateContext.Provider>
  )
}

export default FilterDropdown
