import React, { useState, useCallback } from 'react'
import { css, cx } from '@emotion/css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// ─── Inline SVG Icons (matching Figma keyboard-arrow-left / keyboard-arrow-right) ─
const KeyboardArrowLeft: React.FC<{ size?: number | string }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
)

const KeyboardArrowRight: React.FC<{ size?: number | string }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
  </svg>
)
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import Dropdown from '../Dropdown'
import Button from '../Button'
import {
  PaginationTarmacConfig,
  buildAssembledStyles,
  buildNumberCellGroupStyles,
  buildChevronIconStyles,
  buildEllipsisStyles,
  buildTextCellStyles,
  buildTextGroupStyles,
  buildDividerStyles,
} from './usePaginationStyles'

// ============================================
// Types
// ============================================

export interface PaginationConfig {
  /** Current page number */
  current?: number
  /** Default current page */
  defaultCurrent?: number
  /** Page size */
  pageSize?: number
  /** Default page size */
  defaultPageSize?: number
  /** Total number of items */
  total?: number
  /** Show size changer */
  showSizeChanger?: boolean
  /** Page size options */
  pageSizeOptions?: (string | number)[]
  /** Show quick jumper */
  showQuickJumper?: boolean
  /** Show total */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
  /** Size variant */
  size?: 'default' | 'small'
  /** Simple mode */
  simple?: boolean
  /** Hide on single page */
  hideOnSinglePage?: boolean
  /** Callback when page changes */
  onChange?: (page?: number, pageSize?: number) => void
  /** Callback when page size changes */
  onShowSizeChange?: (current: number, size: number) => void
  /** Disabled pagination */
  disabled?: boolean
  /** Custom class name */
  className?: string
  /** Custom style */
  style?: React.CSSProperties
  /** Custom class names for different parts of the pagination */
  classNames?: {
    container?: string
    total?: string
    navButton?: string
    pageButton?: string
    activePageButton?: string
    ellipsis?: string
    select?: string
    sizeChangerWrapper?: string
    sizeChangerSelect?: string
    input?: string
    iconButton?: string
    quickJumper?: string
    simpleContainer?: string
    pageInfo?: string
  }
  /** Custom styles for different parts of the pagination */
  styles?: {
    container?: React.CSSProperties
    total?: React.CSSProperties
    navButton?: React.CSSProperties
    pageButton?: React.CSSProperties
    activePageButton?: React.CSSProperties
    ellipsis?: React.CSSProperties
    select?: React.CSSProperties
    sizeChangerWrapper?: React.CSSProperties
    sizeChangerSelect?: React.CSSProperties
    input?: React.CSSProperties
    iconButton?: React.CSSProperties
    quickJumper?: React.CSSProperties
    simpleContainer?: React.CSSProperties
    pageInfo?: React.CSSProperties
  }
  /** Pagination position alignment */
  align?: 'start' | 'center' | 'end'
  /** Enable cursor-based pagination (for lastEvaluatedKey-based pagination) */
  cursorBased?: boolean
  /** Whether there is a next page (for cursor-based pagination) */
  hasNextPage?: boolean
  /** Whether there is a previous page (for cursor-based pagination) */
  hasPreviousPage?: boolean
  /** Callback when next page is clicked (for cursor-based pagination) */
  onNext?: () => void
  /** Callback when previous page is clicked (for cursor-based pagination) */
  onPrevious?: () => void
}

export type PaginationSize = 'lg' | 'md' | 'sm' | (string & {});
export type PaginationCellStyle = 'black' | 'legacyBlue' | 'dlvRed' | (string & {});
export type PaginationStyleType = 'tarmac-01' | (string & {});

/** Text count variant for the text group — maps to Figma Count property */
export type PaginationTextCount = 'single' | 'dual' | 'triple' | 'quad' | (string & {});

export interface PaginationProps extends PaginationConfig {
  /** Discriminator — set to 'tarmac-01' to activate the Tarmac TDS rendering path */
  paginationStyle?: PaginationStyleType;
  /** Number cell active style (Black/Legacy Blue/DLV Red). Only used when paginationStyle is set. */
  cellStyle?: PaginationCellStyle;
  /** Tarmac size variant (lg/md/sm). Only used when paginationStyle is set. */
  tarmacSize?: PaginationSize;
  /** Show the left text group (e.g. "Showing 200"). Maps to Figma "Text right" boolean. */
  showTextLeft?: boolean;
  /** Show the number cell group. Maps to Figma "Number Cells" boolean. */
  showNumberCells?: boolean;
  /** Show the right text group (e.g. "Previous | Next"). Maps to Figma "Text Left" boolean. */
  showTextRight?: boolean;
  /** Disabled state for the Tarmac pagination */
  isDisabled?: boolean;
  /** Show the divider between Previous and Next in the right text group. Maps to Figma "Divider" boolean. Defaults to true. */
  showDivider?: boolean;
  /** Custom icon for the Previous button (defaults to keyboard-arrow-left) */
  prevIcon?: React.ReactNode;
  /** Custom icon for the Next button (defaults to keyboard-arrow-right) */
  nextIcon?: React.ReactNode;
  /** Text count variant for the left text group (single/dual/triple/quad). Defaults to 'single'. */
  textCount?: PaginationTextCount;
  /** Additional text items rendered after the showTotal text, separated by dividers (used in dual/triple/quad counts) */
  textItems?: React.ReactNode[];
  /** Whether to show the page number cell in the left text group (Single count variant). Defaults to true when textCount='single'. */
  showPageCell?: boolean;
  /** Whether to show the icon button in the left text group (Single count variant). Defaults to true when textCount='single'. */
  showLeftIconButton?: boolean;
  /** Callback when the left icon button is clicked */
  onLeftIconButtonClick?: () => void;
}

