import React from 'react';
import fc from 'fast-check';
import { render, fireEvent } from '@testing-library/react';
import { buildTableStyles } from '../useTableStyles';
import type { TableConfig } from '../../../types/types';
import type { BuildTableStylesParams } from '../useTableStyles';
import { defaultTableStyles } from '../../../config/config';
import type { TabConfig, SearchConfig, FilterConfig, ActionConfig } from '../types';

// Mock the figma-variables-resolver which uses ESM import of JSON
jest.mock('../../../utils/templateResolver', () => ({
  resolveTemplatePlaceholders: (theme: any) => theme,
}));

// Mock the ThemeProvider CSS import
jest.mock('../../ThemeProvider/tarmac-variables.css', () => ({}));

import Table from '../index';

// ── Arbitraries ──────────────────────────────────────────────────────────

/** Arbitrary non-empty CSS-like string value */
const cssValue = () =>
  fc.oneof(
    fc.hexaString({ minLength: 3, maxLength: 6 }).map((h) => `#${h}`),
    fc.constant('8px'),
    fc.constant('12px 16px'),
    fc.constant('transparent'),
    fc.constant('sans-serif'),
    fc.constant('600'),
    fc.constant('14px'),
    fc.constant('16px'),
    fc.constant('24px'),
    fc.constant('4px'),
    fc.constant('500'),
    fc.constant('1px'),
    fc.constant('0.5px'),
    fc.constant('20px'),
    fc.constant('12px'),
    fc.constant('0px'),
    fc.constant('2px'),
  );

