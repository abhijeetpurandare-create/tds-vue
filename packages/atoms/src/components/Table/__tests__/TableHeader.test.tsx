import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { buildTableStyles } from '../useTableStyles';
import type { BuildTableStylesParams } from '../useTableStyles';
import { defaultTableStyles } from '../../../config/config';
import type { TableConfig } from '../../../types/types';
import type { TabConfig, SearchConfig, FilterConfig, ActionConfig } from '../types';

// Mock the figma-variables-resolver which uses ESM import of JSON
jest.mock('../../../utils/templateResolver', () => ({
  resolveTemplatePlaceholders: (theme: any) => theme,
}));

// Mock the ThemeProvider CSS import
jest.mock('../../ThemeProvider/tarmac-variables.css', () => ({}));

import Table from '../index';

// ── Test helpers ─────────────────────────────────────────────────────────

const minimalColumns = [{ key: 'id', title: 'ID', dataIndex: 'id' }];
const minimalData = [{ key: '1', id: '1' }];

const defaultBuildParams: BuildTableStylesParams = {
  config: defaultTableStyles as unknown as TableConfig,
  variant: 'default',
  size: 'medium',
  bordered: false,
  striped: false,
  hoverable: false,
};

const makeTabs = (count: number, activeIndex?: number): TabConfig[] =>
  Array.from({ length: count }, (_, i) => ({
    key: `tab-${i}`,
    label: `Tab ${i}`,
    active: i === activeIndex,
    onClick: jest.fn(),
  }));

const makeFilters = (count: number, expandedIndices: number[] = []): FilterConfig[] =>
  Array.from({ length: count }, (_, i) => ({
    label: `Filter ${i}`,
    expanded: expandedIndices.includes(i),
    onToggle: jest.fn(),
  }));

const makeActions = (variants: ActionConfig['variant'][]): ActionConfig[] =>
  variants.map((variant, i) => ({
    variant,
    label: variant === 'icon' ? undefined : `Action ${i}`,
    icon: variant === 'icon' ? React.createElement('span', null, '★') : undefined,
    onClick: jest.fn(),
  }));