// ============================================
// Tarmac Internal Components
// ============================================

// ─── TarmacNumberCell ────────────────────────────────────────────────────────

// ─── TarmacNumberCellGroup ───────────────────────────────────────────────────

interface TarmacNumberCellGroupProps {
  pages: (number | string)[]
  current: number
  cellStyle: string
  size: string
  config: PaginationTarmacConfig
  isDisabled: boolean
  onPageChange: (page: number) => void
  onPrev: () => void
  onNext: () => void
  isFirstPage: boolean
  isLastPage: boolean
}

const TarmacNumberCellGroup: React.FC<TarmacNumberCellGroupProps> = ({
  pages,
  current,
  cellStyle,
  size,
  config,
  isDisabled,
  onPageChange,
  onPrev,
  onNext,
  isFirstPage,
  isLastPage,
}) => {
  const groupStyles = buildNumberCellGroupStyles({ config, size, isDisabled })
  const chevronStyles = buildChevronIconStyles({ config, size, isDisabled })
  const ellipsisStyles = buildEllipsisStyles({ config, size, isDisabled })

  // ─── Number cell styles — config-driven with hardcoded fallbacks ─────────
  const sizeConfig = config?.numberCell?.sizes?.[size] || {}
  const styleConfig = config?.numberCell?.styles?.[cellStyle] || {}
  const globalDisabled = config?.states?.disabled || {}

  // Resolve per-style hover/focused states
  const rawHover = config?.numberCell?.states?.hover || {}
  const hoverState = (rawHover as any)?.[cellStyle] || rawHover
  const rawFocused = config?.numberCell?.states?.focused || {}
  const focusedState = (rawFocused as any)?.[cellStyle] || rawFocused
  const disabledState = (config?.numberCell?.states?.disabled || {}) as any

  // Resolve active colors with hardcoded fallbacks
  const activeBg = styleConfig.activeBackgroundColor || '#2b2b2b'
  const activeText = styleConfig.activeTextColor || '#f7f7f7'

  const numberCellBaseStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.width ? `${sizeConfig.width}px` : '40px',
    height: sizeConfig.height ? `${sizeConfig.height}px` : '40px',
    fontFamily: sizeConfig.fontFamily || 'Noto Sans, sans-serif',
    fontSize: sizeConfig.fontSize ? `${sizeConfig.fontSize}px` : '16px',
    lineHeight: sizeConfig.lineHeight ? `${sizeConfig.lineHeight}px` : '24px',
    fontWeight: sizeConfig.fontWeight || '500',
    backgroundColor: '#ffffff',
    color: '#2b2b2b',
    padding: '4px 8px',
    border: 'none',
    borderRadius: '4px',
    cursor: isDisabled ? 'default' : 'pointer',
    transition: 'all 0.15s ease-in-out',
    boxSizing: 'border-box' as const,
    outline: 'none',
    fontVariantNumeric: 'tabular-nums' as const,
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      backgroundColor: 'transparent',
      transition: 'background-color 0.15s ease-in-out',
    },
    '&:hover:not(:disabled)::after': {
      backgroundColor: hoverState.borderTopColor || '#e6e6e6',
    },
    '&:hover:not(:disabled)': {
      color: hoverState.textColor || '#2b2b2b',
    },
    '&:active:not(:disabled)': {
      backgroundColor: activeBg,
      color: activeText,
      borderRadius: '4px',
    },
    '&:active:not(:disabled)::after': {
      backgroundColor: 'transparent',
    },
    '&:focus:not(:disabled)': {
      borderRadius: '4px',
      color: focusedState.textColor || '#2b2b2b',
      boxShadow: `inset 0 0 0 1px ${focusedState.borderColor || '#e6e6e6'}`,
    },
    '&:focus:not(:disabled)::after': {
      backgroundColor: 'transparent',
    },
    '&:disabled': {
      cursor: 'default',
      color: disabledState.textColor || globalDisabled.textColor || '#cdcbcb',
    },
  })

  const numberCellActiveStyles = css({
    backgroundColor: activeBg,
    color: activeText,
    borderRadius: '4px',
    '&::after': {
      backgroundColor: 'transparent !important',
    },
    '&:hover:not(:disabled)': {
      backgroundColor: activeBg,
      color: activeText,
      borderRadius: '4px',
    },
    '&:hover:not(:disabled)::after': {
      backgroundColor: 'transparent !important',
    },
    '&:focus:not(:disabled)': {
      backgroundColor: activeBg,
      color: activeText,
      borderRadius: '4px',
      boxShadow: 'none',
    },
    '&:focus:not(:disabled)::after': {
      backgroundColor: 'transparent !important',
    },
  })

  // Resolve chevron icon size from config (matches Figma Icon Container sizes)
  const groupSizeConfig = config?.numberCellGroup?.sizes?.[size] || {}
  const chevronIconSize = groupSizeConfig.chevronSize || 24

  return (
    <div className={groupStyles} data-testid="pagination-number-cell-group">
      <button
        className={chevronStyles}
        onClick={onPrev}
        disabled={isDisabled || isFirstPage}
        aria-label="Previous page"
        style={{ background: 'none', border: 'none' }}
      >
        <KeyboardArrowLeft size={chevronIconSize} />
      </button>

      <div className="pagination-number-cells" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {pages.map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={idx}
              className={cx(numberCellBaseStyles, page === current && numberCellActiveStyles)}
              onClick={() => onPageChange(page)}
              disabled={isDisabled}
              aria-label={`Page ${page}`}
              aria-current={page === current ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className={ellipsisStyles} aria-hidden="true">
              ...
            </span>
          )
        )}
      </div>

      <button
        className={chevronStyles}
        onClick={onNext}
        disabled={isDisabled || isLastPage}
        aria-label="Next page"
        style={{ background: 'none', border: 'none' }}
      >
        <KeyboardArrowRight size={chevronIconSize} />
      </button>
    </div>
  )
}

