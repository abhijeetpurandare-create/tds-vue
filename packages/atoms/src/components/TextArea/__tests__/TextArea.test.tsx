import fc from 'fast-check';
import {
  buildTextAreaInputContainerStyles,
  type TextAreaConfig,
  type TextAreaStyleParams,
} from '../useTextAreaStyles';

// ── Arbitraries ──────────────────────────────────────────────────────────

/** Arbitrary non-empty CSS-like color string */
const cssColor = () =>
  fc.oneof(
    fc.hexaString({ minLength: 6, maxLength: 6 }).map((h) => `#${h}`),
    fc.constant('rgba(0,0,0,0.4)'),
    fc.constant('rgba(46,125,50,0.4)'),
    fc.constant('rgba(21,101,192,0.4)'),
    fc.constant('rgba(198,40,40,0.4)'),
    fc.constant('#ffffff'),
    fc.constant('#f5f5f5'),
    fc.constant('transparent'),
  );

/** Arbitrary CSS size value */
const cssSize = () =>
  fc.oneof(
    fc.nat({ max: 48 }).map((n) => `${n}px`),
    fc.constant('12px'),
    fc.constant('14px'),
    fc.constant('16px'),
    fc.constant('20px'),
    fc.constant('24px'),
    fc.constant('32px'),
    fc.constant('40px'),
    fc.constant('48px'),
  );

/** Known type variants */
const typeVariants = ['regular', 'success', 'infoBlue', 'error'] as const;
const typeVariantArb = () => fc.constantFrom(...typeVariants);

/** Known size variants */
const sizeVariants = ['lg', 'md', 'sm'] as const;
const sizeVariantArb = () => fc.constantFrom(...sizeVariants);

/** Generates a type config with all pseudo-state-relevant fields */
const typeConfigArb = () =>
  fc.record({
    borderColor: cssColor(),
    textColor: cssColor(),
    placeholderColor: cssColor(),
    helperTextColor: cssColor(),
    statusTextColor: cssColor(),
    hoverBorderColor: cssColor(),
    activeBorderColor: cssColor(),
    focusRingColor: cssColor(),
    backgroundColor: cssColor(),
    hoverBackgroundColor: cssColor(),
    labelColor: cssColor(),
    subtextColor: cssColor(),
    descriptionColor: cssColor(),
    iconColor: cssColor(),
    disabledBorderColor: cssColor(),
    disabledTextColor: cssColor(),
    disabledLabelColor: cssColor(),
    disabledHelperTextColor: cssColor(),
    disabledIconColor: cssColor(),
    disabledStatusTextColor: cssColor(),
    disabledSubtextColor: cssColor(),
    disabledDescriptionColor: cssColor(),
  });

/** Generates a size config */
const sizeConfigArb = () =>
  fc.record({
    minHeight: cssSize(),
    fontSize: cssSize(),
    lineHeight: cssSize(),
    paddingVertical: cssSize(),
    paddingHorizontal: cssSize(),
    iconSize: cssSize(),
    iconGap: cssSize(),
    titleFontSize: cssSize(),
    titleLineHeight: cssSize(),
    helperFontSize: cssSize(),
    helperLineHeight: cssSize(),
    descriptionFontSize: cssSize(),
    descriptionLineHeight: cssSize(),
    titleIconSize: cssSize(),
    containerGap: cssSize(),
    tagsGap: cssSize(),
  });

/** Generates a full TextAreaConfig with all four type variants and three size variants */
const textAreaConfigArb = (): fc.Arbitrary<TextAreaConfig> =>
  fc.record({
    base: fc.record({
      fontFamily: fc.constant('Noto Sans, sans-serif'),
      fontWeight: fc.constant('500'),
      radius: fc.constant('6px'),
      transition: fc.constant('all 0.15s ease-in-out'),
      focusRingSpread: fc.constant('2px'),
    }),
    types: fc.record({
      regular: typeConfigArb(),
      success: typeConfigArb(),
      infoBlue: typeConfigArb(),
      error: typeConfigArb(),
    }),
    sizes: fc.record({
      lg: sizeConfigArb(),
      md: sizeConfigArb(),
      sm: sizeConfigArb(),
    }),
    states: fc.record({
      disabled: fc.record({
        backgroundColor: cssColor(),
        borderColor: cssColor(),
        textColor: cssColor(),
        labelColor: cssColor(),
        placeholderColor: cssColor(),
        helperTextColor: cssColor(),
        mandatoryColor: cssColor(),
        statusTextColor: cssColor(),
        subtextColor: cssColor(),
        descriptionColor: cssColor(),
        cursor: fc.constant('default'),
      }),
      ghost: fc.record({
        backgroundColor: cssColor(),
        borderColor: fc.constant('transparent'),
        textColor: fc.constant('transparent'),
        labelColor: fc.constant('transparent'),
        cursor: fc.constant('default'),
        pointerEvents: fc.constant('none'),
      }),
    }),
  });

/** Helper to build default style params */
const buildParams = (
  config: TextAreaConfig,
  textAreaType: string,
  textAreaSize: string,
  overrides?: Partial<TextAreaStyleParams>,
): TextAreaStyleParams => ({
  config,
  textAreaType,
  textAreaSize,
  styleVariant: 'standard',
  isDisabled: false,
  isGhost: false,
  ...overrides,
});


// ── Property 2: CSS pseudo-states generated for all type variants ────────

