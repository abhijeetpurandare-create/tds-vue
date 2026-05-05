import React, { useState, useRef, useEffect, CSSProperties } from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Pill from '../Pill'
import Spinner from '../Spinner'
import Button from '../Button'
import Chip from '../Chip'
import DropdownList from './DropdownList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import {
  DropdownTarmacConfig,
  DropdownStyleParams,
  buildContainerStyles,
  buildInputFieldStyles,
  buildInputRowStyles,
  buildAddonStyles,
  buildAddonWrapperStyles,
  buildToggleStyles,
  buildTitleSectionStyles,
  buildHelperTextStyles,
  buildIconContainerStyles,
  buildGhostSkeletonStyles,
  buildListPanelStyles,
  buildScrollbarStyles,
  buildSectionHeaderStyles,
  buildListFooterStyles,
  buildSearchInputStyles,
  buildChipsContainerStyles,
  buildSubtextContainerStyles,
} from './useDropdownStyles'

/** Simple dimension helper for inline use */
function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback
  if (typeof v === 'number') return `${v}px`
  return String(v)
}

// ─── Legacy Types ────────────────────────────────────────────────────────────

export type DropdownVariant = 'primary' | 'secondary' | 'outline'
export type DropdownSize = 'sm' | 'md' | 'lg'

export interface DropdownOption {
  value: string | number
  label: string | React.ReactNode
  disabled?: boolean
}

// ─── Tarmac Open Union Types ─────────────────────────────────────────────────

export type DropdownInputType = 'default' | 'addonLeft' | 'addonRight' | (string & {})
export type DropdownTarmacSize = 'sm' | 'md' | 'lg' | (string & {})
export type DropdownCellStyle = 'regular' | 'infoBlue' | (string & {})
export type DropdownInputStyle = 'tarmac-01' | (string & {})

// ─── Tarmac Option Interface ─────────────────────────────────────────────────

export interface TarmacDropdownOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
  description?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  avatar?: React.ReactNode
  showCheckbox?: boolean
  cellStyle?: DropdownCellStyle
}

// ─── Tarmac-Specific Props ───────────────────────────────────────────────────

export interface DropdownTarmacProps {
  dropdownStyle?: DropdownInputStyle
  dropdownInputType?: DropdownInputType
  dropdownSize?: DropdownTarmacSize
  addonText?: React.ReactNode
  isDisabled?: boolean
  isGhost?: boolean
  label?: string
  isMandatory?: boolean
  titleIcon?: React.ReactNode
  helperTextTop?: React.ReactNode
  helperTextBottom?: React.ReactNode
  subtext?: React.ReactNode
  leadingIcon?: React.ReactNode
  listVariant?: 'listSet1' | 'listSet2' | (string & {})
  maxVisibleItems?: number
  showFooter?: boolean
  ctaActions?: React.ReactNode
  onAddNew?: () => void
  onCancel?: () => void
  onAction?: () => void
  tarmacOptions?: TarmacDropdownOption[]
  /** Custom render function for each option — use DropdownList sub-components for composition */
  renderOption?: (option: TarmacDropdownOption, isSelected: boolean) => React.ReactNode
}

// ─── Combined DropdownProps ──────────────────────────────────────────────────

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // Legacy props
  options: DropdownOption[]
  value?: string | number | (string | number)[]
  onChange?: (value: string | number | (string | number)[]) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: React.ReactNode
  isSearchable?: boolean
  multiple?: boolean
  isLoading?: boolean
  isFullWidth?: boolean
  isRounded?: boolean
  dropdownClassName?: string
  iconPosition?: 'left' | 'right'
  pillVariant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
  className?: string
  style?: React.CSSProperties
  onSearch?: (value: string) => void
  searchPlaceholder?: string
  searchValue?: string
  dropdownHeight?: CSSProperties['height']
  bottomContentProps?: {
    leftIcon?: React.ReactNode
    title?: string | React.ReactNode
    onClick?: () => void
    align?: 'left' | 'center' | 'right'
    className?: string
  }
  displayOnlyPlaceholder?: boolean
  loadMore?: boolean
  onLoadMore?: () => void
  classNames?: {
    label?: string
    optionItemWrapper?: string
    optionItem?: string
    input?: string
    placeholder?: string
    icon?: string
    inputWrapper?: string
  }
  position?: 'bottom' | 'top' | 'auto'
  iconOnly?: boolean
  // Tarmac-specific props
  dropdownStyle?: DropdownInputStyle
  dropdownInputType?: DropdownInputType
  dropdownSize?: DropdownTarmacSize
  addonText?: React.ReactNode
  isDisabled?: boolean
  isGhost?: boolean
  isMandatory?: boolean
  titleIcon?: React.ReactNode
  helperTextTop?: React.ReactNode
  helperTextBottom?: React.ReactNode
  subtext?: React.ReactNode
  leadingIcon?: React.ReactNode
  listVariant?: 'listSet1' | 'listSet2' | (string & {})
  maxVisibleItems?: number
  showFooter?: boolean
  ctaActions?: React.ReactNode
  onAddNew?: () => void
  onCancel?: () => void
  onAction?: () => void
  tarmacOptions?: TarmacDropdownOption[]
  /** Custom render function for each option — use DropdownList sub-components for composition */
  renderOption?: (option: TarmacDropdownOption, isSelected: boolean) => React.ReactNode
}