// ─── TarmacTextCell ──────────────────────────────────────────────────────────

interface TarmacTextCellProps {
  label: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  onClick?: () => void
  isDisabled: boolean
  size: string
  config: PaginationTarmacConfig
  showText?: boolean
  ariaLabel?: string
}

const TarmacTextCell: React.FC<TarmacTextCellProps> = ({
  label,
  leadingIcon,
  trailingIcon,
  onClick,
  isDisabled,
  size,
  config,
  showText = true,
  ariaLabel,
}) => {
  const styles = buildTextCellStyles({ config, size, isDisabled })

  return (
    <button
      className={styles}
      onClick={() => onClick?.()}
      disabled={isDisabled}
      aria-label={ariaLabel || label}
    >
      {leadingIcon && <span className="pagination-text-cell-icon">{leadingIcon}</span>}
      {showText && <span>{label}</span>}
      {trailingIcon && <span className="pagination-text-cell-icon">{trailingIcon}</span>}
    </button>
  )
}

// ─── TarmacTextGroup ─────────────────────────────────────────────────────────

interface TarmacTextGroupProps {
  position: 'left' | 'right'
  size: string
  config: PaginationTarmacConfig
  isDisabled: boolean
  // Left group props
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
  total?: number
  pageSize?: number
  currentPage?: number
  // Right group props
  onPrev?: () => void
  onNext?: () => void
  isFirstPage?: boolean
  isLastPage?: boolean
  // Custom icons
  prevIcon?: React.ReactNode
  nextIcon?: React.ReactNode
  // Text group customization (left group)
  textCount?: PaginationTextCount
  textItems?: React.ReactNode[]
  showPageCell?: boolean
  showLeftIconButton?: boolean
  onLeftIconButtonClick?: () => void
  cellStyle?: string
  totalPages?: number
  // Divider toggle (right group)
  showDivider?: boolean
}

const TarmacTextGroup: React.FC<TarmacTextGroupProps> = ({
  position,
  size,
  config,
  isDisabled,
  showTotal,
  total = 0,
  pageSize = 10,
  currentPage = 1,
  onPrev,
  onNext,
  isFirstPage = false,
  isLastPage = false,
  prevIcon,
  nextIcon,
  textCount = 'single',
  textItems = [],
  showPageCell = true,
  showLeftIconButton = true,
  onLeftIconButtonClick,
  cellStyle = 'black',
  totalPages = 1,
  showDivider = true,
}) => {
  const groupStyles = buildTextGroupStyles({ config, position, size, textCount: position === 'left' ? textCount : undefined })
  const dividerStyles = buildDividerStyles(config)
  const sizeConfig = config?.textCell?.sizes?.[size] || {}

  if (position === 'left') {
    const rangeStart = (currentPage - 1) * pageSize + 1
    const rangeEnd = Math.min(currentPage * pageSize, total)

    if (textCount !== 'single') {
      // Dual/Triple/Quad: [showTotal text] [divider] [text] [divider] [text] ...
      // Each text item gets padding to match Figma .Pagination text cell layout
      const cellPadding = config?.textCell?.padding || 4
      const textItemStyles = css({
        display: 'inline-flex',
        alignItems: 'center',
        padding: typeof cellPadding === 'number' ? `${cellPadding}px` : `${cellPadding}px`,
      })
      return (
        <div className={groupStyles} data-testid="pagination-text-group-left">
          {showTotal && (
            <span className={textItemStyles}>{showTotal(total, [rangeStart, rangeEnd])}</span>
          )}
          {textItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className={dividerStyles} role="separator" />
              <span className={textItemStyles}>{item}</span>
            </React.Fragment>
          ))}
        </div>
      )
    }

    // Single: [showTotal text] [number cell (optional)] [icon button (optional)]
    // Number cell uses one size smaller than the text group size (Figma: Focused state, bordered)
    const cellSizeKey = size === 'lg' ? 'md' : size === 'md' ? 'sm' : 'xs'
    const numberCellSizeConfig = config?.numberCell?.sizes?.[cellSizeKey] || {}
    const focusedState = ((config?.numberCell?.states?.focused || {}) as any)?.[cellStyle] || {}

    const pageCellStyles = css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: numberCellSizeConfig.width ? `${numberCellSizeConfig.width}px` : '34px',
      height: numberCellSizeConfig.height ? `${numberCellSizeConfig.height}px` : '34px',
      fontFamily: numberCellSizeConfig.fontFamily || 'Noto Sans, sans-serif',
      fontSize: numberCellSizeConfig.fontSize ? `${numberCellSizeConfig.fontSize}px` : '14px',
      lineHeight: numberCellSizeConfig.lineHeight ? `${numberCellSizeConfig.lineHeight}px` : '20px',
      fontWeight: numberCellSizeConfig.fontWeight || '500',
      backgroundColor: '#ffffff',
      color: '#2b2b2b',
      padding: '4px 8px',
      border: `1px solid ${focusedState.borderColor || '#e6e5e5'}`,
      borderRadius: '4px',
      cursor: isDisabled ? 'default' : 'pointer',
      transition: 'all 0.15s ease-in-out',
      boxSizing: 'border-box' as const,
      outline: 'none',
      textAlign: 'center' as const,
      fontVariantNumeric: 'tabular-nums' as const,
      '&:focus': {
        boxShadow: `inset 0 0 0 1px ${focusedState.borderColor || '#e6e5e5'}`,
        outline: 'none',
      },
    })

    if (textCount === 'single') {
      // Single: [showTotal text] [number cell] [icon button]
      return (
        <div className={groupStyles} data-testid="pagination-text-group-left">
          {showTotal && (
            <span>{showTotal(total, [rangeStart, rangeEnd])}</span>
          )}
          {showPageCell && (
            <span className={pageCellStyles} data-testid="pagination-page-cell" tabIndex={0}>
              {totalPages}
            </span>
          )}
          {showLeftIconButton && (
            <Button
              buttonStyle="primary"
              variant="black"
              size={size === 'lg' ? 'sm' : 'sm'}
              buttonType="iconButton"
              isDisabled={isDisabled}
              onClick={onLeftIconButtonClick}
            >
              <KeyboardArrowRight size={sizeConfig?.iconSize || 24} />
            </Button>
          )}
        </div>
      )
    }

    // Dual/Triple/Quad: [showTotal text] [divider] [text] [divider] [text] ...
    return (
      <div className={groupStyles} data-testid="pagination-text-group-left">
        {showTotal && (
          <span>{showTotal(total, [rangeStart, rangeEnd])}</span>
        )}
        {textItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className={dividerStyles} role="separator" />
            <span>{item}</span>
          </React.Fragment>
        ))}
      </div>
    )
  }

  // Right group: Previous | Next
  return (
    <div className={groupStyles} data-testid="pagination-text-group-right">
      <TarmacTextCell
        label="Previous"
        leadingIcon={prevIcon ?? <KeyboardArrowLeft size={sizeConfig?.iconSize || 24} />}
        onClick={onPrev}
        isDisabled={isDisabled || isFirstPage}
        size={size}
        config={config}
        ariaLabel="Previous page"
      />
      {showDivider && <div className={dividerStyles} role="separator" />}
      <TarmacTextCell
        label="Next"
        trailingIcon={nextIcon ?? <KeyboardArrowRight size={sizeConfig?.iconSize || 24} />}
        onClick={onNext}
        isDisabled={isDisabled || isLastPage}
        size={size}
        config={config}
        ariaLabel="Next page"
      />
    </div>
  )
}