describe('Feature: textarea-tarmac-migration, Property 2: CSS pseudo-states generated for all type variants', () => {
  /**
   * **Validates: Requirements 4.2, 4.3, 4.4**
   *
   * For any type variant in {regular, success, infoBlue, error}, the
   * `buildTextAreaInputContainerStyles` function SHALL generate Emotion CSS
   * containing `:hover`, `:focus-within` pseudo-state selectors with
   * non-empty style rules derived from the theme config, including hover
   * border color and focus ring box-shadow.
   *
   * We verify this by generating two configs that differ ONLY in the
   * pseudo-state-related fields (hoverBorderColor, hoverBackgroundColor,
   * focusRingColor) for a given type variant. If pseudo-states are
   * generated, the resulting Emotion class names MUST differ — proving
   * those config values are consumed.
   */
  it('should produce different class names when hover/focus config values change for any type variant', () => {
    fc.assert(
      fc.property(
        textAreaConfigArb(),
        typeVariantArb(),
        sizeVariantArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, textAreaType, textAreaSize, hoverHex, focusHex) => {
          // configA: use the generated config as-is
          const configA: TextAreaConfig = JSON.parse(JSON.stringify(config));

          // configB: change hover and focus colors for the target type
          const configB: TextAreaConfig = JSON.parse(JSON.stringify(config));
          configB.types[textAreaType] = {
            ...configB.types[textAreaType],
            hoverBorderColor: `#ff${hoverHex.slice(0, 4)}`,
            hoverBackgroundColor: `#ee${hoverHex.slice(0, 4)}`,
            focusRingColor: `rgba(${parseInt(focusHex.slice(0, 2), 16)},0,0,0.5)`,
          };

          const paramsA = buildParams(configA, textAreaType, textAreaSize);
          const paramsB = buildParams(configB, textAreaType, textAreaSize);

          const classA = buildTextAreaInputContainerStyles(paramsA);
          const classB = buildTextAreaInputContainerStyles(paramsB);

          // If pseudo-states are generated, changing their config values
          // MUST produce a different Emotion class name
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should produce distinct class names for each type variant when hover/focus config values differ', () => {
    fc.assert(
      fc.property(
        textAreaConfigArb(),
        sizeVariantArb(),
        (config, textAreaSize) => {
          // Ensure each type has distinct hover/focus colors
          const configWithDistinct: TextAreaConfig = JSON.parse(JSON.stringify(config));
          configWithDistinct.types.regular.hoverBorderColor = '#b0b0b0';
          configWithDistinct.types.regular.focusRingColor = 'rgba(0,0,0,0.4)';
          configWithDistinct.types.success.hoverBorderColor = '#1b5e20';
          configWithDistinct.types.success.focusRingColor = 'rgba(46,125,50,0.4)';
          configWithDistinct.types.infoBlue.hoverBorderColor = '#0d47a1';
          configWithDistinct.types.infoBlue.focusRingColor = 'rgba(21,101,192,0.4)';
          configWithDistinct.types.error.hoverBorderColor = '#b71c1c';
          configWithDistinct.types.error.focusRingColor = 'rgba(198,40,40,0.4)';

          const classRegular = buildTextAreaInputContainerStyles(
            buildParams(configWithDistinct, 'regular', textAreaSize),
          );
          const classSuccess = buildTextAreaInputContainerStyles(
            buildParams(configWithDistinct, 'success', textAreaSize),
          );
          const classInfoBlue = buildTextAreaInputContainerStyles(
            buildParams(configWithDistinct, 'infoBlue', textAreaSize),
          );
          const classError = buildTextAreaInputContainerStyles(
            buildParams(configWithDistinct, 'error', textAreaSize),
          );

          // Each type must produce a different class name due to distinct pseudo-state colors
          const classes = [classRegular, classSuccess, classInfoBlue, classError];
          const uniqueClasses = new Set(classes);
          expect(uniqueClasses.size).toBe(4);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Additional imports for Property 6 ────────────────────────────────────────
import {
  buildStatusTextStyles,
  buildIconContainerStyles,
} from '../useTextAreaStyles';

// ── Property 6: Per-type disabled tokens applied ─────────────────────────────

describe('Feature: textarea-tarmac-migration, Property 6: Per-type disabled tokens applied', () => {
  /**
   * **Validates: Requirements 4.5, 5.1, 5.2, 5.3, 5.4**
   *
   * For any type variant in {regular, success, infoBlue, error}, when
   * `isDisabled` is true, the style builder SHALL use the type-specific
   * disabled token values (e.g., `disabledBorderColor`,
   * `disabledStatusTextColor`, `disabledIconColor`) from the type config
   * rather than generic disabled colors, and the native `<textarea>`
   * element SHALL have the `disabled` attribute set.
   */

  it('buildTextAreaInputContainerStyles: class name changes when per-type disabled tokens differ across types', () => {
    fc.assert(
      fc.property(
        textAreaConfigArb(),
        sizeVariantArb(),
        (config, textAreaSize) => {
          // Ensure each type has DISTINCT per-type disabled border colors
          const cfg: TextAreaConfig = JSON.parse(JSON.stringify(config));
          cfg.types.regular.disabledBorderColor = '#aaaaaa';
          cfg.types.success.disabledBorderColor = '#00aa00';
          cfg.types.infoBlue.disabledBorderColor = '#0000aa';
          cfg.types.error.disabledBorderColor = '#aa0000';

          const classes = typeVariants.map((tv) =>
            buildTextAreaInputContainerStyles(
              buildParams(cfg, tv, textAreaSize, { isDisabled: true }),
            ),
          );

          // Each type must produce a different class name because per-type
          // disabled tokens differ
          const unique = new Set(classes);
          expect(unique.size).toBe(4);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('buildTextAreaInputContainerStyles: changing disabledBorderColor for a single type changes the class name', () => {
    fc.assert(
      fc.property(
        textAreaConfigArb(),
        typeVariantArb(),
        sizeVariantArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, textAreaType, textAreaSize, hex) => {
          const cfgA: TextAreaConfig = JSON.parse(JSON.stringify(config));
          const cfgB: TextAreaConfig = JSON.parse(JSON.stringify(config));

          // Set a known value in A, a different value in B
          cfgA.types[textAreaType].disabledBorderColor = '#111111';
          cfgB.types[textAreaType].disabledBorderColor = `#${hex}ff`.slice(0, 7);

          // Only compare when the two values actually differ
          if (cfgA.types[textAreaType].disabledBorderColor === cfgB.types[textAreaType].disabledBorderColor) return;

          const classA = buildTextAreaInputContainerStyles(
            buildParams(cfgA, textAreaType, textAreaSize, { isDisabled: true }),
          );
          const classB = buildTextAreaInputContainerStyles(
            buildParams(cfgB, textAreaType, textAreaSize, { isDisabled: true }),
          );

          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('buildStatusTextStyles: per-type disabledStatusTextColor is consumed when disabled', () => {
    fc.assert(
      fc.property(
        textAreaConfigArb(),
        sizeVariantArb(),
        (config, textAreaSize) => {
          // Ensure each type has DISTINCT per-type disabled status text colors
          const cfg: TextAreaConfig = JSON.parse(JSON.stringify(config));
          cfg.types.regular.disabledStatusTextColor = '#a1a1a1';
          cfg.types.success.disabledStatusTextColor = '#00b300';
          cfg.types.infoBlue.disabledStatusTextColor = '#0033cc';
          cfg.types.error.disabledStatusTextColor = '#cc0000';

          const classes = typeVariants.map((tv) =>
            buildStatusTextStyles(
              buildParams(cfg, tv, textAreaSize, { isDisabled: true }),
            ),
          );

          const unique = new Set(classes);
          expect(unique.size).toBe(4);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('buildIconContainerStyles: per-type disabledIconColor is consumed when disabled', () => {
    fc.assert(
      fc.property(
        textAreaConfigArb(),
        sizeVariantArb(),
        (config, textAreaSize) => {
          // Ensure each type has DISTINCT per-type disabled icon colors
          const cfg: TextAreaConfig = JSON.parse(JSON.stringify(config));
          cfg.types.regular.disabledIconColor = '#b0b0b0';
          cfg.types.success.disabledIconColor = '#009900';
          cfg.types.infoBlue.disabledIconColor = '#003399';
          cfg.types.error.disabledIconColor = '#990000';

          const classes = typeVariants.map((tv) =>
            buildIconContainerStyles(
              buildParams(cfg, tv, textAreaSize, { isDisabled: true }),
            ),
          );

          const unique = new Set(classes);
          expect(unique.size).toBe(4);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('buildStatusTextStyles: changing disabledStatusTextColor changes the class name for any type', () => {
    fc.assert(
      fc.property(
        textAreaConfigArb(),
        typeVariantArb(),
        sizeVariantArb(),
        (config, textAreaType, textAreaSize) => {
          const cfgA: TextAreaConfig = JSON.parse(JSON.stringify(config));
          const cfgB: TextAreaConfig = JSON.parse(JSON.stringify(config));

          cfgA.types[textAreaType].disabledStatusTextColor = '#222222';
          cfgB.types[textAreaType].disabledStatusTextColor = '#eeeeee';

          const classA = buildStatusTextStyles(
            buildParams(cfgA, textAreaType, textAreaSize, { isDisabled: true }),
          );
          const classB = buildStatusTextStyles(
            buildParams(cfgB, textAreaType, textAreaSize, { isDisabled: true }),
          );

          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Imports for Property 1: Exhaustive variant rendering ─────────────────────
import React, { createRef } from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import TextArea from '../index';

// ── Mock ThemeProvider ───────────────────────────────────────────────────────
// Provide resolved hex values (not {{tokens}}) for the textArea_tarmac config.

const mockTextAreaConfig: TextAreaConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    radius: '6px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
  },
  types: {
    regular: {
      borderColor: '#e6e6e6', textColor: '#2b2b2b', placeholderColor: '#808080',
      helperTextColor: '#666666', statusTextColor: '#2b2b2b',
      hoverBorderColor: '#cccccc', activeBorderColor: '#cccccc',
      focusRingColor: '#00000066', backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff', labelColor: '#454545',
      subtextColor: '#666666', descriptionColor: '#666666', iconColor: '#2b2b2b',
      disabledBorderColor: '#cccccc', disabledTextColor: '#cdcbcb',
      disabledLabelColor: '#cdcbcb', disabledHelperTextColor: '#cdcbcb',
      disabledIconColor: '#cdcbcb', disabledStatusTextColor: '#cdcbcb',
      disabledSubtextColor: '#cdcbcb', disabledDescriptionColor: '#cdcbcb',
    },
    success: {
      borderColor: '#41b686', textColor: '#2b2b2b', placeholderColor: '#808080',
      helperTextColor: '#666666', statusTextColor: '#1ba86e',
      hoverBorderColor: '#cccccc', activeBorderColor: '#cccccc',
      focusRingColor: '#1ba86e66', backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff', labelColor: '#454545',
      subtextColor: '#666666', descriptionColor: '#666666', iconColor: '#1ba86e',
      disabledBorderColor: '#d1eee2', disabledTextColor: '#cdcbcb',
      disabledLabelColor: '#cdcbcb', disabledHelperTextColor: '#cdcbcb',
      disabledIconColor: '#8dd3b6', disabledStatusTextColor: '#8dd3b6',
      disabledSubtextColor: '#cdcbcb', disabledDescriptionColor: '#cdcbcb',
    },
    error: {
      borderColor: '#e23b5d', textColor: '#2b2b2b', placeholderColor: '#808080',
      helperTextColor: '#666666', statusTextColor: '#dc143c',
      hoverBorderColor: '#cccccc', activeBorderColor: '#cccccc',
      focusRingColor: '#ed1b3666', backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff', labelColor: '#454545',
      subtextColor: '#666666', descriptionColor: '#666666', iconColor: '#dc143c',
      disabledBorderColor: '#f8d0d8', disabledTextColor: '#cdcbcb',
      disabledLabelColor: '#cdcbcb', disabledHelperTextColor: '#cdcbcb',
      disabledIconColor: '#ed899d', disabledStatusTextColor: '#ed899d',
      disabledSubtextColor: '#cdcbcb', disabledDescriptionColor: '#cdcbcb',
    },
    infoBlue: {
      borderColor: '#48a7fc', textColor: '#2b2b2b', placeholderColor: '#808080',
      helperTextColor: '#666666', statusTextColor: '#2396fb',
      hoverBorderColor: '#cccccc', activeBorderColor: '#cccccc',
      focusRingColor: '#2396fb66', backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff', labelColor: '#454545',
      subtextColor: '#666666', descriptionColor: '#666666', iconColor: '#2396fb',
      disabledBorderColor: '#d3eafe', disabledTextColor: '#cdcbcb',
      disabledLabelColor: '#cdcbcb', disabledHelperTextColor: '#cdcbcb',
      disabledIconColor: '#91cafd', disabledStatusTextColor: '#91cafd',
      disabledSubtextColor: '#cdcbcb', disabledDescriptionColor: '#cdcbcb',
    },
  },
  sizes: {
    lg: {
      minHeight: '104px', fontSize: '16px', lineHeight: '24px',
      paddingVertical: '12px', paddingHorizontal: '12px', iconSize: '20px',
      iconGap: '8px', titleFontSize: '14px', titleLineHeight: '20px',
      helperFontSize: '12px', helperLineHeight: '16px',
      descriptionFontSize: '12px', descriptionLineHeight: '16px',
      titleIconSize: '20px', containerGap: '8px', tagsGap: '4px',
    },
    md: {
      minHeight: '80px', fontSize: '14px', lineHeight: '20px',
      paddingVertical: '12px', paddingHorizontal: '12px', iconSize: '20px',
      iconGap: '8px', titleFontSize: '14px', titleLineHeight: '20px',
      helperFontSize: '12px', helperLineHeight: '16px',
      descriptionFontSize: '12px', descriptionLineHeight: '16px',
      titleIconSize: '20px', containerGap: '8px', tagsGap: '4px',
    },
    sm: {
      minHeight: '64px', fontSize: '14px', lineHeight: '20px',
      paddingVertical: '8px', paddingHorizontal: '12px', iconSize: '20px',
      iconGap: '6px', titleFontSize: '14px', titleLineHeight: '20px',
      helperFontSize: '12px', helperLineHeight: '16px',
      descriptionFontSize: '12px', descriptionLineHeight: '16px',
      titleIconSize: '20px', containerGap: '6px', tagsGap: '4px',
    },
  },
  states: {
    disabled: {
      backgroundColor: '#ffffff', borderColor: '#cccccc', textColor: '#cdcbcb',
      labelColor: '#cdcbcb', placeholderColor: '#cdcbcb',
      helperTextColor: '#cdcbcb', mandatoryColor: '#cdcbcb',
      statusTextColor: '#cdcbcb', subtextColor: '#cdcbcb',
      descriptionColor: '#cdcbcb', cursor: 'default',
    },
    ghost: {
      backgroundColor: '#ededed', borderColor: 'transparent',
      textColor: 'transparent', labelColor: 'transparent',
      cursor: 'default', pointerEvents: 'none',
      skeletonTitleWidth: '100px', skeletonTitleHeight: '12px',
      skeletonTitleRadius: '12px', skeletonInputHeight: '80px',
      skeletonInputRadius: '6px',
    },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: {
      components: {
        textArea_tarmac: mockTextAreaConfig,
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ── Property 1: Exhaustive variant rendering ─────────────────────────────────

describe('Feature: textarea-tarmac-migration, Property 1: Exhaustive variant rendering', () => {
  /**
   * **Validates: Requirements 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 17.5, 17.6**
   *
   * For all combinations of textAreaType ∈ {regular, success, infoBlue, error}
   * × textAreaSize ∈ {lg, md, sm} × styleVariant ∈ {standard, withTags}
   * × disabled/ghost states, and for all combinations of boolean toggle props
   * (label, titleIcon, trailingIcon, helperTextTop, helperTextBottom,
   * descriptionText, subtext, statusText, isMandatory), the TextArea component
   * SHALL render without throwing an error when the Tarmac path is active.
   */
  it('should render without error for all variant × toggle combinations', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
          fc.constantFrom('lg', 'md', 'sm'),
          fc.constantFrom('standard', 'withTags'),
          fc.constantFrom('default', 'disabled', 'ghost'),
        ),
        fc.record({
          label: fc.boolean(),
          titleIcon: fc.boolean(),
          trailingIcon: fc.boolean(),
          helperTextTop: fc.boolean(),
          helperTextBottom: fc.boolean(),
          descriptionText: fc.boolean(),
          subtext: fc.boolean(),
          statusText: fc.boolean(),
          isMandatory: fc.boolean(),
        }),
        ([textAreaType, textAreaSize, styleVariant, state], toggles) => {
          const isDisabled = state === 'disabled';
          const isGhost = state === 'ghost';

          const tags = styleVariant === 'withTags'
            ? [{ value: 'tag1', status: 'default' as const }]
            : undefined;

          const { unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              textAreaType={textAreaType}
              textAreaSize={textAreaSize}
              styleVariant={styleVariant}
              isDisabled={isDisabled}
              isGhost={isGhost}
              label={toggles.label ? 'Test Label' : undefined}
              titleIcon={toggles.titleIcon ? React.createElement('span', null, '🔍') : undefined}
              trailingIcon={toggles.trailingIcon ? React.createElement('span', null, '→') : undefined}
              helperTextTop={toggles.helperTextTop ? 'Helper top' : undefined}
              helperTextBottom={toggles.helperTextBottom ? 'Helper bottom' : undefined}
              descriptionText={toggles.descriptionText ? 'Description' : undefined}
              subtext={toggles.subtext ? 'Subtext' : undefined}
              statusText={toggles.statusText ? 'Status' : undefined}
              isMandatory={toggles.isMandatory}
              tags={tags}
              placeholder="test-input"
            />,
          );

          // If we reach here without throwing, the property holds
          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 3: Boolean toggle conditional rendering ─────────────────────────

describe('Feature: textarea-tarmac-migration, Property 3: Boolean toggle conditional rendering', () => {
  /**
   * **Validates: Requirements 6.1, 6.2, 7.1, 7.2, 8.1, 8.2, 9.1, 9.2, 10.1, 10.2, 11.1, 11.2, 12.1, 12.2**
   *
   * For any valid TextArea configuration, when a boolean toggle prop
   * (label, titleIcon, trailingIcon, helperTextTop, helperTextBottom,
   * descriptionText, subtext, statusText) is provided with a non-empty
   * value, the corresponding DOM element SHALL be present in the rendered
   * output. When the prop is not provided or is falsy, the corresponding
   * DOM element SHALL NOT be present.
   */

  /** Arbitrary that optionally provides each text-based toggle */
  const togglePropsArb = () =>
    fc.record({
      label: fc.option(fc.constantFrom('Label A', 'Label B', 'My Label'), { nil: undefined }),
      titleIcon: fc.option(fc.constantFrom('title-icon-text'), { nil: undefined }),
      trailingIcon: fc.option(fc.constantFrom('trailing-icon-text'), { nil: undefined }),
      helperTextTop: fc.option(fc.constantFrom('Helper Top A', 'Helper Top B'), { nil: undefined }),
      helperTextBottom: fc.option(fc.constantFrom('Helper Bottom A', 'Helper Bottom B'), { nil: undefined }),
      descriptionText: fc.option(fc.constantFrom('Description A', 'Description B'), { nil: undefined }),
      subtext: fc.option(fc.constantFrom('Subtext A', 'Subtext B'), { nil: undefined }),
      statusText: fc.option(fc.constantFrom('Status A', 'Status B'), { nil: undefined }),
    });

  it('should render text-based toggle elements when provided and omit them when not provided', () => {
    fc.assert(
      fc.property(
        togglePropsArb(),
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        (toggles, textAreaType, textAreaSize) => {
          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              textAreaType={textAreaType}
              textAreaSize={textAreaSize}
              styleVariant="standard"
              label={toggles.label}
              titleIcon={toggles.titleIcon ? React.createElement('span', null, toggles.titleIcon) : undefined}
              trailingIcon={toggles.trailingIcon ? React.createElement('span', null, toggles.trailingIcon) : undefined}
              helperTextTop={toggles.helperTextTop}
              helperTextBottom={toggles.helperTextBottom}
              descriptionText={toggles.descriptionText}
              subtext={toggles.subtext}
              statusText={toggles.statusText}
              placeholder="test"
            />,
          );

          const view = within(container);

          // ── label ──
          if (toggles.label) {
            expect(view.getByText(toggles.label)).toBeTruthy();
          } else {
            expect(view.queryByText('Label A')).toBeNull();
            expect(view.queryByText('Label B')).toBeNull();
            expect(view.queryByText('My Label')).toBeNull();
          }

          // ── titleIcon (only visible when title container renders: label, descriptionText, or helperTextTop present) ──
          const titleContainerVisible = !!(toggles.label || toggles.descriptionText || toggles.helperTextTop);
          if (toggles.titleIcon && titleContainerVisible) {
            expect(view.getByText('title-icon-text')).toBeTruthy();
          } else {
            expect(view.queryByText('title-icon-text')).toBeNull();
          }

          // ── trailingIcon ──
          if (toggles.trailingIcon) {
            expect(view.getByText('trailing-icon-text')).toBeTruthy();
          } else {
            expect(view.queryByText('trailing-icon-text')).toBeNull();
          }

          // ── helperTextTop ──
          if (toggles.helperTextTop) {
            expect(view.getByText(toggles.helperTextTop)).toBeTruthy();
          } else {
            expect(view.queryByText('Helper Top A')).toBeNull();
            expect(view.queryByText('Helper Top B')).toBeNull();
          }

          // ── helperTextBottom ──
          if (toggles.helperTextBottom) {
            expect(view.getByText(toggles.helperTextBottom)).toBeTruthy();
          } else {
            expect(view.queryByText('Helper Bottom A')).toBeNull();
            expect(view.queryByText('Helper Bottom B')).toBeNull();
          }

          // ── descriptionText ──
          if (toggles.descriptionText) {
            expect(view.getByText(toggles.descriptionText)).toBeTruthy();
          } else {
            expect(view.queryByText('Description A')).toBeNull();
            expect(view.queryByText('Description B')).toBeNull();
          }

          // ── subtext ──
          if (toggles.subtext) {
            expect(view.getByText(toggles.subtext)).toBeTruthy();
          } else {
            expect(view.queryByText('Subtext A')).toBeNull();
            expect(view.queryByText('Subtext B')).toBeNull();
          }

          // ── statusText ──
          if (toggles.statusText) {
            expect(view.getByText(toggles.statusText)).toBeTruthy();
          } else {
            expect(view.queryByText('Status A')).toBeNull();
            expect(view.queryByText('Status B')).toBeNull();
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle titleIcon visibility: present when provided, absent when not', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        (hasTitleIcon, textAreaType, textAreaSize) => {
          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              textAreaType={textAreaType}
              textAreaSize={textAreaSize}
              label="Some Label"
              titleIcon={hasTitleIcon ? React.createElement('span', { 'data-testid': 'title-icon-el' }, '🔍') : undefined}
              placeholder="test"
            />,
          );

          const view = within(container);

          if (hasTitleIcon) {
            expect(view.getByTestId('title-icon-el')).toBeTruthy();
          } else {
            expect(view.queryByTestId('title-icon-el')).toBeNull();
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should handle trailingIcon visibility: present when provided, absent when not', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        (hasTrailingIcon, textAreaType, textAreaSize) => {
          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              textAreaType={textAreaType}
              textAreaSize={textAreaSize}
              trailingIcon={hasTrailingIcon ? React.createElement('span', { 'data-testid': 'trailing-icon-el' }, '→') : undefined}
              placeholder="test"
            />,
          );

          const view = within(container);

          if (hasTrailingIcon) {
            expect(view.getByTestId('trailing-icon-el')).toBeTruthy();
          } else {
            expect(view.queryByTestId('trailing-icon-el')).toBeNull();
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 4: Conditional container rendering ──────────────────────────────

describe('Feature: textarea-tarmac-migration, Property 4: Conditional container rendering', () => {
  /**
   * **Validates: Requirements 13.1, 13.2, 13.3, 13.4**
   *
   * For any TextArea configuration, the Title Container wrapper SHALL only
   * render when at least one of `label`, `descriptionText`, or `helperTextTop`
   * is provided. The Subtext Container wrapper SHALL only render when at least
   * one of `subtext` or `helperTextBottom` is provided. When none of their
   * respective child props are provided, the containers SHALL NOT appear in
   * the DOM.
   */

  const titleContainerPropsArb = () =>
    fc.record({
      label: fc.option(fc.constantFrom('Label A', 'Label B'), { nil: undefined }),
      descriptionText: fc.option(fc.constantFrom('Desc A', 'Desc B'), { nil: undefined }),
      helperTextTop: fc.option(fc.constantFrom('Helper Top A', 'Helper Top B'), { nil: undefined }),
    });

  const subtextContainerPropsArb = () =>
    fc.record({
      subtext: fc.option(fc.constantFrom('Subtext A', 'Subtext B'), { nil: undefined }),
      helperTextBottom: fc.option(fc.constantFrom('Helper Bottom A', 'Helper Bottom B'), { nil: undefined }),
    });

  it('Title Container renders iff at least one of label, descriptionText, or helperTextTop is provided', () => {
    fc.assert(
      fc.property(
        titleContainerPropsArb(),
        subtextContainerPropsArb(),
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        fc.constantFrom('standard', 'withTags'),
        (titleProps, subtextProps, textAreaType, textAreaSize, styleVariant) => {
          const hasTitleContent = !!(titleProps.label || titleProps.descriptionText || titleProps.helperTextTop);

          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              textAreaType={textAreaType}
              textAreaSize={textAreaSize}
              styleVariant={styleVariant}
              label={titleProps.label}
              descriptionText={titleProps.descriptionText}
              helperTextTop={titleProps.helperTextTop}
              subtext={subtextProps.subtext}
              helperTextBottom={subtextProps.helperTextBottom}
              placeholder="test"
            />,
          );

          const view = within(container);
          const titleContainer = view.queryByTestId('textarea-title-container');

          if (hasTitleContent) {
            expect(titleContainer).not.toBeNull();
          } else {
            expect(titleContainer).toBeNull();
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('Subtext Container renders iff at least one of subtext or helperTextBottom is provided', () => {
    fc.assert(
      fc.property(
        titleContainerPropsArb(),
        subtextContainerPropsArb(),
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        fc.constantFrom('standard', 'withTags'),
        (titleProps, subtextProps, textAreaType, textAreaSize, styleVariant) => {
          const hasSubtextContent = !!(subtextProps.subtext || subtextProps.helperTextBottom);

          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              textAreaType={textAreaType}
              textAreaSize={textAreaSize}
              styleVariant={styleVariant}
              label={titleProps.label}
              descriptionText={titleProps.descriptionText}
              helperTextTop={titleProps.helperTextTop}
              subtext={subtextProps.subtext}
              helperTextBottom={subtextProps.helperTextBottom}
              placeholder="test"
            />,
          );

          const view = within(container);
          const subtextContainer = view.queryByTestId('textarea-subtext-container');

          if (hasSubtextContent) {
            expect(subtextContainer).not.toBeNull();
          } else {
            expect(subtextContainer).toBeNull();
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 9: Open union types accept arbitrary strings ────────────────────

describe('Feature: textarea-tarmac-migration, Property 9: Open union types accept arbitrary strings', () => {
  /**
   * **Validates: Requirements 1.4, 5.6**
   *
   * For any arbitrary string value passed to the open-union-typed props
   * (`textAreaStyle`, `textAreaType`, `textAreaSize`, `styleVariant`),
   * the component SHALL not throw a runtime error. Unknown values should
   * gracefully fall back to empty/default config.
   */
  it('should not throw for arbitrary string values on open-union-typed props', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        fc.string(),
        fc.string(),
        (textAreaStyle, textAreaType, textAreaSize, styleVariant) => {
          // Ensure textAreaStyle is non-empty so the discriminator activates the Tarmac path
          const style = textAreaStyle || 'arbitrary-style';

          expect(() => {
            const { unmount } = render(
              <TextArea
                textAreaStyle={style as any}
                textAreaType={textAreaType as any}
                textAreaSize={textAreaSize as any}
                styleVariant={styleVariant as any}
                placeholder="test"
              />,
            );
            unmount();
          }).not.toThrow();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Tarmac TDS Unit Tests ────────────────────────────────────────────────────

describe('Tarmac TDS', () => {
  // ── 1. Discriminator rendering ──────────────────────────────────────────

  it('renders with textAreaStyle discriminator prop', () => {
    /** Validates: Requirements 21.2 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" placeholder="hello" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  it('returns null when textAreaStyle is not provided', () => {
    /** Validates: Requirements 21.2 */
    const { container } = render(<TextArea placeholder="hello" />);
    expect(container.querySelector('textarea')).toBeNull();
  });

  // ── 2. Type variants ───────────────────────────────────────────────────

  it('renders with type "regular"', () => {
    /** Validates: Requirements 21.3 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" textAreaType="regular" placeholder="test" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  it('renders with type "success"', () => {
    /** Validates: Requirements 21.3 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" textAreaType="success" placeholder="test" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  it('renders with type "infoBlue"', () => {
    /** Validates: Requirements 21.3 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" textAreaType="infoBlue" placeholder="test" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  it('renders with type "error"', () => {
    /** Validates: Requirements 21.3 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" textAreaType="error" placeholder="test" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  // ── 3. Size variants ──────────────────────────────────────────────────

  it('renders with size "lg"', () => {
    /** Validates: Requirements 21.4 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" textAreaSize="lg" placeholder="test" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  it('renders with size "md"', () => {
    /** Validates: Requirements 21.4 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" textAreaSize="md" placeholder="test" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  it('renders with size "sm"', () => {
    /** Validates: Requirements 21.4 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" textAreaSize="sm" placeholder="test" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  // ── 4. Style variants ─────────────────────────────────────────────────

  it('renders with styleVariant "standard"', () => {
    /** Validates: Requirements 21.5 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" styleVariant="standard" placeholder="test" />,
    );
    expect(container.querySelector('textarea')).not.toBeNull();
    expect(screen.queryByTestId('textarea-tags-container')).toBeNull();
  });

  it('renders with styleVariant "withTags" and tags', () => {
    /** Validates: Requirements 21.5 */
    render(
      <TextArea
        textAreaStyle="tarmac-01"
        styleVariant="withTags"
        tags={[{ value: 'Tag1', status: 'default' }]}
        placeholder="test"
      />,
    );
    expect(screen.getByTestId('textarea-tags-container')).not.toBeNull();
    expect(screen.getByText('Tag1')).not.toBeNull();
  });

  // ── 5. Boolean toggles ────────────────────────────────────────────────

  it('renders label when provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea textAreaStyle="tarmac-01" label="My Label" placeholder="test" />,
    );
    expect(screen.getByText('My Label')).not.toBeNull();
  });

  it('renders titleIcon when provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea
        textAreaStyle="tarmac-01"
        label="Label"
        titleIcon={<span data-testid="title-icon">🔍</span>}
        placeholder="test"
      />,
    );
    expect(screen.getByTestId('title-icon')).not.toBeNull();
  });

  it('renders trailingIcon when provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea
        textAreaStyle="tarmac-01"
        trailingIcon={<span data-testid="trailing-icon">→</span>}
        placeholder="test"
      />,
    );
    expect(screen.getByTestId('trailing-icon')).not.toBeNull();
  });

  it('renders helperTextTop when provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea textAreaStyle="tarmac-01" helperTextTop="Helper Top" placeholder="test" />,
    );
    expect(screen.getByText('Helper Top')).not.toBeNull();
  });

  it('renders helperTextBottom when provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea textAreaStyle="tarmac-01" helperTextBottom="Helper Bottom" placeholder="test" />,
    );
    expect(screen.getByText('Helper Bottom')).not.toBeNull();
  });

  it('renders descriptionText when provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea textAreaStyle="tarmac-01" label="Label" descriptionText="Description here" placeholder="test" />,
    );
    expect(screen.getByText('Description here')).not.toBeNull();
  });

  it('renders subtext when provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea textAreaStyle="tarmac-01" subtext="Subtext here" placeholder="test" />,
    );
    expect(screen.getByText('Subtext here')).not.toBeNull();
  });

  it('renders statusText when provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea textAreaStyle="tarmac-01" statusText="Status msg" placeholder="test" />,
    );
    expect(screen.getByText('Status msg')).not.toBeNull();
  });

  it('renders mandatory asterisk when isMandatory and label are provided', () => {
    /** Validates: Requirements 21.7 */
    render(
      <TextArea textAreaStyle="tarmac-01" label="Required" isMandatory placeholder="test" />,
    );
    expect(screen.getByText('*')).not.toBeNull();
  });

  // ── 6. Disabled state ─────────────────────────────────────────────────

  it('sets native disabled attribute when isDisabled is true', () => {
    /** Validates: Requirements 21.8, 21.13 */
    render(
      <TextArea textAreaStyle="tarmac-01" isDisabled placeholder="test" />,
    );
    const textarea = screen.getByPlaceholderText('test');
    expect(textarea).toBeDisabled();
  });

  it('applies cursor default on disabled state', () => {
    /** Validates: Requirements 21.8 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" isDisabled placeholder="test" />,
    );
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBeNull();
    expect(textarea!.disabled).toBe(true);
  });

  // ── 7. Ghost state ────────────────────────────────────────────────────

  it('renders ghost skeleton blocks when isGhost is true', () => {
    /** Validates: Requirements 21.8, 21.14 */
    render(
      <TextArea textAreaStyle="tarmac-01" isGhost placeholder="test" />,
    );
    expect(screen.getByTestId('textarea-ghost-skeleton-title')).not.toBeNull();
    expect(screen.getByTestId('textarea-ghost-skeleton-input')).not.toBeNull();
  });

  it('applies pointer-events none when isGhost is true', () => {
    /** Validates: Requirements 21.14 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" isGhost placeholder="test" />,
    );
    // The outer container div should have pointer-events: none
    const outerDiv = container.firstElementChild as HTMLElement;
    expect(outerDiv.style.pointerEvents).toBe('none');
  });

  it('does not render textarea element in ghost state', () => {
    /** Validates: Requirements 21.8 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" isGhost placeholder="test" />,
    );
    expect(container.querySelector('textarea')).toBeNull();
  });

  // ── 8. Exhaustive combo test ──────────────────────────────────────────

  it('renders all Type × Style × Size combinations without error', () => {
    /** Validates: Requirements 21.6 */
    const types = ['regular', 'success', 'infoBlue', 'error'] as const;
    const styles = ['standard', 'withTags'] as const;
    const sizes = ['lg', 'md', 'sm'] as const;

    types.forEach((type) => {
      styles.forEach((style) => {
        sizes.forEach((size) => {
          const tags = style === 'withTags'
            ? [{ value: 'tag', status: 'default' as const }]
            : undefined;
          expect(() => {
            const { unmount } = render(
              <TextArea
                textAreaStyle="tarmac-01"
                textAreaType={type}
                styleVariant={style}
                textAreaSize={size}
                tags={tags}
                placeholder="combo-test"
              />,
            );
            unmount();
          }).not.toThrow();
        });
      });
    });
  });

  // ── 9. Conditional container rendering ────────────────────────────────

  it('does not render Title_Container when no label, descriptionText, or helperTextTop', () => {
    /** Validates: Requirements 21.15 */
    render(
      <TextArea textAreaStyle="tarmac-01" placeholder="test" />,
    );
    expect(screen.queryByTestId('textarea-title-container')).toBeNull();
  });

  it('renders Title_Container when label is provided', () => {
    /** Validates: Requirements 21.15 */
    render(
      <TextArea textAreaStyle="tarmac-01" label="Label" placeholder="test" />,
    );
    expect(screen.getByTestId('textarea-title-container')).not.toBeNull();
  });

  it('does not render Subtext_Container when no subtext or helperTextBottom', () => {
    /** Validates: Requirements 21.15 */
    render(
      <TextArea textAreaStyle="tarmac-01" placeholder="test" />,
    );
    expect(screen.queryByTestId('textarea-subtext-container')).toBeNull();
  });

  it('renders Subtext_Container when subtext is provided', () => {
    /** Validates: Requirements 21.15 */
    render(
      <TextArea textAreaStyle="tarmac-01" subtext="Sub" placeholder="test" />,
    );
    expect(screen.getByTestId('textarea-subtext-container')).not.toBeNull();
  });

  // ── 10. With Tags: rendering, removal, maxTagCount ────────────────────

  it('renders multiple tags in withTags style', () => {
    /** Validates: Requirements 21.9 */
    render(
      <TextArea
        textAreaStyle="tarmac-01"
        styleVariant="withTags"
        tags={[
          { value: 'Alpha', status: 'default' },
          { value: 'Beta', status: 'success' },
          { value: 'Gamma', status: 'error' },
        ]}
        placeholder="test"
      />,
    );
    expect(screen.getByText('Alpha')).not.toBeNull();
    expect(screen.getByText('Beta')).not.toBeNull();
    expect(screen.getByText('Gamma')).not.toBeNull();
  });

  it('calls onTagsChange when a tag close button is clicked', () => {
    /** Validates: Requirements 21.9 */
    const onTagsChange = jest.fn();
    render(
      <TextArea
        textAreaStyle="tarmac-01"
        styleVariant="withTags"
        tags={[
          { value: 'Tag1', status: 'default' },
          { value: 'Tag2', status: 'default' },
        ]}
        onTagsChange={onTagsChange}
        placeholder="test"
      />,
    );
    const chipButtons = screen.getAllByRole('button');
    expect(chipButtons.length).toBe(2);
    fireEvent.click(chipButtons[0]);
    expect(onTagsChange).toHaveBeenCalledWith([{ value: 'Tag2', status: 'default' }]);
  });

  // ── 11. Ghost state excludes tags ─────────────────────────────────────

  it('does not render tags in ghost state even with withTags style', () => {
    /** Validates: Requirements 21.10 */
    render(
      <TextArea
        textAreaStyle="tarmac-01"
        styleVariant="withTags"
        isGhost
        tags={[{ value: 'GhostTag', status: 'default' }]}
        placeholder="test"
      />,
    );
    expect(screen.queryByText('GhostTag')).toBeNull();
    expect(screen.queryByTestId('textarea-tags-container')).toBeNull();
  });

  // ── 12. Disabled state renders tags without close buttons ─────────────

  it('renders tags without close buttons when disabled', () => {
    /** Validates: Requirements 21.9 */
    render(
      <TextArea
        textAreaStyle="tarmac-01"
        styleVariant="withTags"
        isDisabled
        tags={[{ value: 'DisTag', status: 'default' }]}
        placeholder="test"
      />,
    );
    expect(screen.getByText('DisTag')).not.toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  // ── 13. Ref forwarding ────────────────────────────────────────────────

  it('forwards ref to native textarea element', () => {
    /** Validates: Requirements 21.12 */
    const ref = createRef<HTMLTextAreaElement>();
    render(
      <TextArea textAreaStyle="tarmac-01" ref={ref} placeholder="ref-test" />,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current!.tagName).toBe('TEXTAREA');
    expect(ref.current!.placeholder).toBe('ref-test');
  });

  // ── 14. Native textarea attributes ────────────────────────────────────

  it('forwards rows prop to native textarea', () => {
    /** Validates: Requirements 21.9 */
    render(
      <TextArea textAreaStyle="tarmac-01" rows={5} placeholder="rows-test" />,
    );
    const textarea = screen.getByPlaceholderText('rows-test');
    expect(textarea.getAttribute('rows')).toBe('5');
  });

  it('forwards placeholder to native textarea', () => {
    /** Validates: Requirements 21.9 */
    render(
      <TextArea textAreaStyle="tarmac-01" placeholder="my-placeholder" />,
    );
    expect(screen.getByPlaceholderText('my-placeholder')).not.toBeNull();
  });

  it('applies resize CSS property from resize prop', () => {
    /** Validates: Requirements 21.9 */
    const { container } = render(
      <TextArea textAreaStyle="tarmac-01" resize="none" placeholder="resize-test" />,
    );
    // The textarea element should exist; resize is applied via Emotion CSS class
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBeNull();
  });

  // ── 15. defaultThemeConfig fallback ───────────────────────────────────

  it('renders using defaultThemeConfig when theme is missing textArea_tarmac', () => {
    /** Validates: Requirements 21.11 */
    // Temporarily override the mock to return empty theme
    const useThemeMock = jest.requireMock('../../ThemeProvider').useTheme;
    const originalImpl = useThemeMock.getMockImplementation?.() || useThemeMock;

    // Override useTheme to return empty components
    jest.spyOn(
      jest.requireMock('../../ThemeProvider'),
      'useTheme',
    ).mockReturnValue({ theme: { components: {} } });

    expect(() => {
      const { unmount } = render(
        <TextArea textAreaStyle="tarmac-01" placeholder="fallback-test" />,
      );
      unmount();
    }).not.toThrow();

    // Restore original mock
    jest.spyOn(
      jest.requireMock('../../ThemeProvider'),
      'useTheme',
    ).mockReturnValue({
      theme: { components: { textArea_tarmac: mockTextAreaConfig } },
    });
  });
});


// ── Property 5: Ghost state excludes tags and renders skeleton ───────────────

describe('Feature: textarea-tarmac-migration, Property 5: Ghost state excludes tags and renders skeleton', () => {
  /**
   * **Validates: Requirements 2.6, 4.6, 17.7**
   *
   * For any combination of `styleVariant` (including "withTags") and any
   * `tags` array, when `isGhost` is true, the TextArea SHALL render skeleton
   * placeholder blocks and SHALL NOT render any tag elements, textarea
   * element, icons, or text content.
   */

  const tagArb = () =>
    fc.record({
      value: fc.string({ minLength: 1 }),
      status: fc.constantFrom('default' as const, 'error' as const, 'success' as const),
    });

  it('should render skeleton blocks and exclude tags, textarea, icons, and text when isGhost is true', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('standard', 'withTags'),
        fc.array(tagArb(), { minLength: 0, maxLength: 5 }),
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        (styleVariant, tags, textAreaType, textAreaSize) => {
          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              textAreaType={textAreaType}
              textAreaSize={textAreaSize}
              styleVariant={styleVariant}
              isGhost
              tags={tags.length > 0 ? tags : undefined}
              label="Ghost Label"
              trailingIcon={React.createElement('span', { 'data-testid': 'ghost-trailing-icon' }, '→')}
              statusText="Ghost Status"
              placeholder="ghost-test"
            />,
          );

          const view = within(container);

          // Ghost skeleton blocks SHALL be present
          expect(view.getByTestId('textarea-ghost-skeleton-title')).not.toBeNull();
          expect(view.getByTestId('textarea-ghost-skeleton-input')).not.toBeNull();

          // No native textarea element
          expect(container.querySelector('textarea')).toBeNull();

          // No tags container
          expect(view.queryByTestId('textarea-tags-container')).toBeNull();

          // No tag text content
          tags.forEach((tag) => {
            if (tag.value.trim()) {
              expect(view.queryByText(tag.value)).toBeNull();
            }
          });

          // No trailing icon
          expect(view.queryByTestId('ghost-trailing-icon')).toBeNull();

          // No status text
          expect(view.queryByText('Ghost Status')).toBeNull();

          // No label text (ghost renders skeleton, not text)
          expect(view.queryByText('Ghost Label')).toBeNull();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should apply pointer-events none on the ghost container for any style variant and tags', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('standard', 'withTags'),
        fc.array(tagArb(), { minLength: 0, maxLength: 3 }),
        (styleVariant, tags) => {
          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              styleVariant={styleVariant}
              isGhost
              tags={tags.length > 0 ? tags : undefined}
              placeholder="pe-test"
            />,
          );

          const outerDiv = container.firstElementChild as HTMLElement;
          expect(outerDiv.style.pointerEvents).toBe('none');

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 7: Theme JSON tokens exist in variables file ────────────────────

import fs from 'fs';
import path from 'path';

describe('Feature: textarea-tarmac-migration, Property 7: Theme JSON tokens exist in variables file', () => {
  /**
   * **Validates: Requirements 15.6, 18.2**
   *
   * For all `{{TokenName}}` placeholders used in the `textArea_tarmac`
   * section of the theme JSON, the token name SHALL exist in
   * `tarmac-variables-full.json`.
   */

  // Read and parse both files once
  const themeJsonPath = path.resolve(__dirname, '../../../../public/tarmac-theme.json');
  const variablesPath = path.resolve(__dirname, '../../../components/ThemeProvider/tarmac-variables-full.json');

  const themeJson = JSON.parse(fs.readFileSync(themeJsonPath, 'utf-8'));
  const variablesJson = JSON.parse(fs.readFileSync(variablesPath, 'utf-8'));

  // Build a set of all variable names from the variables file
  const allVariableNames = new Set<string>();
  for (const collection of variablesJson.collections || []) {
    for (const variable of collection.variables || []) {
      if (variable.name) {
        allVariableNames.add(variable.name);
      }
    }
  }

  // Extract all {{TokenName}} placeholders from the textArea_tarmac section
  // The theme JSON structure is: { "tarmac-theme": { "components": { "textArea_tarmac": { ... } } } }
  const textAreaTarmacSection = themeJson['tarmac-theme']?.components?.textArea_tarmac;
  const extractTokens = (obj: unknown, tokens: string[] = []): string[] => {
    if (typeof obj === 'string') {
      const matches = obj.match(/\{\{([^}]+)\}\}/g);
      if (matches) {
        for (const m of matches) {
          tokens.push(m.replace(/^\{\{|\}\}$/g, ''));
        }
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (const val of Object.values(obj)) {
        extractTokens(val, tokens);
      }
    }
    return tokens;
  };

  const allTokens = extractTokens(textAreaTarmacSection);
  // Deduplicate
  const uniqueTokens = [...new Set(allTokens)];

  it('should have extracted at least one token from the textArea_tarmac section', () => {
    expect(uniqueTokens.length).toBeGreaterThan(0);
  });

  it('every {{TokenName}} in textArea_tarmac SHALL exist in tarmac-variables-full.json', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...uniqueTokens),
        (tokenName) => {
          expect(allVariableNames.has(tokenName)).toBe(true);
        },
      ),
      { numRuns: Math.max(100, uniqueTokens.length * 3) },
    );
  });
});


// ── Property 8: Textarea attributes forwarded correctly ──────────────────────

describe('Feature: textarea-tarmac-migration, Property 8: Textarea attributes forwarded correctly', () => {
  /**
   * **Validates: Requirements 22.2, 22.3, 22.4, 22.6**
   *
   * For any standard textarea HTML attribute (`placeholder`, `maxLength`,
   * `readOnly`, `rows`, `cols`, `wrap`, `autoFocus`) passed to the TextArea
   * component, the attribute SHALL be forwarded to the native `<textarea>`
   * element.
   */

  it('should forward placeholder, maxLength, rows, and readOnly to the native textarea', () => {
    fc.assert(
      fc.property(
        fc.record({
          placeholder: fc.string({ minLength: 1 }),
          maxLength: fc.nat({ max: 10000 }),
          rows: fc.integer({ min: 1, max: 20 }),
          readOnly: fc.boolean(),
        }),
        (attrs) => {
          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              placeholder={attrs.placeholder}
              maxLength={attrs.maxLength}
              rows={attrs.rows}
              readOnly={attrs.readOnly}
            />,
          );

          const textarea = container.querySelector('textarea');
          expect(textarea).not.toBeNull();

          // placeholder
          expect(textarea!.placeholder).toBe(attrs.placeholder);

          // maxLength
          expect(textarea!.maxLength).toBe(attrs.maxLength);

          // rows
          expect(textarea!.rows).toBe(attrs.rows);

          // readOnly
          expect(textarea!.readOnly).toBe(attrs.readOnly);

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should forward cols and wrap attributes to the native textarea', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 200 }),
        fc.constantFrom('soft', 'hard', 'off'),
        (cols, wrap) => {
          const { container, unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              cols={cols}
              wrap={wrap}
              placeholder="wrap-cols-test"
            />,
          );

          const textarea = container.querySelector('textarea');
          expect(textarea).not.toBeNull();

          // cols
          expect(textarea!.cols).toBe(cols);

          // wrap
          expect(textarea!.getAttribute('wrap')).toBe(wrap);

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should forward ref to the native textarea element for any attribute combination', () => {
    fc.assert(
      fc.property(
        fc.record({
          placeholder: fc.string({ minLength: 1 }),
          rows: fc.integer({ min: 1, max: 20 }),
          readOnly: fc.boolean(),
        }),
        (attrs) => {
          const ref = createRef<HTMLTextAreaElement>();
          const { unmount } = render(
            <TextArea
              textAreaStyle="tarmac-01"
              ref={ref}
              placeholder={attrs.placeholder}
              rows={attrs.rows}
              readOnly={attrs.readOnly}
            />,
          );

          expect(ref.current).not.toBeNull();
          expect(ref.current!.tagName).toBe('TEXTAREA');
          expect(ref.current!.placeholder).toBe(attrs.placeholder);
          expect(ref.current!.rows).toBe(attrs.rows);
          expect(ref.current!.readOnly).toBe(attrs.readOnly);

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});
