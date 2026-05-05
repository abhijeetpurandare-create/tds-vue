import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Checkbox from '../Checkbox'
import Pill from '../Pill'
import Button from '../Button'
import {
  SearchDropdownTarmacConfig,
  SearchDropdownStyleParams,
  SearchCellStyleParams,
  buildContainerStyles,
  buildSearchFieldStyles,
  buildInputRowStyles,
  buildIconContainerStyles,
  buildTagsContainerStyles,
  buildGhostSkeletonStyles,
  buildSearchCellStyles,
  buildCellTextContainerStyles,
  buildListPanelStyles,
  buildTagsRowStyles,
  buildSectionHeaderStyles,
  buildSearchHistoryLabelStyles,
  buildDividerStyles,
  buildListFooterStyles,
} from './useSearchDropdownStyles'

// ─── Open Union Types ────────────────────────────────────────────────────────

export type SearchDropdownSize = 'sm' | 'md' | 'lg' | (string & {})
export type SearchDropdownFieldVariant = 'standard' | 'withTags' | (string & {})
export type SearchDropdownCellStyle = 'regular' | 'blue' | (string & {})
export type SearchDropdownListVariant = 'listSet1' | 'listSet2' | (string & {})
export type SearchDropdownStyle = 'tarmac-01' | (string & {})

// ─── Option Interface ────────────────────────────────────────────────────────

export interface SearchDropdownOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
  description?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  showCheckbox?: boolean
  cellStyle?: SearchDropdownCellStyle
}

// ─── Tag Interface ───────────────────────────────────────────────────────────

export interface SearchDropdownTag {
  id: string
  label: string
  onRemove?: () => void
}

// ─── Props Interface ─────────────────────────────────────────────────────────

export interface SearchDropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  searchDropdownStyle?: SearchDropdownStyle
  fieldVariant?: SearchDropdownFieldVariant
  size?: SearchDropdownSize
  isDisabled?: boolean
  isGhost?: boolean
  placeholder?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  tags?: SearchDropdownTag[]
  options?: SearchDropdownOption[]
  value?: string | number
  onSelect?: (value: string | number) => void
  searchValue?: string
  onSearch?: (value: string) => void
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  listVariant?: SearchDropdownListVariant
  maxVisibleItems?: number
  searchHistoryLabel?: string
  searchHistoryIcon?: React.ReactNode
  showFooter?: boolean
  ctaActions?: React.ReactNode
  onAddNew?: () => void
  onCancel?: () => void
  onAction?: () => void
  onClearTags?: () => void
  className?: string
}

// ─── Default Search Icon ─────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
)

// ─── Add Circle Icon (add-circle-outline ⊕) ─────────────────────────────────

const AddCircleIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.667A8.336 8.336 0 0 0 1.667 10c0 4.6 3.733 8.333 8.333 8.333S18.333 14.6 18.333 10 14.6 1.667 10 1.667Zm5 9.166h-4.167V15H9.167v-4.167H5V9.167h4.167V5h1.666v4.167H15v1.666Z" />
  </svg>
)

// ─── Close Circle Icon (highlight-off ⊗) ─────────────────────────────────────

const CloseCircleIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.667A8.336 8.336 0 0 0 1.667 10c0 4.6 3.733 8.333 8.333 8.333S18.333 14.6 18.333 10 14.6 1.667 10 1.667Zm4.167 11.316-1.184 1.184L10 11.183l-2.983 2.984-1.184-1.184L8.817 10 5.833 7.017l1.184-1.184L10 8.817l2.983-2.984 1.184 1.184L11.183 10l2.984 2.983Z" />
  </svg>
)

// ─── Default Theme Config (minimal fallback) ────────────────────────────────

const emptyConfig: SearchDropdownTarmacConfig = {
  base: {}, searchField: {}, searchCell: { styles: {}, sizes: {} },
  list: {}, tagsRow: {}, sectionHeader: {}, searchHistoryLabel: {},
  divider: {}, footer: {}, states: {},
}

// ─── TarmacSearchCell ────────────────────────────────────────────────────────