const makeSearch = (overrides: Partial<SearchConfig> = {}): SearchConfig => ({
  onChange: jest.fn(),
  placeholder: 'Search...',
  ...overrides,
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: TableHeader — Rendering
// ═════════════════════════════════════════════════════════════════════════

describe('TableHeader — Rendering', () => {
  it('does not render when no header props provided', () => {
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} />,
    );
    expect(container.querySelector('[data-testid="table-header"]')).toBeNull();
  });

  it('renders TabGroup when headerTabs provided', () => {
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerTabs={makeTabs(3)} />,
    );
    expect(container.querySelector('[data-testid="tab-group"]')).toBeTruthy();
    expect(container.querySelectorAll('[data-testid="tab-cell"]')).toHaveLength(3);
  });

  it('renders SearchField when headerSearch provided', () => {
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerSearch={makeSearch()} />,
    );
    expect(container.querySelector('[data-testid="search-field"]')).toBeTruthy();
  });

  it('renders FilterDropdowns when headerFilters provided', () => {
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerFilters={makeFilters(3)} />,
    );
    expect(container.querySelectorAll('[data-testid="filter-dropdown"]')).toHaveLength(3);
  });

  it('renders ActionButtons when headerActions provided', () => {
    const { container } = render(
      <Table
        dataSource={minimalData}
        columns={minimalColumns}
        headerActions={makeActions(['primary', 'secondary'])}
      />,
    );
    expect(container.querySelectorAll('[data-testid="action-button"]')).toHaveLength(2);
  });

  it('renders all header elements together', () => {
    const { container } = render(
      <Table
        dataSource={minimalData}
        columns={minimalColumns}
        headerTabs={makeTabs(2)}
        headerSearch={makeSearch()}
        headerFilters={makeFilters(2)}
        headerActions={makeActions(['primary'])}
      />,
    );
    expect(container.querySelector('[data-testid="table-header"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="tab-group"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="search-field"]')).toBeTruthy();
    expect(container.querySelectorAll('[data-testid="filter-dropdown"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-testid="action-button"]')).toHaveLength(1);
  });

  it('TabGroup renders above ActionBar by default (position=top)', () => {
    const { container } = render(
      <Table
        dataSource={minimalData}
        columns={minimalColumns}
        headerTabs={makeTabs(1)}
        headerSearch={makeSearch()}
      />,
    );
    const header = container.querySelector('[data-testid="table-header"]')!;
    const children = Array.from(header.children);
    const tabGroupIdx = children.findIndex(
      (el) => el.getAttribute('data-testid') === 'tab-group',
    );
    const actionBarIdx = children.findIndex(
      (el) => el.getAttribute('data-testid') === 'action-bar',
    );
    expect(tabGroupIdx).toBeLessThan(actionBarIdx);
  });

  it('TabGroup renders below ActionBar when position=bottom', () => {
    const { container } = render(
      <Table
        dataSource={minimalData}
        columns={minimalColumns}
        headerTabs={makeTabs(1)}
        headerTabsPosition="bottom"
        headerSearch={makeSearch()}
      />,
    );
    const header = container.querySelector('[data-testid="table-header"]')!;
    const children = Array.from(header.children);
    const tabGroupIdx = children.findIndex(
      (el) => el.getAttribute('data-testid') === 'tab-group',
    );
    const actionBarIdx = children.findIndex(
      (el) => el.getAttribute('data-testid') === 'action-bar',
    );
    expect(actionBarIdx).toBeLessThan(tabGroupIdx);
  });

  it('caps filters at 5 when more than 5 provided', () => {
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerFilters={makeFilters(8)} />,
    );
    expect(container.querySelectorAll('[data-testid="filter-dropdown"]')).toHaveLength(5);
  });

  it('caps actions at 3 when more than 3 provided', () => {
    const { container } = render(
      <Table
        dataSource={minimalData}
        columns={minimalColumns}
        headerActions={makeActions(['primary', 'secondary', 'icon', 'primary'])}
      />,
    );
    expect(container.querySelectorAll('[data-testid="action-button"]')).toHaveLength(3);
  });

  it('search icon SVG is present in SearchField', () => {
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerSearch={makeSearch()} />,
    );
    const searchField = container.querySelector('[data-testid="search-field"]')!;
    expect(searchField.querySelector('svg')).toBeTruthy();
  });

  it('chevron icon is present in FilterDropdown', () => {
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerFilters={makeFilters(1)} />,
    );
    const filterDropdown = container.querySelector('[data-testid="filter-dropdown"]')!;
    expect(filterDropdown.querySelector('svg')).toBeTruthy();
  });

  it('active tab has correct visual indicators (different class from inactive)', () => {
    const tabs = makeTabs(3, 1); // tab at index 1 is active
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerTabs={tabs} />,
    );
    const tabCells = container.querySelectorAll('[data-testid="tab-cell"]');
    // Active tab should have a different className than inactive tabs
    expect(tabCells[1].className).not.toBe(tabCells[0].className);
    expect(tabCells[1].className).not.toBe(tabCells[2].className);
    // Inactive tabs should share the same className
    expect(tabCells[0].className).toBe(tabCells[2].className);
  });

  it('expanded filter has correct visual indicators (different class from collapsed)', () => {
    const filters = makeFilters(3, [1]); // filter at index 1 is expanded
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerFilters={filters} />,
    );
    const filterWrappers = container.querySelectorAll('[data-testid="filter-dropdown"]');
    // The Chip inside the wrapper carries the visual class — check first child
    const getInnerClass = (el: Element) => el.firstElementChild?.className || el.className;
    expect(getInnerClass(filterWrappers[1])).not.toBe(getInnerClass(filterWrappers[0]));
    expect(getInnerClass(filterWrappers[1])).not.toBe(getInnerClass(filterWrappers[2]));
    expect(getInnerClass(filterWrappers[0])).toBe(getInnerClass(filterWrappers[2]));
  });

  it('primary/secondary/icon button variants render correctly with distinct classes', () => {
    const actions = makeActions(['primary', 'secondary', 'icon']);
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerActions={actions} />,
    );
    const buttonWrappers = container.querySelectorAll('[data-testid="action-button"]');
    expect(buttonWrappers).toHaveLength(3);
    // The Button inside the wrapper carries the visual class — check the inner button element
    const getInnerClass = (el: Element) => el.querySelector('button')?.className || el.className;
    const classes = Array.from(buttonWrappers).map((b) => getInnerClass(b));
    expect(new Set(classes).size).toBe(3);
  });
});


// ═════════════════════════════════════════════════════════════════════════
// Describe: TableHeader — Interactions
// ═════════════════════════════════════════════════════════════════════════

