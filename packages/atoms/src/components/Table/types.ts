import { ReactNode, CSSProperties, Key } from 'react'

// ============================================
// Enums
// ============================================

export enum TableSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum SortOrder {
  ASCEND = 'ascend',
  DESCEND = 'descend',
}

export enum SelectionType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

export enum TableLayout {
  AUTO = 'auto',
  FIXED = 'fixed',
}

// ============================================
// Column Interfaces
// ============================================

export type AlignType = 'left' | 'center' | 'right'
export type FixedType = 'left' | 'right' | boolean

export interface ColumnFilterItem {
  text: ReactNode
  value: string | number | boolean
  children?: ColumnFilterItem[]
}

export interface FilterDropdownProps {
  prefixCls: string
  setSelectedKeys: (selectedKeys: Key[]) => void
  selectedKeys: Key[]
  confirm: (param?: { closeDropdown?: boolean }) => void
  clearFilters?: () => void
  filters?: ColumnFilterItem[]
  visible: boolean
  close: () => void
}

export interface SorterResult<RecordType> {
  column?: ColumnType<RecordType>
  order?: SortOrder | null
  field?: Key | readonly Key[]
  columnKey?: Key
}

export interface ColumnType<RecordType = unknown> {
  /** Unique key for this column */
  key?: Key
  /** Display title of the column */
  title?: ReactNode
  /** Data index to access record data */
  dataIndex?: string | string[]
  /** Custom render function for cell content */
  render?: (value: unknown, record: RecordType, index: number) => ReactNode
  /** Column width */
  width?: string | number
  /** Minimum width */
  minWidth?: number
  /** Text alignment */
  align?: AlignType
  /** Fixed column position */
  fixed?: FixedType
  /** Custom class name */
  className?: string
  /** Custom style */
  style?: CSSProperties
  /** Whether the column is hidden */
  hidden?: boolean
  /** Enable ellipsis for text overflow */
  ellipsis?: boolean | { showTitle?: boolean }
  /** Enable column sorting */
  sorter?: boolean | ((a: RecordType, b: RecordType) => number)
  /** Default sort order */
  defaultSortOrder?: SortOrder | null
  /** Current sort order (controlled) */
  sortOrder?: SortOrder | null
  /** Sort directions */
  sortDirections?: SortOrder[]
  /** Enable column filtering */
  filters?: ColumnFilterItem[]
  /** Filter function */
  onFilter?: (value: unknown, record: RecordType) => boolean
  /** Custom filter dropdown */
  filterDropdown?: ReactNode | ((props: FilterDropdownProps) => ReactNode)
  /** Whether filter dropdown is visible */
  filterDropdownOpen?: boolean
  /** Filtered values (controlled) */
  filteredValue?: Key[] | null
  /** Filter mode */
  filterMode?: 'menu' | 'tree'
  /** Multiple filter selection */
  filterMultiple?: boolean
  /** Callback when filter changes */
  onFilterDropdownOpenChange?: (visible: boolean) => void
  /** Callback when cell is clicked */
  onCell?: (record: RecordType, index?: number) => CSSProperties | { onClick?: () => void }
  /** Callback when header cell is clicked */
  onHeaderCell?: (column: ColumnType<RecordType>) => CSSProperties | { onClick?: () => void }
  /** Col span for header */
  colSpan?: number
  /** Row span */
  rowSpan?: number
  /** Children columns for grouped headers */
  children?: ColumnType<RecordType>[]
  /** When true, this column's render output is used as a row footer instead of a regular cell */
  rowFooter?: boolean
  /** Tailwind class names applied to the row footer cell (only effective when rowFooter is true). When provided, replaces the default Emotion styles for the footer cell */
  cardStyles?: string
}

export interface ColumnGroupType<RecordType = unknown> extends Omit<ColumnType<RecordType>, 'dataIndex' | 'render'> {
  children: ColumnType<RecordType>[]
}

