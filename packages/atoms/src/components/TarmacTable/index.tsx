/**
 * TarmacTable — Compound Table component system for the Tarmac TDS.
 *
 * Built using composition/compound pattern so consumers can construct
 * tables from smaller building blocks.
 *
 * Sub-components:
 * - TarmacTable.TextCell       — Text cell with title/subtext/icons
 * - TarmacTable.HeaderCell     — Column header cell
 * - TarmacTable.Divider        — Row separator (line or dash)
 * - TarmacTable.StatusIndicator — Status dot + label
 * - TarmacTable.CellBadgePills — Badge/pill cell content
 * - TarmacTable.CellAddons     — Rich cell (checkbox, radio, button, multistop, slot)
 *
 * Usage:
 * ```tsx
 * <TarmacTable.HeaderCell label="NAME" />
 * <TarmacTable.TextCell title="John Doe" subtextTop="ID: 12345" />
 * <TarmacTable.Divider />
 * <TarmacTable.TextCell title="Jane Smith" subtextTop="ID: 67890" />
 * ```
 */

import TableTextCell from './TableTextCell'
import TableHeaderCell from './TableHeaderCell'
import React from 'react'
import Divider from '../Divider'
import type { DividerProps } from '../Divider'
import TableStatusIndicator from './TableStatusIndicator'

/** Wrapper that maps the old `type` prop to the standalone Divider's `dividerType` */
const TableDividerWrapper: React.FC<Omit<DividerProps, 'dividerType'> & { type?: string }> = ({ type, ...rest }) => (
  <Divider dividerType={type || 'line'} {...rest} />
)
import TableCellBadgePills from './TableCellBadgePills'
import TableCellAddons from './TableCellAddons'
import TableSectionHeader from './TableSectionHeader'
import TableSectionFooter from './TableSectionFooter'
import TableFullHeader from './TableFullHeader'
import TableRow from './TableRow'

// Re-export types
export type {
  TableTextCellProps,
  TableHeaderCellProps,
  TableStatusIndicatorProps,
  TableCellBadgePillsProps,
  TableCellAddonsProps,
  TextCellVariant,
  HeaderCellType,
  BadgePillVariant,
  BadgePillType,
  BadgePillItem,
  CellAddonType,
  StatusVariant,
  TableSize,
  TableVariant,
  TableSectionHeaderProps,
  SectionHeaderType,
  TableSectionFooterProps,
  SectionFooterType,
  SectionFooterVariant,
  TableFullHeaderProps,
  TableFullHeaderTab,
  TableFullHeaderSearch,
  TableFullHeaderFilter,
  TableFullHeaderAction,
  TableRowProps,
  TableRowStyle,
} from './types'

// Compound component
const TarmacTable = Object.assign(
  {},
  {
    TextCell: TableTextCell,
    HeaderCell: TableHeaderCell,
    Divider: TableDividerWrapper,
    StatusIndicator: TableStatusIndicator,
    CellBadgePills: TableCellBadgePills,
    CellAddons: TableCellAddons,
    SectionHeader: TableSectionHeader,
    SectionFooter: TableSectionFooter,
    FullHeader: TableFullHeader,
    Row: TableRow,
  },
)

export default TarmacTable

// Named exports for direct imports
export {
  TableTextCell,
  TableHeaderCell,
  TableDividerWrapper as TableDivider,
  TableStatusIndicator,
  TableCellBadgePills,
  TableCellAddons,
  TableSectionHeader,
  TableSectionFooter,
  TableFullHeader,
  TableRow,
}