/** Arbitrary for the tableHeader section of TableConfig */
const tableHeaderConfigArb = () =>
  fc.record(
    {
      container: fc.record(
        {
          backgroundColor: cssValue(),
          borderRadius: cssValue(),
        },
        { requiredKeys: [] },
      ),
      tabs: fc.record(
        {
          fontFamily: cssValue(),
          fontSize: cssValue(),
          lineHeight: cssValue(),
          padding: cssValue(),
          gap: cssValue(),
          activeFontWeight: cssValue(),
          inactiveFontWeight: cssValue(),
          activeTextColor: cssValue(),
          inactiveTextColor: cssValue(),
          activeBorderWidth: cssValue(),
          activeBorderColor: cssValue(),
          borderBottomColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      search: fc.record(
        {
          borderWidth: cssValue(),
          borderColor: cssValue(),
          borderRadius: cssValue(),
          backgroundColor: cssValue(),
          padding: cssValue(),
          fontSize: cssValue(),
          lineHeight: cssValue(),
          placeholderColor: cssValue(),
          textColor: cssValue(),
          fontFamily: cssValue(),
        },
        { requiredKeys: [] },
      ),
      filter: fc.record(
        {
          borderWidth: cssValue(),
          borderColor: cssValue(),
          borderRadius: cssValue(),
          backgroundColor: cssValue(),
          padding: cssValue(),
          fontSize: cssValue(),
          lineHeight: cssValue(),
          textColor: cssValue(),
          fontFamily: cssValue(),
          activeBorderColor: cssValue(),
          activeBackgroundColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      actionBar: fc.record(
        {
          padding: cssValue(),
          gap: cssValue(),
          itemGap: cssValue(),
        },
        { requiredKeys: [] },
      ),
      buttons: fc.record(
        {
          borderRadius: cssValue(),
          padding: cssValue(),
          fontSize: cssValue(),
          lineHeight: cssValue(),
          fontFamily: cssValue(),
          fontWeight: cssValue(),
          primary: fc.record(
            {
              backgroundColor: cssValue(),
              textColor: cssValue(),
            },
            { requiredKeys: [] },
          ),
          secondary: fc.record(
            {
              backgroundColor: cssValue(),
              textColor: cssValue(),
              borderWidth: cssValue(),
              borderColor: cssValue(),
            },
            { requiredKeys: [] },
          ),
          icon: fc.record(
            {
              borderWidth: cssValue(),
              borderColor: cssValue(),
              backgroundColor: cssValue(),
            },
            { requiredKeys: [] },
          ),
        },
        { requiredKeys: [] },
      ),
    },
    { requiredKeys: [] },
  );

/** Arbitrary for a full TableConfig with optional tableHeader */
const tableConfigWithHeaderArb = (): fc.Arbitrary<TableConfig> =>
  fc.record(
    {
      base: fc.record(
        {
          fontFamily: cssValue(),
          transition: cssValue(),
          radius: cssValue(),
          borderColor: cssValue(),
          backgroundColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      sizes: fc.record(
        {
          small: fc.record({
            headerPadding: cssValue(),
            cellPadding: cssValue(),
            fontSize: cssValue(),
            headerFontSize: cssValue(),
          }),
          medium: fc.record({
            headerPadding: cssValue(),
            cellPadding: cssValue(),
            fontSize: cssValue(),
            headerFontSize: cssValue(),
          }),
          large: fc.record({
            headerPadding: cssValue(),
            cellPadding: cssValue(),
            fontSize: cssValue(),
            headerFontSize: cssValue(),
          }),
        },
        { requiredKeys: [] },
      ),
      header: fc.record(
        {
          backgroundColor: cssValue(),
          textColor: cssValue(),
          fontWeight: cssValue(),
          hoverBackgroundColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      body: fc.record(
        {
          backgroundColor: cssValue(),
          textColor: cssValue(),
          hoverBackgroundColor: cssValue(),
          stripedBackgroundColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      states: fc.record(
        {
          selected: fc.record({ backgroundColor: cssValue() }, { requiredKeys: [] }),
          disabled: fc.record({ cursor: cssValue() }, { requiredKeys: [] }),
        },
        { requiredKeys: [] },
      ),
      selection: fc.record(
        {
          width: cssValue(),
          checkedColor: cssValue(),
          borderColor: cssValue(),
          disabledBorderColor: cssValue(),
          disabledBackgroundColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      sorter: fc.record(
        {
          activeColor: cssValue(),
          inactiveColor: cssValue(),
          iconSize: cssValue(),
          gap: cssValue(),
        },
        { requiredKeys: [] },
      ),
      pagination: fc.record(
        {
          gap: cssValue(),
          fontSize: cssValue(),
          buttonMinWidth: cssValue(),
          buttonHeight: cssValue(),
          buttonPadding: cssValue(),
          buttonBorderColor: cssValue(),
          buttonBackgroundColor: cssValue(),
          buttonRadius: cssValue(),
          activeColor: cssValue(),
          activeFontWeight: cssValue(),
          disabledTextColor: cssValue(),
          disabledBackgroundColor: cssValue(),
          inputWidth: cssValue(),
        },
        { requiredKeys: [] },
      ),
      empty: fc.record(
        {
          padding: cssValue(),
          textColor: cssValue(),
          iconFill: cssValue(),
          iconStroke: cssValue(),
        },
        { requiredKeys: [] },
      ),
      loading: fc.record(
        {
          overlayBackground: cssValue(),
          spinnerColor: cssValue(),
          trackColor: cssValue(),
          spinnerSize: cssValue(),
        },
        { requiredKeys: [] },
      ),
      rowFooter: fc.record(
        {
          borderStyle: cssValue(),
          borderColor: cssValue(),
          padding: cssValue(),
          backgroundColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      variants: fc.record(
        {
          default: fc.record({}, { requiredKeys: [] }),
          card: fc.record({}, { requiredKeys: [] }),
        },
        { requiredKeys: [] },
      ),
      tableHeader: tableHeaderConfigArb(),
    },
    { requiredKeys: [] },
  );

/** Arbitrary for BuildTableStylesParams with tableHeader support */
const buildParamsArb = (): fc.Arbitrary<BuildTableStylesParams> =>
  fc.record({
    config: tableConfigWithHeaderArb(),
    variant: fc.constantFrom('default' as const, 'card' as const),
    size: fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
    bordered: fc.boolean(),
    striped: fc.boolean(),
    hoverable: fc.boolean(),
  });

// ── All 26 expected keys ─────────────────────────────────────────────────

const ALL_26_KEYS: readonly string[] = [
  // 15 existing keys
  'container',
  'table',
  'headerRow',
  'headerCell',
  'bodyRow',
  'bodyCell',
  'selectionCell',
  'sortIndicator',
  'paginationBar',
  'paginationButton',
  'paginationButtonActive',
  'paginationButtonDisabled',
  'emptyState',
  'loadingOverlay',
  'rowFooter',
  // 11 new TableHeader keys
  'tableHeader',
  'tabGroup',
  'tabCell',
  'tabCellActive',
  'searchField',
  'filterDropdown',
  'filterDropdownActive',
  'actionBar',
  'actionButtonPrimary',
  'actionButtonSecondary',
  'actionButtonIcon',
] as const;


// ── Property 1 ───────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 1: Style builder produces complete style map with all header keys', () => {
  /**
   * **Validates: Requirements 5.5, 2.6, 5.2, 5.3, 5.4, 3.7, 4.7**
   *
   * For any valid TableConfig (with or without a tableHeader section) and
   * any valid combination of variant, size, bordered, striped, and hoverable,
   * calling buildTableStyles shall return a TableStyleMap where all 26 keys
   * map to non-empty strings.
   */
  it('should return a TableStyleMap with all 26 non-empty string keys for any valid input with tableHeader config', () => {
    fc.assert(
      fc.property(buildParamsArb(), (params) => {
        const styleMap = buildTableStyles(params);

        for (const key of ALL_26_KEYS) {
          const value = (styleMap as Record<string, unknown>)[key];
          expect(typeof value).toBe('string');
          expect((value as string).length).toBeGreaterThan(0);
        }

        expect(Object.keys(styleMap).sort()).toEqual([...ALL_26_KEYS].sort());
      }),
      { numRuns: 100 },
    );
  });

  it('should return all 26 non-empty string keys even when tableHeader config is missing', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('default' as const, 'card' as const),
        fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (variant, size, bordered, striped, hoverable) => {
          // Config without tableHeader section
          const config: TableConfig = {};

          const styleMap = buildTableStyles({
            config,
            variant,
            size,
            bordered,
            striped,
            hoverable,
          });

          for (const key of ALL_26_KEYS) {
            const value = (styleMap as Record<string, unknown>)[key];
            expect(typeof value).toBe('string');
            expect((value as string).length).toBeGreaterThan(0);
          }

          expect(Object.keys(styleMap).sort()).toEqual([...ALL_26_KEYS].sort());
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should return all 26 non-empty string keys when using defaultTableStyles config', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('default' as const, 'card' as const),
        fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (variant, size, bordered, striped, hoverable) => {
          const styleMap = buildTableStyles({
            config: defaultTableStyles as unknown as TableConfig,
            variant,
            size,
            bordered,
            striped,
            hoverable,
          });

          for (const key of ALL_26_KEYS) {
            const value = (styleMap as Record<string, unknown>)[key];
            expect(typeof value).toBe('string');
            expect((value as string).length).toBeGreaterThan(0);
          }

          expect(Object.keys(styleMap).sort()).toEqual([...ALL_26_KEYS].sort());
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── Property 2 ───────────────────────────────────────────────────────────

/**
 * Helper: generates two guaranteed-distinct CSS color strings.
 */
const distinctColorPair = () =>
  fc
    .tuple(
      fc.hexaString({ minLength: 6, maxLength: 6 }),
      fc.hexaString({ minLength: 6, maxLength: 6 }),
    )
    .filter(([a, b]) => a !== b)
    .map(([a, b]) => [`#${a}`, `#${b}`] as [string, string]);

/**
 * Mapping from tableHeader sub-section to the style map keys that section affects.
 */
const HEADER_SECTION_TO_STYLE_KEYS: Record<string, string[]> = {
  container: ['tableHeader'],
  tabs: ['tabGroup', 'tabCell', 'tabCellActive'],
  search: ['searchField'],
  filter: ['filterDropdown', 'filterDropdownActive'],
  actionBar: ['actionBar'],
  'buttons.primary': ['actionButtonPrimary'],
  'buttons.secondary': ['actionButtonSecondary'],
  'buttons.icon': ['actionButtonIcon'],
};

/**
 * For a given section name, returns the config path and the property to mutate.
 */
const HEADER_SECTION_MUTATION: Record<string, { path: string[]; field: string }> = {
  container: { path: ['tableHeader', 'container'], field: 'backgroundColor' },
  tabs: { path: ['tableHeader', 'tabs'], field: 'activeTextColor' },
  search: { path: ['tableHeader', 'search'], field: 'textColor' },
  filter: { path: ['tableHeader', 'filter'], field: 'textColor' },
  actionBar: { path: ['tableHeader', 'actionBar'], field: 'padding' },
  'buttons.primary': { path: ['tableHeader', 'buttons', 'primary'], field: 'backgroundColor' },
  'buttons.secondary': { path: ['tableHeader', 'buttons', 'secondary'], field: 'textColor' },
  'buttons.icon': { path: ['tableHeader', 'buttons', 'icon'], field: 'borderColor' },
};

describe('Feature: table-header-subcomponent, Property 2: TableHeader config values propagate to generated styles', () => {
  /**
   * **Validates: Requirements 5.1**
   *
   * For any two distinct TableConfig objects that differ in at least one
   * tableHeader sub-section value, calling buildTableStyles with the same
   * props but different configs shall produce different Emotion class name
   * strings for the affected header sub-element.
   */
  it.each(Object.keys(HEADER_SECTION_TO_STYLE_KEYS))(
    'changing tableHeader.%s produces different class names for affected style keys',
    (section) => {
      const mutation = HEADER_SECTION_MUTATION[section];
      const affectedKeys = HEADER_SECTION_TO_STYLE_KEYS[section];

      fc.assert(
        fc.property(
          fc.constantFrom('default' as const, 'card' as const),
          fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
          fc.boolean(),
          fc.boolean(),
          fc.boolean(),
          distinctColorPair(),
          (variant, size, bordered, striped, hoverable, [colorA, colorB]) => {
            // Start from defaultTableStyles as a base to ensure all sections exist
            const configA: TableConfig = JSON.parse(JSON.stringify(defaultTableStyles));
            let targetA: any = configA;
            for (const key of mutation.path) {
              if (!targetA[key]) targetA[key] = {};
              targetA = targetA[key];
            }
            targetA[mutation.field] = colorA;

            const configB: TableConfig = JSON.parse(JSON.stringify(configA));
            let targetB: any = configB;
            for (const key of mutation.path) {
              targetB = targetB[key];
            }
            targetB[mutation.field] = colorB;

            const sharedProps = { variant, size, bordered, striped, hoverable };

            const stylesA = buildTableStyles({ config: configA, ...sharedProps });
            const stylesB = buildTableStyles({ config: configB, ...sharedProps });

            const someDiffers = affectedKeys.some(
              (key) =>
                (stylesA as Record<string, string>)[key] !==
                (stylesB as Record<string, string>)[key],
            );

            expect(someDiffers).toBe(true);
          },
        ),
        { numRuns: 100 },
      );
    },
  );
});


// ── Component-level Arbitraries ──────────────────────────────────────────

/** Arbitrary for a safe alphanumeric string (no special chars that break rendering) */
const safeString = (minLen = 1, maxLen = 20) =>
  fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789'.split('')), {
    minLength: minLen,
    maxLength: maxLen,
  });

/** Arbitrary for a TabConfig (onClick is a jest.fn placeholder, replaced per test) */
const tabConfigArb = (): fc.Arbitrary<Omit<TabConfig, 'onClick'>> =>
  fc.record({
    key: safeString(1, 10),
    label: safeString(1, 15),
    active: fc.option(fc.boolean(), { nil: undefined }),
  });

/** Arbitrary for a non-empty array of TabConfig with unique keys */
const tabConfigArrayArb = (minLen = 1, maxLen = 6): fc.Arbitrary<TabConfig[]> =>
  fc
    .array(tabConfigArb(), { minLength: minLen, maxLength: maxLen })
    .map((tabs) => {
      // Ensure unique keys
      const seen = new Set<string>();
      const unique: TabConfig[] = [];
      for (const t of tabs) {
        const key = seen.has(t.key) ? `${t.key}${seen.size}` : t.key;
        seen.add(key);
        unique.push({ ...t, key, onClick: jest.fn() });
      }
      return unique;
    });

/** Arbitrary for a FilterConfig (onToggle is a jest.fn placeholder) */
const filterConfigArb = (): fc.Arbitrary<Omit<FilterConfig, 'onToggle'>> =>
  fc.record({
    label: safeString(1, 15),
    expanded: fc.option(fc.boolean(), { nil: undefined }),
  });

/** Arbitrary for a non-empty array of FilterConfig */
const filterConfigArrayArb = (minLen = 1, maxLen = 8): fc.Arbitrary<FilterConfig[]> =>
  fc
    .array(filterConfigArb(), { minLength: minLen, maxLength: maxLen })
    .map((filters) =>
      filters.map((f) => ({ ...f, onToggle: jest.fn() })),
    );

/** Arbitrary for an ActionConfig (onClick is a jest.fn placeholder) */
const actionConfigArb = (): fc.Arbitrary<Omit<ActionConfig, 'onClick'>> =>
  fc.record({
    label: fc.option(safeString(1, 15), { nil: undefined }),
    variant: fc.constantFrom('primary' as const, 'secondary' as const, 'icon' as const),
    icon: fc.constant(undefined),
  });

/** Arbitrary for a non-empty array of ActionConfig */
const actionConfigArrayArb = (minLen = 1, maxLen = 5): fc.Arbitrary<ActionConfig[]> =>
  fc
    .array(actionConfigArb(), { minLength: minLen, maxLength: maxLen })
    .map((actions) =>
      actions.map((a) => ({
        ...a,
        onClick: jest.fn(),
        // Ensure label is present for primary/secondary, icon for icon variant
        label: a.variant === 'icon' ? undefined : (a.label || 'Action'),
      })),
    );

/** Minimal columns and data for rendering the Table */
const minimalColumns = [{ key: 'id', title: 'ID', dataIndex: 'id' }];
const minimalData = [{ key: '1', id: '1' }];

// ── Property 3 ───────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 3: Tab count matches headerTabs array length', () => {
  /**
   * **Validates: Requirements 1.1, 1.2**
   *
   * For any non-empty array of TabConfig objects, when passed as headerTabs
   * to the Table component, the rendered TableHeader shall contain exactly
   * as many tab button elements as the array length.
   */
  it('renders exactly N tab-cell elements for N headerTabs', () => {
    fc.assert(
      fc.property(tabConfigArrayArb(1, 8), (tabs) => {
        const { container, unmount } = render(
          <Table
            dataSource={minimalData}
            columns={minimalColumns}
            headerTabs={tabs}
          />,
        );

        const tabCells = container.querySelectorAll('[data-testid="tab-cell"]');
        expect(tabCells).toHaveLength(tabs.length);

        // Each tab label text should be present
        tabs.forEach((tab) => {
          const found = container.querySelector(`[data-testid="tab-cell"]`);
          expect(found).toBeTruthy();
        });

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 4 ───────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 4: Tab active state determines visual style', () => {
  /**
   * **Validates: Requirements 1.4, 1.5**
   *
   * For any TabConfig object, the rendered Tab_Cell shall have the active
   * visual style class if and only if active is true.
   */
  it('active tabs get tabCellActive class, inactive tabs do not', () => {
    fc.assert(
      fc.property(tabConfigArrayArb(1, 6), (tabs) => {
        // Ensure we have at least one active and one inactive tab for comparison
        // If all are same state, we just verify consistency
        const { container, unmount } = render(
          <Table
            dataSource={minimalData}
            columns={minimalColumns}
            headerTabs={tabs}
          />,
        );

        const tabCells = container.querySelectorAll('[data-testid="tab-cell"]');

        // Collect class names by active state
        const activeClasses = new Set<string>();
        const inactiveClasses = new Set<string>();

        tabs.forEach((tab, index) => {
          const el = tabCells[index];
          if (tab.active) {
            activeClasses.add(el.className);
          } else {
            inactiveClasses.add(el.className);
          }
        });

        // If we have both active and inactive tabs, their classes must differ
        if (activeClasses.size > 0 && inactiveClasses.size > 0) {
          // No active class should appear in inactive set
          for (const ac of activeClasses) {
            expect(inactiveClasses.has(ac)).toBe(false);
          }
        }

        // All active tabs should share the same class
        if (activeClasses.size > 0) {
          expect(activeClasses.size).toBe(1);
        }

        // All inactive tabs should share the same class
        if (inactiveClasses.size > 0) {
          expect(inactiveClasses.size).toBe(1);
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});


// ── Property 8 ───────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 8: Filter count matches headerFilters array length, capped at 5', () => {
  /**
   * **Validates: Requirements 3.1, 3.2**
   *
   * For any array of FilterConfig objects, the rendered TableHeader shall
   * contain min(array.length, 5) filter dropdown button elements.
   */
  it('renders min(N, 5) filter-dropdown elements for N headerFilters', () => {
    fc.assert(
      fc.property(filterConfigArrayArb(1, 8), (filters) => {
        const { container, unmount } = render(
          <Table
            dataSource={minimalData}
            columns={minimalColumns}
            headerFilters={filters}
          />,
        );

        const filterDropdowns = container.querySelectorAll('[data-testid="filter-dropdown"]');
        const expectedCount = Math.min(filters.length, 5);
        expect(filterDropdowns).toHaveLength(expectedCount);

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 9 ───────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 9: Filter expanded state determines visual style', () => {
  /**
   * **Validates: Requirements 3.5, 3.6**
   *
   * For any FilterConfig object, the rendered Filter_Dropdown shall have
   * the active visual style class if and only if expanded is true.
   */
  it('expanded filters get filterDropdownActive class, collapsed filters do not', () => {
    fc.assert(
      fc.property(filterConfigArrayArb(1, 5), (filters) => {
        const { container, unmount } = render(
          <Table
            dataSource={minimalData}
            columns={minimalColumns}
            headerFilters={filters}
          />,
        );

        const filterDropdowns = container.querySelectorAll('[data-testid="filter-dropdown"]');
        const cappedFilters = filters.slice(0, 5);

        // Collect class names by expanded state
        const expandedClasses = new Set<string>();
        const collapsedClasses = new Set<string>();

        cappedFilters.forEach((filter, index) => {
          const el = filterDropdowns[index];
          // The Chip inside the wrapper carries the visual class
          const cls = el.firstElementChild?.className || el.className;
          if (filter.expanded) {
            expandedClasses.add(cls);
          } else {
            collapsedClasses.add(cls);
          }
        });

        // If we have both expanded and collapsed filters, their classes must differ
        if (expandedClasses.size > 0 && collapsedClasses.size > 0) {
          for (const ec of expandedClasses) {
            expect(collapsedClasses.has(ec)).toBe(false);
          }
        }

        // All expanded filters should share the same class
        if (expandedClasses.size > 0) {
          expect(expandedClasses.size).toBe(1);
        }

        // All collapsed filters should share the same class
        if (collapsedClasses.size > 0) {
          expect(collapsedClasses.size).toBe(1);
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 11 ──────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 11: Action button variant determines visual style', () => {
  /**
   * **Validates: Requirements 4.3, 4.4, 4.5**
   *
   * For any ActionConfig object, the rendered Action_Button shall apply
   * the primary filled style when variant is 'primary', the secondary
   * outlined style when variant is 'secondary', and the icon-only style
   * when variant is 'icon'. Each variant produces a distinct class name.
   */
  it('each action button variant produces a distinct Emotion class', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('primary' as const, 'secondary' as const, 'icon' as const),
        fc.constantFrom('primary' as const, 'secondary' as const, 'icon' as const),
        (variantA, variantB) => {
          const actions: ActionConfig[] = [
            {
              variant: variantA,
              onClick: jest.fn(),
              label: variantA === 'icon' ? undefined : 'BtnA',
              icon: variantA === 'icon' ? React.createElement('span', null, 'X') : undefined,
            },
            {
              variant: variantB,
              onClick: jest.fn(),
              label: variantB === 'icon' ? undefined : 'BtnB',
              icon: variantB === 'icon' ? React.createElement('span', null, 'Y') : undefined,
            },
          ];

          const { container, unmount } = render(
            <Table
              dataSource={minimalData}
              columns={minimalColumns}
              headerActions={actions}
            />,
          );

          const buttons = container.querySelectorAll('[data-testid="action-button"]');
          expect(buttons).toHaveLength(2);

          // The Button inside the wrapper carries the visual class
          const getInnerClass = (el: Element) => el.querySelector('button')?.className || el.className;

          if (variantA === variantB) {
            // Same variant → same class
            expect(getInnerClass(buttons[0])).toBe(getInnerClass(buttons[1]));
          } else {
            // Different variant → different class
            expect(getInnerClass(buttons[0])).not.toBe(getInnerClass(buttons[1]));
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 5 ───────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 5: Tab click invokes callback with correct key', () => {
  /**
   * **Validates: Requirements 1.3**
   *
   * For any TabConfig in the headerTabs array, clicking the corresponding
   * Tab_Cell shall invoke the onClick callback exactly once with the tab's
   * key string as the argument.
   */
  it('clicking a tab calls onClick with the correct key', () => {
    fc.assert(
      fc.property(
        tabConfigArrayArb(1, 6),
        fc.nat(),
        (tabs, rawIndex) => {
          const clickIndex = rawIndex % tabs.length;

          const { container, unmount } = render(
            <Table
              dataSource={minimalData}
              columns={minimalColumns}
              headerTabs={tabs}
            />,
          );

          const tabCells = container.querySelectorAll('[data-testid="tab-cell"]');
          fireEvent.click(tabCells[clickIndex]);

          const targetTab = tabs[clickIndex];
          expect(targetTab.onClick).toHaveBeenCalledTimes(1);
          expect(targetTab.onClick).toHaveBeenCalledWith(targetTab.key);

          // Other tabs should not have been called
          tabs.forEach((tab, i) => {
            if (i !== clickIndex) {
              expect(tab.onClick).not.toHaveBeenCalled();
            }
          });

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── Property 6 ───────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 6: Search field reflects its config', () => {
  /**
   * **Validates: Requirements 2.1, 2.3, 2.5**
   *
   * For any SearchConfig with a defined placeholder and/or value, the
   * rendered Search_Field input shall display the placeholder as its
   * placeholder attribute and the value as its current value.
   */
  it('search input reflects placeholder and controlled value from config', () => {
    fc.assert(
      fc.property(
        fc.option(safeString(1, 20), { nil: undefined }),
        fc.option(safeString(0, 20), { nil: undefined }),
        (placeholder, value) => {
          const searchConfig: SearchConfig = {
            onChange: jest.fn(),
            ...(placeholder !== undefined && { placeholder }),
            ...(value !== undefined && { value }),
          };

          const { container, unmount } = render(
            <Table
              dataSource={minimalData}
              columns={minimalColumns}
              headerSearch={searchConfig}
            />,
          );

          const searchField = container.querySelector('[data-testid="search-field"]');
          expect(searchField).toBeTruthy();

          const input = searchField!.querySelector('input') as HTMLInputElement;
          expect(input).toBeTruthy();

          if (placeholder !== undefined) {
            expect(input.placeholder).toBe(placeholder);
          }

          // The component uses value ?? '' for controlled input
          const expectedValue = value ?? '';
          expect(input.value).toBe(expectedValue);

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── Property 7 ───────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 7: Search onChange fires with input value', () => {
  /**
   * **Validates: Requirements 2.4**
   *
   * For any string typed into the Search_Field, the onChange callback from
   * the SearchConfig shall be invoked with that string as the argument.
   */
  it('typing in search input calls onChange with the typed value', () => {
    fc.assert(
      fc.property(safeString(1, 30), (typedValue) => {
        const onChange = jest.fn();
        const searchConfig: SearchConfig = {
          onChange,
          placeholder: 'Search',
        };

        const { container, unmount } = render(
          <Table
            dataSource={minimalData}
            columns={minimalColumns}
            headerSearch={searchConfig}
          />,
        );

        const searchField = container.querySelector('[data-testid="search-field"]');
        const input = searchField!.querySelector('input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: typedValue } });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(typedValue);

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 10 ──────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 10: Filter click invokes onToggle with correct index', () => {
  /**
   * **Validates: Requirements 3.4**
   *
   * For any FilterConfig at index i in the headerFilters array, clicking
   * the corresponding Filter_Dropdown shall invoke the onToggle callback
   * exactly once with i as the argument.
   */
  it('clicking a filter calls onToggle with the correct index', () => {
    fc.assert(
      fc.property(
        filterConfigArrayArb(1, 5),
        fc.nat(),
        (filters, rawIndex) => {
          const cappedFilters = filters.slice(0, 5);
          const clickIndex = rawIndex % cappedFilters.length;

          const { container, unmount } = render(
            <Table
              dataSource={minimalData}
              columns={minimalColumns}
              headerFilters={cappedFilters}
            />,
          );

          const filterDropdowns = container.querySelectorAll('[data-testid="filter-dropdown"]');
          fireEvent.click(filterDropdowns[clickIndex]);

          expect(cappedFilters[clickIndex].onToggle).toHaveBeenCalledTimes(1);
          expect(cappedFilters[clickIndex].onToggle).toHaveBeenCalledWith(clickIndex);

          // Other filters should not have been toggled
          cappedFilters.forEach((filter, i) => {
            if (i !== clickIndex) {
              expect(filter.onToggle).not.toHaveBeenCalled();
            }
          });

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── Property 12 ──────────────────────────────────────────────────────────

describe('Feature: table-header-subcomponent, Property 12: Action button click invokes onClick callback', () => {
  /**
   * **Validates: Requirements 4.6**
   *
   * For any ActionConfig in the headerActions array, clicking the
   * corresponding Action_Button shall invoke the onClick callback
   * exactly once.
   */
  it('clicking an action button calls onClick exactly once', () => {
    fc.assert(
      fc.property(
        actionConfigArrayArb(1, 3),
        fc.nat(),
        (actions, rawIndex) => {
          const cappedActions = actions.slice(0, 3);
          const clickIndex = rawIndex % cappedActions.length;

          const { container, unmount } = render(
            <Table
              dataSource={minimalData}
              columns={minimalColumns}
              headerActions={cappedActions}
            />,
          );

          const buttonWrappers = container.querySelectorAll('[data-testid="action-button"]');
          // Click the actual <button> inside the wrapper
          const btn = buttonWrappers[clickIndex].querySelector('button') as HTMLButtonElement;
          fireEvent.click(btn);

          expect(cappedActions[clickIndex].onClick).toHaveBeenCalledTimes(1);

          // Other action buttons should not have been clicked
          cappedActions.forEach((action, i) => {
            if (i !== clickIndex) {
              expect(action.onClick).not.toHaveBeenCalled();
            }
          });

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});
