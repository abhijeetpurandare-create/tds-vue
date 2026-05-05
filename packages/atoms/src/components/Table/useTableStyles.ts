import { css } from '@emotion/css';
import type { TableConfig, TableVariantConfig } from '../../types/types';

/** One Emotion CSS class string per Table sub-element */
export interface TableStyleMap {
  container: string;
  table: string;
  headerRow: string;
  headerCell: string;
  bodyRow: string;
  bodyCell: string;
  selectionCell: string;
  sortIndicator: string;
  paginationBar: string;
  paginationButton: string;
  paginationButtonActive: string;
  paginationButtonDisabled: string;
  emptyState: string;
  loadingOverlay: string;
  rowFooter: string;

  // TableHeader sub-elements
  tableHeader: string;
  tabGroup: string;
  tabCell: string;
  tabCellActive: string;
  searchField: string;
  filterDropdown: string;
  filterDropdownActive: string;
  actionBar: string;
  actionButtonPrimary: string;
  actionButtonSecondary: string;
  actionButtonIcon: string;
}

/** Input parameters for the style builder */
export interface BuildTableStylesParams {
  config: TableConfig;
  variant: 'default' | 'card';
  size: 'small' | 'medium' | 'large';
  bordered: boolean;
  striped: boolean;
  hoverable: boolean;
  bgColor?: string;
  headerBgColor?: string;
}

/** Size config shape extracted from TableConfig.sizes */
interface SizeConfig {
  headerPadding?: string;
  cellPadding?: string;
  fontSize?: string;
  headerFontSize?: string;
}

function buildContainerStyles(
  variantConfig: TableVariantConfig | undefined,
  config: TableConfig,
): string {
  const vc = variantConfig?.container;
  return css({
    backgroundColor: vc?.backgroundColor ?? config.base?.backgroundColor,
    borderRadius: vc?.borderRadius ?? config.base?.radius,
    overflow: vc?.overflow,
    border: vc?.border,
  });
}

function buildTableElementStyles(
  variantConfig: TableVariantConfig | undefined,
): string {
  const tc = variantConfig?.table;
  return css({
    width: '100%',
    borderCollapse: tc?.borderCollapse as any,
    borderSpacing: tc?.borderSpacing,
  });
}

function buildHeaderStyles(
  config: TableConfig,
  sizeConfig: SizeConfig | undefined,
  variantConfig: TableVariantConfig | undefined,
  headerBgColor?: string,
): { headerRow: string; headerCell: string } {
  const headerBg =
    headerBgColor ??
    variantConfig?.header?.backgroundColor ??
    config.header?.backgroundColor;

  const headerRow = css({
    backgroundColor: headerBg,
  });

  const headerCell = css({
    backgroundColor: headerBg,
    color: config.header?.textColor,
    fontWeight: config.header?.fontWeight,
    fontFamily: config.base?.fontFamily,
    fontSize: sizeConfig?.headerFontSize,
    padding: sizeConfig?.headerPadding,
    transition: config.base?.transition,
    '&:hover': {
      backgroundColor: config.header?.hoverBackgroundColor,
    },
  });

  return { headerRow, headerCell };
}

function buildBodyRowStyles(
  config: TableConfig,
  variantConfig: TableVariantConfig | undefined,
  hoverable: boolean,
  striped: boolean,
  bgColor?: string,
): string {
  const rowBg =
    bgColor ??
    variantConfig?.row?.backgroundColor ??
    config.body?.backgroundColor;

  const hoverBg =
    variantConfig?.states?.hover?.backgroundColor ??
    config.body?.hoverBackgroundColor;

  const stripedBg =
    variantConfig?.states?.striped?.backgroundColor ??
    config.body?.stripedBackgroundColor;

  const selectedBg =
    variantConfig?.states?.selected?.backgroundColor ??
    config.states?.selected?.backgroundColor;

  return css({
    backgroundColor: rowBg,
    borderRadius: variantConfig?.row?.borderRadius,
    transition: config.base?.transition,
    ...(hoverable && {
      '&:hover': {
        backgroundColor: hoverBg,
      },
    }),
    ...(striped && {
      '&:nth-of-type(even)': {
        backgroundColor: stripedBg,
      },
    }),
    '&[data-selected="true"]': {
      backgroundColor: selectedBg,
    },
  });
}

