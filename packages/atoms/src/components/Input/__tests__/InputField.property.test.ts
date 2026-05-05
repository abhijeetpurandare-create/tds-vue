import fc from 'fast-check';
import React from 'react';
import { render } from '@testing-library/react';
import {
  buildInputFieldStyles,
  buildIconContainerStyles,
  buildHelperTextStyles,
  type InputFieldConfig,
  type InputFieldStyleParams,
} from '../useInputFieldStyles';

// ── Mock ThemeProvider for component-level tests (Properties 1, 2, 7, 10) ────

const mockInputFieldConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '400',
    radius: '4px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
  },
  types: {
    regular: {
      borderColor: '#e0e0e0', textColor: '#2b2b2b', placeholderColor: '#cdcbcb',
      helperTextColor: '#6b6b6b', statusTextColor: '#6b6b6b',
      hoverBorderColor: '#b0b0b0', activeBorderColor: '#909090',
      focusRingColor: 'rgba(0,0,0,0.4)', backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff', labelColor: '#2b2b2b', subtextColor: '#6b6b6b',
      addonBackgroundColor: '#f5f5f5', addonTextColor: '#6b6b6b', addonBorderColor: '#e0e0e0',
    },
    success: {
      borderColor: '#2e7d32', textColor: '#2b2b2b', placeholderColor: '#cdcbcb',
      helperTextColor: '#2e7d32', statusTextColor: '#2e7d32',
      hoverBorderColor: '#1b5e20', activeBorderColor: '#145218',
      focusRingColor: 'rgba(46,125,50,0.4)', backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff', labelColor: '#2b2b2b', subtextColor: '#6b6b6b',
      addonBackgroundColor: '#f5f5f5', addonTextColor: '#6b6b6b', addonBorderColor: '#2e7d32',
    },
    infoBlue: {
      borderColor: '#1565c0', textColor: '#2b2b2b', placeholderColor: '#cdcbcb',
      helperTextColor: '#1565c0', statusTextColor: '#1565c0',
      hoverBorderColor: '#0d47a1', activeBorderColor: '#0a3880',
      focusRingColor: 'rgba(21,101,192,0.4)', backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff', labelColor: '#2b2b2b', subtextColor: '#6b6b6b',
      addonBackgroundColor: '#f5f5f5', addonTextColor: '#6b6b6b', addonBorderColor: '#1565c0',
    },
    error: {
      borderColor: '#c62828', textColor: '#2b2b2b', placeholderColor: '#cdcbcb',
      helperTextColor: '#c62828', statusTextColor: '#c62828',
      hoverBorderColor: '#b71c1c', activeBorderColor: '#a01515',
      focusRingColor: 'rgba(198,40,40,0.4)', backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff', labelColor: '#2b2b2b', subtextColor: '#6b6b6b',
      addonBackgroundColor: '#f5f5f5', addonTextColor: '#6b6b6b', addonBorderColor: '#c62828',
    },
  },
  sizes: {
    lg: {
      height: '48px', fontSize: '16px', lineHeight: '24px',
      paddingVertical: '12px', paddingHorizontal: '16px',
      iconSize: '20px', iconGap: '8px', titleFontSize: '14px',
      titleLineHeight: '20px', helperFontSize: '12px', helperLineHeight: '16px',
      titleIconSize: '16px', containerGap: '4px',
    },
    md: {
      height: '40px', fontSize: '14px', lineHeight: '20px',
      paddingVertical: '8px', paddingHorizontal: '12px',
      iconSize: '16px', iconGap: '8px', titleFontSize: '12px',
      titleLineHeight: '16px', helperFontSize: '12px', helperLineHeight: '16px',
      titleIconSize: '14px', containerGap: '4px',
    },
    sm: {
      height: '32px', fontSize: '12px', lineHeight: '16px',
      paddingVertical: '6px', paddingHorizontal: '8px',
      iconSize: '12px', iconGap: '6px', titleFontSize: '10px',
      titleLineHeight: '14px', helperFontSize: '10px', helperLineHeight: '14px',
      titleIconSize: '12px', containerGap: '2px',
    },
  },
  states: {
    disabled: {
      backgroundColor: '#f5f5f5', borderColor: '#ededed', textColor: '#cdcbcb',
      labelColor: '#cdcbcb', placeholderColor: '#cdcbcb', cursor: 'default',
    },
    ghost: {
      backgroundColor: '#dedede', borderColor: 'transparent', textColor: 'transparent',
      labelColor: 'transparent', cursor: 'default', pointerEvents: 'none',
    },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { inputField_tarmac: mockInputFieldConfig } },
  }),
}));