// ============================================
// Selection Interfaces
// ============================================

export interface SelectionItem {
  key: string
  text: ReactNode
  onSelect?: (changeableRowKeys: Key[]) => void
}

export interface RowSelection<RecordType = unknown> {
  /** Selection type */
  type?: SelectionType | 'checkbox' | 'radio'
  /** Selected row keys (controlled) */
  selectedRowKeys?: Key[]
  /** Default selected row keys */
  defaultSelectedRowKeys?: Key[]
  /** Callback when selection changes */
  onChange?: (selectedRowKeys: Key[], selectedRows: RecordType[], info: { type: 'all' | 'none' | 'invert' | 'single' | 'multiple' }) => void
  /** Callback for each row selection */
  onSelect?: (record: RecordType, selected: boolean, selectedRows: RecordType[], nativeEvent: Event) => void
  /** Callback for select all */
  onSelectAll?: (selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void
  /** Callback for select invert */
  onSelectInvert?: (selectedRowKeys: Key[]) => void
  /** Callback for select none */
  onSelectNone?: () => void
  /** Custom selections dropdown */
  selections?: SelectionItem[] | boolean
  /** Hide select all checkbox */
  hideSelectAll?: boolean
  /** Fixed selection column */
  fixed?: FixedType
  /** Selection column width */
  columnWidth?: string | number
  /** Selection column title */
  columnTitle?: ReactNode | ((checkboxNode: ReactNode) => ReactNode)
  /** Custom render for selection checkbox */
  renderCell?: (value: boolean, record: RecordType, index: number, originNode: ReactNode) => ReactNode
  /** Get checkbox props for each row */
  getCheckboxProps?: (record: RecordType) => { disabled?: boolean; name?: string; [key: string]: unknown }
  /** Whether to preserve selected keys when data changes */
  preserveSelectedRowKeys?: boolean
}

// ============================================
// Pagination Interfaces
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
  showQuickJumper?: boolean | { goButton?: ReactNode }
  /** Show total */
  showTotal?: (total: number, range: [number, number]) => ReactNode
  /** Size variant */
  size?: 'default' | 'small'
  /** Simple mode */
  simple?: boolean
  /** Pagination position */
  position?: ('topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight')[]
  /** Hide on single page */
  hideOnSinglePage?: boolean
  /** Callback when page changes */
  onChange?: (page: number, pageSize: number) => void
  /** Callback when page size changes */
  onShowSizeChange?: (current: number, size: number) => void
  /** Disabled pagination */
  disabled?: boolean
  /** Custom class name */
  className?: string
  /** Custom style */
  style?: CSSProperties
}

// ============================================
// Row Footer Interfaces
// ============================================

export interface RowFooterConfig<RecordType = unknown> {
  /** Render function for the row footer content. Return null/undefined to hide footer for a specific row */
  render: (record: RecordType, index: number) => ReactNode | null | undefined
  /** Whether to show footer for a given row (alternative to returning null from render) */
  showFooter?: (record: RecordType, index: number) => boolean
  /** Custom className for the footer container */
  className?: string
  /** Custom style for the footer container */
  style?: CSSProperties
  /** Border style separating footer from row content */
  borderStyle?: 'dashed' | 'solid' | 'dotted' | 'none'
  /** Border color override */
  borderColor?: string
  /** Custom padding override */
  padding?: string
}

// ============================================
// Expandable Interfaces
// ============================================