function buildBodyCellStyles(
  config: TableConfig,
  sizeConfig: SizeConfig | undefined,
  variantConfig: TableVariantConfig | undefined,
): string {
  return css({
    padding: sizeConfig?.cellPadding,
    fontSize: sizeConfig?.fontSize,
    fontFamily: config.base?.fontFamily,
    color: config.body?.textColor,
    borderBottom: variantConfig?.cell?.borderBottom,
    transition: config.base?.transition,
  });
}

function buildSelectionStyles(config: TableConfig): string {
  return css({
    width: config.selection?.width,
    '& input[type="checkbox"], & input[type="radio"]': {
      accentColor: config.selection?.checkedColor,
      borderColor: config.selection?.borderColor,
    },
    '& input:disabled': {
      borderColor: config.selection?.disabledBorderColor,
      backgroundColor: config.selection?.disabledBackgroundColor,
    },
  });
}

function buildSortStyles(config: TableConfig): string {
  return css({
    display: 'inline-flex',
    flexDirection: 'column',
    gap: config.sorter?.gap,
    '& .sort-icon-active': {
      color: config.sorter?.activeColor,
    },
    '& .sort-icon-inactive': {
      color: config.sorter?.inactiveColor,
    },
    '& svg': {
      width: config.sorter?.iconSize,
      height: config.sorter?.iconSize,
    },
  });
}

function buildPaginationStyles(config: TableConfig): {
  paginationBar: string;
  paginationButton: string;
  paginationButtonActive: string;
  paginationButtonDisabled: string;
} {
  const pg = config.pagination;

  const paginationBar = css({
    display: 'flex',
    alignItems: 'center',
    gap: pg?.gap,
    fontSize: pg?.fontSize,
    fontFamily: config.base?.fontFamily,
  });

  const paginationButton = css({
    minWidth: pg?.buttonMinWidth,
    height: pg?.buttonHeight,
    padding: pg?.buttonPadding,
    border: `1px solid ${pg?.buttonBorderColor ?? 'transparent'}`,
    backgroundColor: pg?.buttonBackgroundColor,
    borderRadius: pg?.buttonRadius,
    fontSize: pg?.fontSize,
    cursor: 'pointer',
    transition: config.base?.transition,
  });

  const paginationButtonActive = css({
    backgroundColor: pg?.activeColor,
    color: pg?.buttonBackgroundColor,
    fontWeight: pg?.activeFontWeight,
    borderColor: pg?.activeColor,
  });

  const paginationButtonDisabled = css({
    color: pg?.disabledTextColor,
    backgroundColor: pg?.disabledBackgroundColor,
    cursor: 'not-allowed',
    borderColor: pg?.disabledBackgroundColor,
  });

  return {
    paginationBar,
    paginationButton,
    paginationButtonActive,
    paginationButtonDisabled,
  };
}

function buildEmptyStyles(config: TableConfig): string {
  return css({
    padding: config.empty?.padding,
    color: config.empty?.textColor,
    textAlign: 'center',
    fontFamily: config.base?.fontFamily,
    '& svg': {
      fill: config.empty?.iconFill,
      stroke: config.empty?.iconStroke,
    },
  });
}

function buildLoadingStyles(config: TableConfig): string {
  return css({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.loading?.overlayBackground,
    '& .spinner': {
      width: config.loading?.spinnerSize,
      height: config.loading?.spinnerSize,
      borderColor: config.loading?.trackColor,
      borderTopColor: config.loading?.spinnerColor,
    },
  });
}

