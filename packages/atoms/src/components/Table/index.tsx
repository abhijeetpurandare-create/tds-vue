import React, {
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { css, cx } from '@emotion/css'
import type {
  TableProps,
  TableRef,
  ColumnType,
  ColumnProps,
  ColumnGroupProps,
  SummaryProps,
  SummaryCellProps,
  SummaryRowProps,
  PaginationConfig,
  RowFooterConfig,
  TabConfig,
  SearchConfig,
  FilterConfig,
  ActionConfig,
} from './types'
import {
  SortOrder,
  SELECTION_COLUMN,
  EXPAND_COLUMN,
  SELECTION_ALL,
  SELECTION_INVERT,
  SELECTION_NONE,
} from './types'
import type { Key } from 'react'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import type { TableConfig } from '../../types/types'
import { buildTableStyles } from './useTableStyles'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Chip from '../Chip'
import Spinner from '../Spinner'
import type { TableStyleMap } from './useTableStyles'

// ============================================
// Size Configuration
// ============================================

const getSizeConfig = (size: string, theme: TableConfig) => {
  const sizes = theme.sizes || defaultThemeConfig.components.table!.sizes!
  return sizes[size as keyof typeof sizes] || sizes.medium!
}

// ============================================
// Icons
// ============================================

interface SortIconProps {
  active?: boolean
  size?: string
  activeColor?: string
  inactiveColor?: string
  theme?: TableConfig
}

const SortUpIcon: React.FC<SortIconProps> = ({
  active,
  size,
  activeColor,
  inactiveColor,
  theme,
}) => {
  const defaultTheme = theme || defaultThemeConfig.components.table!
  const sorterTheme = defaultTheme.sorter!
  return (
    <svg
      width={size || sorterTheme.iconSize}
      height={size || sorterTheme.iconSize}
      viewBox="0 0 10 6"
      fill={active ? activeColor || sorterTheme.activeColor : inactiveColor || sorterTheme.inactiveColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 0L10 6H0L5 0Z" />
    </svg>
  )
}

const SortDownIcon: React.FC<SortIconProps> = ({
  active,
  size,
  activeColor,
  inactiveColor,
  theme,
}) => {
  const defaultTheme = theme || defaultThemeConfig.components.table!
  const sorterTheme = defaultTheme.sorter!
  return (
    <svg
      width={size || sorterTheme.iconSize}
      height={size || sorterTheme.iconSize}
      viewBox="0 0 10 6"
      fill={active ? activeColor || sorterTheme.activeColor : inactiveColor || sorterTheme.inactiveColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 6L0 0H10L5 6Z" />
    </svg>
  )
}

interface CheckboxIconProps {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  checkedColor?: string
  borderColor?: string
  disabledBorderColor?: string
  disabledBackgroundColor?: string
  theme?: TableConfig
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  checked,
  indeterminate,
  disabled,
  checkedColor,
  borderColor,
  disabledBorderColor,
  disabledBackgroundColor,
  theme,
}) => {
  const defaultTheme = theme || defaultThemeConfig.components.table!
  const selectionTheme = defaultTheme.selection!
  
  const strokeColor = disabled
    ? disabledBorderColor || selectionTheme.disabledBorderColor
    : checked || indeterminate
    ? checkedColor || selectionTheme.checkedColor
    : borderColor || selectionTheme.borderColor
  const bgColor = disabled
    ? disabledBackgroundColor || selectionTheme.disabledBackgroundColor
    : checked || indeterminate
    ? checkedColor || selectionTheme.checkedColor
    : 'transparent'

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill={bgColor} stroke={strokeColor} />
      {checked && !indeterminate && (
        <path
          d="M12 5L6.5 10.5L4 8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
      {indeterminate && <rect x="4" y="7" width="8" height="2" rx="1" fill="white" />}
    </svg>
  )
}

interface RadioIconProps {
  checked?: boolean
  disabled?: boolean
  checkedColor?: string
  borderColor?: string
  disabledBorderColor?: string
  theme?: TableConfig
}

const RadioIcon: React.FC<RadioIconProps> = ({
  checked,
  disabled,
  checkedColor,
  borderColor,
  disabledBorderColor,
  theme,
}) => {
  const defaultTheme = theme || defaultThemeConfig.components.table!
  const selectionTheme = defaultTheme.selection!
  
  const strokeColor = disabled 
    ? disabledBorderColor || selectionTheme.disabledBorderColor 
    : checked 
    ? checkedColor || selectionTheme.checkedColor 
    : borderColor || selectionTheme.borderColor
  const innerColor = disabled 
    ? disabledBorderColor || selectionTheme.disabledBorderColor 
    : checkedColor || selectionTheme.checkedColor

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" fill="white" stroke={strokeColor} strokeWidth="1" />
      {checked && <circle cx="8" cy="8" r="4" fill={innerColor} />}
    </svg>
  )
}

interface LoadingSpinnerProps {
  size?: number
  spinnerColor?: string
  trackColor?: string
  theme?: TableConfig
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  spinnerColor,
  trackColor,
  theme,
}) => {
  const defaultTheme = theme || defaultThemeConfig.components.table!
  const loadingTheme = defaultTheme.loading!
  
  return (
    <svg
      width={size || parseInt(loadingTheme.spinnerSize!)}
      height={size || parseInt(loadingTheme.spinnerSize!)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={css({
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      })}
    >
      <circle cx="12" cy="12" r="10" stroke={trackColor || loadingTheme.trackColor} strokeWidth="3" fill="none" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12"
        stroke={spinnerColor || loadingTheme.spinnerColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

interface EmptyIconProps {
  iconFill?: string
  iconStroke?: string
  theme?: TableConfig
}

const EmptyIcon: React.FC<EmptyIconProps> = ({
  iconFill,
  iconStroke,
  theme,
}) => {
  const defaultTheme = theme || defaultThemeConfig.components.table!
  const emptyTheme = defaultTheme.empty!
  
  return (
    <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <ellipse fill={iconFill || emptyTheme.iconFill} cx="32" cy="33" rx="32" ry="7" />
        <g fillRule="nonzero" stroke={iconStroke || emptyTheme.iconStroke}>
          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
          <path
            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
            fill={iconFill || emptyTheme.iconFill}
          />
        </g>
      </g>
    </svg>
  )
}

const SearchIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ChevronDownIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ============================================
// Utility Functions
// ============================================

const getRowKey = <RecordType,>(
  record: RecordType,
  rowKey: string | ((record: RecordType, index?: number) => Key) | undefined,
  index: number
): Key => {
  if (typeof rowKey === 'function') {
    return rowKey(record, index)
  }
  if (typeof rowKey === 'string') {
    return (record as Record<string, unknown>)[rowKey] as Key
  }
  return ((record as Record<string, unknown>)['key'] as Key) ?? index
}

const getValue = <RecordType,>(
  record: RecordType,
  dataIndex: string | string[] | undefined
): unknown => {
  if (!dataIndex) return undefined
  if (Array.isArray(dataIndex)) {
    return dataIndex.reduce((acc: unknown, key: string) => {
      if (acc && typeof acc === 'object') {
        return (acc as Record<string, unknown>)[key]
      }
      return undefined
    }, record)
  }
  return (record as Record<string, unknown>)[dataIndex]
}

// ============================================
// Table Header Cell Component
// ============================================

interface TableHeaderCellProps<RecordType> {
  column: ColumnType<RecordType>
  sortOrder: SortOrder | null
  onSort: (column: ColumnType<RecordType>) => void
  sizeConfig: ReturnType<typeof getSizeConfig>
  bordered: boolean
  headerBgColor?: string
  theme: TableConfig
  isCard?: boolean
  styleMap?: TableStyleMap
}

const TableHeaderCell = <RecordType,>({
  column,
  sortOrder,
  onSort,
  sizeConfig,
  bordered,
  headerBgColor,
  theme,
  isCard,
  styleMap,
}: TableHeaderCellProps<RecordType>) => {
  const hasSorter = !!column.sorter
  const isActive = sortOrder !== null
  const headerTheme = theme.header!
  const baseTheme = theme.base!
  const sorterTheme = theme.sorter!

  // Use style map class as base, then layer on column-specific overrides
  const cellOverrides = css({
    borderBottom: isCard ? 'none' : `1px solid ${baseTheme.borderColor}`,
    borderRight: bordered ? `1px solid ${baseTheme.borderColor}` : 'none',
    textAlign: column.align || 'left',
    whiteSpace: 'nowrap',
    cursor: hasSorter ? 'pointer' : 'default',
    userSelect: 'none',
    '&:hover': hasSorter ? { backgroundColor: headerTheme.hoverBackgroundColor } : {},
    '&:last-child': { borderRight: 'none' },
  })

  const sorterStyles = styleMap
    ? cx(styleMap.sortIndicator, css({
        alignItems: 'center',
        marginLeft: '8px',
        verticalAlign: 'middle',
      }))
    : css({
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '8px',
        gap: sorterTheme.gap,
        verticalAlign: 'middle',
      })

  const handleClick = () => {
    if (hasSorter) {
      onSort(column)
    }
  }

  return (
    <th
      className={styleMap ? cx(styleMap.headerCell, cellOverrides) : cx(css({
        padding: sizeConfig.headerPadding,
        fontSize: sizeConfig.headerFontSize,
        fontWeight: headerTheme.fontWeight,
        color: headerTheme.textColor,
        backgroundColor: headerBgColor || headerTheme.backgroundColor,
        transition: baseTheme.transition,
      }), cellOverrides)}
      style={{ width: column.width, minWidth: column.minWidth, ...column.style }}
      onClick={handleClick}
      colSpan={column.colSpan}
      rowSpan={column.rowSpan}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            column.align === 'center'
              ? 'center'
              : column.align === 'right'
              ? 'flex-end'
              : 'flex-start',
        }}
      >
        <span>{column.title}</span>
        {hasSorter && (
          <span className={sorterStyles}>
            <SortUpIcon
              active={isActive && sortOrder === SortOrder.ASCEND}
              size={sorterTheme.iconSize}
              activeColor={sorterTheme.activeColor}
              inactiveColor={sorterTheme.inactiveColor}
              theme={theme}
            />
            <SortDownIcon
              active={isActive && sortOrder === SortOrder.DESCEND}
              size={sorterTheme.iconSize}
              activeColor={sorterTheme.activeColor}
              inactiveColor={sorterTheme.inactiveColor}
              theme={theme}
            />
          </span>
        )}
      </div>
    </th>
  )
}

// ============================================
// Table Body Cell Component
// ============================================

interface TableBodyCellProps<RecordType> {
  record: RecordType
  column: ColumnType<RecordType>
  index: number
  sizeConfig: ReturnType<typeof getSizeConfig>
  bordered: boolean
  theme: TableConfig
  isCard?: boolean
  styleMap?: TableStyleMap
}

const TableBodyCell = <RecordType,>({
  record,
  column,
  index,
  sizeConfig,
  bordered,
  theme,
  isCard,
  styleMap,
}: TableBodyCellProps<RecordType>) => {
  const value = getValue(record, column.dataIndex)
  const bodyTheme = theme.body!
  const baseTheme = theme.base!

  // Column-specific overrides that can't be pre-built
  const cellOverrides = css({
    borderBottom: isCard ? 'none' : `1px solid ${baseTheme.borderColor}`,
    borderRight: bordered ? `1px solid ${baseTheme.borderColor}` : 'none',
    textAlign: column.align || 'left',
    overflow: column.ellipsis ? 'hidden' : 'visible',
    textOverflow: column.ellipsis ? 'ellipsis' : 'clip',
    whiteSpace: column.ellipsis ? 'nowrap' : 'normal',
    '&:last-child': { borderRight: 'none' },
  })

  const content = column.render ? column.render(value, record, index) : String(value ?? '')

  const cellProps = column.onCell ? column.onCell(record, index) : {}

  return (
    <td
      className={styleMap ? cx(styleMap.bodyCell, cellOverrides) : cx(css({
        padding: sizeConfig.cellPadding,
        fontSize: sizeConfig.fontSize,
        fontFamily: baseTheme.fontFamily,
        color: bodyTheme.textColor,
      }), cellOverrides)}
      style={{ width: column.width, minWidth: column.minWidth, ...column.style, ...cellProps }}
      onClick={(cellProps as { onClick?: () => void }).onClick}
    >
      {content}
    </td>
  )
}

// ============================================
// Selection Cell Component
// ============================================

interface SelectionCellProps<RecordType> {
  record?: RecordType
  index?: number
  isHeader?: boolean
  checked: boolean
  indeterminate?: boolean
  disabled?: boolean
  type: 'checkbox' | 'radio'
  onChange: (checked: boolean) => void
  sizeConfig: ReturnType<typeof getSizeConfig>
  bordered: boolean
  headerBgColor?: string
  theme: TableConfig
  isCard?: boolean
  styleMap?: TableStyleMap
}

const SelectionCell = <RecordType,>({
  isHeader,
  checked,
  indeterminate,
  disabled,
  type,
  onChange,
  sizeConfig,
  bordered,
  headerBgColor,
  theme,
  isCard,
  styleMap,
}: SelectionCellProps<RecordType>) => {
  const selectionTheme = theme.selection!
  const headerTheme = theme.header!
  const baseTheme = theme.base!
  const statesTheme = theme.states!

  // Cell-specific overrides (header vs body, bordered, card)
  const cellOverrides = css({
    padding: sizeConfig.cellPadding,
    borderBottom: isCard ? 'none' : `1px solid ${baseTheme.borderColor}`,
    borderRight: bordered ? `1px solid ${baseTheme.borderColor}` : 'none',
    backgroundColor: isHeader ? headerBgColor || headerTheme.backgroundColor : 'transparent',
    textAlign: 'center',
    cursor: disabled ? statesTheme.disabled?.cursor : 'pointer',
  })

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  const Cell = isHeader ? 'th' : 'td'

  return (
    <Cell className={styleMap ? cx(styleMap.selectionCell, cellOverrides) : cellOverrides} onClick={handleClick}>
      {type === 'checkbox' ? (
        <span onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={checked}
            indeterminate={indeterminate}
            disabled={disabled}
            tarmacVariant="standard"
            tarmacStyle="box"
            size="sm"
            onChange={() => {
              if (!disabled) {
                onChange(!checked)
              }
            }}
          />
        </span>
      ) : (
        <RadioIcon
          checked={checked}
          disabled={disabled}
          checkedColor={selectionTheme.checkedColor}
          borderColor={selectionTheme.borderColor}
          disabledBorderColor={selectionTheme.disabledBorderColor}
          theme={theme}
        />
      )}
    </Cell>
  )
}

// ============================================
// Pagination Component
// ============================================

interface TablePaginationProps {
  config: PaginationConfig
  total: number
  onChange: (page: number, pageSize: number) => void
  theme: TableConfig
  styleMap?: TableStyleMap
}

const TablePagination: React.FC<TablePaginationProps> = ({ config, total, onChange, theme, styleMap }) => {
  const {
    current = 1,
    pageSize = 10,
    showSizeChanger = false,
    pageSizeOptions = [10, 20, 50, 100],
    showQuickJumper = false,
    showTotal,
    hideOnSinglePage = false,
    disabled = false,
  } = config

  const paginationTheme = theme.pagination!
  const baseTheme = theme.base!

  const totalPages = Math.ceil(total / pageSize)

  // Move useState before early return to comply with React Hooks rules
  const [jumpValue, setJumpValue] = useState('')

  if (hideOnSinglePage && totalPages <= 1) {
    return null
  }

  const containerStyles = styleMap
    ? cx(styleMap.paginationBar, css({
        justifyContent: 'flex-end',
        padding: '16px 0',
      }))
    : css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '16px 0',
        gap: paginationTheme.gap,
        fontSize: paginationTheme.fontSize,
      })

  const buttonStyles = styleMap
    ? cx(styleMap.paginationButton, css({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        '&:hover:not(:disabled)': {
          borderColor: paginationTheme.activeColor,
          color: paginationTheme.activeColor,
        },
        '&:disabled': {
          cursor: 'not-allowed',
          color: paginationTheme.disabledTextColor,
          backgroundColor: paginationTheme.disabledBackgroundColor,
        },
      }))
    : css({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: paginationTheme.buttonMinWidth,
        height: paginationTheme.buttonHeight,
        padding: paginationTheme.buttonPadding,
        border: `1px solid ${paginationTheme.buttonBorderColor}`,
        borderRadius: paginationTheme.buttonRadius,
        backgroundColor: paginationTheme.buttonBackgroundColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: baseTheme.transition,
        '&:hover:not(:disabled)': {
          borderColor: paginationTheme.activeColor,
          color: paginationTheme.activeColor,
        },
        '&:disabled': {
          cursor: 'not-allowed',
          color: paginationTheme.disabledTextColor,
          backgroundColor: paginationTheme.disabledBackgroundColor,
        },
      })

  const activeButtonStyles = styleMap
    ? styleMap.paginationButtonActive
    : css({
        borderColor: paginationTheme.activeColor,
        color: paginationTheme.activeColor,
        fontWeight: paginationTheme.activeFontWeight,
      })

  const selectStyles = css({
    height: paginationTheme.buttonHeight,
    padding: paginationTheme.buttonPadding,
    border: `1px solid ${paginationTheme.buttonBorderColor}`,
    borderRadius: paginationTheme.buttonRadius,
    cursor: disabled ? 'not-allowed' : 'pointer',
  })

  const inputStyles = css({
    width: paginationTheme.inputWidth,
    height: paginationTheme.buttonHeight,
    padding: paginationTheme.buttonPadding,
    border: `1px solid ${paginationTheme.buttonBorderColor}`,
    borderRadius: paginationTheme.buttonRadius,
    textAlign: 'center',
  })

  const handlePrev = () => {
    if (current > 1 && !disabled) {
      onChange(current - 1, pageSize)
    }
  }

  const handleNext = () => {
    if (current < totalPages && !disabled) {
      onChange(current + 1, pageSize)
    }
  }

  const handlePageChange = (page: number) => {
    if (!disabled && page >= 1 && page <= totalPages) {
      onChange(page, pageSize)
    }
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10)
    onChange(1, newSize)
  }

  const handleJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(jumpValue, 10)
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        onChange(page, pageSize)
        setJumpValue('')
      }
    }
  }

  // Generate page numbers
  const getPageNumbers = () => {
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
  }

  return (
    <div className={containerStyles}>
      {showTotal && (
        <span>
          {showTotal(total, [(current - 1) * pageSize + 1, Math.min(current * pageSize, total)])}
        </span>
      )}

      <div style={{ display: 'flex', gap: '4px' }}>
        <button className={buttonStyles} onClick={handlePrev} disabled={current === 1 || disabled}>
          ‹
        </button>

        {getPageNumbers().map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={idx}
              className={cx(buttonStyles, page === current && activeButtonStyles)}
              onClick={() => handlePageChange(page)}
              disabled={disabled}
            >
              {page}
            </button>
          ) : (
            <span key={idx} style={{ padding: '0 8px', lineHeight: '32px' }}>
              {page}
            </span>
          )
        )}

        <button
          className={buttonStyles}
          onClick={handleNext}
          disabled={current === totalPages || disabled}
        >
          ›
        </button>
      </div>

      {showSizeChanger && (
        <select
          className={selectStyles}
          value={pageSize}
          onChange={handleSizeChange}
          disabled={disabled}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      )}

      {showQuickJumper && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Go to</span>
          <input
            type="number"
            className={inputStyles}
            value={jumpValue}
            onChange={e => setJumpValue(e.target.value)}
            onKeyDown={handleJump}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  )
}

