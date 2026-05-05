import fc from 'fast-check';
import { buildTableStyles } from '../useTableStyles';
import type { TableConfig, TableVariantConfig } from '../../../types/types';
import type { BuildTableStylesParams } from '../useTableStyles';

// ── Arbitraries ──────────────────────────────────────────────────────────

/** Arbitrary non-empty CSS-like string value */
const cssValue = () =>
  fc.oneof(
    fc.hexaString({ minLength: 3, maxLength: 6 }).map((h) => `#${h}`),
    fc.constant('8px'),
    fc.constant('12px 16px'),
    fc.constant('1px solid #ccc'),
    fc.constant('transparent'),
    fc.constant('inherit'),
    fc.constant('0.2s ease'),
    fc.constant('sans-serif'),
    fc.constant('600'),
    fc.constant('collapse'),
    fc.constant('separate'),
    fc.constant('0'),
    fc.constant('hidden'),
    fc.constant('not-allowed'),
    fc.constant('dashed'),
    fc.constant('rgba(255,255,255,0.5)'),
    fc.constant('10px'),
    fc.constant('48px'),
    fc.constant('32px'),
    fc.constant('50px'),
    fc.constant('500'),
    fc.constant('14px'),
    fc.constant('16px'),
    fc.constant('24px'),
    fc.constant('none'),
    fc.constant('0 4px'),
  );

/** Arbitrary for a single size config section */
const sizeConfigArb = () =>
  fc.record({
    headerPadding: cssValue(),
    cellPadding: cssValue(),
    fontSize: cssValue(),
    headerFontSize: cssValue(),
  });

/** Arbitrary for TableVariantConfig */
const variantConfigArb = (): fc.Arbitrary<TableVariantConfig> =>
  fc.record(
    {
      container: fc.record(
        {
          backgroundColor: cssValue(),
          borderRadius: cssValue(),
          overflow: cssValue(),
          border: cssValue(),
        },
        { requiredKeys: [] },
      ),
      table: fc.record(
        {
          borderCollapse: cssValue(),
          borderSpacing: cssValue(),
        },
        { requiredKeys: [] },
      ),
      row: fc.record(
        {
          backgroundColor: cssValue(),
          borderRadius: cssValue(),
          borderColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      cell: fc.record(
        {
          borderBottom: cssValue(),
        },
        { requiredKeys: [] },
      ),
      header: fc.record(
        {
          backgroundColor: cssValue(),
        },
        { requiredKeys: [] },
      ),
      states: fc.record(
        {
          hover: fc.record({ backgroundColor: cssValue() }, { requiredKeys: [] }),
          selected: fc.record({ backgroundColor: cssValue() }, { requiredKeys: [] }),
          striped: fc.record({ backgroundColor: cssValue() }, { requiredKeys: [] }),
          disabled: fc.record({ cursor: cssValue() }, { requiredKeys: [] }),
        },
        { requiredKeys: [] },
      ),
    },
    { requiredKeys: [] },
  );

/** Arbitrary for a full TableConfig */
const tableConfigArb = (): fc.Arbitrary<TableConfig> =>
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
          small: sizeConfigArb(),
          medium: sizeConfigArb(),
          large: sizeConfigArb(),
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
          default: variantConfigArb(),
          card: variantConfigArb(),
        },
        { requiredKeys: [] },
      ),
    },
    { requiredKeys: [] },
  );

/** Arbitrary for BuildTableStylesParams */
const buildParamsArb = (): fc.Arbitrary<BuildTableStylesParams> =>
  fc.record({
    config: tableConfigArb(),
    variant: fc.constantFrom('default' as const, 'card' as const),
    size: fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
    bordered: fc.boolean(),
    striped: fc.boolean(),
    hoverable: fc.boolean(),
  });

// ── Expected keys in TableStyleMap ───────────────────────────────────────

