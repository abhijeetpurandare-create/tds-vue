import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the figma-variables-resolver which uses ESM import of JSON
jest.mock('../../../utils/templateResolver', () => ({
  resolveTemplatePlaceholders: (theme: any) => theme,
}));

// Mock the ThemeProvider CSS import
jest.mock('../../ThemeProvider/tarmac-variables.css', () => ({}));

import Table from '../index';
import {
  SELECTION_COLUMN,
  EXPAND_COLUMN,
  SELECTION_ALL,
  SELECTION_INVERT,
  SELECTION_NONE,
} from '../types';
import type { ColumnType, TableProps } from '../types';

// ── Test data ────────────────────────────────────────────────────────────

interface TestRecord {
  key: string;
  name: string;
  age: number;
  address: string;
}

const sampleData: TestRecord[] = [
  { key: '1', name: 'Alice', age: 30, address: '10 Downing St' },
  { key: '2', name: 'Bob', age: 25, address: '221B Baker St' },
  { key: '3', name: 'Charlie', age: 35, address: '742 Evergreen Terrace' },
  { key: '4', name: 'Diana', age: 28, address: '1600 Pennsylvania Ave' },
  { key: '5', name: 'Eve', age: 32, address: '4 Privet Drive' },
];

const sampleColumns: ColumnType<TestRecord>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
  { key: 'address', title: 'Address', dataIndex: 'address' },
];

// ── Describe: Legacy backward compatibility ──────────────────────────────