export interface ExpandableConfig<RecordType = unknown> {
  /** Expanded row keys (controlled) */
  expandedRowKeys?: Key[]
  /** Default expanded row keys */
  defaultExpandedRowKeys?: Key[]
  /** Custom expanded row render */
  expandedRowRender?: (record: RecordType, index: number, indent: number, expanded: boolean) => ReactNode
  /** Custom expand icon */
  expandIcon?: (props: { expanded: boolean; onExpand: (record: RecordType, e: React.MouseEvent) => void; record: RecordType }) => ReactNode
  /** Callback when expand changes */
  onExpand?: (expanded: boolean, record: RecordType) => void
  /** Callback when expanded row keys change */
  onExpandedRowsChange?: (expandedKeys: Key[]) => void
  /** Row expandable check */
  rowExpandable?: (record: RecordType) => boolean
  /** Expand column width */
  columnWidth?: string | number
  /** Expand column title */
  columnTitle?: ReactNode
  /** Expand row by click */
  expandRowByClick?: boolean
  /** Fixed expand column */
  fixed?: FixedType
  /** Show expand column */
  showExpandColumn?: boolean
  /** Indent size for tree data */
  indentSize?: number
  /** Children column name for tree data */
  childrenColumnName?: string
  /** Expanded row class name */
  expandedRowClassName?: (record: RecordType, index: number, indent: number) => string
}

// ============================================
// Scroll Interfaces
// ============================================

export interface TableScroll {
  /** Scroll width */
  x?: string | number | true
  /** Scroll height */
  y?: string | number
  /** Scroll to first row on change */
  scrollToFirstRowOnChange?: boolean
}

// ============================================
// TableHeader Config Interfaces
// ============================================

/** Configuration for a single tab in the TableHeader tab group */
export interface TabConfig {
  /** Unique key identifying this tab */
  key: string;
  /** Display label for the tab */
  label: ReactNode;
  /** Whether this tab is currently active */
  active?: boolean;
  /** Callback when this tab is clicked */
  onClick: (key: string) => void;
}

/** Configuration for the TableHeader search field */
export interface SearchConfig {
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Controlled input value */
  value?: string;
  /** Callback when input value changes */
  onChange: (value: string) => void;
}

/** Configuration for a single filter dropdown in the TableHeader */
export interface FilterConfig {
  /** Display label for the filter button */
  label: string;
  /** Whether the filter dropdown is currently expanded */
  expanded?: boolean;
  /** Callback when the filter button is toggled */
  onToggle: (index: number) => void;
}

/** Configuration for a single action button in the TableHeader */
export interface ActionConfig {
  /** Button label text (required for primary/secondary, optional for icon) */
  label?: string;
  /** Button visual variant */
  variant: 'primary' | 'secondary' | 'icon';
  /** Callback when button is clicked */
  onClick: () => void;
  /** Icon ReactNode (required for icon variant, optional for others) */
  icon?: ReactNode;
}

// ============================================
// Main Table Props Interface
// ============================================

export interface TableProps<RecordType = unknown> {
  // ============ Data ============
  /** Data source */
  dataSource?: RecordType[]
  /** Column definitions */
  columns?: ColumnType<RecordType>[]
  /** Row key accessor */
  rowKey?: string | ((record: RecordType, index?: number) => Key)
  /** Children for JSX columns */
  children?: ReactNode

  // ============ Styling ============
  /** Display variant — 'card' renders each row (+ footer) as a separate rounded card with gaps */
  variant?: 'default' | 'card'
  /** Size variant */
  size?: TableSize | 'small' | 'medium' | 'large'
  /** Table layout */
  tableLayout?: TableLayout | 'auto' | 'fixed'
  /** Bordered style */
  bordered?: boolean
  /** Show header */
  showHeader?: boolean
  /** Custom class name */
  className?: string
  /** Custom style */
  style?: CSSProperties
  /** Row class name */
  rowClassName?: string | ((record: RecordType, index: number) => string)
  /** Header row props */
  onHeaderRow?: (columns: ColumnType<RecordType>[], index?: number) => CSSProperties | { onClick?: () => void }
  /** Body row props */
  onRow?: (record: RecordType, index?: number) => CSSProperties | { onClick?: () => void }
  /** Background color */
  bgColor?: string
  /** Header background color */
  headerBgColor?: string
  /** Stripe rows */
  striped?: boolean
  /** Hover effect */
  hoverable?: boolean