const EXPECTED_KEYS: readonly string[] = [
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
  // TableHeader sub-elements (added by table-header-subcomponent spec)
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

describe('Feature: table-tarmac-migration, Property 1: Style builder produces complete style map', () => {
  /**
   * **Validates: Requirements 1.3, 2.2, 3.1, 4.1, 5.1, 8.1**
   *
   * For any valid TableConfig and any valid combination of variant, size,
   * bordered, striped, and hoverable, buildTableStyles returns a
   * TableStyleMap where every one of the 15 keys maps to a non-empty
   * string (Emotion CSS class name).
   */
  it('should return a complete TableStyleMap with all 26 non-empty string keys for any valid input', () => {
    fc.assert(
      fc.property(buildParamsArb(), (params) => {
        const styleMap = buildTableStyles(params);

        // Every expected key must exist and be a non-empty string
        for (const key of EXPECTED_KEYS) {
          const value = (styleMap as Record<string, unknown>)[key];
          expect(typeof value).toBe('string');
          expect((value as string).length).toBeGreaterThan(0);
        }

        // No extra keys beyond the expected 15
        expect(Object.keys(styleMap).sort()).toEqual([...EXPECTED_KEYS].sort());
      }),
      { numRuns: 100 },
    );
  });
});


// ── Property 2 ───────────────────────────────────────────────────────────

/**
 * Helper: generates two guaranteed-distinct CSS color strings.
 * Returns a tuple [colorA, colorB] where colorA !== colorB.
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
 * Mapping from config section to the style map keys that section affects.
 * Used to verify that changing a config section produces a different class
 * name for the corresponding sub-element(s).
 */
const SECTION_TO_STYLE_KEYS: Record<string, string[]> = {
  header: ['headerCell'],
  body: ['bodyCell'],
  selection: ['selectionCell'],
  sorter: ['sortIndicator'],
  pagination: ['paginationBar', 'paginationButton', 'paginationButtonActive', 'paginationButtonDisabled'],
  empty: ['emptyState'],
  loading: ['loadingOverlay'],
  rowFooter: ['rowFooter'],
};

/**
 * For a given section name, returns the config field path and the property
 * within that section to mutate.
 */
const SECTION_MUTATION: Record<string, { path: string[]; field: string }> = {
  header: { path: ['header'], field: 'textColor' },
  body: { path: ['body'], field: 'textColor' },
  selection: { path: ['selection'], field: 'checkedColor' },
  sorter: { path: ['sorter'], field: 'activeColor' },
  pagination: { path: ['pagination'], field: 'activeColor' },
  empty: { path: ['empty'], field: 'textColor' },
  loading: { path: ['loading'], field: 'spinnerColor' },
  rowFooter: { path: ['rowFooter'], field: 'borderColor' },
};

describe('Feature: table-tarmac-migration, Property 2: Config values propagate to generated styles', () => {
  /**
   * **Validates: Requirements 2.4**
   *
   * For any two distinct TableConfig objects that differ in at least one
   * color/spacing/typography value, calling buildTableStyles with the same
   * props but different configs shall produce different Emotion class name
   * strings for the affected sub-element. This ensures zero hardcoded
   * values — all styling comes from the config parameter.
   */
  it.each(Object.keys(SECTION_TO_STYLE_KEYS))(
    'changing config.%s produces different class names for affected style keys',
    (section) => {
      const mutation = SECTION_MUTATION[section];
      const affectedKeys = SECTION_TO_STYLE_KEYS[section];

      fc.assert(
        fc.property(
          tableConfigArb(),
          fc.constantFrom('default' as const, 'card' as const),
          fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
          fc.boolean(),
          fc.boolean(),
          fc.boolean(),
          distinctColorPair(),
          (config, variant, size, bordered, striped, hoverable, [colorA, colorB]) => {
            // Build configA: set the target field to colorA
            const configA: TableConfig = JSON.parse(JSON.stringify(config));
            let targetA: any = configA;
            for (const key of mutation.path) {
              if (!targetA[key]) targetA[key] = {};
              targetA = targetA[key];
            }
            targetA[mutation.field] = colorA;

            // Build configB: identical except the target field is colorB
            const configB: TableConfig = JSON.parse(JSON.stringify(configA));
            let targetB: any = configB;
            for (const key of mutation.path) {
              targetB = targetB[key];
            }
            targetB[mutation.field] = colorB;

            const sharedProps = { variant, size, bordered, striped, hoverable };

            const stylesA = buildTableStyles({ config: configA, ...sharedProps });
            const stylesB = buildTableStyles({ config: configB, ...sharedProps });

            // At least one of the affected style keys must differ
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


// ── Property 3 ───────────────────────────────────────────────────────────

/**
 * Arbitrary that produces three guaranteed-distinct size config objects.
 * Each size section has unique padding and fontSize values so that
 * selecting a different size MUST produce a different Emotion class.
 */
const distinctSizesArb = () =>
  fc
    .tuple(
      fc.nat({ max: 50 }),
      fc.nat({ max: 50 }),
      fc.nat({ max: 50 }),
    )
    .filter(([a, b, c]) => a !== b && b !== c && a !== c)
    .map(([a, b, c]) => ({
      small: {
        headerPadding: `${a}px ${a + 1}px`,
        cellPadding: `${a}px ${a + 2}px`,
        fontSize: `${a + 10}px`,
        headerFontSize: `${a + 11}px`,
      },
      medium: {
        headerPadding: `${b}px ${b + 1}px`,
        cellPadding: `${b}px ${b + 2}px`,
        fontSize: `${b + 10}px`,
        headerFontSize: `${b + 11}px`,
      },
      large: {
        headerPadding: `${c}px ${c + 1}px`,
        cellPadding: `${c}px ${c + 2}px`,
        fontSize: `${c + 10}px`,
        headerFontSize: `${c + 11}px`,
      },
    }));

describe('Feature: table-tarmac-migration, Property 3: Size parameter selects correct size section', () => {
  /**
   * **Validates: Requirements 15.1, 15.2, 15.3**
   *
   * For any valid TableConfig with distinct values in sizes.small,
   * sizes.medium, and sizes.large, and for any size value in
   * {'small', 'medium', 'large'}, the generated headerCell and bodyCell
   * styles shall incorporate the padding and font size values from the
   * corresponding sizes[size] section of the config.
   *
   * We verify this by building styles for all three sizes with the same
   * config and asserting that each size produces a unique headerCell and
   * bodyCell class name — proving the correct size section was selected.
   */
  it('should produce distinct headerCell and bodyCell styles for each size when size configs differ', () => {
    fc.assert(
      fc.property(
        tableConfigArb(),
        distinctSizesArb(),
        fc.constantFrom('default' as const, 'card' as const),
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (baseConfig, sizes, variant, bordered, striped, hoverable) => {
          // Inject the distinct sizes into the config
          const config: TableConfig = {
            ...baseConfig,
            sizes,
          };

          const sharedProps = { variant, bordered, striped, hoverable };

          const stylesSmall = buildTableStyles({ config, size: 'small', ...sharedProps });
          const stylesMedium = buildTableStyles({ config, size: 'medium', ...sharedProps });
          const stylesLarge = buildTableStyles({ config, size: 'large', ...sharedProps });

          // headerCell must differ across all three sizes
          expect(stylesSmall.headerCell).not.toBe(stylesMedium.headerCell);
          expect(stylesMedium.headerCell).not.toBe(stylesLarge.headerCell);
          expect(stylesSmall.headerCell).not.toBe(stylesLarge.headerCell);

          // bodyCell must differ across all three sizes
          expect(stylesSmall.bodyCell).not.toBe(stylesMedium.bodyCell);
          expect(stylesMedium.bodyCell).not.toBe(stylesLarge.bodyCell);
          expect(stylesSmall.bodyCell).not.toBe(stylesLarge.bodyCell);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 4 ───────────────────────────────────────────────────────────

/**
 * Arbitrary that produces two guaranteed-distinct TableVariantConfig objects.
 * Each variant section has unique values for container, table, row, cell,
 * and header so that selecting a different variant MUST produce different
 * Emotion classes for the affected sub-elements.
 */
const distinctVariantPairArb = () =>
  fc
    .tuple(fc.nat({ max: 200 }), fc.nat({ max: 200 }))
    .filter(([a, b]) => a !== b)
    .map(([a, b]) => ({
      default: {
        container: {
          backgroundColor: `#aa${String(a).padStart(4, '0')}`,
          borderRadius: `${a}px`,
          overflow: a % 2 === 0 ? 'hidden' : 'visible',
          border: `${a}px solid #000`,
        },
        table: {
          borderCollapse: a % 2 === 0 ? 'collapse' : 'separate',
          borderSpacing: `${a}px`,
        },
        row: {
          backgroundColor: `#bb${String(a).padStart(4, '0')}`,
          borderRadius: `${a + 1}px`,
        },
        cell: {
          borderBottom: `${a}px solid #ccc`,
        },
        header: {
          backgroundColor: `#cc${String(a).padStart(4, '0')}`,
        },
      },
      card: {
        container: {
          backgroundColor: `#aa${String(b).padStart(4, '0')}`,
          borderRadius: `${b}px`,
          overflow: b % 2 === 0 ? 'hidden' : 'visible',
          border: `${b}px solid #000`,
        },
        table: {
          borderCollapse: b % 2 === 0 ? 'collapse' : 'separate',
          borderSpacing: `${b}px`,
        },
        row: {
          backgroundColor: `#bb${String(b).padStart(4, '0')}`,
          borderRadius: `${b + 1}px`,
        },
        cell: {
          borderBottom: `${b}px solid #ccc`,
        },
        header: {
          backgroundColor: `#cc${String(b).padStart(4, '0')}`,
        },
      },
    }));

describe('Feature: table-tarmac-migration, Property 4: Variant parameter selects correct variant section', () => {
  /**
   * **Validates: Requirements 7.1**
   *
   * For any valid TableConfig with distinct values in variants.default and
   * variants.card, and for any variant value in {'default', 'card'}, the
   * generated container, table, bodyRow, bodyCell, and headerRow styles
   * shall incorporate values from the corresponding variants[variant]
   * section of the config.
   *
   * We verify this by building styles for both variants with the same
   * config and asserting that each variant produces distinct class names
   * for the five affected sub-elements — proving the correct variant
   * section was selected.
   */
  it('should produce distinct container, table, bodyRow, bodyCell, and headerRow styles for default vs card when variant configs differ', () => {
    fc.assert(
      fc.property(
        tableConfigArb(),
        distinctVariantPairArb(),
        fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (baseConfig, variants, size, bordered, striped, hoverable) => {
          // Inject the distinct variant configs into the config
          const config: TableConfig = {
            ...baseConfig,
            variants,
          };

          const sharedProps = { size, bordered, striped, hoverable };

          const stylesDefault = buildTableStyles({ config, variant: 'default', ...sharedProps });
          const stylesCard = buildTableStyles({ config, variant: 'card', ...sharedProps });

          // container must differ between default and card
          expect(stylesDefault.container).not.toBe(stylesCard.container);

          // table must differ between default and card
          expect(stylesDefault.table).not.toBe(stylesCard.table);

          // bodyRow must differ between default and card
          expect(stylesDefault.bodyRow).not.toBe(stylesCard.bodyRow);

          // bodyCell must differ between default and card
          expect(stylesDefault.bodyCell).not.toBe(stylesCard.bodyCell);

          // headerRow must differ between default and card
          expect(stylesDefault.headerRow).not.toBe(stylesCard.headerRow);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 5 ───────────────────────────────────────────────────────────

/**
 * Arbitrary that produces a CSS color string guaranteed to differ from
 * any value the tableConfigArb might place in body.backgroundColor,
 * header.backgroundColor, or variant row/header backgroundColor.
 *
 * We use a distinctive prefix (`#ff00`) so collisions with the cssValue()
 * arbitrary are extremely unlikely.
 */
const overrideColorArb = () =>
  fc
    .hexaString({ minLength: 2, maxLength: 2 })
    .map((h) => `#ff00${h}`);

describe('Feature: table-tarmac-migration, Property 5: Prop overrides take precedence over theme tokens', () => {
  /**
   * **Validates: Requirements 11.6**
   *
   * For any valid TableConfig and for any bgColor and headerBgColor string
   * values, calling buildTableStyles with those overrides shall produce
   * bodyRow styles using bgColor and headerRow styles using headerBgColor,
   * regardless of what the config specifies in body.backgroundColor and
   * header.backgroundColor.
   *
   * We verify this by building styles twice — once without overrides and
   * once with overrides — and asserting that the affected class names
   * differ, proving the overrides took effect.
   */
  it('bgColor override produces different bodyRow styles than without override', () => {
    fc.assert(
      fc.property(
        tableConfigArb(),
        fc.constantFrom('default' as const, 'card' as const),
        fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        overrideColorArb(),
        (config, variant, size, bordered, striped, hoverable, bgColor) => {
          const sharedProps = { config, variant, size, bordered, striped, hoverable };

          const stylesWithout = buildTableStyles(sharedProps);
          const stylesWith = buildTableStyles({ ...sharedProps, bgColor });

          // bodyRow must differ when bgColor override is provided
          expect(stylesWith.bodyRow).not.toBe(stylesWithout.bodyRow);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('headerBgColor override produces different headerRow and headerCell styles than without override', () => {
    fc.assert(
      fc.property(
        tableConfigArb(),
        fc.constantFrom('default' as const, 'card' as const),
        fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        overrideColorArb(),
        (config, variant, size, bordered, striped, hoverable, headerBgColor) => {
          const sharedProps = { config, variant, size, bordered, striped, hoverable };

          const stylesWithout = buildTableStyles(sharedProps);
          const stylesWith = buildTableStyles({ ...sharedProps, headerBgColor });

          // headerRow must differ when headerBgColor override is provided
          expect(stylesWith.headerRow).not.toBe(stylesWithout.headerRow);

          // headerCell must also differ since it uses the same override
          expect(stylesWith.headerCell).not.toBe(stylesWithout.headerCell);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 6 ───────────────────────────────────────────────────────────

/**
 * Arbitrary for optional CSS color string (bgColor / headerBgColor overrides).
 * Produces either `undefined` or a hex color string.
 */
const optionalColorArb = () =>
  fc.option(
    fc.hexaString({ minLength: 6, maxLength: 6 }).map((h) => `#${h}`),
    { nil: undefined },
  );

/**
 * Arbitrary for BuildTableStylesParams covering ALL fields including
 * optional bgColor and headerBgColor — the full prop surface area.
 */
const fullBuildParamsArb = (): fc.Arbitrary<BuildTableStylesParams> =>
  fc.record({
    config: tableConfigArb(),
    variant: fc.constantFrom('default' as const, 'card' as const),
    size: fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
    bordered: fc.boolean(),
    striped: fc.boolean(),
    hoverable: fc.boolean(),
    bgColor: optionalColorArb(),
    headerBgColor: optionalColorArb(),
  });

describe('Feature: table-tarmac-migration, Property 6: Backward compatibility — all prop combinations render', () => {
  /**
   * **Validates: Requirements 11.1**
   *
   * For any valid combination of existing TableProps (including variant,
   * size, bordered, striped, hoverable, bgColor, headerBgColor), the
   * buildTableStyles function shall execute without throwing an error.
   * This ensures backward compatibility — no prop combination causes a
   * runtime crash in the style builder, whether or not optional overrides
   * are provided.
   */
  it('should never throw for any valid combination of BuildTableStylesParams including optional overrides', () => {
    fc.assert(
      fc.property(fullBuildParamsArb(), (params) => {
        // Must not throw for any valid input combination
        expect(() => buildTableStyles(params)).not.toThrow();

        // Additionally verify the result is a valid TableStyleMap
        const styleMap = buildTableStyles(params);
        expect(styleMap).toBeDefined();
        expect(typeof styleMap).toBe('object');

        // All 15 keys must be present and be non-empty strings
        for (const key of EXPECTED_KEYS) {
          const value = (styleMap as Record<string, unknown>)[key];
          expect(typeof value).toBe('string');
          expect((value as string).length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('should never throw with empty/minimal config (fallback behavior)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('default' as const, 'card' as const),
        fc.constantFrom('small' as const, 'medium' as const, 'large' as const),
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        optionalColorArb(),
        optionalColorArb(),
        (variant, size, bordered, striped, hoverable, bgColor, headerBgColor) => {
          // Empty config — simulates missing ThemeProvider / no theme tokens
          const emptyConfig = {} as TableConfig;

          expect(() =>
            buildTableStyles({
              config: emptyConfig,
              variant,
              size,
              bordered,
              striped,
              hoverable,
              bgColor,
              headerBgColor,
            }),
          ).not.toThrow();

          const styleMap = buildTableStyles({
            config: emptyConfig,
            variant,
            size,
            bordered,
            striped,
            hoverable,
            bgColor,
            headerBgColor,
          });

          // Even with empty config, all keys must still be present
          for (const key of EXPECTED_KEYS) {
            const value = (styleMap as Record<string, unknown>)[key];
            expect(typeof value).toBe('string');
            expect((value as string).length).toBeGreaterThan(0);
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});