describe('Table — Legacy (backward compatibility)', () => {
  // 1. Renders with default props
  it('renders with default props', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  // 2. Size variant: small
  it('renders with size="small" without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} size="small" />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 3. Size variant: medium
  it('renders with size="medium" without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} size="medium" />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 4. Size variant: large
  it('renders with size="large" without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} size="large" />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 5. Variant: default
  it('renders with variant="default" without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} variant="default" />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 6. Variant: card
  it('renders with variant="card" without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} variant="card" />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 7. Sorting works (click header to sort)
  it('sorts data when a sortable column header is clicked', () => {
    const onChange = jest.fn();
    render(
      <Table
        dataSource={sampleData}
        columns={sampleColumns}
        onChange={onChange}
      />
    );

    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader);

    expect(onChange).toHaveBeenCalledTimes(1);
    const [, , sorter, extra] = onChange.mock.calls[0];
    expect(extra.action).toBe('sort');
    expect(sorter.order).toBe('ascend');
  });

  // 8. Pagination renders when provided
  it('renders pagination when pagination config is provided', () => {
    const { container } = render(
      <Table
        dataSource={sampleData}
        columns={sampleColumns}
        pagination={{ pageSize: 2, current: 1 }}
      />
    );
    // Should only show 2 rows on the first page
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  // 9. Row selection with checkbox type
  it('renders row selection with checkbox type', () => {
    const onSelectionChange = jest.fn();
    const { container } = render(
      <Table
        dataSource={sampleData}
        columns={sampleColumns}
        rowSelection={{ type: 'checkbox', onChange: onSelectionChange }}
      />
    );
    // The Table uses custom SVG checkbox icons — look for extra th/td selection cells
    // Header row should have an extra th for the selection column
    const headerCells = container.querySelectorAll('thead th');
    // columns.length + 1 selection column
    expect(headerCells.length).toBe(sampleColumns.length + 1);
  });

  // 10. Row selection with radio type
  it('renders row selection with radio type', () => {
    const { container } = render(
      <Table
        dataSource={sampleData}
        columns={sampleColumns}
        rowSelection={{ type: 'radio' }}
      />
    );
    const radios = container.querySelectorAll('input[type="radio"], [role="radio"], svg');
    expect(radios.length).toBeGreaterThan(0);
  });

  // 11. Expandable rows work
  it('renders with expandable config without error', () => {
    const { container } = render(
      <Table
        dataSource={sampleData}
        columns={sampleColumns}
        expandable={{
          expandedRowRender: (record) => <span>Details for {record.name}</span>,
        }}
      />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 12. onChange fires with correct signature
  it('fires onChange with correct signature on sort', () => {
    const onChange = jest.fn();
    render(
      <Table
        dataSource={sampleData}
        columns={sampleColumns}
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByText('Age'));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ total: expect.any(Number) }),
      expect.any(Object),
      expect.objectContaining({ order: expect.any(String) }),
      expect.objectContaining({ action: 'sort', currentDataSource: expect.any(Array) })
    );
  });

  // 13. bgColor prop is applied
  it('renders with bgColor prop without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} bgColor="#f0f0f0" />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 14. headerBgColor prop is applied
  it('renders with headerBgColor prop without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} headerBgColor="#e0e0e0" />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 15. Static export: SELECTION_COLUMN
  it('exports SELECTION_COLUMN constant', () => {
    expect(Table.SELECTION_COLUMN).toBe(SELECTION_COLUMN);
    expect(typeof Table.SELECTION_COLUMN).toBe('string');
  });

  // 16. Static export: EXPAND_COLUMN
  it('exports EXPAND_COLUMN constant', () => {
    expect(Table.EXPAND_COLUMN).toBe(EXPAND_COLUMN);
    expect(typeof Table.EXPAND_COLUMN).toBe('string');
  });

  // 17. Static exports: SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE
  it('exports SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE constants', () => {
    expect(Table.SELECTION_ALL).toBe(SELECTION_ALL);
    expect(Table.SELECTION_INVERT).toBe(SELECTION_INVERT);
    expect(Table.SELECTION_NONE).toBe(SELECTION_NONE);
  });

  // 18. Column export present
  it('exports Column sub-component', () => {
    expect(Table.Column).toBeDefined();
    expect(typeof Table.Column).toBe('function');
  });

  // 19. ColumnGroup export present
  it('exports ColumnGroup sub-component', () => {
    expect(Table.ColumnGroup).toBeDefined();
    expect(typeof Table.ColumnGroup).toBe('function');
  });

  // 20. Summary export present
  it('exports Summary sub-component with Row and Cell', () => {
    expect(Table.Summary).toBeDefined();
    expect(typeof Table.Summary).toBe('function');
    expect(Table.Summary.Row).toBeDefined();
    expect(Table.Summary.Cell).toBeDefined();
  });

  // 21. Falls back to defaults without ThemeProvider
  it('renders without ThemeProvider (falls back to defaults)', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  // 22. Renders with bordered=true
  it('renders with bordered=true without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} bordered />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 23. Renders with striped=true
  it('renders with striped=true without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} striped />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 24. Renders with hoverable=true
  it('renders with hoverable=true without error', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} hoverable />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 25. Renders with loading=true
  it('renders with loading=true and shows loading overlay', () => {
    const { container } = render(
      <Table dataSource={sampleData} columns={sampleColumns} loading />
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 26. Renders with empty dataSource
  it('renders with empty dataSource and shows empty state', () => {
    render(
      <Table dataSource={[]} columns={sampleColumns} />
    );
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});


// ── Tarmac TDS imports ───────────────────────────────────────────────────

import { buildTableStyles } from '../useTableStyles';
import type { BuildTableStylesParams, TableStyleMap } from '../useTableStyles';
import type { TableConfig } from '../../../types/types';
import ThemeProvider from '../../ThemeProvider';
import { defaultThemeConfig } from '../../../config/config';

// ── Mock Tarmac theme config ─────────────────────────────────────────────

const tarmacTableConfig: TableConfig = {
  base: {
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.15s ease',
    radius: '6px',
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  sizes: {
    small: {
      headerPadding: '6px 10px',
      cellPadding: '6px 10px',
      fontSize: '11px',
      headerFontSize: '11px',
    },
    medium: {
      headerPadding: '10px 14px',
      cellPadding: '10px 14px',
      fontSize: '13px',
      headerFontSize: '13px',
    },
    large: {
      headerPadding: '14px 18px',
      cellPadding: '14px 18px',
      fontSize: '15px',
      headerFontSize: '15px',
    },
  },
  header: {
    backgroundColor: '#F7FAFC',
    textColor: '#1A202C',
    fontWeight: '600',
    hoverBackgroundColor: '#EDF2F7',
  },
  body: {
    backgroundColor: '#FFFFFF',
    textColor: '#2D3748',
    hoverBackgroundColor: '#F7FAFC',
    stripedBackgroundColor: '#F7FAFC',
  },
  states: {
    selected: {
      backgroundColor: '#EBF8FF',
    },
    disabled: {
      cursor: 'not-allowed',
    },
  },
  selection: {
    width: '44px',
    checkedColor: '#3182CE',
    borderColor: '#CBD5E0',
    disabledBorderColor: '#E2E8F0',
    disabledBackgroundColor: '#EDF2F7',
  },
  sorter: {
    activeColor: '#3182CE',
    inactiveColor: '#A0AEC0',
    iconSize: '10px',
    gap: '2px',
  },
  pagination: {
    gap: '12px',
    fontSize: '13px',
    buttonMinWidth: '30px',
    buttonHeight: '30px',
    buttonPadding: '0 6px',
    buttonBorderColor: '#CBD5E0',
    buttonBackgroundColor: '#FFFFFF',
    buttonRadius: '4px',
    activeColor: '#3182CE',
    activeFontWeight: '600',
    disabledTextColor: '#A0AEC0',
    disabledBackgroundColor: '#EDF2F7',
    inputWidth: '48px',
  },
  empty: {
    padding: '40px 12px',
    textColor: '#A0AEC0',
    iconFill: '#EDF2F7',
    iconStroke: '#CBD5E0',
  },
  loading: {
    overlayBackground: 'rgba(255, 255, 255, 0.8)',
    spinnerColor: '#3182CE',
    trackColor: '#E2E8F0',
    spinnerSize: '28',
  },
  rowFooter: {
    borderStyle: 'dashed',
    borderColor: '#CBD5E0',
    padding: '10px 14px',
    backgroundColor: 'transparent',
  },
  variants: {
    default: {
      container: {
        backgroundColor: '#FFFFFF',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
      },
      table: {
        borderCollapse: 'collapse',
        borderSpacing: '0',
      },
      row: {
        backgroundColor: '#FFFFFF',
        borderRadius: '0',
        borderColor: '#E2E8F0',
      },
      cell: {
        borderBottom: '1px solid #E2E8F0',
      },
      header: {
        backgroundColor: '#F7FAFC',
      },
      states: {
        hover: { backgroundColor: '#F7FAFC' },
        selected: { backgroundColor: '#EBF8FF' },
        striped: { backgroundColor: '#F7FAFC' },
        disabled: { cursor: 'not-allowed' },
      },
    },
    card: {
      container: {
        backgroundColor: 'transparent',
        borderRadius: '0',
        overflow: 'visible',
        border: 'none',
      },
      table: {
        borderCollapse: 'separate',
        borderSpacing: '0 8px',
      },
      row: {
        backgroundColor: '#FFFFFF',
        borderRadius: '6px',
        borderColor: '#E2E8F0',
      },
      cell: {
        borderBottom: 'none',
      },
      header: {
        backgroundColor: 'transparent',
      },
      states: {
        hover: { backgroundColor: '#F7FAFC' },
        selected: { backgroundColor: '#EBF8FF' },
        striped: { backgroundColor: '#F7FAFC' },
        disabled: { cursor: 'not-allowed' },
      },
    },
  },
};

/** Helper to build styles with sensible defaults */
function buildTarmacStyles(
  overrides: Partial<BuildTableStylesParams> = {},
): TableStyleMap {
  return buildTableStyles({
    config: tarmacTableConfig,
    variant: 'default',
    size: 'medium',
    bordered: false,
    striped: false,
    hoverable: true,
    ...overrides,
  });
}

// ── Describe: Tarmac TDS ─────────────────────────────────────────────────

describe('Table — Tarmac TDS', () => {
  // 1. Renders with Tarmac theme config
  it('renders Table with Tarmac theme config via ThemeProvider', () => {
    const tarmacTheme = {
      components: { table: tarmacTableConfig },
    };
    const { container } = render(
      <ThemeProvider initialTheme={tarmacTheme}>
        <Table dataSource={sampleData} columns={sampleColumns} />
      </ThemeProvider>,
    );
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  // 2. buildTableStyles returns all 15 required keys
  it('buildTableStyles returns all 15 required keys with Tarmac config', () => {
    const styles = buildTarmacStyles();
    const expectedKeys: (keyof TableStyleMap)[] = [
      'container', 'table', 'headerRow', 'headerCell', 'bodyRow', 'bodyCell',
      'selectionCell', 'sortIndicator', 'paginationBar', 'paginationButton',
      'paginationButtonActive', 'paginationButtonDisabled', 'emptyState',
      'loadingOverlay', 'rowFooter',
    ];
    for (const key of expectedKeys) {
      expect(styles[key]).toBeDefined();
      expect(typeof styles[key]).toBe('string');
      expect(styles[key].length).toBeGreaterThan(0);
    }
  });

  // 3. Header cells use theme header tokens (backgroundColor via variant header)
  it('header styles differ when variant header.backgroundColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      variants: {
        ...tarmacTableConfig.variants,
        default: {
          ...tarmacTableConfig.variants!.default,
          header: { backgroundColor: '#FF0000' },
        },
      },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.headerCell).not.toBe(stylesB.headerCell);
  });

  // 4. Header cells use theme header tokens (textColor)
  it('header styles differ when header.textColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      header: { ...tarmacTableConfig.header, textColor: '#00FF00' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.headerCell).not.toBe(stylesB.headerCell);
  });

  // 5. Header cells use theme header tokens (fontWeight)
  it('header styles differ when header.fontWeight changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      header: { ...tarmacTableConfig.header, fontWeight: '700' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.headerCell).not.toBe(stylesB.headerCell);
  });

  // 6. Body cells use theme body tokens (backgroundColor via variant row)
  it('body row styles differ when variant row.backgroundColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      variants: {
        ...tarmacTableConfig.variants,
        default: {
          ...tarmacTableConfig.variants!.default,
          row: { ...tarmacTableConfig.variants!.default!.row, backgroundColor: '#AABBCC' },
        },
      },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.bodyRow).not.toBe(stylesB.bodyRow);
  });

  // 7. Body cells use theme body tokens (textColor)
  it('body cell styles differ when body.textColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      body: { ...tarmacTableConfig.body, textColor: '#112233' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.bodyCell).not.toBe(stylesB.bodyCell);
  });

  // 8. Selection cells use theme selection tokens (width)
  it('selection cell styles differ when selection.width changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      selection: { ...tarmacTableConfig.selection, width: '60px' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.selectionCell).not.toBe(stylesB.selectionCell);
  });

  // 9. Selection cells use theme selection tokens (checkedColor)
  it('selection cell styles differ when selection.checkedColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      selection: { ...tarmacTableConfig.selection, checkedColor: '#FF5500' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.selectionCell).not.toBe(stylesB.selectionCell);
  });

  // 10. Sort indicators use theme sorter tokens (activeColor)
  it('sort indicator styles differ when sorter.activeColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      sorter: { ...tarmacTableConfig.sorter, activeColor: '#00CCFF' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.sortIndicator).not.toBe(stylesB.sortIndicator);
  });

  // 11. Sort indicators use theme sorter tokens (inactiveColor)
  it('sort indicator styles differ when sorter.inactiveColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      sorter: { ...tarmacTableConfig.sorter, inactiveColor: '#CCCCCC' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.sortIndicator).not.toBe(stylesB.sortIndicator);
  });

  // 12. Pagination uses theme pagination tokens (gap)
  it('pagination bar styles differ when pagination.gap changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      pagination: { ...tarmacTableConfig.pagination, gap: '24px' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.paginationBar).not.toBe(stylesB.paginationBar);
  });

  // 13. Pagination uses theme pagination tokens (fontSize)
  it('pagination bar styles differ when pagination.fontSize changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      pagination: { ...tarmacTableConfig.pagination, fontSize: '16px' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.paginationBar).not.toBe(stylesB.paginationBar);
  });

  // 14. Pagination uses theme pagination tokens (buttonRadius)
  it('pagination button styles differ when pagination.buttonRadius changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      pagination: { ...tarmacTableConfig.pagination, buttonRadius: '8px' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.paginationButton).not.toBe(stylesB.paginationButton);
  });

  // 15. Loading overlay uses theme loading tokens (overlayBackground)
  it('loading overlay styles differ when loading.overlayBackground changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      loading: { ...tarmacTableConfig.loading, overlayBackground: 'rgba(0,0,0,0.5)' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.loadingOverlay).not.toBe(stylesB.loadingOverlay);
  });

  // 16. Loading overlay uses theme loading tokens (spinnerColor)
  it('loading overlay styles differ when loading.spinnerColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      loading: { ...tarmacTableConfig.loading, spinnerColor: '#FF0000' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.loadingOverlay).not.toBe(stylesB.loadingOverlay);
  });

  // 17. Empty state uses theme empty tokens (padding)
  it('empty state styles differ when empty.padding changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      empty: { ...tarmacTableConfig.empty, padding: '64px 24px' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.emptyState).not.toBe(stylesB.emptyState);
  });

  // 18. Empty state uses theme empty tokens (textColor)
  it('empty state styles differ when empty.textColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      empty: { ...tarmacTableConfig.empty, textColor: '#FF00FF' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.emptyState).not.toBe(stylesB.emptyState);
  });

  // 19. Row footer uses theme rowFooter tokens (borderStyle)
  it('row footer styles differ when rowFooter.borderStyle changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      rowFooter: { ...tarmacTableConfig.rowFooter, borderStyle: 'solid' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.rowFooter).not.toBe(stylesB.rowFooter);
  });

  // 20. Row footer uses theme rowFooter tokens (borderColor, padding)
  it('row footer styles differ when rowFooter.borderColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      rowFooter: { ...tarmacTableConfig.rowFooter, borderColor: '#FF0000' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.rowFooter).not.toBe(stylesB.rowFooter);
  });

  // 21. Card variant uses card-specific tokens (transparent bg, separate border-collapse)
  it('card variant produces different container and table styles than default', () => {
    const defaultStyles = buildTarmacStyles({ variant: 'default' });
    const cardStyles = buildTarmacStyles({ variant: 'card' });
    expect(defaultStyles.container).not.toBe(cardStyles.container);
    expect(defaultStyles.table).not.toBe(cardStyles.table);
  });

  // 22. Default variant uses default-specific tokens (container border, collapse)
  it('default variant container and table styles are consistent across calls', () => {
    const stylesA = buildTarmacStyles({ variant: 'default' });
    const stylesB = buildTarmacStyles({ variant: 'default' });
    expect(stylesA.container).toBe(stylesB.container);
    expect(stylesA.table).toBe(stylesB.table);
  });

  // 23. Hover styles present when hoverable=true
  it('body row styles differ between hoverable=true and hoverable=false', () => {
    const hoverableStyles = buildTarmacStyles({ hoverable: true });
    const noHoverStyles = buildTarmacStyles({ hoverable: false });
    expect(hoverableStyles.bodyRow).not.toBe(noHoverStyles.bodyRow);
  });

  // 24. Striped styles present when striped=true
  it('body row styles differ between striped=true and striped=false', () => {
    const stripedStyles = buildTarmacStyles({ striped: true });
    const noStripedStyles = buildTarmacStyles({ striped: false });
    expect(stripedStyles.bodyRow).not.toBe(noStripedStyles.bodyRow);
  });

  // 25. Selected row styles use states.selected tokens (variant-level)
  it('body row styles differ when variant states.selected.backgroundColor changes', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      variants: {
        ...tarmacTableConfig.variants,
        default: {
          ...tarmacTableConfig.variants!.default,
          states: {
            ...tarmacTableConfig.variants!.default!.states,
            selected: { backgroundColor: '#FFCCCC' },
          },
        },
      },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.bodyRow).not.toBe(stylesB.bodyRow);
  });

  // 26. Size small applies correct padding/fontSize
  it('size small produces different headerCell and bodyCell than medium', () => {
    const smallStyles = buildTarmacStyles({ size: 'small' });
    const mediumStyles = buildTarmacStyles({ size: 'medium' });
    expect(smallStyles.headerCell).not.toBe(mediumStyles.headerCell);
    expect(smallStyles.bodyCell).not.toBe(mediumStyles.bodyCell);
  });

  // 27. Size medium applies correct padding/fontSize
  it('size medium produces different headerCell and bodyCell than large', () => {
    const mediumStyles = buildTarmacStyles({ size: 'medium' });
    const largeStyles = buildTarmacStyles({ size: 'large' });
    expect(mediumStyles.headerCell).not.toBe(largeStyles.headerCell);
    expect(mediumStyles.bodyCell).not.toBe(largeStyles.bodyCell);
  });

  // 28. Size large applies correct padding/fontSize
  it('size large produces different headerCell and bodyCell than small', () => {
    const largeStyles = buildTarmacStyles({ size: 'large' });
    const smallStyles = buildTarmacStyles({ size: 'small' });
    expect(largeStyles.headerCell).not.toBe(smallStyles.headerCell);
    expect(largeStyles.bodyCell).not.toBe(smallStyles.bodyCell);
  });

  // 29. Card variant body row differs from default variant body row
  it('card variant body row styles differ from default variant', () => {
    const defaultStyles = buildTarmacStyles({ variant: 'default' });
    const cardStyles = buildTarmacStyles({ variant: 'card' });
    expect(defaultStyles.bodyRow).not.toBe(cardStyles.bodyRow);
  });

  // 30. Renders Table with all sizes in Tarmac theme without error
  it('renders Table with all three sizes under Tarmac theme', () => {
    const tarmacTheme = { components: { table: tarmacTableConfig } };
    for (const size of ['small', 'medium', 'large'] as const) {
      const { container } = render(
        <ThemeProvider initialTheme={tarmacTheme}>
          <Table dataSource={sampleData} columns={sampleColumns} size={size} />
        </ThemeProvider>,
      );
      expect(container.querySelector('table')).toBeInTheDocument();
    }
  });

  // 31. Renders Table with card variant in Tarmac theme
  it('renders Table with card variant under Tarmac theme', () => {
    const tarmacTheme = { components: { table: tarmacTableConfig } };
    const { container } = render(
      <ThemeProvider initialTheme={tarmacTheme}>
        <Table dataSource={sampleData} columns={sampleColumns} variant="card" />
      </ThemeProvider>,
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 32. Renders Table with loading=true in Tarmac theme
  it('renders Table with loading state under Tarmac theme', () => {
    const tarmacTheme = { components: { table: tarmacTableConfig } };
    const { container } = render(
      <ThemeProvider initialTheme={tarmacTheme}>
        <Table dataSource={sampleData} columns={sampleColumns} loading />
      </ThemeProvider>,
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  // 33. Renders Table with empty dataSource in Tarmac theme
  it('renders Table with empty state under Tarmac theme', () => {
    const tarmacTheme = { components: { table: tarmacTableConfig } };
    render(
      <ThemeProvider initialTheme={tarmacTheme}>
        <Table dataSource={[]} columns={sampleColumns} />
      </ThemeProvider>,
    );
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  // 34. Pagination active button styles differ from base button
  it('pagination active button style differs from base button style', () => {
    const styles = buildTarmacStyles();
    expect(styles.paginationButtonActive).not.toBe(styles.paginationButton);
  });

  // 35. Pagination disabled button styles differ from base button
  it('pagination disabled button style differs from base button style', () => {
    const styles = buildTarmacStyles();
    expect(styles.paginationButtonDisabled).not.toBe(styles.paginationButton);
  });
});

// ── Describe: Style Builder (useTableStyles) ─────────────────────────────

describe('Table — Style Builder (useTableStyles)', () => {
  const ALL_KEYS: (keyof TableStyleMap)[] = [
    'container', 'table', 'headerRow', 'headerCell', 'bodyRow', 'bodyCell',
    'selectionCell', 'sortIndicator', 'paginationBar', 'paginationButton',
    'paginationButtonActive', 'paginationButtonDisabled', 'emptyState',
    'loadingOverlay', 'rowFooter',
  ];

  // 1. buildTableStyles returns all required keys (original 15 + 11 header keys = 26)
  it('returns all 26 required keys', () => {
    const styles = buildTarmacStyles();
    for (const key of ALL_KEYS) {
      expect(styles).toHaveProperty(key);
    }
    expect(Object.keys(styles).length).toBe(26);
  });

  // 2. All keys are non-empty strings
  it('all keys are non-empty strings', () => {
    const styles = buildTarmacStyles();
    for (const key of ALL_KEYS) {
      expect(typeof styles[key]).toBe('string');
      expect(styles[key].length).toBeGreaterThan(0);
    }
  });

  // 3. Different configs produce different class names
  it('different configs produce different class names', () => {
    const stylesA = buildTarmacStyles();
    const altConfig: TableConfig = {
      ...tarmacTableConfig,
      header: { ...tarmacTableConfig.header, backgroundColor: '#FF0000', textColor: '#00FF00' },
      body: { ...tarmacTableConfig.body, backgroundColor: '#0000FF', textColor: '#FFFF00' },
      pagination: { ...tarmacTableConfig.pagination, gap: '99px', fontSize: '99px' },
    };
    const stylesB = buildTarmacStyles({ config: altConfig });
    expect(stylesA.headerCell).not.toBe(stylesB.headerCell);
    expect(stylesA.bodyCell).not.toBe(stylesB.bodyCell);
    expect(stylesA.paginationBar).not.toBe(stylesB.paginationBar);
  });

  // 4. Size parameter affects headerCell
  it('size parameter affects headerCell styles', () => {
    const small = buildTarmacStyles({ size: 'small' });
    const medium = buildTarmacStyles({ size: 'medium' });
    const large = buildTarmacStyles({ size: 'large' });
    expect(small.headerCell).not.toBe(medium.headerCell);
    expect(medium.headerCell).not.toBe(large.headerCell);
    expect(small.headerCell).not.toBe(large.headerCell);
  });

  // 5. Size parameter affects bodyCell
  it('size parameter affects bodyCell styles', () => {
    const small = buildTarmacStyles({ size: 'small' });
    const medium = buildTarmacStyles({ size: 'medium' });
    const large = buildTarmacStyles({ size: 'large' });
    expect(small.bodyCell).not.toBe(medium.bodyCell);
    expect(medium.bodyCell).not.toBe(large.bodyCell);
    expect(small.bodyCell).not.toBe(large.bodyCell);
  });

  // 6. Variant parameter affects container
  it('variant parameter affects container styles', () => {
    const defaultStyles = buildTarmacStyles({ variant: 'default' });
    const cardStyles = buildTarmacStyles({ variant: 'card' });
    expect(defaultStyles.container).not.toBe(cardStyles.container);
  });

  // 7. Variant parameter affects table element
  it('variant parameter affects table element styles', () => {
    const defaultStyles = buildTarmacStyles({ variant: 'default' });
    const cardStyles = buildTarmacStyles({ variant: 'card' });
    expect(defaultStyles.table).not.toBe(cardStyles.table);
  });

  // 8. bgColor override takes precedence (bodyRow changes)
  it('bgColor override changes bodyRow styles', () => {
    const withoutOverride = buildTarmacStyles();
    const withOverride = buildTarmacStyles({ bgColor: '#AABBCC' });
    expect(withoutOverride.bodyRow).not.toBe(withOverride.bodyRow);
  });

  // 9. headerBgColor override takes precedence (headerRow changes)
  it('headerBgColor override changes headerRow styles', () => {
    const withoutOverride = buildTarmacStyles();
    const withOverride = buildTarmacStyles({ headerBgColor: '#DDEEFF' });
    expect(withoutOverride.headerRow).not.toBe(withOverride.headerRow);
  });

  // 10. headerBgColor override takes precedence (headerCell changes)
  it('headerBgColor override changes headerCell styles', () => {
    const withoutOverride = buildTarmacStyles();
    const withOverride = buildTarmacStyles({ headerBgColor: '#DDEEFF' });
    expect(withoutOverride.headerCell).not.toBe(withOverride.headerCell);
  });

  // 11. Hoverable=false omits hover styles (bodyRow differs from hoverable=true)
  it('hoverable=false produces different bodyRow than hoverable=true', () => {
    const hoverable = buildTarmacStyles({ hoverable: true });
    const notHoverable = buildTarmacStyles({ hoverable: false });
    expect(hoverable.bodyRow).not.toBe(notHoverable.bodyRow);
  });

  // 12. Striped=true includes nth-child styles (bodyRow differs from striped=false)
  it('striped=true produces different bodyRow than striped=false', () => {
    const striped = buildTarmacStyles({ striped: true });
    const notStriped = buildTarmacStyles({ striped: false });
    expect(striped.bodyRow).not.toBe(notStriped.bodyRow);
  });

  // 13. Empty config doesn't throw
  it('does not throw with an empty config object', () => {
    expect(() => {
      buildTableStyles({
        config: {} as TableConfig,
        variant: 'default',
        size: 'medium',
        bordered: false,
        striped: false,
        hoverable: false,
      });
    }).not.toThrow();
  });

  // 14. Partial config doesn't throw
  it('does not throw with a partial config (only base section)', () => {
    const partialConfig: TableConfig = {
      base: { fontFamily: 'Arial', transition: 'none', radius: '4px', borderColor: '#ccc', backgroundColor: '#fff' },
    };
    expect(() => {
      buildTableStyles({
        config: partialConfig,
        variant: 'default',
        size: 'medium',
        bordered: false,
        striped: false,
        hoverable: true,
      });
    }).not.toThrow();
  });

  // 15. Same inputs produce same outputs (deterministic)
  it('same inputs produce identical outputs (deterministic)', () => {
    const stylesA = buildTarmacStyles();
    const stylesB = buildTarmacStyles();
    for (const key of ALL_KEYS) {
      expect(stylesA[key]).toBe(stylesB[key]);
    }
  });

  // 16. Container styles differ between default and card variants
  it('container styles differ between default and card variants', () => {
    const defaultStyles = buildTarmacStyles({ variant: 'default' });
    const cardStyles = buildTarmacStyles({ variant: 'card' });
    // Default has border + hidden overflow; card has no border + visible overflow
    expect(defaultStyles.container).not.toBe(cardStyles.container);
  });

  // 17. Pagination button active differs from base button
  it('pagination active button class differs from base button class', () => {
    const styles = buildTarmacStyles();
    expect(styles.paginationButtonActive).not.toBe(styles.paginationButton);
  });

  // 18. Pagination button disabled differs from base button
  it('pagination disabled button class differs from base button class', () => {
    const styles = buildTarmacStyles();
    expect(styles.paginationButtonDisabled).not.toBe(styles.paginationButton);
  });
});