const TarmacSearchCell: React.FC<{
  option: SearchDropdownOption
  isSelected: boolean
  cellStyle: string
  size: string
  config: SearchDropdownTarmacConfig
  onClick?: () => void
  isFocused?: boolean
}> = ({ option, isSelected, cellStyle, size, config, onClick, isFocused }) => {
  const cp: SearchCellStyleParams = { config, cellStyle, size, isSelected, isDisabled: !!option.disabled }
  const cellCls = buildSearchCellStyles(cp)
  const textCls = buildCellTextContainerStyles(cp)
  const iconSize = config.searchCell?.sizes?.[size]?.iconSize

  return (
    <div
      className={cellCls}
      role="option"
      aria-selected={isSelected}
      aria-disabled={!!option.disabled}
      id={`search-cell-${option.value}`}
      data-testid="tarmac-search-cell"
      data-focused={isFocused || undefined}
      onClick={!option.disabled ? onClick : undefined}
      style={isFocused ? { outline: '2px solid currentColor', outlineOffset: '-2px' } : undefined}
    >
      {option.showCheckbox && (
        <span onClick={e => e.stopPropagation()} style={{ display: 'inline-flex', flexShrink: 0 }}>
          <Checkbox
            tarmacVariant="standard"
            tarmacStyle="box"
            size="md"
            checked={isSelected}
            disabled={option.disabled}
            onChange={() => { if (onClick) onClick() }}
          />
        </span>
      )}
      {option.leadingIcon && (
        <span style={{ display: 'inline-flex', flexShrink: 0, width: iconSize, height: iconSize, color: config.searchCell?.styles?.[cellStyle]?.iconColor }} data-testid="cell-leading-icon">
          {option.leadingIcon}
        </span>
      )}
      <div className={textCls}>
        <span>{option.label}</span>
        {option.description && <span data-testid="cell-description">{option.description}</span>}
      </div>
      {option.trailingIcon && (
        <span style={{ display: 'inline-flex', flexShrink: 0, width: iconSize, height: iconSize, color: config.searchCell?.styles?.[cellStyle]?.iconColor }} data-testid="cell-trailing-icon">
          {option.trailingIcon}
        </span>
      )}
    </div>
  )
}

// ─── TarmacSearchDropdown ────────────────────────────────────────────────────