function buildRowFooterStyles(config: TableConfig): string {
  return css({
    borderTop: `${config.rowFooter?.borderStyle ?? 'dashed'} 1px ${config.rowFooter?.borderColor ?? 'transparent'}`,
    padding: config.rowFooter?.padding,
    backgroundColor: config.rowFooter?.backgroundColor,
    fontFamily: config.base?.fontFamily,
  });
}

function buildTableHeaderStyles(config: TableConfig): string {
  const th = config.tableHeader;
  return css({
    backgroundColor: th?.container?.backgroundColor,
    borderTopLeftRadius: th?.container?.borderRadius,
    borderTopRightRadius: th?.container?.borderRadius,
  });
}

function buildTabGroupStyles(config: TableConfig): string {
  const tabs = config.tableHeader?.tabs;
  return css({
    display: 'flex',
    flexDirection: 'row',
    borderBottom: `1px solid ${tabs?.borderBottomColor ?? 'transparent'}`,
    gap: tabs?.gap,
  });
}

function buildTabCellStyles(config: TableConfig): string {
  const tabs = config.tableHeader?.tabs;
  return css({
    fontFamily: tabs?.fontFamily,
    fontSize: tabs?.fontSize,
    lineHeight: tabs?.lineHeight,
    fontWeight: tabs?.inactiveFontWeight,
    color: tabs?.inactiveTextColor,
    padding: tabs?.padding,
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
  });
}

function buildTabCellActiveStyles(config: TableConfig): string {
  const tabs = config.tableHeader?.tabs;
  return css({
    fontWeight: tabs?.activeFontWeight,
    color: tabs?.activeTextColor,
    borderBottom: `${tabs?.activeBorderWidth ?? '2px'} solid ${tabs?.activeBorderColor ?? 'transparent'}`,
  });
}

function buildSearchFieldStyles(config: TableConfig): string {
  const search = config.tableHeader?.search;
  return css({
    border: `${search?.borderWidth ?? '1px'} solid ${search?.borderColor ?? 'transparent'}`,
    borderRadius: search?.borderRadius,
    backgroundColor: search?.backgroundColor,
    padding: search?.padding,
    fontSize: search?.fontSize,
    lineHeight: search?.lineHeight,
    color: search?.textColor,
    fontFamily: search?.fontFamily,
    outline: 'none',
    '&::placeholder': {
      color: search?.placeholderColor,
    },
  });
}

function buildFilterDropdownStyles(config: TableConfig): string {
  const filter = config.tableHeader?.filter;
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    border: `${filter?.borderWidth ?? '1px'} solid ${filter?.borderColor ?? 'transparent'}`,
    borderRadius: filter?.borderRadius,
    backgroundColor: filter?.backgroundColor,
    padding: filter?.padding,
    fontSize: filter?.fontSize,
    lineHeight: filter?.lineHeight,
    color: filter?.textColor,
    fontFamily: filter?.fontFamily,
    cursor: 'pointer',
  });
}

function buildFilterDropdownActiveStyles(config: TableConfig): string {
  const filter = config.tableHeader?.filter;
  return css({
    backgroundColor: filter?.activeBackgroundColor,
    borderColor: filter?.activeBorderColor,
  });
}

function buildActionBarStyles(config: TableConfig): string {
  const ab = config.tableHeader?.actionBar;
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: ab?.padding,
    gap: ab?.gap,
  });
}

function buildActionButtonPrimaryStyles(config: TableConfig): string {
  const btns = config.tableHeader?.buttons;
  return css({
    backgroundColor: btns?.primary?.backgroundColor,
    color: btns?.primary?.textColor,
    borderRadius: btns?.borderRadius,
    padding: btns?.padding,
    fontSize: btns?.fontSize,
    lineHeight: btns?.lineHeight,
    fontFamily: btns?.fontFamily,
    fontWeight: btns?.fontWeight,
    border: 'none',
    cursor: 'pointer',
  });
}