describe('TableHeader — Interactions', () => {
  it('tab click calls onClick with correct key', () => {
    const tabs = makeTabs(3);
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerTabs={tabs} />,
    );
    const tabCells = container.querySelectorAll('[data-testid="tab-cell"]');
    fireEvent.click(tabCells[1]);
    expect(tabs[1].onClick).toHaveBeenCalledTimes(1);
    expect(tabs[1].onClick).toHaveBeenCalledWith('tab-1');
    expect(tabs[0].onClick).not.toHaveBeenCalled();
    expect(tabs[2].onClick).not.toHaveBeenCalled();
  });

  it('search input change calls onChange with value', () => {
    const search = makeSearch();
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerSearch={search} />,
    );
    const input = container.querySelector('[data-testid="search-field"] input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(search.onChange).toHaveBeenCalledTimes(1);
    expect(search.onChange).toHaveBeenCalledWith('hello');
  });

  it('filter click calls onToggle with correct index', () => {
    const filters = makeFilters(3);
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerFilters={filters} />,
    );
    const filterDropdowns = container.querySelectorAll('[data-testid="filter-dropdown"]');
    fireEvent.click(filterDropdowns[2]);
    expect(filters[2].onToggle).toHaveBeenCalledTimes(1);
    expect(filters[2].onToggle).toHaveBeenCalledWith(2);
    expect(filters[0].onToggle).not.toHaveBeenCalled();
    expect(filters[1].onToggle).not.toHaveBeenCalled();
  });

  it('action button click calls onClick', () => {
    const actions = makeActions(['primary', 'secondary']);
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerActions={actions} />,
    );
    const buttonWrappers = container.querySelectorAll('[data-testid="action-button"]');
    // Click the actual <button> inside the wrapper
    const btn = buttonWrappers[0].querySelector('button') as HTMLButtonElement;
    fireEvent.click(btn);
    expect(actions[0].onClick).toHaveBeenCalledTimes(1);
    expect(actions[1].onClick).not.toHaveBeenCalled();
  });

  it('controlled search value updates input', () => {
    const search = makeSearch({ value: 'controlled' });
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerSearch={search} />,
    );
    const input = container.querySelector('[data-testid="search-field"] input') as HTMLInputElement;
    expect(input.value).toBe('controlled');
  });

  it('multiple tabs can be clicked in sequence', () => {
    const tabs = makeTabs(4);
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerTabs={tabs} />,
    );
    const tabCells = container.querySelectorAll('[data-testid="tab-cell"]');
    fireEvent.click(tabCells[0]);
    fireEvent.click(tabCells[2]);
    fireEvent.click(tabCells[3]);
    expect(tabs[0].onClick).toHaveBeenCalledTimes(1);
    expect(tabs[0].onClick).toHaveBeenCalledWith('tab-0');
    expect(tabs[2].onClick).toHaveBeenCalledTimes(1);
    expect(tabs[2].onClick).toHaveBeenCalledWith('tab-2');
    expect(tabs[3].onClick).toHaveBeenCalledTimes(1);
    expect(tabs[3].onClick).toHaveBeenCalledWith('tab-3');
    expect(tabs[1].onClick).not.toHaveBeenCalled();
  });

  it('multiple filters can be toggled', () => {
    const filters = makeFilters(4);
    const { container } = render(
      <Table dataSource={minimalData} columns={minimalColumns} headerFilters={filters} />,
    );
    const filterDropdowns = container.querySelectorAll('[data-testid="filter-dropdown"]');
    fireEvent.click(filterDropdowns[0]);
    fireEvent.click(filterDropdowns[3]);
    expect(filters[0].onToggle).toHaveBeenCalledTimes(1);
    expect(filters[0].onToggle).toHaveBeenCalledWith(0);
    expect(filters[3].onToggle).toHaveBeenCalledTimes(1);
    expect(filters[3].onToggle).toHaveBeenCalledWith(3);
    expect(filters[1].onToggle).not.toHaveBeenCalled();
    expect(filters[2].onToggle).not.toHaveBeenCalled();
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Describe: TableHeader — Style Builder
// ═════════════════════════════════════════════════════════════════════════

const ALL_26_KEYS = [
  'container', 'table', 'headerRow', 'headerCell', 'bodyRow', 'bodyCell',
  'selectionCell', 'sortIndicator', 'paginationBar', 'paginationButton',
  'paginationButtonActive', 'paginationButtonDisabled', 'emptyState',
  'loadingOverlay', 'rowFooter',
  'tableHeader', 'tabGroup', 'tabCell', 'tabCellActive', 'searchField',
  'filterDropdown', 'filterDropdownActive', 'actionBar',
  'actionButtonPrimary', 'actionButtonSecondary', 'actionButtonIcon',
] as const;

describe('TableHeader — Style Builder', () => {
  it('buildTableStyles returns all 26 keys', () => {
    const styleMap = buildTableStyles(defaultBuildParams);
    expect(Object.keys(styleMap).sort()).toEqual([...ALL_26_KEYS].sort());
  });

  it('all new header keys are non-empty strings', () => {
    const styleMap = buildTableStyles(defaultBuildParams);
    const headerKeys = [
      'tableHeader', 'tabGroup', 'tabCell', 'tabCellActive', 'searchField',
      'filterDropdown', 'filterDropdownActive', 'actionBar',
      'actionButtonPrimary', 'actionButtonSecondary', 'actionButtonIcon',
    ];
    for (const key of headerKeys) {
      const value = (styleMap as Record<string, unknown>)[key];
      expect(typeof value).toBe('string');
      expect((value as string).length).toBeGreaterThan(0);
    }
  });

  it('different tableHeader configs produce different class names', () => {
    const configA: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configA as any).tableHeader.container.backgroundColor = '#ff0000';

    const configB: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configB as any).tableHeader.container.backgroundColor = '#00ff00';

    const stylesA = buildTableStyles({ ...defaultBuildParams, config: configA });
    const stylesB = buildTableStyles({ ...defaultBuildParams, config: configB });

    expect(stylesA.tableHeader).not.toBe(stylesB.tableHeader);
  });

  it('tab styles reflect active/inactive config values', () => {
    const configA: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configA as any).tableHeader.tabs.activeTextColor = '#111111';

    const configB: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configB as any).tableHeader.tabs.activeTextColor = '#999999';

    const stylesA = buildTableStyles({ ...defaultBuildParams, config: configA });
    const stylesB = buildTableStyles({ ...defaultBuildParams, config: configB });

    // tabCellActive should differ since activeTextColor changed
    expect(stylesA.tabCellActive).not.toBe(stylesB.tabCellActive);
  });

  it('filter styles reflect expanded/collapsed config values', () => {
    const configA: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configA as any).tableHeader.filter.activeBorderColor = '#0000ff';

    const configB: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configB as any).tableHeader.filter.activeBorderColor = '#ff00ff';

    const stylesA = buildTableStyles({ ...defaultBuildParams, config: configA });
    const stylesB = buildTableStyles({ ...defaultBuildParams, config: configB });

    expect(stylesA.filterDropdownActive).not.toBe(stylesB.filterDropdownActive);
  });

  it('button styles reflect primary/secondary/icon config values', () => {
    const configA: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configA as any).tableHeader.buttons.primary.backgroundColor = '#aaaaaa';

    const configB: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configB as any).tableHeader.buttons.primary.backgroundColor = '#bbbbbb';

    const stylesA = buildTableStyles({ ...defaultBuildParams, config: configA });
    const stylesB = buildTableStyles({ ...defaultBuildParams, config: configB });

    expect(stylesA.actionButtonPrimary).not.toBe(stylesB.actionButtonPrimary);
  });

  it('actionBar styles use correct gap and padding from config', () => {
    const configA: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configA as any).tableHeader.actionBar.padding = '4px';

    const configB: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
    (configB as any).tableHeader.actionBar.padding = '32px';

    const stylesA = buildTableStyles({ ...defaultBuildParams, config: configA });
    const stylesB = buildTableStyles({ ...defaultBuildParams, config: configB });

    expect(stylesA.actionBar).not.toBe(stylesB.actionBar);
  });

  it('falls back to defaults when tableHeader config is missing', () => {
    const emptyConfig: TableConfig = {};
    const styleMap = buildTableStyles({
      ...defaultBuildParams,
      config: emptyConfig,
    });

    // Should still produce all 26 keys with non-empty strings
    for (const key of ALL_26_KEYS) {
      const value = (styleMap as Record<string, unknown>)[key];
      expect(typeof value).toBe('string');
      expect((value as string).length).toBeGreaterThan(0);
    }
  });
});