// ============================================
// Empty State Component
// ============================================

interface EmptyStateProps {
  text?: React.ReactNode
  theme: TableConfig
  styleMap?: TableStyleMap
}

const EmptyState: React.FC<EmptyStateProps> = ({ text = 'No data', theme, styleMap }) => {
  const emptyTheme = theme.empty!

  const emptyStyles = styleMap
    ? cx(styleMap.emptyState, css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 350px)',
      }))
    : css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: emptyTheme.padding,
        color: emptyTheme.textColor,
        minHeight: 'calc(100vh - 350px)',
      })

  return (
    <div className={emptyStyles}>
      <EmptyIcon iconFill={emptyTheme.iconFill} iconStroke={emptyTheme.iconStroke} theme={theme} />
      <div style={{ marginTop: '8px' }}>{text}</div>
    </div>
  )
}

// ============================================
// Loading Overlay Component
// ============================================

interface LoadingOverlayProps {
  spinning: boolean
  tip?: string
  theme: TableConfig
  styleMap?: TableStyleMap
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ spinning, tip, theme, styleMap }) => {
  if (!spinning) return null

  const loadingTheme = theme.loading!

  const overlayStyles = styleMap
    ? cx(styleMap.loadingOverlay, css({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        zIndex: 10,
      }))
    : css({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: loadingTheme.overlayBackground,
        zIndex: 10,
      })

  return (
    <div className={overlayStyles}>
      <Spinner
        tarmacVariant="tarmac-01"
        tarmacSize={`${parseInt(loadingTheme.spinnerSize!) || 24}px` as any}
        color={loadingTheme.spinnerColor}
        trackColor={loadingTheme.trackColor}
      />
      {tip && <div style={{ marginTop: '8px', color: loadingTheme.spinnerColor }}>{tip}</div>}
    </div>
  )
}