  // ============ Header ============
  /** Tab configuration for the TableHeader tab group */
  headerTabs?: TabConfig[];
  /** Position of the tab group relative to the action bar */
  headerTabsPosition?: 'top' | 'bottom';
  /** Search field configuration for the TableHeader */
  headerSearch?: SearchConfig;
  /** Filter dropdown configurations for the TableHeader (max 5) */
  headerFilters?: FilterConfig[];
  /** Action button configurations for the TableHeader (max 3) */
  headerActions?: ActionConfig[];

  // ============ Features ============
  /** Row selection config */
  rowSelection?: RowSelection<RecordType>
  /** Pagination config */
  pagination?: PaginationConfig | false
  /** Scroll config */
  scroll?: TableScroll
  /** Expandable config */
  expandable?: ExpandableConfig<RecordType>
  /** Row footer config - renders custom content below each row */
  rowFooter?: RowFooterConfig<RecordType> | ((record: RecordType, index: number) => ReactNode | null | undefined)

  // ============ Loading & Empty ============
  /** Loading state */
  loading?: boolean | { spinning?: boolean; indicator?: ReactNode; tip?: string }
  /** Custom empty content */
  locale?: { emptyText?: ReactNode; filterConfirm?: ReactNode; filterReset?: ReactNode }

  // ============ Callbacks ============
  /** Callback when table changes (pagination, filters, sorter) */
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<string, Key[] | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    extra: { currentDataSource: RecordType[]; action: 'paginate' | 'sort' | 'filter' }
  ) => void

  // ============ Advanced ============
  /** Virtual scroll (for large datasets) */
  virtual?: boolean
  /** Summary row */
  summary?: (data: readonly RecordType[]) => ReactNode
  /** Title */
  title?: (data: readonly RecordType[]) => ReactNode
  /** Footer */
  footer?: (data: readonly RecordType[]) => ReactNode
  /** Custom components */
  components?: {
    table?: React.ComponentType<unknown>
    header?: {
      wrapper?: React.ComponentType<unknown>
      row?: React.ComponentType<unknown>
      cell?: React.ComponentType<unknown>
    }
    body?: {
      wrapper?: React.ComponentType<unknown>
      row?: React.ComponentType<unknown>
      cell?: React.ComponentType<unknown>
    }
  }
  /** Sticky header */
  sticky?: boolean | { offsetHeader?: number; offsetScroll?: number; getContainer?: () => HTMLElement }
  /** Get popup container */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  /** Sort tooltip */
  showSorterTooltip?: boolean | { title?: ReactNode }
}

// ============================================
// Ref Interface
// ============================================

export interface TableRef {
  nativeElement: HTMLDivElement | null
  scrollTo: (config: { index?: number; key?: Key; top?: number; left?: number }) => void
}

// ============================================
// Sub-component Props
// ============================================

export interface ColumnProps<RecordType = unknown> extends ColumnType<RecordType> {
  children?: ReactNode
}

export interface ColumnGroupProps<RecordType = unknown> extends ColumnGroupType<RecordType> {
  children?: ReactNode
}

export interface SummaryProps {
  fixed?: FixedType
  children?: ReactNode
}

export interface SummaryCellProps {
  index?: number
  colSpan?: number
  rowSpan?: number
  align?: AlignType
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface SummaryRowProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

// ============================================
// Static Constants
// ============================================

export const SELECTION_COLUMN = 'SELECTION_COLUMN' as const
export const EXPAND_COLUMN = 'EXPAND_COLUMN' as const
export const SELECTION_ALL = 'SELECT_ALL' as const
export const SELECTION_INVERT = 'SELECT_INVERT' as const
export const SELECTION_NONE = 'SELECT_NONE' as const

// ============================================
// Utility Types
// ============================================

export type GetRowKey<RecordType> = (record: RecordType, index?: number) => Key
export type TransformColumns<RecordType> = (columns: ColumnType<RecordType>[]) => ColumnType<RecordType>[]
