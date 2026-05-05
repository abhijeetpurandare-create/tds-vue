import { ReactNode, MouseEvent } from 'react'

// ============================================
// Shared Types
// ============================================

export type TableSize = 'small' | 'medium' | 'large' | (string & {})
export type TableVariant = 'default' | 'ghost' | (string & {})

// ============================================
// TableTextCell Types
// ============================================

export type TextCellVariant = 'texts' | 'textsIcons' | 'ghost'

export interface TableTextCellProps {
  variant?: TextCellVariant
  title?: string
  subtextTop?: string
  subtextBottom?: string
  showTitle?: boolean
  showSubtextTop?: boolean
  showSubtextBottom?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  leadingSubtextIcon?: ReactNode
  trailingSubtextIcon?: ReactNode
  className?: string
}

// ============================================
// TableHeaderCell Types
// ============================================

export type HeaderCellType = 'default' | 'loader'

export interface TableHeaderCellProps {
  type?: HeaderCellType
  label?: string
  showCheckbox?: boolean
  showLeadingIcon?: boolean
  showTrailingIcon?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  checked?: boolean
  indeterminate?: boolean
  onCheckChange?: (checked: boolean) => void
  onSort?: () => void
  className?: string
}

// ============================================
// TableCellBadgePills Types
// ============================================

export type BadgePillVariant = 'badges' | 'pills' | (string & {})
export type BadgePillType = '1' | '2' | '3' | 'ghost' | (string & {})

export interface BadgePillItem {
  label: string
  variant?: string
}

export interface TableCellBadgePillsProps {
  variant?: BadgePillVariant
  type?: BadgePillType
  items?: BadgePillItem[]
  className?: string
}

// ============================================
// TableCellAddons Types
// ============================================

export type CellAddonType =
  | 'primary-subtext'
  | 'primary-badge-horizontal'
  | 'primary-badge-vertical'
  | 'primary-badge-vertical-top'
  | 'primary-3-lines'
  | 'primary-2-line-icon'
  | 'primary-3-line-icon'
  | 'checkbox-subtext'
  | 'checkbox-title'
  | 'checkbox-title-subtext'
  | 'checkbox-2-line-icon'
  | 'checkbox-combination'
  | 'radio-2-lines'
  | 'button-1-cta'
  | 'button-2-cta'
  | 'multistop-locations'
  | 'multistop-location-distance'
  | 'multistop-location-stops'
  | 'slot-1'
  | 'slot-2'
  | 'ghost'
  | (string & {})

export interface TableCellAddonsProps {
  type?: CellAddonType
  title?: string
  subtext?: string
  subtextBottom?: string
  badgeLabel?: string
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
  slot?: ReactNode
  slot2?: ReactNode
  origin?: string
  destination?: string
  stops?: number
  distance?: string
  className?: string
  children?: ReactNode
}

// ============================================
// TableSectionHeader Types
// ============================================

export type SectionHeaderType = 'default' | 'slots' | 'ghost' | (string & {})

export interface TableSectionHeaderProps {
  type?: SectionHeaderType
  title?: string
  subtext?: string
  showLeadingIcon?: boolean
  showTrailingIcon?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  badges?: ReactNode
  actions?: ReactNode
  /** Slot content (used when type='slots') */
  slotContent?: ReactNode
  className?: string
}

// ============================================
// TableFullHeader Types (re-exported from component file)
// ============================================

export type {
  TableFullHeaderProps,
  TableFullHeaderTab,
  TableFullHeaderSearch,
  TableFullHeaderFilter,
  TableFullHeaderAction,
} from './TableFullHeader'

// ============================================
// TableSectionFooter Types
// ============================================

export type SectionFooterType = 'default' | 'ghost' | (string & {})
export type SectionFooterVariant =
  | '2-ctas'
  | '3-ctas'
  | '2-cta-slot'
  | '3-cta-slot'
  | '4-cta-slot'
  | 'ghost'
  | (string & {})

export interface TableSectionFooterProps {
  type?: SectionFooterType
  variant?: SectionFooterVariant
  actions?: ReactNode
  /** Slot content (left side, used in CTA+Slot variants) */
  slotContent?: ReactNode
  /** Tab group at the bottom */
  tabs?: { key: string; label: string; active?: boolean; onClick: (key: string) => void }[]
  className?: string
}

// ============================================
// TableRow Types
// ============================================

export type TableRowStyle = 'type1' | 'type2' | 'type3' | 'ghost' | (string & {})

export interface TableRowProps {
  /** Row style variant matching Figma "Style" property */
  style?: TableRowStyle
  /** Cells to render in the row area (CellAddons, TextCells, CellBadgePills, etc.) */
  cells?: ReactNode
  /** Footer content (slot area — proofs, RTO score, custom content) */
  footerSlot?: ReactNode
  /** Footer action buttons (Button components) */
  footerActions?: ReactNode
  /** Whether to show the dashed divider between cells and footer */
  showFooter?: boolean
  /** Custom className */
  className?: string
  /** Click handler for the row */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

// ============================================
// StatusIndicator (for table cells)
// ============================================

export type StatusVariant =
  | 'success'
  | 'warning'
  | 'information'
  | 'scheduled'
  | 'play'
  | 'downloading'
  | 'unknown'
  | 'failed'
  | 'pending'
  | (string & {})

export interface TableStatusIndicatorProps {
  variant?: StatusVariant
  label?: string
  className?: string
}