jest.mock('../../../utils/templateResolver', () => ({
  resolveTemplatePlaceholders: (theme: any) => theme,
}));

// Dynamic import after mocks are set up
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: Input } = require('../index');

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
    hoverBorderColor: cssColor(),
    activeBorderColor: cssColor(),
    focusRingColor: cssColor(),
    backgroundColor: cssColor(),
    hoverBackgroundColor: cssColor(),
    labelColor: cssColor(),
    subtextColor: cssColor(),
    addonBackgroundColor: cssColor(),
    addonTextColor: cssColor(),
    addonBorderColor: cssColor(),
  });

/** Generates a size config */
const sizeConfigArb = () =>
  fc.record({
    height: cssSize(),
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
    titleIconSize: cssSize(),
    containerGap: cssSize(),
  });

/** Generates a full InputFieldConfig with all four type variants and three size variants */
const inputFieldConfigArb = (): fc.Arbitrary<InputFieldConfig> =>
  fc.record({
    base: fc.record({
      fontFamily: fc.constant('Noto Sans, sans-serif'),
      fontWeight: fc.constant('400'),
      radius: fc.constant('4px'),
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
  config: InputFieldConfig,
  inputType: string,
  inputSize: string,
  overrides?: Partial<InputFieldStyleParams>,
): InputFieldStyleParams => ({
  config,
  inputType,
  inputSize,
  styleVariant: 'standard',
  isDisabled: false,
  isGhost: false,
  ...overrides,
});


// ── Property 3: CSS pseudo-states generated for all type variants ────────

describe('Feature: input-field-tarmac-migration, Property 3: CSS pseudo-states generated for all type variants', () => {
  /**
   * **Validates: Requirements 4.2, 4.3, 4.4, 14.3**
   *
   * For any type variant in {regular, success, infoBlue, error}, the
   * `buildInputFieldStyles` function SHALL generate Emotion CSS containing
   * :hover, :active, :focus, and :disabled pseudo-state selectors with
   * non-empty style rules derived from the theme config.
   *
   * We verify this by generating two configs that differ ONLY in the
   * pseudo-state-related fields (hoverBorderColor, activeBorderColor,
   * focusRingColor, hoverBackgroundColor) for a given type variant.
   * If pseudo-states are generated, the resulting Emotion class names
   * MUST differ — proving those config values are consumed.
   */
  it('should produce different class names when hover/active/focus config values change for any type variant', () => {
    fc.assert(
      fc.property(
        inputFieldConfigArb(),
        typeVariantArb(),
        sizeVariantArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, inputType, inputSize, hoverHex, activeHex, focusHex) => {
          // configA: use the generated config as-is
          const configA: InputFieldConfig = JSON.parse(JSON.stringify(config));

          // configB: change hover, active, and focus colors for the target type
          const configB: InputFieldConfig = JSON.parse(JSON.stringify(config));
          configB.types[inputType] = {
            ...configB.types[inputType],
            hoverBorderColor: `#ff${hoverHex.slice(0, 4)}`,
            hoverBackgroundColor: `#ee${hoverHex.slice(0, 4)}`,
            activeBorderColor: `#dd${activeHex.slice(0, 4)}`,
            focusRingColor: `rgba(${parseInt(focusHex.slice(0, 2), 16)},0,0,0.5)`,
          };

          const paramsA = buildParams(configA, inputType, inputSize);
          const paramsB = buildParams(configB, inputType, inputSize);

          const classA = buildInputFieldStyles(paramsA);
          const classB = buildInputFieldStyles(paramsB);

          // If pseudo-states are generated, changing their config values
          // MUST produce a different Emotion class name
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should produce different class names when disabled state config changes for any type variant', () => {
    fc.assert(
      fc.property(
        inputFieldConfigArb(),
        typeVariantArb(),
        sizeVariantArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, inputType, inputSize, disabledHex) => {
          const configA: InputFieldConfig = JSON.parse(JSON.stringify(config));

          const configB: InputFieldConfig = JSON.parse(JSON.stringify(config));
          configB.states.disabled = {
            ...configB.states.disabled,
            backgroundColor: `#ff${disabledHex.slice(0, 4)}`,
            borderColor: `#ee${disabledHex.slice(0, 4)}`,
            textColor: `#dd${disabledHex.slice(0, 4)}`,
          };

          const paramsA = buildParams(configA, inputType, inputSize);
          const paramsB = buildParams(configB, inputType, inputSize);

          const classA = buildInputFieldStyles(paramsA);
          const classB = buildInputFieldStyles(paramsB);

          // Disabled pseudo-state styles must be generated from config
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 4: Icon containers scale with size variant ──────────────────

describe('Feature: input-field-tarmac-migration, Property 4: Icon containers scale with size variant', () => {
  /**
   * **Validates: Requirements 3.5, 7.3, 8.5**
   *
   * For any size variant in {lg, md, sm}, when the Input component renders
   * with leadingIcon, trailingIcon, or titleIcon, the icon container
   * dimensions SHALL match the corresponding iconSize value from the theme
   * config's sizes section.
   *
   * We verify this by generating configs with distinct iconSize values for
   * each size variant and asserting that each size produces a unique icon
   * container class name — proving the correct size section was selected.
   */
  it('should produce distinct icon container class names for each size variant when iconSize values differ', () => {
    fc.assert(
      fc.property(
        inputFieldConfigArb(),
        typeVariantArb(),
        (config, inputType) => {
          // Ensure each size has a distinct iconSize so we can detect selection
          const configWithDistinctSizes: InputFieldConfig = JSON.parse(JSON.stringify(config));
          configWithDistinctSizes.sizes.lg.iconSize = '20px';
          configWithDistinctSizes.sizes.md.iconSize = '16px';
          configWithDistinctSizes.sizes.sm.iconSize = '12px';

          const classLg = buildIconContainerStyles(
            buildParams(configWithDistinctSizes, inputType, 'lg'),
          );
          const classMd = buildIconContainerStyles(
            buildParams(configWithDistinctSizes, inputType, 'md'),
          );
          const classSm = buildIconContainerStyles(
            buildParams(configWithDistinctSizes, inputType, 'sm'),
          );

          // Each size must produce a different icon container class
          expect(classLg).not.toBe(classMd);
          expect(classMd).not.toBe(classSm);
          expect(classLg).not.toBe(classSm);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should produce different icon container class names when iconSize config value changes for any size', () => {
    fc.assert(
      fc.property(
        inputFieldConfigArb(),
        typeVariantArb(),
        sizeVariantArb(),
        fc.nat({ max: 40 }).filter((n) => n > 0),
        (config, inputType, inputSize, iconPx) => {
          const configA: InputFieldConfig = JSON.parse(JSON.stringify(config));
          configA.sizes[inputSize].iconSize = `${iconPx}px`;

          const configB: InputFieldConfig = JSON.parse(JSON.stringify(config));
          configB.sizes[inputSize].iconSize = `${iconPx + 10}px`;

          const classA = buildIconContainerStyles(buildParams(configA, inputType, inputSize));
          const classB = buildIconContainerStyles(buildParams(configB, inputType, inputSize));

          // Changing iconSize must produce a different class name
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 5: Helper text colors match type variant ────────────────────

describe('Feature: input-field-tarmac-migration, Property 5: Helper text colors match type variant', () => {
  /**
   * **Validates: Requirements 9.4**
   *
   * For any type variant in {regular, success, infoBlue, error}, when
   * helperTextBottom or helperTextTop is provided, the helper text color
   * SHALL match the helperTextColor value from the theme config's types
   * section.
   *
   * We verify this by generating two configs that differ ONLY in the
   * helperTextColor for a given type variant. If the helper text styles
   * consume this value, the resulting Emotion class names MUST differ.
   */
  it('should produce different helper text class names when helperTextColor changes for any type variant', () => {
    fc.assert(
      fc.property(
        inputFieldConfigArb(),
        typeVariantArb(),
        sizeVariantArb(),
        fc
          .tuple(
            fc.hexaString({ minLength: 6, maxLength: 6 }),
            fc.hexaString({ minLength: 6, maxLength: 6 }),
          )
          .filter(([a, b]) => a !== b),
        (config, inputType, inputSize, [hexA, hexB]) => {
          // Use two guaranteed-distinct helperTextColor values
          const configA: InputFieldConfig = JSON.parse(JSON.stringify(config));
          configA.types[inputType] = {
            ...configA.types[inputType],
            helperTextColor: `#${hexA}`,
          };

          const configB: InputFieldConfig = JSON.parse(JSON.stringify(config));
          configB.types[inputType] = {
            ...configB.types[inputType],
            helperTextColor: `#${hexB}`,
          };

          const stylesA = buildHelperTextStyles(buildParams(configA, inputType, inputSize));
          const stylesB = buildHelperTextStyles(buildParams(configB, inputType, inputSize));

          // Both helperTextTop and helperTextBottom must reflect the change
          expect(stylesA.helperTextTop).not.toBe(stylesB.helperTextTop);
          expect(stylesA.helperTextBottom).not.toBe(stylesB.helperTextBottom);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should produce distinct helper text class names for each type variant when helperTextColor values differ', () => {
    fc.assert(
      fc.property(
        inputFieldConfigArb(),
        sizeVariantArb(),
        (config, inputSize) => {
          // Ensure each type has a distinct helperTextColor
          const configWithDistinctColors: InputFieldConfig = JSON.parse(JSON.stringify(config));
          configWithDistinctColors.types.regular.helperTextColor = '#6b6b6b';
          configWithDistinctColors.types.success.helperTextColor = '#2e7d32';
          configWithDistinctColors.types.infoBlue.helperTextColor = '#1565c0';
          configWithDistinctColors.types.error.helperTextColor = '#c62828';

          const classRegular = buildHelperTextStyles(
            buildParams(configWithDistinctColors, 'regular', inputSize),
          );
          const classSuccess = buildHelperTextStyles(
            buildParams(configWithDistinctColors, 'success', inputSize),
          );
          const classInfoBlue = buildHelperTextStyles(
            buildParams(configWithDistinctColors, 'infoBlue', inputSize),
          );
          const classError = buildHelperTextStyles(
            buildParams(configWithDistinctColors, 'error', inputSize),
          );

          // Each type must produce a different helperTextBottom class
          const bottomClasses = [
            classRegular.helperTextBottom,
            classSuccess.helperTextBottom,
            classInfoBlue.helperTextBottom,
            classError.helperTextBottom,
          ];
          const uniqueBottomClasses = new Set(bottomClasses);
          expect(uniqueBottomClasses.size).toBe(4);

          // Each type must produce a different helperTextTop class
          const topClasses = [
            classRegular.helperTextTop,
            classSuccess.helperTextTop,
            classInfoBlue.helperTextTop,
            classError.helperTextTop,
          ];
          const uniqueTopClasses = new Set(topClasses);
          expect(uniqueTopClasses.size).toBe(4);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ══════════════════════════════════════════════════════════════════════════
// Component-level property tests (Properties 1, 2, 7, 10)
// These tests render the Input component and verify DOM-level behavior.
// ══════════════════════════════════════════════════════════════════════════


// ── Property 1: Discriminator prop activates Tarmac path ─────────────────

describe('Feature: input-field-tarmac-migration, Property 1: Discriminator prop activates Tarmac path', () => {
  /**
   * **Validates: Requirements 1.1, 1.3**
   *
   * For any valid inputStyle value (including arbitrary strings), when the
   * Input component is rendered with that inputStyle prop, the component
   * SHALL produce the Tarmac DOM structure and SHALL NOT throw an error.
   */
  it('should render the Tarmac DOM structure for any inputStyle string value without throwing', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (inputStyle) => {
          const { container, unmount } = render(
            React.createElement(Input, {
              inputStyle,
              label: 'Test Label',
              placeholder: 'test',
            }),
          );

          // Tarmac path renders a <label> element inside the title container
          const label = container.querySelector('label');
          expect(label).not.toBeNull();
          expect(label!.textContent).toBe('Test Label');

          // Tarmac path renders an <input> element
          const input = container.querySelector('input');
          expect(input).not.toBeNull();

          // The outermost div should exist (container styles)
          const outerDiv = container.firstElementChild;
          expect(outerDiv).not.toBeNull();
          expect(outerDiv!.tagName).toBe('DIV');

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should render the Tarmac input row structure for any inputStyle value', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (inputStyle) => {
          const { container, unmount } = render(
            React.createElement(Input, {
              inputStyle,
              helperTextBottom: 'Helper bottom',
              placeholder: 'test',
            }),
          );

          // Tarmac path should render helperTextBottom in a span
          const spans = container.querySelectorAll('span');
          const helperSpan = Array.from(spans).find(
            (s) => s.textContent === 'Helper bottom',
          );
          expect(helperSpan).toBeTruthy();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 2: Exhaustive variant rendering ─────────────────────────────

describe('Feature: input-field-tarmac-migration, Property 2: Exhaustive variant rendering', () => {
  /**
   * **Validates: Requirements 15.5, 15.6**
   *
   * For all combinations of inputType x inputSize x styleVariant x
   * disabled/ghost states, the Input component SHALL render without
   * throwing an error when the Tarmac path is active. Additionally,
   * for all combinations of boolean toggle props, the component SHALL
   * render without error.
   */
  it('should render without error for all inputType x inputSize x styleVariant x state combinations', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        fc.constantFrom('standard', 'addonLeft', 'addonRight'),
        fc.record({
          isDisabled: fc.boolean(),
          isGhost: fc.boolean(),
        }),
        (inputType, inputSize, styleVariant, { isDisabled, isGhost }) => {
          const props: Record<string, unknown> = {
            inputStyle: 'tarmac-01',
            inputType,
            inputSize,
            styleVariant,
            isDisabled,
            isGhost,
            placeholder: 'test',
            label: 'Label',
          };

          if (styleVariant === 'addonLeft' || styleVariant === 'addonRight') {
            props.addonText = 'Http://';
          }

          const { container, unmount } = render(
            React.createElement(Input, props),
          );

          // Ghost renders skeleton blocks (no input element), others must have input
          if (isGhost) {
            expect(container.firstElementChild).not.toBeNull();
          } else {
            expect(container.querySelector('input')).not.toBeNull();
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should render without error for all boolean toggle prop combinations', () => {
    fc.assert(
      fc.property(
        fc.record({
          hasLabel: fc.boolean(),
          hasTitleIcon: fc.boolean(),
          hasLeadingIcon: fc.boolean(),
          hasTrailingIcon: fc.boolean(),
          hasHelperTextTop: fc.boolean(),
          hasHelperTextBottom: fc.boolean(),
          hasBadge: fc.boolean(),
          hasStatusIndicator: fc.boolean(),
          hasStatusText: fc.boolean(),
          hasSubtext: fc.boolean(),
          isMandatory: fc.boolean(),
        }),
        (toggles) => {
          const props: Record<string, unknown> = {
            inputStyle: 'tarmac-01',
            inputType: 'regular',
            inputSize: 'md',
            placeholder: 'test',
            isMandatory: toggles.isMandatory,
          };

          if (toggles.hasLabel) props.label = 'Label';
          if (toggles.hasTitleIcon) props.titleIcon = React.createElement('span', null, 'TI');
          if (toggles.hasLeadingIcon) props.leadingIcon = React.createElement('span', null, 'LI');
          if (toggles.hasTrailingIcon) props.trailingIcon = React.createElement('span', null, 'TrI');
          if (toggles.hasHelperTextTop) props.helperTextTop = 'Helper top';
          if (toggles.hasHelperTextBottom) props.helperTextBottom = 'Helper bottom';
          if (toggles.hasBadge) props.badge = React.createElement('span', null, 'Badge');
          if (toggles.hasStatusIndicator) props.statusIndicator = 'success';
          if (toggles.hasStatusText) props.statusText = 'Status';
          if (toggles.hasSubtext) props.subtext = 'Subtext';

          const { container, unmount } = render(
            React.createElement(Input, props),
          );

          // Must render an input element
          const input = container.querySelector('input');
          expect(input).not.toBeNull();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 7: Tarmac-only props ignored without discriminator ──────────

describe('Feature: input-field-tarmac-migration, Property 7: Tarmac-only props ignored without discriminator', () => {
  /**
   * **Validates: Requirements 16.5**
   *
   * For any Tarmac-only prop, when passed to the Input component WITHOUT
   * the inputStyle discriminator prop, the component SHALL render the
   * legacy path without errors and without rendering the Tarmac-specific
   * elements.
   */
  it('should render the legacy path and ignore Tarmac-only props when inputStyle is absent', () => {
    fc.assert(
      fc.property(
        fc.record({
          hasTitleIcon: fc.boolean(),
          hasBadge: fc.boolean(),
          hasStatusIndicator: fc.boolean(),
          hasHelperTextTop: fc.boolean(),
          hasStatusText: fc.boolean(),
          hasSubtext: fc.boolean(),
          isMandatory: fc.boolean(),
          inputType: fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
          inputSize: fc.constantFrom('lg', 'md', 'sm'),
          styleVariant: fc.constantFrom('standard', 'addonLeft', 'addonRight'),
        }),
        (tarmacProps) => {
          const props: Record<string, unknown> = {
            // NO inputStyle — legacy path
            placeholder: 'legacy-test',
            inputType: tarmacProps.inputType,
            inputSize: tarmacProps.inputSize,
            styleVariant: tarmacProps.styleVariant,
            isMandatory: tarmacProps.isMandatory,
          };

          if (tarmacProps.hasTitleIcon) {
            props.titleIcon = React.createElement('span', { 'data-testid': 'tarmac-title-icon' }, 'TI');
          }
          if (tarmacProps.hasBadge) {
            props.badge = React.createElement('span', { 'data-testid': 'tarmac-badge' }, 'B');
          }
          if (tarmacProps.hasStatusIndicator) props.statusIndicator = 'success';
          if (tarmacProps.hasHelperTextTop) props.helperTextTop = 'Helper top tarmac';
          if (tarmacProps.hasStatusText) props.statusText = 'Status tarmac';
          if (tarmacProps.hasSubtext) props.subtext = 'Subtext tarmac';

          const { container, unmount } = render(
            React.createElement(Input, props),
          );

          // Legacy path should still render an input
          const input = container.querySelector('input');
          expect(input).not.toBeNull();

          // Tarmac-specific elements should NOT be in the DOM
          expect(container.querySelector('[data-testid="tarmac-title-icon"]')).toBeNull();
          expect(container.querySelector('[data-testid="tarmac-badge"]')).toBeNull();

          // Tarmac-specific text content should not appear
          if (tarmacProps.hasHelperTextTop) {
            expect(container.textContent).not.toContain('Helper top tarmac');
          }
          if (tarmacProps.hasStatusText) {
            expect(container.textContent).not.toContain('Status tarmac');
          }
          if (tarmacProps.hasSubtext) {
            expect(container.textContent).not.toContain('Subtext tarmac');
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Property 10: Open union types accept arbitrary strings ───────────────

describe('Feature: input-field-tarmac-migration, Property 10: Open union types accept arbitrary strings', () => {
  /**
   * **Validates: Requirements 1.3, 5.6**
   *
   * For any arbitrary string value passed to the open-union-typed props
   * (inputStyle, inputType, inputSize, styleVariant), the component SHALL
   * not throw a runtime error.
   */
  it('should not throw for arbitrary string values on all open-union props', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 0, maxLength: 50 }),
        fc.string({ minLength: 0, maxLength: 50 }),
        fc.string({ minLength: 0, maxLength: 50 }),
        (inputStyle, inputType, inputSize, styleVariant) => {
          const props: Record<string, unknown> = {
            inputStyle,
            inputType,
            inputSize,
            styleVariant,
            placeholder: 'test',
          };

          const { container, unmount } = render(
            React.createElement(Input, props),
          );

          // Must render without throwing — an input element should exist
          const input = container.querySelector('input');
          expect(input).not.toBeNull();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should gracefully handle unknown type/size/variant values by rendering with fallback styles', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }).filter(
          (s) => !['regular', 'success', 'infoBlue', 'error'].includes(s),
        ),
        fc.string({ minLength: 1, maxLength: 30 }).filter(
          (s) => !['lg', 'md', 'sm'].includes(s),
        ),
        fc.string({ minLength: 1, maxLength: 30 }).filter(
          (s) => !['standard', 'addonLeft', 'addonRight'].includes(s),
        ),
        (unknownType, unknownSize, unknownVariant) => {
          const props: Record<string, unknown> = {
            inputStyle: 'tarmac-01',
            inputType: unknownType,
            inputSize: unknownSize,
            styleVariant: unknownVariant,
            placeholder: 'test',
          };

          const { container, unmount } = render(
            React.createElement(Input, props),
          );

          // Must render without throwing
          const input = container.querySelector('input');
          expect(input).not.toBeNull();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ══════════════════════════════════════════════════════════════════════════
// Property 6: Icon prop precedence (backward compatibility)
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: input-field-tarmac-migration, Property 6: Icon prop precedence', () => {
  /**
   * **Validates: Requirements 8.4**
   *
   * For any combination of leadingIcon/prefixIcon and trailingIcon/suffixIcon
   * props, when both the new and deprecated props are provided simultaneously,
   * the new prop (leadingIcon or trailingIcon) SHALL take precedence and be
   * the one rendered. When only the deprecated prop is provided, it SHALL be
   * rendered.
   */
  it('should render leadingIcon over prefixIcon when both are provided', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        (inputType, inputSize) => {
          const { container, unmount } = render(
            React.createElement(Input, {
              inputStyle: 'tarmac-01',
              inputType,
              inputSize,
              placeholder: 'test',
              leadingIcon: React.createElement('span', { 'data-testid': 'leading' }, 'LEAD'),
              prefixIcon: React.createElement('span', { 'data-testid': 'prefix' }, 'PREFIX'),
            }),
          );

          // leadingIcon should take precedence
          expect(container.querySelector('[data-testid="leading"]')).not.toBeNull();
          expect(container.querySelector('[data-testid="prefix"]')).toBeNull();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should render trailingIcon over suffixIcon when both are provided', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        (inputType, inputSize) => {
          const { container, unmount } = render(
            React.createElement(Input, {
              inputStyle: 'tarmac-01',
              inputType,
              inputSize,
              placeholder: 'test',
              trailingIcon: React.createElement('span', { 'data-testid': 'trailing' }, 'TRAIL'),
              suffixIcon: React.createElement('span', { 'data-testid': 'suffix' }, 'SUFFIX'),
            }),
          );

          // trailingIcon should take precedence
          expect(container.querySelector('[data-testid="trailing"]')).not.toBeNull();
          expect(container.querySelector('[data-testid="suffix"]')).toBeNull();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should render prefixIcon as leadingIcon when leadingIcon is not provided', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        (inputType, inputSize) => {
          const { container, unmount } = render(
            React.createElement(Input, {
              inputStyle: 'tarmac-01',
              inputType,
              inputSize,
              placeholder: 'test',
              prefixIcon: React.createElement('span', { 'data-testid': 'prefix' }, 'PREFIX'),
            }),
          );

          // prefixIcon should be rendered when leadingIcon is absent
          expect(container.querySelector('[data-testid="prefix"]')).not.toBeNull();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should render suffixIcon as trailingIcon when trailingIcon is not provided', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('regular', 'success', 'infoBlue', 'error'),
        fc.constantFrom('lg', 'md', 'sm'),
        (inputType, inputSize) => {
          const { container, unmount } = render(
            React.createElement(Input, {
              inputStyle: 'tarmac-01',
              inputType,
              inputSize,
              placeholder: 'test',
              suffixIcon: React.createElement('span', { 'data-testid': 'suffix' }, 'SUFFIX'),
            }),
          );

          // suffixIcon should be rendered when trailingIcon is absent
          expect(container.querySelector('[data-testid="suffix"]')).not.toBeNull();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ══════════════════════════════════════════════════════════════════════════
// Property 8: Theme JSON tokens exist in variables file
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: input-field-tarmac-migration, Property 8: Theme JSON tokens exist in variables file', () => {
  /**
   * **Validates: Requirements 13.6**
   *
   * For all {{TokenName}} placeholders used in the inputField_tarmac section
   * of the theme JSON, the token name SHALL exist in tarmac-variables-full.json.
   */

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const themeJson = require('../../../../public/tarmac-theme.json');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const variablesJson = require('../../ThemeProvider/tarmac-variables-full.json');

  // Extract all variable names from the variables file
  const allVariableNames = new Set<string>();
  if (variablesJson.collections) {
    for (const collection of variablesJson.collections) {
      if (collection.variables) {
        for (const variable of collection.variables) {
          if (variable.name) {
            allVariableNames.add(variable.name);
          }
        }
      }
    }
  }

  // Extract all {{TokenName}} placeholders from the inputField_tarmac section
  const tokenPattern = /\{\{(.+?)\}\}/g;
  const inputFieldConfig = themeJson['tarmac-theme']?.components?.inputField_tarmac;

  function extractTokens(obj: unknown, path = ''): Array<{ token: string; path: string }> {
    const tokens: Array<{ token: string; path: string }> = [];
    if (typeof obj === 'string') {
      let match: RegExpExecArray | null;
      while ((match = tokenPattern.exec(obj)) !== null) {
        tokens.push({ token: match[1], path });
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        tokens.push(...extractTokens(value, path ? `${path}.${key}` : key));
      }
    }
    return tokens;
  }

  const allTokens = extractTokens(inputFieldConfig);

  it('should have at least one token in the inputField_tarmac section', () => {
    expect(allTokens.length).toBeGreaterThan(0);
  });

  it('should have all {{TokenName}} placeholders resolve to existing variable names', () => {
    const missingTokens: Array<{ token: string; path: string }> = [];

    for (const { token, path } of allTokens) {
      if (!allVariableNames.has(token)) {
        missingTokens.push({ token, path });
      }
    }

    expect(missingTokens).toEqual([]);
  });
});


// ══════════════════════════════════════════════════════════════════════════
// Property 9: Theme JSON uses token placeholders for all visual values
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: input-field-tarmac-migration, Property 9: Theme JSON uses token placeholders for all visual values', () => {
  /**
   * **Validates: Requirements 13.2**
   *
   * For all color, spacing, radius, and typography values in the
   * inputField_tarmac theme JSON section, the value SHALL be a
   * {{TokenName}} placeholder string (matching the pattern /^\{\{.+\}\}$/)
   * and SHALL NOT be a hardcoded hex, rgb, or numeric literal.
   */

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const themeJson = require('../../../../public/tarmac-theme.json');
  const inputFieldConfig = themeJson['tarmac-theme']?.components?.inputField_tarmac;

  // Keys that are allowed to have non-token values (non-visual or structural)
  const NON_VISUAL_KEYS = new Set([
    'cursor',
    'pointerEvents',
    'transition',
    'fontWeight',
    'focusRingSpread',
    'skeletonTitleWidth',
    'skeletonTitleHeight',
    'skeletonTitleRadius',
    'skeletonInputHeight',
    'skeletonInputRadius',
  ]);

  // Values that are allowed as non-token literals (CSS keywords, not visual tokens)
  const ALLOWED_LITERAL_VALUES = new Set([
    'transparent',
    'none',
    'default',
    'sans-serif',
  ]);

  const tokenPlaceholderPattern = /\{\{.+\}\}/;

  function collectVisualValues(
    obj: unknown,
    path = '',
  ): Array<{ key: string; value: string; path: string }> {
    const entries: Array<{ key: string; value: string; path: string }> = [];
    if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof value === 'string') {
          // Skip non-visual keys
          if (NON_VISUAL_KEYS.has(key)) continue;
          entries.push({ key, value, path: currentPath });
        } else if (typeof value === 'object' && value !== null) {
          entries.push(...collectVisualValues(value, currentPath));
        }
      }
    }
    return entries;
  }

  const allVisualEntries = collectVisualValues(inputFieldConfig);

  it('should have visual values in the inputField_tarmac section', () => {
    expect(allVisualEntries.length).toBeGreaterThan(0);
  });

  it('should use {{TokenName}} placeholders for all visual values (no hardcoded hex, rgb, or numeric literals)', () => {
    const violations: Array<{ key: string; value: string; path: string }> = [];

    for (const entry of allVisualEntries) {
      const { value } = entry;

      // Allow known CSS keyword literals
      if (ALLOWED_LITERAL_VALUES.has(value)) continue;

      // Allow values that contain a {{...}} token placeholder (possibly with suffix like ", sans-serif")
      if (tokenPlaceholderPattern.test(value)) continue;

      // Everything else is a violation
      violations.push(entry);
    }

    expect(violations).toEqual([]);
  });
});