// ============================================
// TableHeader Component
// ============================================

interface TableHeaderProps {
  tabs?: TabConfig[];
  tabsPosition?: 'top' | 'bottom';
  search?: SearchConfig;
  filters?: FilterConfig[];
  actions?: ActionConfig[];
  styleMap: TableStyleMap;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  tabs,
  tabsPosition = 'top',
  search,
  filters,
  actions,
  styleMap,
}) => {
  const hasTabs = tabs && tabs.length > 0
  const hasSearch = !!search
  const hasFilters = filters && filters.length > 0
  const hasActions = actions && actions.length > 0
  const hasActionBar = hasSearch || hasFilters || hasActions

  if (!hasTabs && !hasActionBar) {
    return null
  }

  const cappedFilters = hasFilters ? filters!.slice(0, 5) : []
  const cappedActions = hasActions ? actions!.slice(0, 3) : []

  const tabGroup = hasTabs ? (
    <div className={styleMap.tabGroup} data-testid="tab-group">
      {tabs!.map((tab) => (
        <button
          key={tab.key}
          className={cx(styleMap.tabCell, tab.active && styleMap.tabCellActive)}
          data-testid="tab-cell"
          onClick={() => tab.onClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  ) : null

  const actionBar = hasActionBar ? (
    <div className={styleMap.actionBar} data-testid="action-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {hasSearch && (
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }} data-testid="search-field">
            <span style={{ position: 'absolute', left: '8px', display: 'flex', pointerEvents: 'none' }}>
              <SearchIcon />
            </span>
            <input
              className={styleMap.searchField}
              style={{ paddingLeft: '28px' }}
              placeholder={search!.placeholder}
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
              className={cx(styleMap.filterDropdown, filter.expanded && styleMap.filterDropdownActive)}
            />
          </span>
        ))}
      </div>
      {cappedActions.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                    className={styleMap.actionButtonIcon}
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
                  className={action.variant === 'primary' ? styleMap.actionButtonPrimary : styleMap.actionButtonSecondary}
                />
              </span>
            )
          })}
        </div>
      )}
    </div>
  ) : null

  return (
    <div className={styleMap.tableHeader} data-testid="table-header">
      {tabsPosition === 'top' ? (
        <>
          {tabGroup}
          {actionBar}
        </>
      ) : (
        <>
          {actionBar}
          {tabGroup}
        </>
      )}
    </div>
  )
}