// ─── TarmacPagination ────────────────────────────────────────────────────────

interface TarmacPaginationInternalProps extends PaginationProps {
  paginationStyle: PaginationStyleType
}

const TarmacPagination: React.FC<TarmacPaginationInternalProps> = ({
  cellStyle = 'black',
  tarmacSize = 'lg',
  showTextLeft = true,
  showNumberCells = true,
  showTextRight = true,
  isDisabled,
  current: controlledCurrent,
  defaultCurrent = 1,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  total = 0,
  showTotal,
  onChange,
  disabled = false,
  className,
  style,
  pageSizeOptions,
  showSizeChanger,
  prevIcon,
  nextIcon,
  textCount = 'single',
  textItems,
  showPageCell,
  showLeftIconButton,
  onLeftIconButtonClick,
  showDivider = true,
}) => {
  const { theme } = useTheme()
  const config: PaginationTarmacConfig =
    (theme.components as any)?.pagination_tarmac || (defaultThemeConfig.components as any).pagination_tarmac || {} as PaginationTarmacConfig

  const effectiveDisabled = isDisabled ?? disabled

  // Size mapping from assembled size to sub-component sizes
  const sizeMapping = config.assembled?.sizeMapping?.[tarmacSize] || { numberCell: tarmacSize, textCell: tarmacSize }
  const numberCellSize = sizeMapping.numberCell || tarmacSize
  const textCellSize = sizeMapping.textCell || tarmacSize

  // Page state: controlled or uncontrolled
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent)
  const [internalPageSize] = useState(defaultPageSize)

  const currentPage = controlledCurrent ?? internalCurrent
  const pageSize = controlledPageSize ?? internalPageSize

  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)
  const clampedCurrent = Math.max(1, Math.min(currentPage, totalPages))

  // Page change handler
  const handlePageChange = useCallback(
    (page: number) => {
      if (!effectiveDisabled && page >= 1 && page <= totalPages) {
        setInternalCurrent(page)
        onChange?.(page, pageSize)
      }
    },
    [effectiveDisabled, totalPages, onChange, pageSize]
  )

  const handlePrev = useCallback(() => {
    if (clampedCurrent > 1) {
      handlePageChange(clampedCurrent - 1)
    }
  }, [clampedCurrent, handlePageChange])

  const handleNext = useCallback(() => {
    if (clampedCurrent < totalPages) {
      handlePageChange(clampedCurrent + 1)
    }
  }, [clampedCurrent, totalPages, handlePageChange])

  // Generate page numbers with ellipsis
  const getPageNumbers = useCallback((): (number | string)[] => {
    const pages: (number | string)[] = []

    // If total pages fit without ellipsis (7 or fewer), show all
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Near start (1,2,3): first 3 ... last 3
    if (clampedCurrent <= 3) {
      for (let i = 1; i <= 3; i++) pages.push(i)
      pages.push('...')
      for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Transition from start (4): first 4 ... last 2
    if (clampedCurrent === 4) {
      for (let i = 1; i <= 4; i++) pages.push(i)
      pages.push('...')
      for (let i = totalPages - 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Near end (last 3): first 3 ... last 3
    if (clampedCurrent >= totalPages - 2) {
      for (let i = 1; i <= 3; i++) pages.push(i)
      pages.push('...')
      for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Transition from end (totalPages - 3): first 2 ... last 4
    if (clampedCurrent === totalPages - 3) {
      for (let i = 1; i <= 2; i++) pages.push(i)
      pages.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Middle: 1 ... (current-1) current (current+1) ... last
    pages.push(1)
    pages.push('...')
    pages.push(clampedCurrent - 1)
    pages.push(clampedCurrent)
    pages.push(clampedCurrent + 1)
    pages.push('...')
    pages.push(totalPages)

    return pages
  }, [totalPages, clampedCurrent])

  const assembledStyles = buildAssembledStyles({ config, size: tarmacSize, isDisabled: effectiveDisabled })
  const pageNumbers = getPageNumbers()

  return (
    <nav
      className={`${assembledStyles}${className ? ` ${className}` : ''}`}
      style={style}
      role="navigation"
      aria-label="Pagination"
    >
      {showTextLeft && (
        <TarmacTextGroup
          position="left"
          size={textCellSize}
          config={config}
          isDisabled={effectiveDisabled}
          showTotal={showTotal}
          total={total}
          pageSize={pageSize}
          currentPage={clampedCurrent}
          textCount={textCount}
          textItems={textItems}
          showPageCell={showPageCell ?? (textCount === 'single')}
          showLeftIconButton={showLeftIconButton ?? (textCount === 'single')}
          onLeftIconButtonClick={onLeftIconButtonClick}
          cellStyle={cellStyle}
          totalPages={totalPages}
        />
      )}

      {showNumberCells && (
        <TarmacNumberCellGroup
          pages={pageNumbers}
          current={clampedCurrent}
          cellStyle={cellStyle}
          size={numberCellSize}
          config={config}
          isDisabled={effectiveDisabled}
          onPageChange={handlePageChange}
          onPrev={handlePrev}
          onNext={handleNext}
          isFirstPage={clampedCurrent === 1}
          isLastPage={clampedCurrent === totalPages}
        />
      )}

      {showTextRight && (
        <TarmacTextGroup
          position="right"
          size={textCellSize}
          config={config}
          isDisabled={effectiveDisabled}
          onPrev={handlePrev}
          onNext={handleNext}
          isFirstPage={clampedCurrent === 1}
          isLastPage={clampedCurrent === totalPages}
          prevIcon={prevIcon}
          nextIcon={nextIcon}
          showDivider={showDivider}
        />
      )}
    </nav>
  )
}

// ============================================
// Pagination Component
// ============================================

export const Pagination: React.FC<PaginationProps> = ({
  current: controlledCurrent,
  defaultCurrent = 1,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  total = 0,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper = false,
  showTotal,
  size = 'default',
  simple = false,
  hideOnSinglePage = false,
  onChange,
  onShowSizeChange,
  disabled = false,
  className,
  style,
  classNames = {},
  styles = {},
  align = 'end',
  cursorBased = false,
  hasNextPage = false,
  hasPreviousPage = false,
  onNext,
  onPrevious,
  paginationStyle,
  cellStyle,
  tarmacSize,
  showTextLeft,
  showNumberCells,
  showTextRight,
  isDisabled,
  prevIcon,
  nextIcon,
  textCount,
  textItems,
  showPageCell,
  showLeftIconButton,
  onLeftIconButtonClick,
  showDivider,
}) => {
  // ─── Discriminator Branch ──────────────────────────────────────────────────
  if (paginationStyle) {
    return (
      <TarmacPagination
        paginationStyle={paginationStyle}
        cellStyle={cellStyle}
        tarmacSize={tarmacSize}
        showTextLeft={showTextLeft}
        showNumberCells={showNumberCells}
        showTextRight={showTextRight}
        isDisabled={isDisabled}
        current={controlledCurrent}
        defaultCurrent={defaultCurrent}
        pageSize={controlledPageSize}
        defaultPageSize={defaultPageSize}
        total={total}
        showTotal={showTotal}
        onChange={onChange}
        disabled={disabled}
        className={className}
        style={style}
        pageSizeOptions={pageSizeOptions}
        showSizeChanger={showSizeChanger}
        prevIcon={prevIcon}
        nextIcon={nextIcon}
        textCount={textCount}
        textItems={textItems}
        showPageCell={showPageCell}
        showLeftIconButton={showLeftIconButton}
        onLeftIconButtonClick={onLeftIconButtonClick}
        showDivider={showDivider}
      />
    )
  }
  const { theme } = useTheme()
  const paginationTheme =
    theme.components?.pagination || defaultThemeConfig.components.pagination

  // Internal state for uncontrolled mode
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent)
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize)
  const [jumpValue, setJumpValue] = useState('')

  // Use controlled or uncontrolled values
  const current = controlledCurrent ?? internalCurrent
  const pageSize = controlledPageSize ?? internalPageSize

  const totalPages = Math.ceil(total / pageSize)

  // Styles
  const isSmall = size === 'small'
  const sizeKey = isSmall ? 'small' : 'default'

  // Map align prop to justifyContent
  const justifyContentMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    'space-between': 'space-between',
  }
  const justifyContent =
    justifyContentMap[align as keyof typeof justifyContentMap] || align

  const containerStyles = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: justifyContent,
    padding: isSmall
      ? paginationTheme?.container?.padding || '12px 0'
      : paginationTheme?.container?.padding || '16px 0',
    gap: isSmall
      ? paginationTheme?.container?.gap || '12px'
      : paginationTheme?.container?.gap || '16px',
    fontSize: isSmall
      ? paginationTheme?.sizes?.[sizeKey]?.fontSize || '12px'
      : paginationTheme?.sizes?.[sizeKey]?.fontSize || '14px',
    height: '100%',
    width: '100%',
  })

  const buttonStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth:
      paginationTheme?.sizes?.[sizeKey]?.minWidth ||
      (isSmall ? '28px' : '32px'),
    height:
      paginationTheme?.sizes?.[sizeKey]?.height || (isSmall ? '28px' : '32px'),
    padding:
      paginationTheme?.sizes?.[sizeKey]?.padding ||
      (isSmall ? '0 6px' : '0 8px'),
    border: `1px solid ${paginationTheme?.button?.borderColor || '#d9d9d9'}`,
    borderRadius: paginationTheme?.button?.borderRadius || '6px',
    backgroundColor: paginationTheme?.button?.backgroundColor || '#fff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize:
      paginationTheme?.sizes?.[sizeKey]?.fontSize ||
      (isSmall ? '12px' : '14px'),
    transition: paginationTheme?.base?.transition || 'all 0.2s ease',
    '&:hover:not(:disabled)': {
      borderColor: paginationTheme?.button?.hoverBorderColor || '#1677ff',
      color: paginationTheme?.button?.hoverColor || '#1677ff',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      color: paginationTheme?.button?.disabledTextColor || '#d9d9d9',
      backgroundColor:
        paginationTheme?.button?.disabledBackgroundColor || '#f5f5f5',
    },
  })

  const activeButtonStyles = css({
    backgroundColor:
      paginationTheme?.activeButton?.backgroundColor || '#1677ff',
    border: 'none',
    color: paginationTheme?.activeButton?.color || '#fff',
    fontWeight: paginationTheme?.activeButton?.fontWeight || '500',
    '&:hover': {
      backgroundColor:
        paginationTheme?.activeButton?.hoverBackgroundColor || '#1677ff',
      color: paginationTheme?.activeButton?.hoverColor || '#fff !important',
    },
  })

  const navButtonStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth:
      paginationTheme?.sizes?.[sizeKey]?.minWidth ||
      (isSmall ? '28px' : '32px'),
    height:
      paginationTheme?.sizes?.[sizeKey]?.height || (isSmall ? '28px' : '32px'),
    padding:
      paginationTheme?.sizes?.[sizeKey]?.padding ||
      (isSmall ? '0 6px' : '0 8px'),
    border: 'none',
    borderRadius: paginationTheme?.button?.borderRadius || '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize:
      paginationTheme?.navButton?.fontSize || (isSmall ? '16px' : '18px'),
    lineHeight: '1',
    transition: paginationTheme?.base?.transition || 'all 0.2s ease',
    backgroundColor:
      paginationTheme?.navButton?.backgroundColor || 'transparent',
    margin: '0 0.25rem',
    '&:hover:not(:disabled)': {
      borderColor: paginationTheme?.navButton?.hoverBorderColor || '#1677ff',
      color: paginationTheme?.navButton?.hoverColor || '#1677ff',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      color: paginationTheme?.navButton?.disabledColor || '#d9d9d9',
    },
  })

  const selectStyles = css({
    height: paginationTheme?.select?.height || (isSmall ? '28px' : '32px'),
    padding: paginationTheme?.select?.padding || '0 8px',
    border: `1px solid ${paginationTheme?.select?.borderColor || '#d9d9d9'}`,
    borderRadius: paginationTheme?.select?.borderRadius || '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: paginationTheme?.select?.fontSize || (isSmall ? '12px' : '14px'),
  })

  const sizeChangerSelectStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    height: 'auto',
    padding: '0 0 0 0 !important',
    border: 'none !important',
    borderRadius: '0 !important',
    backgroundColor: 'transparent !important',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: `${
      paginationTheme?.select?.fontSize || (isSmall ? '12px' : '14px')
    } !important`,
    color: 'inherit',
    appearance: 'none',
    backgroundImage: 'none',
    outline: 'none',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    width: 'auto',
    minWidth: 'auto',
  })

  const sizeChangerWrapperStyles = css({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
  })

  const iconButtonStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: paginationTheme?.iconButton?.width || (isSmall ? '28px' : '32px'),
    height: paginationTheme?.iconButton?.height || (isSmall ? '28px' : '32px'),
    padding: 0,
    border: `1px solid ${
      paginationTheme?.iconButton?.borderColor || '#d9d9d9'
    }`,
    borderRadius: paginationTheme?.iconButton?.borderRadius || '6px',
    backgroundColor: paginationTheme?.iconButton?.backgroundColor || '#fff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize:
      paginationTheme?.iconButton?.fontSize || (isSmall ? '12px' : '14px'),
    transition: paginationTheme?.base?.transition || 'all 0.2s ease',
    '&:hover:not(:disabled)': {
      borderColor: paginationTheme?.iconButton?.hoverBorderColor || '#1677ff',
      color: paginationTheme?.iconButton?.hoverColor || '#1677ff',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      color: paginationTheme?.iconButton?.disabledColor || '#d9d9d9',
      backgroundColor:
        paginationTheme?.iconButton?.disabledBackgroundColor || '#f5f5f5',
    },
  })

  const inputStyles = css({
    width: paginationTheme?.input?.width || (isSmall ? '44px' : '50px'),
    height: paginationTheme?.input?.height || (isSmall ? '28px' : '32px'),
    padding: paginationTheme?.input?.padding || '0 8px',
    border: `1px solid ${paginationTheme?.input?.borderColor || '#d9d9d9'}`,
    borderRadius: paginationTheme?.input?.borderRadius || '6px',
    textAlign: paginationTheme?.input?.textAlign || 'center',
    fontSize: paginationTheme?.input?.fontSize || (isSmall ? '12px' : '14px'),
  })

  const simpleStyles = css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  })

  // Handlers
  const handlePageChange = useCallback(
    (page: number) => {
      if (!disabled && page >= 1 && page <= totalPages) {
        setInternalCurrent(page)
        onChange?.(page)
      }
    },
    [disabled, totalPages, onChange]
  )

  const handleNext = useCallback(() => {
    if (cursorBased) {
      if (hasNextPage && !disabled && onNext) {
        onNext()
      }
    } else {
      if (current < totalPages && !disabled) {
        handlePageChange(current + 1)
      }
    }
  }, [
    cursorBased,
    hasNextPage,
    disabled,
    onNext,
    current,
    totalPages,
    handlePageChange,
  ])

  const handlePrev = useCallback(() => {
    if (cursorBased) {
      if (hasPreviousPage && !disabled && onPrevious) {
        onPrevious()
      }
    } else {
      if (current > 1 && !disabled) {
        handlePageChange(current - 1)
      }
    }
  }, [
    cursorBased,
    hasPreviousPage,
    disabled,
    onPrevious,
    current,
    handlePageChange,
  ])

  const handleSizeChange = useCallback(
    (value: number) => {
      setInternalPageSize(value)
      setInternalCurrent(1)
      onShowSizeChange?.(1, value)
      onChange?.(1, value)
    },
    [onShowSizeChange, onChange]
  )

  const handleJump = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const page = parseInt(jumpValue, 10)
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
          handlePageChange(page)
          setJumpValue('')
        }
      }
    },
    [jumpValue, totalPages, handlePageChange]
  )

  const handleJumpSubmit = useCallback(() => {
    const page = parseInt(jumpValue, 10)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page)
      setJumpValue('')
    }
  }, [jumpValue, totalPages, handlePageChange])

  const handleJumpClear = useCallback(() => {
    setJumpValue('')
  }, [])

  // Generate page numbers
  const getPageNumbers = useCallback(() => {
    const pages: (number | string)[] = []
    const showPages = 5

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (current > 3) {
        pages.push('...')
      }

      const start = Math.max(2, current - 1)
      const end = Math.min(totalPages - 1, current + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (current < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }, [totalPages, current])

  // Hide on single page
  if (hideOnSinglePage && totalPages <= 1) {
    return null
  }

  // Cursor-based pagination rendering (for lastEvaluatedKey-based pagination)
  if (cursorBased) {
    return (
      <div
        className={cx(containerStyles, className, classNames.container)}
        style={{ ...style, ...styles.container }}
      >
        {showTotal && current && (
          <span
            className={`${classNames.total} text-body-one-liner text-primary`}
            style={styles.total}
          >
            {showTotal(total, [
              (current - 1) * pageSize + 1,
              Math.min(current * pageSize, total),
            ])}
          </span>
        )}

        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <button
            className={cx(navButtonStyles, classNames.navButton)}
            style={styles.navButton}
            onClick={handlePrev}
            disabled={!hasPreviousPage || disabled}
            aria-label='Previous page'
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className='text-body-one-liner'
            />
          </button>

          {current && (
            <span
              className={`${classNames.pageInfo} text-body-paragraph text-text-primary`}
              style={{
                padding: '0 8px',
                ...styles.pageInfo,
              }}
            >
              Page {current}
            </span>
          )}

          <button
            className={cx(navButtonStyles, classNames.navButton)}
            style={styles.navButton}
            onClick={handleNext}
            disabled={!hasNextPage || disabled}
            aria-label='Next page'
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className='text-body-one-liner'
            />
          </button>
        </div>

        {showSizeChanger && (
          <Dropdown
            options={pageSizeOptions.map((size) => ({
              label: size,
              value: size,
            }))}
            className={cx(
              sizeChangerSelectStyles,
              classNames.sizeChangerSelect
            )}
            value={pageSize}
            onChange={(value) => handleSizeChange(value as number)}
            disabled={disabled}
            aria-label='Items per page'
            style={{
              paddingRight: isSmall ? '16px' : '18px',
              minWidth: 'auto',
              width: 'auto',
              ...styles.sizeChangerSelect,
            }}
            classNames={{ input: '!text-primary !text-label' }}
          />
        )}
      </div>
    )
  }

  // Simple mode rendering
  if (simple) {
    return (
      <div
        className={cx(containerStyles, className, classNames.container)}
        style={{ ...style, ...styles.container }}
      >
        <div
          className={cx(simpleStyles, classNames.simpleContainer)}
          style={styles.simpleContainer}
        >
          <button
            className={cx(navButtonStyles, classNames.navButton)}
            style={styles.navButton}
            onClick={handlePrev}
            disabled={current === 1 || disabled}
            aria-label='Previous page'
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className='text-body-one-liner'
            />
          </button>
          <span>
            <input
              type='number'
              className={cx(inputStyles, classNames.input)}
              style={styles.input}
              value={current}
              onChange={(e) => {
                const page = parseInt(e.target.value, 10)
                if (!isNaN(page)) handlePageChange(page)
              }}
              disabled={disabled}
              aria-label='Current page'
            />
            <span style={{ margin: '0 8px' }}>/</span>
            <span>{totalPages}</span>
          </span>
          <button
            className={cx(navButtonStyles, classNames.navButton)}
            style={styles.navButton}
            onClick={handleNext}
            disabled={current === totalPages || disabled}
            aria-label='Next page'
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className='text-body-one-liner'
            />
          </button>
        </div>
      </div>
    )
  }

  // Render integrated "Showing X results" with size changer
  const renderTotalWithSizeChanger = () => {
    if (!showTotal) return null

    const range: [number, number] = [
      (current - 1) * pageSize + 1,
      Math.min(current * pageSize, total),
    ]
    const totalText = showTotal(total, range)

    if (showSizeChanger) {
      // Try to extract text from ReactNode for string manipulation
      let textContent = ''
      if (typeof totalText === 'string') {
        textContent = totalText
      } else if (React.isValidElement(totalText)) {
        const props = totalText.props as { children?: string }
        if (typeof props?.children === 'string') {
          textContent = props.children
        }
      }

      if (textContent) {
        // Match pattern like "Showing 200 results" or "Showing 1-200 of 1000"
        const match =
          textContent.match(/(Showing\s*)(\d+)(\s*results?)/i) ||
          textContent.match(/(Showing\s*\d+-\d+\s*of\s*)(\d+)(\s*results?)/i)

        if (match) {
          const beforeNumber = match[1] || ''
          const afterNumber = match[3] || ' results'

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <span className={classNames.total} style={styles.total}>
                {beforeNumber}
              </span>
              <div
                className={cx(
                  sizeChangerWrapperStyles,
                  classNames.sizeChangerWrapper
                )}
                style={{ margin: '0 4px', ...styles.sizeChangerWrapper }}
              >
                <Dropdown
                  options={pageSizeOptions.map((size) => ({
                    label: size,
                    value: size,
                  }))}
                  value={pageSize}
                  onChange={(value) => handleSizeChange(value as number)}
                  disabled={disabled}
                  aria-label='Items per page'
                  style={{
                    paddingRight: isSmall ? '16px' : '18px',
                    minWidth: 'auto',
                    width: 'auto',
                    ...styles.sizeChangerSelect,
                  }}
                  classNames={{ input: '!text-primary !text-label' }}
                />
              </div>
              <span className={classNames.total} style={styles.total}>
                {afterNumber}
              </span>
            </div>
          )
        }
      }

      // Fallback: render default "Showing X results" format
      return (
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0' }}
          className='text-primary text-body-one-liner'
        >
          <span
            className={`${classNames.total} text-body-one-liner text-primary mr-1`}
            style={styles.total}
          >
            Showing
          </span>
          <div
            className={cx(
              sizeChangerWrapperStyles,
              classNames.sizeChangerWrapper
            )}
            style={{ margin: '0 8px', ...styles.sizeChangerWrapper }}
          >
            <Dropdown
              options={pageSizeOptions.map((size) => ({
                label: size,
                value: size,
              }))}
              className={cx(
                sizeChangerSelectStyles,
                classNames.sizeChangerSelect
              )}
              value={pageSize}
              onChange={(value) => handleSizeChange(value as number)}
              disabled={disabled}
              aria-label='Items per page'
              style={{
                paddingRight: isSmall ? '16px' : '18px',
                minWidth: 'auto',
                width: 'auto',
                ...styles.sizeChangerSelect,
              }}
              classNames={{ input: '!text-primary !text-label' }}
            />
          </div>
          <span className={classNames.total} style={styles.total}>
            results
          </span>
        </div>
      )
    }

    return (
      <span className={classNames.total} style={styles.total}>
        {totalText}
      </span>
    )
  }

  return (
    <div
      className={cx(containerStyles, className, classNames.container)}
      style={{ ...style, ...styles.container }}
    >
      {renderTotalWithSizeChanger()}

      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <button
          className={cx(navButtonStyles, classNames.navButton)}
          style={styles.navButton}
          onClick={handlePrev}
          disabled={current === 1 || disabled}
          aria-label='Previous page'
        >
          <FontAwesomeIcon icon={faArrowLeft} className='text-body-one-liner' />
        </button>

        {getPageNumbers().map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={idx}
              className={cx(
                buttonStyles,
                page === current && activeButtonStyles,
                page === current
                  ? classNames.activePageButton
                  : classNames.pageButton
              )}
              style={
                page === current ? styles.activePageButton : styles.pageButton
              }
              onClick={() => handlePageChange(page)}
              disabled={disabled}
              aria-label={`Page ${page}`}
              aria-current={page === current ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span
              key={idx}
              className={classNames.ellipsis}
              style={{
                padding: paginationTheme?.ellipsis?.padding || '0 8px',
                lineHeight:
                  paginationTheme?.ellipsis?.lineHeight ||
                  (isSmall ? '28px' : '32px'),
                color: 'inherit',
                ...styles.ellipsis,
              }}
            >
              {page}
            </span>
          )
        )}

        <button
          className={cx(navButtonStyles, classNames.navButton)}
          style={styles.navButton}
          onClick={handleNext}
          disabled={current === totalPages || disabled || totalPages === 0}
          aria-label='Next page'
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className='text-body-one-liner'
          />
        </button>
      </div>

      {showSizeChanger && !showTotal && (
        <Dropdown
          options={pageSizeOptions.map((size) => ({
            label: size,
            value: size,
          }))}
          className={cx(selectStyles, classNames.select)}
          style={styles.select}
          value={pageSize}
          onChange={(value) => handleSizeChange(value as number)}
          disabled={disabled}
          aria-label='Items per page'
        />
      )}

      {showQuickJumper && (
        <div
          className={classNames.quickJumper}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            ...styles.quickJumper,
          }}
        >
          <span>Go to Page</span>
          <input
            type='number'
            className={cx(inputStyles, classNames.input)}
            style={styles.input}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={handleJump}
            disabled={disabled}
            aria-label='Jump to page'
          />
          <button
            className={cx(iconButtonStyles, classNames.iconButton)}
            style={styles.iconButton}
            onClick={handleJumpClear}
            disabled={disabled || !jumpValue}
            aria-label='Clear'
            type='button'
          >
            ×
          </button>
          <button
            className={cx(iconButtonStyles, classNames.iconButton)}
            style={styles.iconButton}
            onClick={handleJumpSubmit}
            disabled={disabled || !jumpValue}
            aria-label='Go to page'
            type='button'
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className='text-body-one-liner'
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default Pagination