// ─── Chevron SVG Icons ───────────────────────────────────────────────────────

const ChevronDownIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
)

// ─── TarmacDropCell (internal — delegates to DropdownList compound) ──────────

const TarmacDropCell: React.FC<{
  option: TarmacDropdownOption
  isSelected: boolean
  cellStyle: string
  size: string
  onClick?: () => void
}> = ({ option, isSelected, cellStyle, size, onClick }) => {
  return (
    <DropdownList.Cell
      cellStyle={cellStyle}
      size={size}
      isSelected={isSelected}
      isDisabled={!!option.disabled}
      onClick={onClick}
    >
      {option.showCheckbox && <DropdownList.Checkbox />}
      {option.avatar && <DropdownList.Avatar>{option.avatar}</DropdownList.Avatar>}
      {option.leadingIcon && <DropdownList.LeadingIcon>{option.leadingIcon}</DropdownList.LeadingIcon>}
      <DropdownList.Content label={option.label} subtext={option.description} />
      {option.trailingIcon && <DropdownList.TrailingIcon>{option.trailingIcon}</DropdownList.TrailingIcon>}
    </DropdownList.Cell>
  )
}

// ─── TarmacDropdown (internal) ───────────────────────────────────────────────

const TarmacDropdown: React.FC<DropdownProps> = (props) => {
  const {
    dropdownInputType = 'default', dropdownSize = 'md',
    addonText, isDisabled = false, isGhost = false, isMandatory = false,
    label, titleIcon, helperTextTop, helperTextBottom, subtext,
    leadingIcon,
    maxVisibleItems = 6, showFooter = false,
    ctaActions, onAddNew, onCancel, onAction,
    tarmacOptions, options = [], value, onChange,
    placeholder = 'Select an option', isSearchable = false, multiple = false,
    renderOption,
  } = props

  const { theme } = useTheme()
  const config = (theme.components?.dropdown_tarmac ||
    (defaultThemeConfig.components as any)?.dropdown_tarmac || {}) as DropdownTarmacConfig

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(() => {
    if (value === undefined) return []
    return Array.isArray(value) ? value : [value]
  })
  const [searchValue, setSearchValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Sync value prop
  useEffect(() => {
    if (value === undefined) setSelectedValues([])
    else setSelectedValues(Array.isArray(value) ? value : [value])
  }, [value])

  // Click-outside detection
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Resolve options: prefer tarmacOptions, fall back to legacy options mapped
  const resolvedOptions: TarmacDropdownOption[] = tarmacOptions || options.map(o => ({
    value: o.value,
    label: typeof o.label === 'string' ? o.label : String(o.value),
    disabled: o.disabled,
  }))

  // Search filtering
  const filteredOptions = isSearchable && searchValue
    ? resolvedOptions.filter(o => o.label.toLowerCase().includes(searchValue.toLowerCase()))
    : resolvedOptions

  // Group options
  const groupedOptions: { name: string; options: TarmacDropdownOption[] }[] = []
  const ungrouped: TarmacDropdownOption[] = []
  filteredOptions.forEach(o => {
    if (o.group) {
      const existing = groupedOptions.find(g => g.name === o.group)
      if (existing) existing.options.push(o)
      else groupedOptions.push({ name: o.group, options: [o] })
    } else {
      ungrouped.push(o)
    }
  })
  if (ungrouped.length > 0) groupedOptions.unshift({ name: '', options: ungrouped })

  const isSelected = (v: string | number) => selectedValues.includes(v)
  const getOptionLabel = (v: string | number) => resolvedOptions.find(o => o.value === v)?.label || String(v)

  const handleOptionClick = (option: TarmacDropdownOption) => {
    if (option.disabled || isDisabled) return
    if (multiple) {
      const next = isSelected(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value]
      setSelectedValues(next)
      onChange?.(next)
    } else {
      setSelectedValues([option.value])
      onChange?.(option.value)
      setIsOpen(false)
    }
  }

  const toggleDropdown = () => {
    if (isDisabled || isGhost) return
    if (!isOpen) setSearchValue('')
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDropdown()
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
      setSearchValue('')
    } else if (e.key === 'ArrowDown' && !isOpen) {
      setSearchValue('')
      setIsOpen(true)
    }
  }

  // Style params
  const sp: DropdownStyleParams = {
    config, inputType: dropdownInputType, size: dropdownSize,
    isDisabled, isGhost, isOpen,
  }

  const containerCls = buildContainerStyles(sp)
  const inputFieldCls = buildInputFieldStyles(sp)
  const inputRowCls = buildInputRowStyles(sp)
  const addonLeftCls = buildAddonStyles({ ...sp, position: 'left' })
  const addonRightCls = buildAddonStyles({ ...sp, position: 'right' })
  const addonWrapperCls = buildAddonWrapperStyles(sp)
  const toggleCls = buildToggleStyles(sp)
  const ts = buildTitleSectionStyles(sp)
  const hs = buildHelperTextStyles(sp)
  const iconCls = buildIconContainerStyles(sp)
  const ghost = buildGhostSkeletonStyles(sp)
  const listCls = buildListPanelStyles(sp, maxVisibleItems)
  const scrollCls = buildScrollbarStyles(sp)
  const sectionCls = buildSectionHeaderStyles(sp)
  const footerCls = buildListFooterStyles(sp)
  const searchCls = buildSearchInputStyles(sp)
  const chipsCls = buildChipsContainerStyles()
  const stc = buildSubtextContainerStyles(sp)

  // Ghost state: render skeleton
  if (isGhost) {
    return (
      <div className={containerCls} ref={dropdownRef} data-testid="tarmac-dropdown">
        {label && <div className={ghost.titleSkeleton} data-testid="dropdown-ghost-skeleton-title" />}
        <div className={inputFieldCls} data-testid="dropdown-ghost-skeleton-input">
          <div className={ghost.inputSkeleton} />
        </div>
      </div>
    )
  }

  return (
    <div className={containerCls} ref={dropdownRef} data-testid="tarmac-dropdown">
      {/* Title Container — Figma: row, space-between, align-end */}
      {(label || helperTextTop) && (
        <div className={ts.container} data-testid="dropdown-title-container">
          <div className={ts.titleRow}>
            {label && <label className={ts.label} data-testid="dropdown-title-label">{label}</label>}
            {isMandatory && label && <span className={ts.mandatory}>*</span>}
            {titleIcon && <span className={ts.titleIcon}>{titleIcon}</span>}
          </div>
          {helperTextTop && (
            <span className={hs.top} data-testid="dropdown-helper-text-top">{helperTextTop}</span>
          )}
        </div>
      )}

      {/* InputField Trigger */}
      <div
        className={`${dropdownInputType !== 'default' ? `${addonWrapperCls}${isDisabled ? ' disabled' : ''}${isGhost ? ' ghost' : ''}` : `${inputFieldCls}${isDisabled ? ' disabled' : ''}${isGhost ? ' ghost' : ''}`}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={isDisabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        data-testid="dropdown-input-field"
      >
        {dropdownInputType === 'addonLeft' && (
          <div className={addonLeftCls} data-testid="dropdown-addon-left">
            {leadingIcon && <span className={iconCls} data-testid="dropdown-leading-icon">{leadingIcon}</span>}
            {addonText}
          </div>
        )}

        <div className={dropdownInputType !== 'default' ? `${inputFieldCls}${isDisabled ? ' disabled' : ''}` : inputRowCls} style={dropdownInputType !== 'default' ? { borderRadius: dropdownInputType === 'addonLeft' ? `0 ${dim(config.base?.radius, '6px')} ${dim(config.base?.radius, '6px')} 0` : `${dim(config.base?.radius, '6px')} 0 0 ${dim(config.base?.radius, '6px')}`, flex: '1 0 0', minWidth: '1px', minHeight: '1px', boxShadow: 'none', border: 'none' } : undefined}>
          {dropdownInputType !== 'default' ? (
            <div className={inputRowCls}>
              {dropdownInputType === 'addonRight' && leadingIcon && <span className={iconCls} data-testid="dropdown-leading-icon">{leadingIcon}</span>}
              {multiple && selectedValues.length > 0 ? (
                <div className={chipsCls}>
                  {selectedValues.map(val => (
                    <Chip key={String(val)} chipVariant="outlined" chipType="blue" size="md"
                      text={getOptionLabel(val)}
                      onClick={!isDisabled ? (e: React.MouseEvent) => {
                        e.stopPropagation()
                        const next = selectedValues.filter(v => v !== val)
                        setSelectedValues(next)
                        onChange?.(next)
                      } : undefined}
                    />
                  ))}
                </div>
              ) : selectedValues.length > 0 ? (
                <span style={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} data-testid="dropdown-selected-value">
                  {getOptionLabel(selectedValues[0])}
                </span>
              ) : (
                <span style={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: isDisabled ? (config.inputField?.types?.regular?.disabledTextColor) : config.inputField?.types?.regular?.placeholderColor }} data-testid="dropdown-placeholder">{placeholder}</span>
              )}
              <span className={toggleCls} data-testid="dropdown-toggle"><ChevronDownIcon /></span>
            </div>
          ) : (
            <>
              {leadingIcon && <span className={iconCls} data-testid="dropdown-leading-icon">{leadingIcon}</span>}
              {multiple && selectedValues.length > 0 ? (
                <div className={chipsCls}>
                  {selectedValues.map(val => (
                    <Chip key={String(val)} chipVariant="outlined" chipType="blue" size="md"
                      text={getOptionLabel(val)}
                      onClick={!isDisabled ? (e: React.MouseEvent) => {
                        e.stopPropagation()
                        const next = selectedValues.filter(v => v !== val)
                        setSelectedValues(next)
                        onChange?.(next)
                      } : undefined}
                    />
                  ))}
                </div>
              ) : selectedValues.length > 0 ? (
                <span style={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} data-testid="dropdown-selected-value">
                  {getOptionLabel(selectedValues[0])}
                </span>
              ) : (
                <span style={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: isDisabled ? (config.inputField?.types?.regular?.disabledTextColor) : config.inputField?.types?.regular?.placeholderColor }} data-testid="dropdown-placeholder">{placeholder}</span>
              )}
              <span className={toggleCls} data-testid="dropdown-toggle"><ChevronDownIcon /></span>
            </>
          )}
        </div>

        {dropdownInputType === 'addonRight' && (
          <div className={addonRightCls} data-testid="dropdown-addon-right">
            {addonText}
          </div>
        )}
      </div>

      {/* List Panel */}
      {isOpen && !isDisabled && !isGhost && (
        <div className={`${listCls} ${scrollCls}`} role="listbox" aria-expanded={isOpen} aria-multiselectable={multiple || undefined} data-testid="dropdown-list-panel">
          {isSearchable && (
            <input
              className={searchCls}
              placeholder={props.searchPlaceholder || 'Search...'}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onClick={e => e.stopPropagation()}
              onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') e.stopPropagation() }}
              data-testid="dropdown-search-input"
            />
          )}

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {groupedOptions.map(group => (
              <React.Fragment key={group.name || '__ungrouped'}>
                {group.name && <div className={sectionCls} data-testid="dropdown-section-header">{group.name}</div>}
                {group.options.map(option => (
                  renderOption ? (
                    <React.Fragment key={String(option.value)}>
                      {renderOption(option, isSelected(option.value))}
                    </React.Fragment>
                  ) : (
                    <TarmacDropCell
                      key={String(option.value)}
                      option={option}
                      isSelected={isSelected(option.value)}
                      cellStyle={option.cellStyle || 'regular'}
                      size={dropdownSize}
                      onClick={() => handleOptionClick(option)}
                    />
                  )
                ))}
              </React.Fragment>
            ))}
            {filteredOptions.length === 0 && (
              <div style={{ padding: '8px 12px', textAlign: 'center', opacity: 0.6 }} data-testid="dropdown-no-options">
                No options found
              </div>
            )}
          </div>

          {(showFooter || ctaActions) && (
            <div className={footerCls} data-testid="dropdown-footer">
              {ctaActions || (
                <>
                  <Button buttonStyle="tertiary" variant="black" size="sm" onClick={onAddNew}>Add new</Button>
                  <Button buttonStyle="secondary" variant="black" size="sm" onClick={onCancel}>Cancel</Button>
                  <Button buttonStyle="primary" variant="black" size="sm" onClick={onAction}>Action</Button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Subtext Container — helperTextBottom / subtext */}
      {(subtext || helperTextBottom) && (
        <div className={stc.container} data-testid="dropdown-subtext-container">
          {subtext && <span className={stc.subtext} data-testid="dropdown-subtext">{subtext}</span>}
          {helperTextBottom && <span className={stc.subtext} data-testid="dropdown-helper-text-bottom">{helperTextBottom}</span>}
        </div>
      )}

    </div>
  )
}

// ─── Legacy Dropdown ─────────────────────────────────────────────────────────

const Dropdown = ({
  variant = 'primary',
  size = 'md',
  options = [],
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  disabled = false,
  error,
  isLoading = false,
  isFullWidth = false,
  isRounded = false,
  isSearchable = false,
  multiple = false,
  className = '',
  dropdownClassName = '',
  icon,
  iconPosition = 'right',
  pillVariant = 'info',
  onSearch,
  dropdownHeight = '15rem',
  bottomContentProps,
  displayOnlyPlaceholder = false,
  loadMore,
  onLoadMore,
  position = 'bottom',
  classNames = {},
  iconOnly = false,
  dropdownStyle,
  ...props
}: DropdownProps) => {
  // ─── Discriminator Branch ──────────────────────────────────────────────────
  if (dropdownStyle) {
    return <TarmacDropdown dropdownStyle={dropdownStyle} options={options} value={value} onChange={onChange} label={label} placeholder={placeholder} isSearchable={isSearchable} multiple={multiple} {...props} />
  }
  const { theme } = useTheme()
  const dropdownTheme =
    theme.components?.dropdown || defaultThemeConfig.components.dropdown

  // Resolved placement for auto-adjust (vertical and horizontal)
  const [resolvedPosition, setResolvedPosition] = useState<'bottom' | 'top'>(
    position === 'auto' ? 'bottom' : position
  )
  const [resolvedAlign, setResolvedAlign] = useState<'start' | 'end'>('start')

  // Helper function to convert value to array format
  const toArrayValue = (
    val: string | number | (string | number)[] | undefined
  ): (string | number)[] => {
    if (val === undefined) return []
    if (Array.isArray(val)) return val
    return [val]
  }

  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    () => {
      if (value === undefined) return []
      return Array.isArray(value) ? value : [value]
    }
  )
  const [searchValue, setSearchValue] = useState('')
  const [filteredOptions, setFilteredOptions] =
    useState<DropdownOption[]>(options)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Update filtered options when search value changes
  useEffect(() => {
    if (isSearchable && searchValue) {
      const searchTerm = searchValue.toLowerCase().trim()
      const isNumericSearch = /^\d+$/.test(searchTerm)

      const filtered = options.filter((option) => {
        // Convert label to string for comparison
        const labelString =
          typeof option.label === 'string' ? option.label : String(option.value)
        const labelLower = labelString.toLowerCase()

        // For numeric searches, use startsWith for precise matching
        // For text searches, use includes for flexible matching
        if (isNumericSearch) {
          return labelLower.startsWith(searchTerm)
        }
        return labelLower.includes(searchTerm)
      })
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions(options)
    }
  }, [searchValue, options, isSearchable])

  // Update selected values when value prop changes
  useEffect(() => {
    if (value === undefined) {
      setSelectedValues([])
    } else {
      setSelectedValues(Array.isArray(value) ? value : [value])
    }
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Auto-adjust popup position when position === 'auto' to avoid viewport overflow
  useEffect(() => {
    if (!isOpen || position !== 'auto' || !dropdownRef.current) return
    const rect = dropdownRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    const minSpace = 200
    setResolvedPosition(
      spaceBelow < minSpace && spaceAbove > spaceBelow ? 'top' : 'bottom'
    )
    // Horizontal: if trigger is near right edge, align popup to the right so it doesn't overflow
    const minPopupWidth = 150
    const spaceOnRight = window.innerWidth - rect.right
    setResolvedAlign(spaceOnRight < minPopupWidth ? 'end' : 'start')
  }, [isOpen, position])

  // Find the selected options
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  )

  // Handle option selection
  const handleOptionClick = (option: DropdownOption) => {
    if (disabled) return

    if (multiple) {
      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter((v) => v !== option.value)
        : [...selectedValues, option.value]
      setSelectedValues(newValues)
      onChange?.(newValues)
    } else {
      setSelectedValues([option.value])
      onChange?.(option.value)
      setIsOpen(false)
    }
  }

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled && !isLoading) {
      if (!isOpen) setSearchValue('')
      setIsOpen(!isOpen)
    }
  }

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDropdown()
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
      setSearchValue('')
    } else if (e.key === 'ArrowDown' && !isOpen) {
      setSearchValue('')
      setIsOpen(true)
    }
  }

  // Use Tailwind for layout, spacing, typography and other static styles
  // 1. Base styles (common to all dropdowns)
  const baseClasses =
    dropdownTheme.base?.className ||
    'relative inline-flex items-center justify-between font-medium transition-all focus:outline-none'

  // 2. Size-specific classes
  const sizeClasses =
    `${dropdownTheme.sizes?.[size]?.padding}` ||
    {
      sm: 'text-sm py-1.5 px-3',
      md: 'text-base py-2 px-4',
      lg: 'text-lg py-2.5 px-5',
    }[size]

  // 3. Border radius based on isRounded prop
  const radiusClasses = isRounded
    ? dropdownTheme.base?.radius?.rounded || 'rounded-full'
    : dropdownTheme.base?.radius?.default || 'rounded-md'

  // 4. Width based on isFullWidth prop (skip full width when iconOnly)
  const widthClasses =
    iconOnly ? '' : isFullWidth ? 'w-full' : ''

  // 5. Icon-only: compact square trigger, centered icon (no ! so className can override)
  const iconOnlyClasses = iconOnly
    ? 'p-0 min-w-[2.375rem] w-[2.375rem] h-[2.375rem] flex items-center justify-center'
    : ''

  // 6. Icon spacing based on size and whether we have both icon and children
  const iconSpacingClasses =
    !iconOnly && icon && selectedOptions.length > 0
      ? dropdownTheme.sizes?.[size]?.iconSpacing ||
        {
          sm: 'gap-1.5',
          md: 'gap-2',
          lg: 'gap-2.5',
        }[size]
      : ''

  // 7. Disabled styles (handled by Tailwind)
  const disabledClasses =
    disabled || isLoading ? 'cursor-not-allowed' : 'cursor-pointer'

  // Combine all Tailwind classes
  const tailwindClasses = [
    baseClasses,
    iconOnly ? '' : sizeClasses,
    radiusClasses,
    widthClasses,
    iconOnlyClasses,
    iconSpacingClasses,
    disabledClasses,
  ]
    .filter(Boolean)
    .join(' ')

  // Use Emotion CSS for dynamic color styling based on variant and theme
  const colorStyles = css({
    // Get colors from the variant config
    backgroundColor:
      dropdownTheme.variants[variant]?.backgroundColor || '#FFFFFF',
    color: dropdownTheme.variants[variant]?.textColor || '#374151',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: dropdownTheme.variants[variant]?.borderColor || '#D1D5DB',

    // Hover state (only if not disabled)
    '&:hover:not(:disabled):not(.disabled)': {
      backgroundColor:
        dropdownTheme.variants[variant]?.hoverBackgroundColor || '#F9FAFB',
      borderColor:
        dropdownTheme.variants[variant]?.hoverBorderColor || '#9CA3AF',
    },

    // Focus state
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${
        dropdownTheme.variants[variant]?.focusRingColor ||
        'rgba(59, 130, 246, 0.4)'
      }`,
      outline: 'none',
    },

    // Disabled state
    '&:disabled, &.disabled': {
      opacity: dropdownTheme.states?.disabled?.opacity || 0.6,
      backgroundColor:
        dropdownTheme.states?.disabled?.backgroundColor || '#F3F4F6',
      color: dropdownTheme.states?.disabled?.color || '#9CA3AF',
      borderColor: dropdownTheme.states?.disabled?.borderColor || '#E5E7EB',
    },
  })

  // Popup styles (use resolvedPosition and resolvedAlign for auto-adjust)
  const effectivePosition =
    position === 'auto' ? resolvedPosition : position
  const effectiveAlign = position === 'auto' ? resolvedAlign : 'start'
  const popupStyles = css({
    position: 'absolute',
    ...(effectivePosition === 'top'
      ? {
          bottom: '100%',
          marginBottom: '0.25rem',
        }
      : {
          top: '100%',
          marginTop: '0.25rem',
        }),
    ...(effectiveAlign === 'end'
      ? { right: 0, left: 'auto' }
      : { left: 0 }),
    width: isFullWidth ? '100%' : 'auto',
    minWidth: '100%',
    backgroundColor: dropdownTheme.popup?.backgroundColor || '#FFFFFF',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: dropdownTheme.popup?.borderColor || '#E5E7EB',
    borderRadius: '0.375rem',
    boxShadow:
      dropdownTheme.popup?.boxShadow ||
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: dropdownTheme.popup?.zIndex || 50,
    maxHeight: dropdownHeight ? dropdownHeight : '15rem',
    overflowY: 'auto',
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
  })

  // Option styles
  const optionStyles = css({
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      backgroundColor: dropdownTheme.options?.hoverBackgroundColor || '#F3F4F6',
    },

    '&.selected': {
      backgroundColor:
        dropdownTheme.options?.selectedBackgroundColor || '#EFF6FF',
      color: dropdownTheme.options?.selectedTextColor || '#2563EB',
    },

    '&.disabled': {
      opacity: dropdownTheme.options?.disabledOpacity || 0.5,
      cursor: 'not-allowed',
    },
  })

  const searchInputContainerStyles = css({
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: dropdownTheme.search?.borderColor || '#D1D5DB',
    backgroundColor: dropdownTheme.search?.backgroundColor || '#FFFFFF',
    color: dropdownTheme.search?.textColor || '#989392',
    border: 'none',
    borderBottom: '1px solid #D1D5DB',
    fontWeight: '400',
    fontSize: '0.875rem',
    height: '2.5rem',
  })

  // Search input styles
  const searchInputStyles = css({
    '&:focus': {
      outline: 'none',
    },
  })

  // Label styles
  const labelStyles = css({
    fontWeight: dropdownTheme.label?.fontWeight || '500',
  })

  const searchIcon = (
    <svg
      width='10'
      height='10'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.8154 18.9331L14.2883 13.406C15.507 11.9842 16.214 10.1445 16.214 8.12507C16.214 3.63702 12.5763 0.000488281 8.08943 0.000488281C3.60256 0.000488281 0 3.63819 0 8.12507C0 12.6119 3.63732 16.2496 8.08943 16.2496C10.1081 16.2496 11.9506 15.5091 13.3704 14.2908L18.8975 19.8178C19.0537 19.937 19.2139 19.9995 19.374 19.9995C19.5342 19.9995 19.6938 19.9384 19.8158 19.8163C20.0615 19.5737 20.0615 19.1753 19.8154 18.9331ZM8.12459 14.9997C4.30057 14.9997 1.24994 11.9139 1.24994 8.12507C1.24994 4.3362 4.30057 1.25042 8.12459 1.25042C11.9486 1.25042 14.9992 4.30105 14.9992 8.12507C14.9992 11.9491 11.9135 14.9997 8.12459 14.9997Z'
        fill='#989392'
      />
    </svg>
  )

  // Combine Tailwind and Emotion classes
  const combinedClassName = `${tailwindClasses} ${colorStyles} ${className}`

  // Default chevron icon if none provided
  const defaultIcon = (
    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
  )

  // Handle removing a selected option via Pill close button
  const handleRemoveOption = (valueToRemove: string | number) => {
    if (multiple) {
      const newSelectedValues = selectedValues.filter(
        (val) => val !== valueToRemove
      )
      setSelectedValues(newSelectedValues)

      if (onChange) {
        onChange(newSelectedValues)
      }
    }
  }

  // Render selected values as Pills for multi-select
  const renderSelectedPills = () => {
    if (!multiple || selectedValues.length === 0) return null

    return (
      <div className='flex flex-wrap gap-1'>
        {selectedValues.map((value) => {
          const option = options.find((opt) => opt.value === value)
          if (!option) return null

          return (
            <Pill
              key={String(value)}
              variant={pillVariant}
              text={typeof option.label === 'string' ? option.label : String(option.value)}
              closable
              onClose={() => handleRemoveOption(value)}
              size={size === 'lg' ? 'md' : size === 'sm' ? 'sm' : 'md'}
            />
          )
        })}
      </div>
    )
  }

  // Get variant styles
  const variantStyles = css({
    // ... existing variant styles ...
  })

  // Map dropdown size to spinner size and variant
  const spinnerSize = size as 'sm' | 'md' | 'lg'
  const spinnerVariant = variant === 'outline' ? 'primary' : variant

  return (
    <div className='flex flex-col gap-1.25'>
      {label && (
        <div
          className={`text-body-one-liner ${labelStyles} ${
            classNames.label || ''
          }`}
        >
          {label}
        </div>
      )}
      <div
        ref={dropdownRef}
        className={`${combinedClassName}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={toggleDropdown}
        {...props}
      >
        <div
          className={`flex flex-col w-full ${variantStyles}`}
        >
          {iconOnly ? (
            /* Icon-only trigger: show only the icon, centered */
            <div
              className={`flex items-center justify-center w-full ${
                classNames.inputWrapper || ''
              }`}
            >
              {icon ?? defaultIcon}
            </div>
          ) : (
            /* Selected value or placeholder */
            <div className='flex items-center justify-between w-full min-h-[1.25rem] min-w-0'>
              <div
                className={`flex items-center flex-grow min-w-0 ${
                  classNames.inputWrapper || ''
                }`}
              >
                {icon && iconPosition === 'left' && (
                  <span className='inline-flex mr-2'>{icon}</span>
                )}
                <div className='flex-grow min-w-0 overflow-hidden'>
                  {isLoading ? (
                    <div className='flex items-center'>
                      <Spinner size={spinnerSize} variant={spinnerVariant} />
                      <span className={`ml-2 truncate ${classNames.input || ''}`}>
                        {selectedOptions.length > 0
                          ? selectedOptions[0].label
                          : placeholder}
                      </span>
                    </div>
                  ) : multiple ? (
                    <div className='flex flex-wrap items-center gap-1 min-h-[1.5rem]'>
                      {selectedValues.length > 0 ? (
                        renderSelectedPills()
                      ) : (
                        <span
                          className={`text-gray-500 ${classNames.input || ''}`}
                        >
                          {placeholder}
                        </span>
                      )}
                    </div>
                  ) : selectedOptions.length > 0 ? (
                    <span
                      className={`block w-full min-w-0 truncate text-body-one-liner ${
                        classNames.input || ''
                      }`}
                    >
                      {selectedOptions[0].label}
                    </span>
                  ) : (
                    <span
                      className={`block w-full min-w-0 truncate text-body-one-liner ${
                        classNames.placeholder || ''
                      } ${classNames.input || ''}`}
                    >
                      {placeholder}
                    </span>
                  )}
                </div>
                {icon && iconPosition === 'right' && (
                  <span className='inline-flex ml-2'>{icon}</span>
                )}
                {!icon && <span className='inline-flex ml-2'>{defaultIcon}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Dropdown popup */}
        <div
          className={popupStyles}
          id='dropdown-options'
          role='listbox'
          aria-multiselectable={multiple}
        >
          {/* Search input if searchable */}
          {isSearchable && (
            <div
              className={`${searchInputContainerStyles} flex items-center gap-2`}
            >
              {searchIcon}
              <input
                type='text'
                className={`${searchInputStyles}`}
                placeholder={props.searchPlaceholder || 'Search...'}
                value={props.searchValue || searchValue}
                onChange={(e) => {
                  if (props?.searchValue || onSearch) {
                    onSearch?.(e.target.value)
                  } else {
                    setSearchValue(e.target.value)
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  // Prevent Space/Enter from bubbling to parent - they would toggle/close the dropdown
                  // and prevent the space from being typed in the search input
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.stopPropagation()
                  }
                }}
              />
            </div>
          )}

          {/* Options list */}
          <div className='py-1 max-h-64 flex-grow' style={{ overflow: 'auto' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${optionStyles} ${
                    selectedValues.includes(option.value) ? 'selected' : ''
                  } ${option.disabled ? 'disabled' : ''} w-full truncate ${
                    classNames.optionItemWrapper || ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOptionClick(option)
                  }}
                  role='option'
                  aria-selected={selectedValues.includes(option.value)}
                  aria-disabled={option.disabled}
                >
                  {multiple && (
                    <span className='mr-2'>
                      <input
                        type='checkbox'
                        checked={selectedValues.includes(option.value)}
                        readOnly
                        className='form-checkbox h-4 w-4 text-blue-600'
                      />
                    </span>
                  )}
                  <span
                    className={`truncate text-ellipsis ${
                      classNames.optionItem || ''
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              ))
            ) : (
              <div className='p-2 text-center text-gray-500'>
                No options found
              </div>
            )}
            {loadMore && (
              <button
                className='px-3 py-2 w-full text-sm text-cta-primary font-medium hover:text-cta-primary/80 transition-colors text-center'
                onClick={onLoadMore}
              >
                Load More
              </button>
            )}
          </div>

          {bottomContentProps && (
            <button
              className={`  px-3 h-10 w-full border-gray-200 border-t overflow-hidden flex gap-2 items-center text-sm ${
                bottomContentProps?.className
              } justify-${
                bottomContentProps?.align === 'left'
                  ? 'left'
                  : bottomContentProps?.align === 'center'
                  ? 'center'
                  : 'end'
              }`}
              style={{ boxShadow: '0px -1px 2px rgba(17, 24, 39, 0.1)' }}
              onClick={() => {
                setIsOpen(false)
                bottomContentProps?.onClick?.()
              }}
            >
              {bottomContentProps?.leftIcon}
              {bottomContentProps?.title}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