// ============================================
// Internal Table Component
// ============================================

interface InternalTableProps<RecordType> extends TableProps<RecordType> {
  _renderTimes?: number
}

const InternalTable = forwardRef(
  <RecordType extends object = Record<string, unknown>>(
    props: InternalTableProps<RecordType>,
    ref: React.Ref<TableRef>
  ) => {
    const {
      dataSource = [],
      columns = [],
      rowKey = 'key',
      variant = 'default',
      size = 'medium',
      bordered = false,
      showHeader = true,
      className = '',
      style = {},
      rowClassName,
      bgColor,
      headerBgColor,
      striped = false,
      hoverable = true,
      rowSelection,
      pagination,
      loading = false,
      locale,
      onChange,
      title,
      footer,
      onRow,
      rowFooter,
      sticky = false,
      scroll,
      headerTabs,
      headerTabsPosition,
      headerSearch,
      headerFilters,
      headerActions,
    } = props

    const isCard = variant === 'card'

    const { theme } = useTheme()
    const tableConfig = (theme.components?.table || defaultThemeConfig.components.table) as TableConfig

    // Variant-based config (Input-style pattern)
    const defaultVariants = defaultThemeConfig.components.table!.variants!
    const variantConfig = tableConfig.variants?.[variant] || defaultVariants[variant] || defaultVariants.default!

    // Refs
    const tableRef = useRef<HTMLDivElement>(null)

    // State
    const [sortState, setSortState] = useState<{
      column: ColumnType<RecordType> | null
      order: SortOrder | null
    }>({
      column: null,
      order: null,
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>(
      rowSelection?.selectedRowKeys || rowSelection?.defaultSelectedRowKeys || []
    )

    const [paginationState, setPaginationState] = useState<{ current: number; pageSize: number }>({
      current: pagination ? pagination.current || pagination.defaultCurrent || 1 : 1,
      pageSize: pagination ? pagination.pageSize || pagination.defaultPageSize || 10 : 10,
    })

    // Expose ref methods
    useImperativeHandle(ref, () => ({
      nativeElement: tableRef.current,
      scrollTo: config => {
        if (tableRef.current && config.top !== undefined) {
          tableRef.current.scrollTop = config.top
        }
        if (tableRef.current && config.left !== undefined) {
          tableRef.current.scrollLeft = config.left
        }
      },
    }))

    // Sync controlled states
    const currentSelectedKeys =
      rowSelection?.selectedRowKeys !== undefined ? rowSelection.selectedRowKeys : selectedRowKeys

    const currentPagination = useMemo(() => {
      if (pagination !== false) {
        return {
          current: pagination?.current ?? paginationState.current,
          pageSize: pagination?.pageSize ?? paginationState.pageSize,
        }
      }
      return { current: 1, pageSize: dataSource.length }
    }, [pagination, paginationState, dataSource.length])

    // Config
    const sizeConfig = getSizeConfig(size, tableConfig)

    // Build style map from theme config and props
    const styleMap = buildTableStyles({
      config: tableConfig,
      variant: variant as 'default' | 'card',
      size: size as 'small' | 'medium' | 'large',
      bordered,
      striped,
      hoverable,
      bgColor,
      headerBgColor,
    })

    // Data processing
    const processedData = useMemo(() => {
      let data = [...dataSource]

      // Apply sorting
      if (sortState.column && sortState.order && sortState.column.sorter) {
        const { column, order } = sortState
        const sorterFn = column.sorter
        if (typeof sorterFn === 'function') {
          data = data.sort((a, b) => {
            const result = sorterFn(a, b)
            return order === SortOrder.ASCEND ? result : -result
          })
        } else if (sorterFn === true) {
          const dataIndex = column.dataIndex
          data = data.sort((a, b) => {
            const aVal = getValue(a, dataIndex as string | string[])
            const bVal = getValue(b, dataIndex as string | string[])
            if (aVal === bVal) return 0
            const result = aVal! > bVal! ? 1 : -1
            return order === SortOrder.ASCEND ? result : -result
          })
        }
      }

      return data
    }, [dataSource, sortState])

    // Paginated data
    const paginatedData = useMemo(() => {
      if (pagination === false) return processedData

      const { current, pageSize } = currentPagination
      const start = (current - 1) * pageSize
      return processedData.slice(start, start + pageSize)
    }, [processedData, pagination, currentPagination])

    // Handlers
    const handleSort = useCallback(
      (column: ColumnType<RecordType>) => {
        let newOrder: SortOrder | null = null
        const isSameColumn =
          sortState.column?.key === column.key || sortState.column?.dataIndex === column.dataIndex

        if (isSameColumn) {
          if (sortState.order === SortOrder.ASCEND) {
            newOrder = SortOrder.DESCEND
          } else if (sortState.order === SortOrder.DESCEND) {
            newOrder = null
          } else {
            newOrder = SortOrder.ASCEND
          }
        } else {
          newOrder = SortOrder.ASCEND
        }

        setSortState({
          column: newOrder ? column : null,
          order: newOrder,
        })

        onChange?.(
          { ...currentPagination, total: processedData.length },
          {},
          {
            column: newOrder ? column : undefined,
            order: newOrder,
            field: column.dataIndex,
            columnKey: column.key,
          },
          { currentDataSource: processedData, action: 'sort' }
        )
      },
      [sortState, onChange, currentPagination, processedData]
    )

    const handleRowSelect = useCallback(
      (key: Key, record: RecordType, selected: boolean) => {
        let newKeys: Key[]
        let newRows: RecordType[]

        if (rowSelection?.type === 'radio') {
          newKeys = selected ? [key] : []
          newRows = selected ? [record] : []
        } else {
          newKeys = selected
            ? [...currentSelectedKeys, key]
            : currentSelectedKeys.filter(k => k !== key)
          newRows = newKeys
            .map(k => dataSource.find((r, i) => getRowKey(r, rowKey, i) === k)!)
            .filter(Boolean)
        }

        if (rowSelection?.selectedRowKeys === undefined) {
          setSelectedRowKeys(newKeys)
        }

        rowSelection?.onChange?.(newKeys, newRows, { type: 'single' })
        rowSelection?.onSelect?.(record, selected, newRows, {} as Event)
      },
      [currentSelectedKeys, rowSelection, dataSource, rowKey]
    )

    const handleSelectAll = useCallback(
      (selected: boolean) => {
        const newKeys = selected ? paginatedData.map((r, i) => getRowKey(r, rowKey, i)) : []
        const newRows = selected ? paginatedData : []

        if (rowSelection?.selectedRowKeys === undefined) {
          setSelectedRowKeys(newKeys)
        }

        rowSelection?.onChange?.(newKeys, newRows, { type: selected ? 'all' : 'none' })
        rowSelection?.onSelectAll?.(selected, newRows, selected ? paginatedData : [])
      },
      [paginatedData, rowKey, rowSelection]
    )

    const handlePaginationChange = useCallback(
      (page: number, pageSize: number) => {
        setPaginationState({ current: page, pageSize })
        if (pagination) {
          pagination.onChange?.(page, pageSize)
        }

        onChange?.(
          { ...(pagination || {}), current: page, pageSize, total: processedData.length },
          {},
          sortState.column
            ? {
                column: sortState.column,
                order: sortState.order,
                field: sortState.column.dataIndex,
                columnKey: sortState.column.key,
              }
            : {},
          { currentDataSource: processedData, action: 'paginate' }
        )
      },
      [pagination, onChange, processedData, sortState]
    )

    // Selection state
    const allSelected =
      paginatedData.length > 0 &&
      paginatedData.every((r, i) => currentSelectedKeys.includes(getRowKey(r, rowKey, i)))
    const someSelected = paginatedData.some((r, i) =>
      currentSelectedKeys.includes(getRowKey(r, rowKey, i))
    )

    // Theme values
    const baseTheme = tableConfig.base!
    const bodyTheme = tableConfig.body!
    const statesTheme = tableConfig.states!
    const vc = variantConfig
    const defaultVc = defaultVariants[variant] || defaultVariants.default!

    // Resolved background colors
    const resolvedBgColor = bgColor || vc.container?.backgroundColor || baseTheme.backgroundColor

    // Styles — driven by variantConfig + style map (no isCard ternaries)
    const containerStyles = cx(styleMap.container, css({
      position: 'relative',
      width: '100%',
      fontFamily: baseTheme.fontFamily,
    }))

    const tableStyles = cx(styleMap.table, css({
      tableLayout: 'auto' as const,
    }))

    // Variant-aware state colors with backward-compatible fallbacks
    const hoverBgColor = vc.states?.hover?.backgroundColor || bodyTheme.hoverBackgroundColor
    const selectedBgColor = vc.states?.selected?.backgroundColor || statesTheme.selected?.backgroundColor
    const stripedBgColor = vc.states?.striped?.backgroundColor || bodyTheme.stripedBackgroundColor

    const rowStyles = cx(styleMap.bodyRow, css({
      '&:hover': hoverable && !isCard ? { backgroundColor: hoverBgColor } : {},
    }))

    const stripedRowStyles = css({
      '&:nth-of-type(even)': { backgroundColor: stripedBgColor },
    })

    const rowBorderColor = vc.row?.borderColor || defaultVc.row?.borderColor
    const rowBorderRadius = vc.row?.borderRadius || defaultVc.row?.borderRadius

    const cardCellStyles = isCard
      ? css({
          '& td, & th': {
            borderTop: `1px solid ${rowBorderColor}`,
            borderBottom: `1px solid ${rowBorderColor}`,
          },
          '& td:first-child, & th:first-child': {
            borderLeft: `1px solid ${rowBorderColor}`,
            borderTopLeftRadius: rowBorderRadius,
            borderBottomLeftRadius: rowBorderRadius,
          },
          '& td:last-child, & th:last-child': {
            borderRight: `1px solid ${rowBorderColor}`,
            borderTopRightRadius: rowBorderRadius,
            borderBottomRightRadius: rowBorderRadius,
          },
        })
      : ''

    const cardCellWithFooterStyles = isCard
      ? css({
          '& td, & th': {
            borderTop: `1px solid ${rowBorderColor}`,
            borderBottom: 'none',
          },
          '& td:first-child, & th:first-child': {
            borderLeft: `1px solid ${rowBorderColor}`,
            borderTopLeftRadius: rowBorderRadius,
            borderBottomLeftRadius: 0,
          },
          '& td:last-child, & th:last-child': {
            borderRight: `1px solid ${rowBorderColor}`,
            borderTopRightRadius: rowBorderRadius,
            borderBottomRightRadius: 0,
          },
        })
      : ''

    const cardFooterRowStyles = isCard
      ? css({
          position: 'relative',
          top: `-${vc.table?.borderSpacing?.split(' ')[1] || defaultVc.table?.borderSpacing?.split(' ')[1] || '6px'}`,
          backgroundColor: vc.row?.backgroundColor || 'inherit',
        })
      : ''

    const cardFooterCellStyles = isCard
      ? css({
          borderLeft: `1px solid ${rowBorderColor}`,
          borderRight: `1px solid ${rowBorderColor}`,
          borderBottom: `1px solid ${rowBorderColor}`,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: rowBorderRadius,
          borderBottomRightRadius: rowBorderRadius,
          backgroundColor: vc.row?.backgroundColor || 'inherit',
        })
      : ''

    const cardGroupHoverStyles = isCard && hoverable
      ? css({
          '&:hover > tr': {
            backgroundColor: hoverBgColor,
          },
          '&:hover > tr > td': {
            backgroundColor: hoverBgColor,
          },
        })
      : ''

    const cardGroupSelectedStyles = isCard
      ? css({
          '& > tr': {
            backgroundColor: `${selectedBgColor} !important`,
          },
          '& > tr > td': {
            backgroundColor: `${selectedBgColor} !important`,
          },
        })
      : ''

    // Loading state
    const isLoading = typeof loading === 'boolean' ? loading : loading?.spinning
    const loadingTip = typeof loading === 'object' ? loading.tip : undefined

    // Separate footer columns from regular columns
    const { regularColumns, footerColumn } = useMemo(() => {
      const regular: ColumnType<RecordType>[] = []
      let footer: ColumnType<RecordType> | null = null
      for (const col of columns) {
        if (col.rowFooter && !footer) {
          footer = col
        } else if (!col.rowFooter) {
          regular.push(col)
        }
      }
      return { regularColumns: regular, footerColumn: footer }
    }, [columns])

    // Normalize rowFooter: column-level (rowFooter: true) takes priority, top-level prop is fallback
    const footerCardStyles = footerColumn?.cardStyles
    const normalizedRowFooter = useMemo((): RowFooterConfig<RecordType> | null => {
      if (footerColumn?.rowFooter === true) {
        const colDataIndex = footerColumn.dataIndex
        return {
          render: (record: RecordType, index: number) => {
            const value = getValue(record, colDataIndex as string | string[])
            if (footerColumn.render) return footerColumn.render(value, record, index)
            return String(value ?? '')
          },
        }
      }
      if (!rowFooter) return null
      if (typeof rowFooter === 'function') {
        return { render: rowFooter }
      }
      return rowFooter
    }, [footerColumn, rowFooter])

    const rowFooterTheme = tableConfig.rowFooter || defaultThemeConfig.components.table!.rowFooter!

    const rowFooterCellStyles = footerCardStyles
      ? ''
      : cx(styleMap.rowFooter, css({
          backgroundColor: vc.row?.backgroundColor || rowFooterTheme.backgroundColor,
        }))

    // Visible columns (excluding footer columns)
    const visibleColumns = regularColumns.filter(col => !col.hidden)

    return (
      <div ref={tableRef} className={cx(containerStyles, className)} style={style}>
        <LoadingOverlay spinning={!!isLoading} tip={loadingTip} theme={tableConfig} styleMap={styleMap} />

        {title && (
          <div style={{ padding: '16px', borderBottom: `1px solid ${baseTheme.borderColor}` }}>
            {title(dataSource)}
          </div>
        )}

        <TableHeader
          tabs={headerTabs}
          tabsPosition={headerTabsPosition}
          search={headerSearch}
          filters={headerFilters}
          actions={headerActions}
          styleMap={styleMap}
        />

        <div style={{ overflow: 'auto', maxHeight: scroll?.y }}>
          <table className={tableStyles}>
            {showHeader && (
              <thead
                className={(sticky || scroll?.y) ? css({
                  position: 'sticky',
                  top: typeof sticky === 'object' ? sticky.offsetHeader ?? 0 : 0,
                  zIndex: 5,
                  background: headerBgColor || vc.header?.backgroundColor,
                }) : undefined}
              >
                <tr>
                  {rowSelection && (
                    <SelectionCell
                      isHeader
                      checked={allSelected}
                      indeterminate={!allSelected && someSelected}
                      type={rowSelection.type || 'checkbox'}
                      onChange={handleSelectAll}
                      sizeConfig={sizeConfig}
                      bordered={bordered}
                      headerBgColor={headerBgColor || vc.header?.backgroundColor}
                      theme={tableConfig}
                      isCard={isCard}
                      styleMap={styleMap}
                    />
                  )}
                  {visibleColumns.map((column, idx) => (
                    <TableHeaderCell
                      key={column.key || (column.dataIndex as string) || idx}
                      column={column}
                      sortOrder={
                        sortState.column?.key === column.key ||
                        sortState.column?.dataIndex === column.dataIndex
                          ? sortState.order
                          : null
                      }
                      onSort={handleSort}
                      sizeConfig={sizeConfig}
                      bordered={bordered}
                      headerBgColor={headerBgColor || vc.header?.backgroundColor}
                      theme={tableConfig}
                      isCard={isCard}
                      styleMap={styleMap}
                    />
                  ))}
                </tr>
              </thead>
            )}

            {isCard ? (
              <>
                {paginatedData.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={visibleColumns.length + (rowSelection ? 1 : 0)}>
                        <EmptyState text={locale?.emptyText} theme={tableConfig} styleMap={styleMap} />
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  paginatedData.map((record, index) => {
                    const key = getRowKey(record, rowKey, index)
                    const isSelected = currentSelectedKeys.includes(key)
                    const checkboxProps = rowSelection?.getCheckboxProps?.(record) || {}
                    const customRowClassName =
                      typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName
                    const rowProps = onRow?.(record, index) || {}
                    const shouldShowFooter = normalizedRowFooter
                      ? (normalizedRowFooter.showFooter?.(record, index) ?? true)
                      : false
                    const footerContent = normalizedRowFooter?.render(record, index)
                    const showFooter = shouldShowFooter && footerContent != null
                    const totalColSpan = visibleColumns.length + (rowSelection ? 1 : 0)

                    return (
                      <tbody
                        key={key}
                        className={cx(
                          cardGroupHoverStyles,
                          isSelected && cardGroupSelectedStyles
                        )}
                      >
                        <tr
                          className={cx(
                            rowStyles,
                            customRowClassName,
                            showFooter ? cardCellWithFooterStyles : cardCellStyles
                          )}
                          style={rowProps as React.CSSProperties}
                          onClick={(rowProps as { onClick?: () => void }).onClick}
                        >
                          {rowSelection && (
                            <SelectionCell
                              record={record}
                              index={index}
                              checked={isSelected}
                              disabled={checkboxProps.disabled}
                              type={rowSelection.type || 'checkbox'}
                              onChange={selected => handleRowSelect(key, record, selected)}
                              sizeConfig={sizeConfig}
                              bordered={bordered}
                              theme={tableConfig}
                              isCard={isCard}
                              styleMap={styleMap}
                            />
                          )}
                          {visibleColumns.map((column, colIdx) => (
                            <TableBodyCell
                              key={column.key || (column.dataIndex as string) || colIdx}
                              record={record}
                              column={column}
                              index={index}
                              sizeConfig={sizeConfig}
                              bordered={bordered}
                              theme={tableConfig}
                              isCard={isCard}
                              styleMap={styleMap}
                            />
                          ))}
                        </tr>
                        {showFooter && (
                          <tr className={cx(cardFooterRowStyles)}>
                            <td
                              colSpan={totalColSpan}
                              className={cx(rowFooterCellStyles, cardFooterCellStyles, footerCardStyles)}
                            >
                              {footerContent}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    )
                  })
                )}
              </>
            ) : (
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={visibleColumns.length + (rowSelection ? 1 : 0)}>
                      <EmptyState text={locale?.emptyText} theme={tableConfig} styleMap={styleMap} />
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((record, index) => {
                    const key = getRowKey(record, rowKey, index)
                    const isSelected = currentSelectedKeys.includes(key)
                    const checkboxProps = rowSelection?.getCheckboxProps?.(record) || {}
                    const customRowClassName =
                      typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName
                    const rowProps = onRow?.(record, index) || {}
                    const shouldShowFooter = normalizedRowFooter
                      ? (normalizedRowFooter.showFooter?.(record, index) ?? true)
                      : false
                    const footerContent = normalizedRowFooter?.render(record, index)
                    const showFooter = shouldShowFooter && footerContent != null
                    const totalColSpan = visibleColumns.length + (rowSelection ? 1 : 0)

                    return (
                      <React.Fragment key={key}>
                        <tr
                          className={cx(
                            rowStyles,
                            striped && stripedRowStyles,
                            customRowClassName,
                            isSelected &&
                              css({
                                backgroundColor: `${selectedBgColor} !important`,
                              })
                          )}
                          style={rowProps as React.CSSProperties}
                          onClick={(rowProps as { onClick?: () => void }).onClick}
                        >
                          {rowSelection && (
                            <SelectionCell
                              record={record}
                              index={index}
                              checked={isSelected}
                              disabled={checkboxProps.disabled}
                              type={rowSelection.type || 'checkbox'}
                              onChange={selected => handleRowSelect(key, record, selected)}
                              sizeConfig={sizeConfig}
                              bordered={bordered}
                              theme={tableConfig}
                              isCard={isCard}
                              styleMap={styleMap}
                            />
                          )}
                          {visibleColumns.map((column, colIdx) => (
                            <TableBodyCell
                              key={column.key || (column.dataIndex as string) || colIdx}
                              record={record}
                              column={column}
                              index={index}
                              sizeConfig={sizeConfig}
                              bordered={bordered}
                              theme={tableConfig}
                              isCard={isCard}
                              styleMap={styleMap}
                            />
                          ))}
                        </tr>
                        {showFooter && (
                          <tr>
                            <td
                              colSpan={totalColSpan}
                              className={cx(rowFooterCellStyles, footerCardStyles)}
                            >
                              {footerContent}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })
                )}
              </tbody>
            )}
          </table>
        </div>

        {pagination !== false && (
          <TablePagination
            config={{ ...pagination, ...currentPagination }}
            total={processedData.length}
            onChange={handlePaginationChange}
            theme={tableConfig}
            styleMap={styleMap}
          />
        )}

        {footer && (
          <div style={{ padding: '16px', borderTop: `1px solid ${baseTheme.borderColor}` }}>
            {footer(dataSource)}
          </div>
        )}
      </div>
    )
  }
) as <RecordType extends object = Record<string, unknown>>(
  props: InternalTableProps<RecordType> & { ref?: React.Ref<TableRef> }
) => React.ReactElement

// ============================================
// Main Table Component with ThemeProvider
// ============================================

const TableWithTheme = forwardRef(
  <RecordType extends object = Record<string, unknown>>(
    props: TableProps<RecordType>,
    ref: React.Ref<TableRef>
  ) => {
    const renderTimesRef = useRef<number>(0)
    renderTimesRef.current += 1

    return <InternalTable<RecordType> {...props} ref={ref} _renderTimes={renderTimesRef.current} />
  }
) as <RecordType extends object = Record<string, unknown>>(
  props: TableProps<RecordType> & { ref?: React.Ref<TableRef> }
) => React.ReactElement

// ============================================
// Sub-components
// ============================================

const Column: React.FC<ColumnProps> = () => null
Column.displayName = 'Column'

const ColumnGroup: React.FC<ColumnGroupProps> = () => null
ColumnGroup.displayName = 'ColumnGroup'

const Summary: React.FC<SummaryProps> = ({ children }) => <tfoot>{children}</tfoot>
Summary.displayName = 'Summary'

const SummaryRow: React.FC<SummaryRowProps> = ({ children, className, style }) => (
  <tr className={className} style={style}>
    {children}
  </tr>
)
SummaryRow.displayName = 'Summary.Row'

const SummaryCell: React.FC<SummaryCellProps> = ({
  children,
  colSpan,
  rowSpan,
  align,
  className,
  style,
}) => (
  <td
    colSpan={colSpan}
    rowSpan={rowSpan}
    className={className}
    style={{ textAlign: align, ...style }}
  >
    {children}
  </td>
)
SummaryCell.displayName = 'Summary.Cell'

// Attach Row and Cell to Summary
;(Summary as unknown as { Row: typeof SummaryRow; Cell: typeof SummaryCell }).Row = SummaryRow
;(Summary as unknown as { Row: typeof SummaryRow; Cell: typeof SummaryCell }).Cell = SummaryCell

// ============================================
// Export with Static Properties (like Ant Design)
// ============================================

type TableType = typeof TableWithTheme & {
  displayName?: string
  SELECTION_COLUMN: typeof SELECTION_COLUMN
  EXPAND_COLUMN: typeof EXPAND_COLUMN
  SELECTION_ALL: typeof SELECTION_ALL
  SELECTION_INVERT: typeof SELECTION_INVERT
  SELECTION_NONE: typeof SELECTION_NONE
  Column: typeof Column
  ColumnGroup: typeof ColumnGroup
  Summary: typeof Summary & { Row: typeof SummaryRow; Cell: typeof SummaryCell }
}

const Table = TableWithTheme as TableType

Table.SELECTION_COLUMN = SELECTION_COLUMN
Table.EXPAND_COLUMN = EXPAND_COLUMN
Table.SELECTION_ALL = SELECTION_ALL
Table.SELECTION_INVERT = SELECTION_INVERT
Table.SELECTION_NONE = SELECTION_NONE
Table.Column = Column
Table.ColumnGroup = ColumnGroup
Table.Summary = Summary as typeof Summary & { Row: typeof SummaryRow; Cell: typeof SummaryCell }

if (process.env.NODE_ENV !== 'production') {
  Table.displayName = 'Table'
}

export { Table, InternalTable }
export default Table