function buildActionButtonSecondaryStyles(config: TableConfig): string {
  const btns = config.tableHeader?.buttons;
  return css({
    backgroundColor: btns?.secondary?.backgroundColor ?? 'transparent',
    color: btns?.secondary?.textColor,
    borderRadius: btns?.borderRadius,
    padding: btns?.padding,
    fontSize: btns?.fontSize,
    lineHeight: btns?.lineHeight,
    fontFamily: btns?.fontFamily,
    fontWeight: btns?.fontWeight,
    border: `${btns?.secondary?.borderWidth ?? '0.5px'} solid ${btns?.secondary?.borderColor ?? 'transparent'}`,
    cursor: 'pointer',
  });
}

function buildActionButtonIconStyles(config: TableConfig): string {
  const btns = config.tableHeader?.buttons;
  return css({
    backgroundColor: btns?.icon?.backgroundColor ?? 'transparent',
    borderRadius: btns?.borderRadius,
    padding: btns?.padding,
    fontSize: btns?.fontSize,
    lineHeight: btns?.lineHeight,
    border: `${btns?.icon?.borderWidth ?? '1px'} solid ${btns?.icon?.borderColor ?? 'transparent'}`,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  });
}

/**
 * Builds Emotion CSS class strings for every Table sub-element
 * based on the resolved theme config and component props.
 */
export function buildTableStyles(params: BuildTableStylesParams): TableStyleMap {
  const {
    config,
    variant,
    size,
    hoverable,
    striped,
    bgColor,
    headerBgColor,
  } = params;

  const variantConfig = config.variants?.[variant];
  const sizeConfig = config.sizes?.[size];

  const container = buildContainerStyles(variantConfig, config);
  const table = buildTableElementStyles(variantConfig);
  const { headerRow, headerCell } = buildHeaderStyles(
    config,
    sizeConfig,
    variantConfig,
    headerBgColor,
  );
  const bodyRow = buildBodyRowStyles(
    config,
    variantConfig,
    hoverable,
    striped,
    bgColor,
  );
  const bodyCell = buildBodyCellStyles(config, sizeConfig, variantConfig);
  const selectionCell = buildSelectionStyles(config);
  const sortIndicator = buildSortStyles(config);
  const {
    paginationBar,
    paginationButton,
    paginationButtonActive,
    paginationButtonDisabled,
  } = buildPaginationStyles(config);
  const emptyState = buildEmptyStyles(config);
  const loadingOverlay = buildLoadingStyles(config);
  const rowFooter = buildRowFooterStyles(config);

  // TableHeader sub-element styles
  const tableHeader = buildTableHeaderStyles(config);
  const tabGroup = buildTabGroupStyles(config);
  const tabCell = buildTabCellStyles(config);
  const tabCellActive = buildTabCellActiveStyles(config);
  const searchField = buildSearchFieldStyles(config);
  const filterDropdown = buildFilterDropdownStyles(config);
  const filterDropdownActive = buildFilterDropdownActiveStyles(config);
  const actionBar = buildActionBarStyles(config);
  const actionButtonPrimary = buildActionButtonPrimaryStyles(config);
  const actionButtonSecondary = buildActionButtonSecondaryStyles(config);
  const actionButtonIcon = buildActionButtonIconStyles(config);

  return {
    container,
    table,
    headerRow,
    headerCell,
    bodyRow,
    bodyCell,
    selectionCell,
    sortIndicator,
    paginationBar,
    paginationButton,
    paginationButtonActive,
    paginationButtonDisabled,
    emptyState,
    loadingOverlay,
    rowFooter,
    tableHeader,
    tabGroup,
    tabCell,
    tabCellActive,
    searchField,
    filterDropdown,
    filterDropdownActive,
    actionBar,
    actionButtonPrimary,
    actionButtonSecondary,
    actionButtonIcon,
  };
}