const TarmacSearchDropdown: React.FC<SearchDropdownProps> = (props) => {
  const {
    fieldVariant = 'standard', size = 'md',
    isDisabled = false, isGhost = false,
    placeholder: placeholderProp, leadingIcon, trailingIcon: trailingIconProp,
    tags, options = [], value, onSelect,
    searchValue: controlledSearch, onSearch,
    isOpen: controlledOpen, onOpenChange,
    listVariant = 'listSet1', maxVisibleItems = 5,
    searchHistoryLabel, searchHistoryIcon,
    showFooter = false, ctaActions, onAddNew, onCancel, onAction,
    onClearTags,
    className, ...rest
  } = props

  const { theme } = useTheme()
  const config = (theme.components?.searchDropdown_tarmac ||
    (defaultThemeConfig.components as any)?.searchDropdown_tarmac || emptyConfig) as SearchDropdownTarmacConfig

  // Resolve placeholder: withTags with tags defaults to "..", standard defaults to "Search"
  const placeholder = placeholderProp !== undefined ? placeholderProp : (fieldVariant === 'withTags' && tags?.length ? '..' : 'Search')

  // Resolve trailing icon: default to CloseCircleIcon for withTags variant
  const trailingIcon = trailingIconProp !== undefined ? trailingIconProp : (fieldVariant === 'withTags' ? <CloseCircleIcon /> : undefined)

  // State
  const [internalOpen, setInternalOpen] = useState(false)
  const [internalSearch, setInternalSearch] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(() => {
    if (value === undefined) return []
    return Array.isArray(value) ? value : [value]
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const searchVal = controlledSearch !== undefined ? controlledSearch : internalSearch

  const setOpen = (v: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(v)
    onOpenChange?.(v)
    if (!v) { setInternalSearch(''); setFocusedIndex(-1) }
  }

  // Sync selectedValues with value prop
  useEffect(() => {
    if (value === undefined) setSelectedValues([])
    else setSelectedValues(Array.isArray(value) ? value : [value])
  }, [value])

  const isOptionSelected = (v: string | number) => selectedValues.includes(v)

  // Click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Filter options
  const filteredOptions = searchVal
    ? options.filter(o => o.label.toLowerCase().includes(searchVal.toLowerCase()))
    : options

  // Group options
  const groupedOptions: { name: string; options: SearchDropdownOption[] }[] = []
  const ungrouped: SearchDropdownOption[] = []
  filteredOptions.forEach(o => {
    if (o.group) {
      const g = groupedOptions.find(x => x.name === o.group)
      if (g) g.options.push(o); else groupedOptions.push({ name: o.group, options: [o] })
    } else ungrouped.push(o)
  })
  if (ungrouped.length) groupedOptions.unshift({ name: '', options: ungrouped })

  // Flat list for keyboard nav
  const flatOptions = groupedOptions.flatMap(g => g.options)
  const enabledIndices = flatOptions.map((o, i) => (!o.disabled ? i : -1)).filter(i => i >= 0)

  const handleFieldClick = () => { if (!isDisabled && !isGhost) setOpen(!isOpen) }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (controlledSearch === undefined) setInternalSearch(v)
    onSearch?.(v)
    if (!isOpen) setOpen(true)
  }

  const handleOptionClick = (option: SearchDropdownOption) => {
    if (option.disabled) return
    const next = isOptionSelected(option.value)
      ? selectedValues.filter(v => v !== option.value)
      : [...selectedValues, option.value]
    setSelectedValues(next)
    onSelect?.(option.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) { setOpen(true); return }
      const curPos = enabledIndices.indexOf(focusedIndex)
      const next = curPos < enabledIndices.length - 1 ? enabledIndices[curPos + 1] : enabledIndices[0]
      setFocusedIndex(next !== undefined ? next : -1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!isOpen) return
      const curPos = enabledIndices.indexOf(focusedIndex)
      const prev = curPos > 0 ? enabledIndices[curPos - 1] : enabledIndices[enabledIndices.length - 1]
      setFocusedIndex(prev !== undefined ? prev : -1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (isOpen && focusedIndex >= 0 && flatOptions[focusedIndex]) {
        handleOptionClick(flatOptions[focusedIndex])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.focus()
    }
  }

  // Style params
  const sp: SearchDropdownStyleParams = { config, size, fieldVariant, isDisabled, isGhost, isOpen }
  const containerCls = buildContainerStyles(sp)
  const fieldCls = buildSearchFieldStyles(sp)
  const inputRowCls = buildInputRowStyles(sp)
  const iconCls = buildIconContainerStyles(sp)
  const tagsCls = buildTagsContainerStyles(sp)
  const ghost = buildGhostSkeletonStyles(sp)
  const listCls = buildListPanelStyles(sp)
  const tagsRowCls = buildTagsRowStyles(sp)
  const sectionCls = buildSectionHeaderStyles(sp)
  const historyCls = buildSearchHistoryLabelStyles(sp)
  const dividerCls = buildDividerStyles(sp)
  const footerCls = buildListFooterStyles(sp)

  // Compute max-height for list based on maxVisibleItems
  const cellHeight = parseInt(config.searchCell?.sizes?.[size]?.fontSize || '14', 10) + parseInt(config.searchCell?.sizes?.[size]?.padding || '12', 10) * 2
  const listMaxHeight = maxVisibleItems > 0 ? `${cellHeight * maxVisibleItems}px` : undefined

  const focusedValue = focusedIndex >= 0 && flatOptions[focusedIndex] ? `search-cell-${flatOptions[focusedIndex].value}` : undefined

  // Ghost rendering
  if (isGhost) {
    return (
      <div className={`${containerCls} ${className || ''}`} ref={containerRef} data-testid="tarmac-search-dropdown" {...rest}>
        <div className={ghost.field} data-testid="ghost-skeleton">
          <div className={ghost.block} />
        </div>
      </div>
    )
  }

  return (
    <div className={`${containerCls} ${className || ''}`} ref={containerRef} data-testid="tarmac-search-dropdown" {...rest}>
      {/* Search Field */}
      <div
        className={`${fieldCls}${isDisabled ? ' disabled' : ''}`}
        onClick={handleFieldClick}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-activedescendant={focusedValue}
        data-testid="search-field"
      >
        <div className={inputRowCls}>
          <span className={iconCls} data-testid="search-leading-icon">{leadingIcon || <SearchIcon />}</span>
          {fieldVariant === 'withTags' && tags?.length && !isDisabled ? (
            <div className={tagsCls}>
              {tags.map(tag => (
                <Pill key={tag.id} pillVariant="blue" pillType="subtle" size="md"
                  text={tag.label}
                  trailingIcon={<AddCircleIcon />}
                  onClick={() => tag.onRemove?.()}
                />
              ))}
              <input
                ref={inputRef}
                placeholder={placeholder}
                value={searchVal}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isDisabled}
                data-testid="search-input"
              />
            </div>
          ) : (
            <input
              ref={inputRef}
              placeholder={placeholder}
              value={searchVal}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isDisabled}
              data-testid="search-input"
            />
          )}
          {trailingIcon && <span className={iconCls} data-testid="search-trailing-icon" onClick={(e) => { e.stopPropagation(); onClearTags?.() }}>{trailingIcon}</span>}
        </div>
      </div>

      {/* Search List Panel */}
      {isOpen && !isDisabled && !isGhost && (
        <div className={listCls} role="listbox" data-testid="search-list-panel" style={{ maxHeight: listMaxHeight, overflowY: 'auto' }}>
          {tags?.length && (
            <div className={tagsRowCls} data-testid="list-tags-row">
              {tags.map(tag => (
                <Pill key={tag.id} pillVariant="blue" pillType="subtle" size="md" text={tag.label} />
              ))}
            </div>
          )}
          {searchHistoryLabel && (
            <div className={historyCls} data-testid="search-history-label">
              {searchHistoryIcon && <span>{searchHistoryIcon}</span>}
              <span>{searchHistoryLabel}</span>
            </div>
          )}
          {groupedOptions.map(group => (
            <React.Fragment key={group.name || '__default'}>
              {group.name && <div className={sectionCls} data-testid="section-header">{group.name}</div>}
              {group.options.map((option, idx) => {
                const flatIdx = flatOptions.indexOf(option)
                return (
                  <React.Fragment key={option.value}>
                    {idx > 0 && <div className={dividerCls} data-testid="cell-divider" />}
                    <TarmacSearchCell
                      option={option}
                      isSelected={isOptionSelected(option.value)}
                      cellStyle={option.cellStyle || (isOptionSelected(option.value) ? 'blue' : 'regular')}
                      size={size}
                      config={config}
                      onClick={() => handleOptionClick(option)}
                      isFocused={focusedIndex === flatIdx}
                    />
                  </React.Fragment>
                )
              })}
            </React.Fragment>
          ))}
          {filteredOptions.length === 0 && (
            <div style={{ padding: '8px 12px', textAlign: 'center', opacity: 0.6 }} data-testid="no-results">
              No results found
            </div>
          )}
          {(showFooter || ctaActions) && (
            <div className={footerCls} data-testid="list-footer">
              {ctaActions || (
                <>
                  <Button buttonStyle="tertiary" variant="black" size="md" onClick={onAddNew}>Add new</Button>
                  <Button buttonStyle="secondary" variant="black" size="md" onClick={onCancel}>Cancel</Button>
                  <Button buttonStyle="primary" variant="black" size="md" onClick={onAction}>Action</Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── SearchDropdown Component ────────────────────────────────────────────────

const SearchDropdown = ({ searchDropdownStyle, ...props }: SearchDropdownProps) => {
  if (searchDropdownStyle) {
    return <TarmacSearchDropdown searchDropdownStyle={searchDropdownStyle} {...props} />
  }
  return null
}

export default SearchDropdown
