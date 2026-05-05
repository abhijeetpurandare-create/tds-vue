import React from 'react';
import fc from 'fast-check';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  buildSelectionCardStyles,
  buildInfoCardStyles,
  buildCardContainerStyles,
  type CardTarmacConfig,
  type SelectionCardStyleParams,
  type InfoCardStyleParams,
  type CardStyleParams,
} from '../useCardStyles';
import SelectionCard from '../SelectionCard';
import InfoCard from '../InfoCard';
import Card from '../index';

// ── ThemeProvider mock with card_tarmac config ───────────────────────────

const mockCardTarmacConfig: CardTarmacConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    radius: '4px',
    transition: 'all 0.15s ease-in-out',
    focusRingSpread: '2px',
  },
  selectionCard: {
    types: {
      radio: { indicatorComponent: 'Radio' },
      checkbox: { indicatorComponent: 'Checkbox' },
    },
    sizes: {
      lg: {
        padding: '16px',
        gap: '12px',
        titleFontSize: '14px',
        titleLineHeight: '20px',
        subtextFontSize: '12px',
        subtextLineHeight: '16px',
        trailingIconSize: '20px',
        statusDotSize: '8px',
      },
      sm: {
        padding: '12px',
        gap: '8px',
        titleFontSize: '12px',
        titleLineHeight: '16px',
        subtextFontSize: '10px',
        subtextLineHeight: '14px',
        trailingIconSize: '16px',
        statusDotSize: '6px',
      },
    },
    states: {
      default: {
        borderColor: '#e0e0e0',
        backgroundColor: '#ffffff',
        titleColor: '#2b2b2b',
        subtextColor: '#757575',
        iconColor: '#2b2b2b',
      },
      hover: {
        borderColor: '#cccccc',
        backgroundColor: '#f5f5f5',
      },
      pressed: {
        borderColor: '#bbbbbb',
        backgroundColor: '#eeeeee',
      },
      focused: {
        focusRingColor: 'rgba(0,0,0,0.4)',
      },
      selected: {
        borderColor: '#2396fb',
        backgroundColor: '#eaf4ff',
      },
      disabled: {
        borderColor: '#ededed',
        backgroundColor: '#ffffff',
        titleColor: '#cdcbcb',
        subtextColor: '#cdcbcb',
        iconColor: '#cdcbcb',
        cursor: 'default',
      },
      ghost: {
        backgroundColor: '#f5f5f5',
        borderColor: 'transparent',
        cursor: 'default',
        pointerEvents: 'none',
        skeletonWidth: '100%',
        skeletonHeight: '48px',
        skeletonRadius: '4px',
      },
    },
  },
  infoCard: {
    styles: {
      slots: {
        slotLeadingSize: '48px',
        slotLeadingBg: '#e8f0fe',
        slotLeadingRadius: '8px',
        slotTrailingSize: '32px',
        slotTrailingBg: '#e8f0fe',
        slotTrailingRadius: '8px',
        titleFontFamily: 'Noto Sans, sans-serif',
        titleFontWeight: '600',
        titleFontSize: '24px',
        titleLineHeight: '32px',
        subtextTopFontSize: '12px',
        subtextTopLineHeight: '16px',
        subtextBottomFontSize: '12px',
        subtextBottomLineHeight: '16px',
        trailingIconSize: '20px',
        infoIconSize: '12px',
        imageAreaHeight: '0px',
        subtitleFontSize: '12px',
        subtitleLineHeight: '16px',
        bannerHeight: '0px',
        contentPadding: '12px',
        padding: '12px',
        gap: '8px',
      },
      slotTop: {
        slotLeadingSize: '0px',
        slotLeadingBg: 'transparent',
        slotLeadingRadius: '0px',
        slotTrailingSize: '0px',
        slotTrailingBg: 'transparent',
        slotTrailingRadius: '0px',
        titleFontFamily: 'Noto Sans, sans-serif',
        titleFontWeight: '500',
        titleFontSize: '14px',
        titleLineHeight: '20px',
        subtextTopFontSize: '12px',
        subtextTopLineHeight: '16px',
        subtextBottomFontSize: '12px',
        subtextBottomLineHeight: '16px',
        trailingIconSize: '20px',
        infoIconSize: '12px',
        imageAreaHeight: '120px',
        subtitleFontSize: '12px',
        subtitleLineHeight: '16px',
        bannerHeight: '0px',
        contentPadding: '12px',
        padding: '0px',
        gap: '8px',
      },
      slotBanner: {
        slotLeadingSize: '0px',
        slotLeadingBg: 'transparent',
        slotLeadingRadius: '0px',
        slotTrailingSize: '0px',
        slotTrailingBg: 'transparent',
        slotTrailingRadius: '0px',
        titleFontFamily: 'Noto Sans, sans-serif',
        titleFontWeight: '500',
        titleFontSize: '14px',
        titleLineHeight: '20px',
        subtextTopFontSize: '12px',
        subtextTopLineHeight: '16px',
        subtextBottomFontSize: '12px',
        subtextBottomLineHeight: '16px',
        trailingIconSize: '20px',
        infoIconSize: '12px',
        imageAreaHeight: '0px',
        subtitleFontSize: '12px',
        subtitleLineHeight: '16px',
        bannerHeight: '140px',
        contentPadding: '12px',
        padding: '0px',
        gap: '8px',
      },
      regular: {
        slotLeadingSize: '0px',
        slotLeadingBg: 'transparent',
        slotLeadingRadius: '0px',
        slotTrailingSize: '0px',
        slotTrailingBg: 'transparent',
        slotTrailingRadius: '0px',
        titleFontFamily: 'Noto Sans, sans-serif',
        titleFontWeight: '500',
        titleFontSize: '14px',
        titleLineHeight: '20px',
        subtextTopFontSize: '12px',
        subtextTopLineHeight: '16px',
        subtextBottomFontSize: '12px',
        subtextBottomLineHeight: '16px',
        trailingIconSize: '20px',
        infoIconSize: '12px',
        imageAreaHeight: '0px',
        subtitleFontSize: '12px',
        subtitleLineHeight: '16px',
        bannerHeight: '0px',
        contentPadding: '12px',
        padding: '12px',
        gap: '8px',
        titleFontSize_regular: '14px',
        titleLineHeight_regular: '20px',
      },
    } as any,
    states: {
      default: {
        borderColor: '#e0e0e0',
        backgroundColor: '#ffffff',
        titleColor: '#2b2b2b',
        subtitleColor: '#757575',
        subtextColor: '#757575',
        iconColor: '#2b2b2b',
      },
      hover: {
        borderColor: '#cccccc',
        backgroundColor: '#f5f5f5',
      },
      focused: {
        focusRingColor: 'rgba(0,0,0,0.4)',
      },
      disabled: {
        borderColor: '#ededed',
        backgroundColor: '#ffffff',
        titleColor: '#cdcbcb',
        subtitleColor: '#cdcbcb',
        subtextColor: '#cdcbcb',
        iconColor: '#cdcbcb',
        cursor: 'default',
      },
      ghost: {
        backgroundColor: '#f5f5f5',
        borderColor: 'transparent',
        cursor: 'default',
        pointerEvents: 'none',
        skeletonWidth: '100%',
        skeletonHeight: '80px',
        skeletonRadius: '4px',
      },
    } as any,
  },
  card: {
    base: {
      padding: '12px',
      gap: '8px',
      borderWidth: '1px',
      borderRadius: '6px',
      width: '328px',
      headerGap: '8px',
      subitemsGap: '39px',
      subitemInnerGap: '4px',
      buttonsGap: '6px',
      iconSize: '20px',
      stepperIconSize: '20px',
      titleFontSize: '14px',
      titleLineHeight: '20px',
      titleFontWeight: '500',
      captionFontSize: '12px',
      captionLineHeight: '16px',
    },
    variants: {
      standard: {},
      standardType2: {},
      slotBanner: { bannerHeight: '120px' },
      standardPills: {},
      standardIconButtons: {},
      infoSets: {
        infoSetGap: '16px',
        labelFontSize: '12px',
        labelLineHeight: '16px',
        valueFontSize: '16px',
        valueLineHeight: '24px',
        valueFontWeight: '600',
      },
      badgeBottom: {},
      buttonsTacked: {},
    },
    states: {
      default: {
        borderColor: '#e0e0e0',
        backgroundColor: '#ffffff',
        titleColor: '#2b2b2b',
        subtextColor: '#757575',
        iconColor: '#2b2b2b',
        subitemLabelColor: '#2b2b2b',
        stepperBgColor: '#2396fb',
        stepperTextColor: '#ffffff',
        statusIndicatorColor: '#2396fb',
      },
      hover: {
        borderColor: '#cccccc',
        backgroundColor: '#f5f5f5',
      },
      focused: {
        focusRingColor: 'rgba(0,0,0,0.4)',
      },
      disabled: {
        borderColor: '#ededed',
        backgroundColor: '#ffffff',
        titleColor: '#cdcbcb',
        subtextColor: '#cdcbcb',
        iconColor: '#cdcbcb',
        subitemLabelColor: '#cdcbcb',
        stepperBgColor: '#cdcbcb',
        stepperTextColor: '#ffffff',
        statusIndicatorColor: '#cdcbcb',
        cursor: 'default',
      },
      ghost: {
        backgroundColor: '#f5f5f5',
        borderColor: 'transparent',
        cursor: 'default',
        pointerEvents: 'none',
        skeletonWidth: '100%',
        skeletonHeight: '120px',
        skeletonRadius: '4px',
      },
    },
  },
};

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { card_tarmac: mockCardTarmacConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Also mock Radio and Checkbox sub-components to avoid deep dependency issues
jest.mock('../../Radio', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="mock-radio" data-checked={props.checked} data-disabled={props.disabled} />,
}));

jest.mock('../../Checkbox', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="mock-checkbox" data-checked={props.checked} data-disabled={props.disabled} />,
}));

jest.mock('../../Chip', () => ({
  __esModule: true,
  default: (props: any) => <span data-testid="mock-chip">{props.text || props.children}</span>,
}));

jest.mock('../../Spinner', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="mock-spinner" />,
}));

// ── Arbitraries ──────────────────────────────────────────────────────────

/** Arbitrary non-empty CSS-like color string */
const cssColor = () =>
  fc.oneof(
    fc.hexaString({ minLength: 6, maxLength: 6 }).map((h) => `#${h}`),
    fc.constant('rgba(0,0,0,0.4)'),
    fc.constant('#ffffff'),
    fc.constant('#f5f5f5'),
    fc.constant('#e0e0e0'),
    fc.constant('transparent'),
  );

/** Arbitrary CSS size value */
const cssSize = () =>
  fc.oneof(
    fc.nat({ max: 48 }).map((n) => `${n}px`),
    fc.constant('12px'),
    fc.constant('16px'),
    fc.constant('20px'),
  );

/** Known Selection Card type variants */
const selectionTypeVariants = ['radio', 'checkbox'] as const;
const selectionTypeArb = () => fc.constantFrom(...selectionTypeVariants);

/** Known Selection Card size variants */
const selectionSizeVariants = ['lg', 'sm'] as const;
const selectionSizeArb = () => fc.constantFrom(...selectionSizeVariants);

/** Generates a SelectionCardSizeConfig */
const selectionSizeConfigArb = () =>
  fc.record({
    padding: cssSize(),
    gap: cssSize(),
    titleFontSize: cssSize(),
    titleLineHeight: cssSize(),
    subtextFontSize: cssSize(),
    subtextLineHeight: cssSize(),
    trailingIconSize: cssSize(),
    statusDotSize: cssSize(),
  });

/** Generates a SelectionCardStateConfig */
const selectionStateConfigArb = () =>
  fc.record({
    borderColor: cssColor(),
    backgroundColor: cssColor(),
    titleColor: cssColor(),
    subtextColor: cssColor(),
    iconColor: cssColor(),
    focusRingColor: cssColor(),
  });

/** Generates a full CardTarmacConfig with selection card configs */
const cardTarmacConfigArb = (): fc.Arbitrary<CardTarmacConfig> =>
  fc.record({
    base: fc.record({
      fontFamily: fc.constant('Noto Sans, sans-serif'),
      fontWeight: fc.constant('500'),
      radius: fc.constant('4px'),
      transition: fc.constant('all 0.15s ease-in-out'),
      focusRingSpread: fc.constant('2px'),
    }),
    selectionCard: fc.record({
      types: fc.constant({
        radio: { indicatorComponent: 'Radio' },
        checkbox: { indicatorComponent: 'Checkbox' },
      }),
      sizes: fc.record({
        lg: selectionSizeConfigArb(),
        sm: selectionSizeConfigArb(),
      }),
      states: fc.record({
        default: selectionStateConfigArb(),
        hover: selectionStateConfigArb(),
        pressed: selectionStateConfigArb(),
        focused: selectionStateConfigArb(),
        selected: selectionStateConfigArb(),
        disabled: fc.record({
          borderColor: cssColor(),
          backgroundColor: cssColor(),
          titleColor: cssColor(),
          subtextColor: cssColor(),
          iconColor: cssColor(),
          cursor: fc.constant('default'),
        }),
        ghost: fc.record({
          backgroundColor: cssColor(),
          borderColor: fc.constant('transparent'),
          cursor: fc.constant('default'),
          pointerEvents: fc.constant('none' as string),
          skeletonWidth: fc.constant('100%'),
          skeletonHeight: fc.constant('48px'),
          skeletonRadius: fc.constant('4px'),
        }),
      }),
    }),
    infoCard: fc.constant({
      styles: {} as any,
      states: {} as any,
    }),
    card: fc.constant({
      base: {} as any,
      variants: {} as any,
      states: {} as any,
    }),
  });

/** Helper to build default SelectionCard style params */
const buildParams = (
  config: CardTarmacConfig,
  selectionType: string,
  size: string,
  overrides?: Partial<SelectionCardStyleParams>,
): SelectionCardStyleParams => ({
  config,
  selectionType,
  size,
  selected: false,
  isDisabled: false,
  isGhost: false,
  ...overrides,
});

// ── Property 2 (Selection Card part): CSS pseudo-states generated ────────

describe('Feature: cards-tarmac-migration, Property 2 (Selection Card): CSS pseudo-states generated for all sub-components', () => {
  /**
   * **Validates: Requirements 4.2, 4.3, 4.4, 24.9**
   *
   * For any Selection Card Type variant in {radio, checkbox}, the
   * `buildSelectionCardStyles` function SHALL generate Emotion CSS
   * containing `:hover`, `:active`, `:focus` pseudo-state selectors
   * with non-empty style rules derived from the theme config.
   *
   * We verify this by generating two configs that differ ONLY in the
   * pseudo-state-related fields (hover borderColor/backgroundColor,
   * pressed borderColor/backgroundColor, focused focusRingColor) for
   * a given selection type. If pseudo-states are generated, the resulting
   * Emotion class names MUST differ — proving those config values are
   * consumed.
   */
  it('should produce different class names when hover/active/focus config values change for any selection type', () => {
    fc.assert(
      fc.property(
        cardTarmacConfigArb(),
        selectionTypeArb(),
        selectionSizeArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, selectionType, size, hoverHex, pressedHex, focusHex) => {
          // configA: use the generated config as-is
          const configA: CardTarmacConfig = JSON.parse(JSON.stringify(config));

          // configB: change hover, pressed, and focus colors
          const configB: CardTarmacConfig = JSON.parse(JSON.stringify(config));
          configB.selectionCard.states.hover = {
            ...configB.selectionCard.states.hover,
            borderColor: `#ff${hoverHex.slice(0, 4)}`,
            backgroundColor: `#ee${hoverHex.slice(0, 4)}`,
          };
          configB.selectionCard.states.pressed = {
            ...configB.selectionCard.states.pressed,
            borderColor: `#dd${pressedHex.slice(0, 4)}`,
            backgroundColor: `#cc${pressedHex.slice(0, 4)}`,
          };
          configB.selectionCard.states.focused = {
            ...configB.selectionCard.states.focused,
            focusRingColor: `rgba(${parseInt(focusHex.slice(0, 2), 16)},0,0,0.5)`,
          };

          const paramsA = buildParams(configA, selectionType, size);
          const paramsB = buildParams(configB, selectionType, size);

          const classA = buildSelectionCardStyles(paramsA);
          const classB = buildSelectionCardStyles(paramsB);

          // If pseudo-states are generated, changing their config values
          // MUST produce a different Emotion class name
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should produce different class names when disabled state config changes for any selection type', () => {
    fc.assert(
      fc.property(
        cardTarmacConfigArb(),
        selectionTypeArb(),
        selectionSizeArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, selectionType, size, disabledHex) => {
          const configA: CardTarmacConfig = JSON.parse(JSON.stringify(config));

          const configB: CardTarmacConfig = JSON.parse(JSON.stringify(config));
          configB.selectionCard.states.disabled = {
            ...configB.selectionCard.states.disabled,
            borderColor: `#ff${disabledHex.slice(0, 4)}`,
            backgroundColor: `#ee${disabledHex.slice(0, 4)}`,
            titleColor: `#dd${disabledHex.slice(0, 4)}`,
          };

          // Test with isDisabled=true so disabled overrides are applied
          const paramsA = buildParams(configA, selectionType, size, { isDisabled: true });
          const paramsB = buildParams(configB, selectionType, size, { isDisabled: true });

          const classA = buildSelectionCardStyles(paramsA);
          const classB = buildSelectionCardStyles(paramsB);

          // Disabled state styles must be generated from config
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── Info Card Arbitraries ────────────────────────────────────────────────

/** Known Info Card style variants */
const infoCardStyleVariants = ['slots', 'slotTop', 'slotBanner', 'regular'] as const;
const infoCardStyleArb = () => fc.constantFrom(...infoCardStyleVariants);

/** Generates an InfoCardStyleConfig */
const infoCardStyleConfigArb = () =>
  fc.record({
    slotLeadingSize: cssSize(),
    slotLeadingBg: cssColor(),
    slotLeadingRadius: cssSize(),
    slotTrailingSize: cssSize(),
    slotTrailingBg: cssColor(),
    slotTrailingRadius: cssSize(),
    titleFontFamily: fc.constant('Noto Sans, sans-serif'),
    titleFontWeight: fc.constant('600'),
    titleFontSize: cssSize(),
    titleLineHeight: cssSize(),
    subtextTopFontSize: cssSize(),
    subtextTopLineHeight: cssSize(),
    subtextBottomFontSize: cssSize(),
    subtextBottomLineHeight: cssSize(),
    trailingIconSize: cssSize(),
    infoIconSize: cssSize(),
    imageAreaHeight: cssSize(),
    subtitleFontSize: cssSize(),
    subtitleLineHeight: cssSize(),
    bannerHeight: cssSize(),
    contentPadding: cssSize(),
    padding: cssSize(),
    gap: cssSize(),
  });

/** Generates an InfoCardStateConfig */
const infoCardStateConfigArb = () =>
  fc.record({
    borderColor: cssColor(),
    backgroundColor: cssColor(),
    titleColor: cssColor(),
    subtitleColor: cssColor(),
    subtextColor: cssColor(),
    iconColor: cssColor(),
    focusRingColor: cssColor(),
  });

/** Generates a full CardTarmacConfig with info card configs */
const infoCardConfigArb = (): fc.Arbitrary<CardTarmacConfig> =>
  fc.record({
    base: fc.record({
      fontFamily: fc.constant('Noto Sans, sans-serif'),
      fontWeight: fc.constant('500'),
      radius: fc.constant('4px'),
      transition: fc.constant('all 0.15s ease-in-out'),
      focusRingSpread: fc.constant('2px'),
    }),
    selectionCard: fc.constant({
      types: {} as any,
      sizes: {} as any,
      states: {} as any,
    }),
    infoCard: fc.record({
      styles: fc.record({
        slots: infoCardStyleConfigArb(),
        slotTop: infoCardStyleConfigArb(),
        slotBanner: infoCardStyleConfigArb(),
        regular: infoCardStyleConfigArb(),
      }),
      states: fc.record({
        default: infoCardStateConfigArb(),
        hover: infoCardStateConfigArb(),
        focused: infoCardStateConfigArb(),
        disabled: fc.record({
          borderColor: cssColor(),
          backgroundColor: cssColor(),
          titleColor: cssColor(),
          subtitleColor: cssColor(),
          subtextColor: cssColor(),
          iconColor: cssColor(),
          cursor: fc.constant('default'),
        }),
        ghost: fc.record({
          backgroundColor: cssColor(),
          borderColor: fc.constant('transparent'),
          cursor: fc.constant('default'),
          pointerEvents: fc.constant('none' as string),
          skeletonWidth: fc.constant('100%'),
          skeletonHeight: fc.constant('80px'),
          skeletonRadius: fc.constant('4px'),
        }),
      }),
    }),
    card: fc.constant({
      base: {} as any,
      variants: {} as any,
      states: {} as any,
    }),
  });

/** Helper to build default InfoCard style params */
const buildInfoCardParams = (
  config: CardTarmacConfig,
  infoStyle: string,
  overrides?: Partial<InfoCardStyleParams>,
): InfoCardStyleParams => ({
  config,
  infoStyle,
  isDisabled: false,
  isGhost: false,
  hasOnClick: false,
  ...overrides,
});

// ── Property 2 (Info Card part): CSS pseudo-states generated ─────────────

describe('Feature: cards-tarmac-migration, Property 2 (Info Card): CSS pseudo-states generated for all sub-components', () => {
  /**
   * **Validates: Requirements 8.2, 8.3, 15.4**
   *
   * For any Info Card Style variant in {slots, slotTop, slotBanner, regular},
   * the `buildInfoCardStyles` function SHALL generate Emotion CSS containing
   * `:hover`, `:focus` pseudo-state selectors with non-empty style rules
   * derived from the theme config.
   *
   * We verify this by generating two configs that differ ONLY in the
   * pseudo-state-related fields (hover borderColor/backgroundColor,
   * focused focusRingColor) for a given info style. If pseudo-states are
   * generated, the resulting Emotion class names MUST differ — proving
   * those config values are consumed.
   */
  it('should produce different class names when hover/focus config values change for any info card style', () => {
    fc.assert(
      fc.property(
        infoCardConfigArb(),
        infoCardStyleArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, infoStyle, hoverHex, focusHex) => {
          // configA: use the generated config as-is
          const configA: CardTarmacConfig = JSON.parse(JSON.stringify(config));

          // configB: change hover and focus colors
          const configB: CardTarmacConfig = JSON.parse(JSON.stringify(config));
          configB.infoCard.states.hover = {
            ...configB.infoCard.states.hover,
            borderColor: `#ff${hoverHex.slice(0, 4)}`,
            backgroundColor: `#ee${hoverHex.slice(0, 4)}`,
          };
          configB.infoCard.states.focused = {
            ...configB.infoCard.states.focused,
            focusRingColor: `rgba(${parseInt(focusHex.slice(0, 2), 16)},0,0,0.5)`,
          };

          const paramsA = buildInfoCardParams(configA, infoStyle);
          const paramsB = buildInfoCardParams(configB, infoStyle);

          const classA = buildInfoCardStyles(paramsA);
          const classB = buildInfoCardStyles(paramsB);

          // If pseudo-states are generated, changing their config values
          // MUST produce a different Emotion class name
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should produce different class names when disabled state config changes for any info card style', () => {
    fc.assert(
      fc.property(
        infoCardConfigArb(),
        infoCardStyleArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, infoStyle, disabledHex) => {
          const configA: CardTarmacConfig = JSON.parse(JSON.stringify(config));

          const configB: CardTarmacConfig = JSON.parse(JSON.stringify(config));
          configB.infoCard.states.disabled = {
            ...configB.infoCard.states.disabled,
            borderColor: `#ff${disabledHex.slice(0, 4)}`,
            backgroundColor: `#ee${disabledHex.slice(0, 4)}`,
            titleColor: `#dd${disabledHex.slice(0, 4)}`,
          };

          // Test with isDisabled=true so disabled overrides are applied
          const paramsA = buildInfoCardParams(configA, infoStyle, { isDisabled: true });
          const paramsB = buildInfoCardParams(configB, infoStyle, { isDisabled: true });

          const classA = buildInfoCardStyles(paramsA);
          const classB = buildInfoCardStyles(paramsB);

          // Disabled state styles must be generated from config
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ── Card Arbitraries ─────────────────────────────────────────────────────

/** Known Card variant types */
const cardVariants = [
  'standard', 'standardType2', 'slotBanner', 'standardPills',
  'standardIconButtons', 'infoSets', 'badgeBottom', 'buttonsTacked',
] as const;
const cardVariantArb = () => fc.constantFrom(...cardVariants);

/** Generates a CardBaseConfig */
const cardBaseConfigArb = () =>
  fc.record({
    padding: cssSize(),
    gap: cssSize(),
    borderWidth: fc.constant('1px'),
    borderRadius: cssSize(),
    width: fc.constant('328px'),
    headerGap: cssSize(),
    subitemsGap: cssSize(),
    subitemInnerGap: cssSize(),
    buttonsGap: cssSize(),
    iconSize: cssSize(),
    stepperIconSize: cssSize(),
    titleFontSize: cssSize(),
    titleLineHeight: cssSize(),
    titleFontWeight: fc.constant('500'),
    captionFontSize: cssSize(),
    captionLineHeight: cssSize(),
  });

/** Generates a CardVariantConfig */
const cardVariantConfigArb = () =>
  fc.record({
    bannerHeight: cssSize(),
    infoSetGap: cssSize(),
    labelFontSize: cssSize(),
    labelLineHeight: cssSize(),
    valueFontSize: cssSize(),
    valueLineHeight: cssSize(),
    valueFontWeight: fc.constant('600'),
  });

/** Generates a CardStateConfig */
const cardStateConfigArb = () =>
  fc.record({
    borderColor: cssColor(),
    backgroundColor: cssColor(),
    titleColor: cssColor(),
    subtextColor: cssColor(),
    iconColor: cssColor(),
    subitemLabelColor: cssColor(),
    stepperBgColor: cssColor(),
    stepperTextColor: cssColor(),
    statusIndicatorColor: cssColor(),
    focusRingColor: cssColor(),
  });

/** Generates a full CardTarmacConfig with card configs */
const cardConfigArb = (): fc.Arbitrary<CardTarmacConfig> =>
  fc.record({
    base: fc.record({
      fontFamily: fc.constant('Noto Sans, sans-serif'),
      fontWeight: fc.constant('500'),
      radius: fc.constant('4px'),
      transition: fc.constant('all 0.15s ease-in-out'),
      focusRingSpread: fc.constant('2px'),
    }),
    selectionCard: fc.constant({
      types: {} as any,
      sizes: {} as any,
      states: {} as any,
    }),
    infoCard: fc.constant({
      styles: {} as any,
      states: {} as any,
    }),
    card: fc.record({
      base: cardBaseConfigArb(),
      variants: fc.record({
        standard: cardVariantConfigArb(),
        standardType2: cardVariantConfigArb(),
        slotBanner: cardVariantConfigArb(),
        standardPills: cardVariantConfigArb(),
        standardIconButtons: cardVariantConfigArb(),
        infoSets: cardVariantConfigArb(),
        badgeBottom: cardVariantConfigArb(),
        buttonsTacked: cardVariantConfigArb(),
      }),
      states: fc.record({
        default: cardStateConfigArb(),
        hover: cardStateConfigArb(),
        focused: cardStateConfigArb(),
        disabled: fc.record({
          borderColor: cssColor(),
          backgroundColor: cssColor(),
          titleColor: cssColor(),
          subtextColor: cssColor(),
          iconColor: cssColor(),
          subitemLabelColor: cssColor(),
          stepperBgColor: cssColor(),
          stepperTextColor: cssColor(),
          statusIndicatorColor: cssColor(),
          cursor: fc.constant('default'),
        }),
        ghost: fc.record({
          backgroundColor: cssColor(),
          borderColor: fc.constant('transparent'),
          cursor: fc.constant('default'),
          pointerEvents: fc.constant('none' as string),
          skeletonWidth: fc.constant('100%'),
          skeletonHeight: fc.constant('120px'),
          skeletonRadius: fc.constant('4px'),
        }),
      }),
    }),
  });

/** Helper to build default Card style params */
const buildCardParams = (
  config: CardTarmacConfig,
  cardVariant: string,
  overrides?: Partial<CardStyleParams>,
): CardStyleParams => ({
  config,
  cardVariant,
  isDisabled: false,
  isGhost: false,
  hasOnClick: false,
  ...overrides,
});

// ── Property 2 (Card part): CSS pseudo-states generated ──────────────────

describe('Feature: cards-tarmac-migration, Property 2 (Card): CSS pseudo-states generated for all sub-components', () => {
  /**
   * **Validates: Requirements 11.2, 11.3, 15.4**
   *
   * For any Card Variant, the `buildCardContainerStyles` function SHALL
   * generate Emotion CSS containing `:hover`, `:focus` pseudo-state
   * selectors with non-empty style rules derived from the theme config.
   *
   * We verify this by generating two configs that differ ONLY in the
   * pseudo-state-related fields (hover borderColor/backgroundColor,
   * focused focusRingColor) for a given card variant. If pseudo-states
   * are generated, the resulting Emotion class names MUST differ —
   * proving those config values are consumed.
   */
  it('should produce different class names when hover/focus config values change for any card variant', () => {
    fc.assert(
      fc.property(
        cardConfigArb(),
        cardVariantArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, cardVariant, hoverHex, focusHex) => {
          // configA: use the generated config as-is
          const configA: CardTarmacConfig = JSON.parse(JSON.stringify(config));

          // configB: change hover and focus colors
          const configB: CardTarmacConfig = JSON.parse(JSON.stringify(config));
          configB.card.states.hover = {
            ...configB.card.states.hover,
            borderColor: `#ff${hoverHex.slice(0, 4)}`,
            backgroundColor: `#ee${hoverHex.slice(0, 4)}`,
          };
          configB.card.states.focused = {
            ...configB.card.states.focused,
            focusRingColor: `rgba(${parseInt(focusHex.slice(0, 2), 16)},0,0,0.5)`,
          };

          const paramsA = buildCardParams(configA, cardVariant);
          const paramsB = buildCardParams(configB, cardVariant);

          const classA = buildCardContainerStyles(paramsA);
          const classB = buildCardContainerStyles(paramsB);

          // If pseudo-states are generated, changing their config values
          // MUST produce a different Emotion class name
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('should produce different class names when disabled state config changes for any card variant', () => {
    fc.assert(
      fc.property(
        cardConfigArb(),
        cardVariantArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (config, cardVariant, disabledHex) => {
          const configA: CardTarmacConfig = JSON.parse(JSON.stringify(config));

          const configB: CardTarmacConfig = JSON.parse(JSON.stringify(config));
          configB.card.states.disabled = {
            ...configB.card.states.disabled,
            borderColor: `#ff${disabledHex.slice(0, 4)}`,
            backgroundColor: `#ee${disabledHex.slice(0, 4)}`,
            titleColor: `#dd${disabledHex.slice(0, 4)}`,
          };

          // Test with isDisabled=true so disabled overrides are applied
          const paramsA = buildCardParams(configA, cardVariant, { isDisabled: true });
          const paramsB = buildCardParams(configB, cardVariant, { isDisabled: true });

          const classA = buildCardContainerStyles(paramsA);
          const classB = buildCardContainerStyles(paramsB);

          // Disabled state styles must be generated from config
          expect(classA).not.toBe(classB);
        },
      ),
      { numRuns: 100 },
    );
  });
});


// ══════════════════════════════════════════════════════════════════════════
// Property 1 (Selection Card part): Exhaustive variant rendering
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 1 (Selection Card): Exhaustive variant rendering', () => {
  /**
   * **Validates: Requirements 16.5, 24.1**
   *
   * For all combinations of Selection Card Type ∈ {radio, checkbox} ×
   * Size ∈ {lg, sm} × disabled/ghost states, the Selection Card SHALL
   * render without throwing an error.
   */
  it('should render without error for any combination of type × size × disabled × ghost', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('radio', 'checkbox'),
        fc.constantFrom('lg', 'sm'),
        fc.boolean(),
        fc.boolean(),
        (selectionType, size, isDisabled, isGhost) => {
          const { unmount } = render(
            <SelectionCard
              selectionType={selectionType}
              size={size}
              isDisabled={isDisabled}
              isGhost={isGhost}
              title="Test Title"
              onChange={() => {}}
            />,
          );

          // The component must render the selection-card test id
          expect(screen.getByTestId('selection-card')).toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 3: Selection Card boolean toggle conditional rendering
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 3: Selection Card boolean toggle conditional rendering', () => {
  /**
   * **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**
   *
   * For any valid Selection Card configuration and for any combination
   * of the three boolean toggle props (statusIndicator, subtext,
   * trailingIcon), when a toggle prop is provided the corresponding
   * DOM element SHALL be present; when not provided it SHALL NOT be
   * present.
   */
  it('should conditionally render toggle elements based on prop presence', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('radio', 'checkbox'),
        fc.constantFrom('lg', 'sm'),
        fc.boolean(),
        fc.boolean(),
        fc.boolean(),
        (selectionType, size, hasStatusIndicator, hasSubtext, hasTrailingIcon) => {
          const { unmount } = render(
            <SelectionCard
              selectionType={selectionType}
              size={size}
              title="Toggle Test"
              statusIndicator={hasStatusIndicator ? <span>●</span> : undefined}
              subtext={hasSubtext ? 'Some subtext' : undefined}
              trailingIcon={hasTrailingIcon ? <span>→</span> : undefined}
              onChange={() => {}}
            />,
          );

          // Status indicator: present when provided, absent when not
          if (hasStatusIndicator) {
            expect(screen.getByTestId('selection-card-status-indicator')).toBeInTheDocument();
          } else {
            expect(screen.queryByTestId('selection-card-status-indicator')).not.toBeInTheDocument();
          }

          // Subtext: present when provided, absent when not
          if (hasSubtext) {
            expect(screen.getByTestId('selection-card-subtext')).toBeInTheDocument();
          } else {
            expect(screen.queryByTestId('selection-card-subtext')).not.toBeInTheDocument();
          }

          // Trailing icon: present when provided, absent when not
          if (hasTrailingIcon) {
            expect(screen.getByTestId('selection-card-trailing-icon')).toBeInTheDocument();
          } else {
            expect(screen.queryByTestId('selection-card-trailing-icon')).not.toBeInTheDocument();
          }

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 8 (Selection Card part): Disabled prevents interaction
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 8 (Selection Card): Disabled prevents interaction', () => {
  /**
   * **Validates: Requirements 4.5, 24.8**
   *
   * For any Selection Card with isDisabled=true, clicking the card
   * SHALL NOT fire the onChange callback.
   */
  it('should not fire onChange when isDisabled is true for any type × size combination', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('radio', 'checkbox'),
        fc.constantFrom('lg', 'sm'),
        (selectionType, size) => {
          const onChange = jest.fn();

          const { unmount } = render(
            <SelectionCard
              selectionType={selectionType}
              size={size}
              isDisabled={true}
              title="Disabled Card"
              onChange={onChange}
            />,
          );

          const card = screen.getByTestId('selection-card');
          fireEvent.click(card);

          // onChange must NOT have been called
          expect(onChange).not.toHaveBeenCalled();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 1 (Info Card part): Exhaustive variant rendering
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 1 (Info Card): Exhaustive variant rendering', () => {
  /**
   * **Validates: Requirements 16.8, 24.2**
   *
   * For all combinations of Info Card Style ∈ {slots, slotTop, slotBanner,
   * regular} × disabled/ghost states, the Info Card SHALL render without
   * throwing an error.
   */
  it('should render without error for any combination of style × disabled × ghost', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('slots', 'slotTop', 'slotBanner', 'regular'),
        fc.boolean(),
        fc.boolean(),
        (infoStyle, isDisabled, isGhost) => {
          // Build style-appropriate props so each layout has meaningful content
          const styleProps: Record<string, any> = {};
          if (infoStyle === 'slots') {
            styleProps.slotLeading = <div>Lead</div>;
            styleProps.slotTrailing = <div>Trail</div>;
            styleProps.title = '100';
            styleProps.subtextTop = 'Top label';
            styleProps.subtextBottom = 'Bottom label';
          } else if (infoStyle === 'slotTop' || infoStyle === 'slotBanner') {
            styleProps.bannerImage = <img src="test.png" alt="banner" />;
            styleProps.title = 'Banner Title';
          } else {
            styleProps.title = 'Regular Title';
          }

          const { unmount } = render(
            <InfoCard
              infoStyle={infoStyle}
              isDisabled={isDisabled}
              isGhost={isGhost}
              {...styleProps}
            />,
          );

          // The component must render the info-card test id
          expect(screen.getByTestId('info-card')).toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 8 (Info Card part): Disabled prevents interaction
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 8 (Info Card): Disabled prevents interaction', () => {
  /**
   * **Validates: Requirements 23.5, 24.8**
   *
   * For any Info Card with isDisabled=true, clicking the card SHALL NOT
   * fire the onClick callback.
   */
  it('should not fire onClick when isDisabled is true for any info card style', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('slots', 'slotTop', 'slotBanner', 'regular'),
        (infoStyle) => {
          const onClick = jest.fn();

          // Build style-appropriate props
          const styleProps: Record<string, any> = {};
          if (infoStyle === 'slots') {
            styleProps.slotLeading = <div>Lead</div>;
            styleProps.slotTrailing = <div>Trail</div>;
            styleProps.title = '100';
            styleProps.subtextTop = 'Top label';
            styleProps.subtextBottom = 'Bottom label';
          } else if (infoStyle === 'slotTop' || infoStyle === 'slotBanner') {
            styleProps.bannerImage = <img src="test.png" alt="banner" />;
            styleProps.title = 'Banner Title';
          } else {
            styleProps.title = 'Regular Title';
          }

          const { unmount } = render(
            <InfoCard
              infoStyle={infoStyle}
              isDisabled={true}
              onClick={onClick}
              {...styleProps}
            />,
          );

          const card = screen.getByTestId('info-card');
          fireEvent.click(card);

          // onClick must NOT have been called
          expect(onClick).not.toHaveBeenCalled();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 1 (Card part): Exhaustive variant rendering
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 1 (Card): Exhaustive variant rendering', () => {
  /**
   * **Validates: Requirements 16.11, 24.3**
   *
   * For all combinations of Card Variant ∈ {standard, standardType2,
   * slotBanner, standardPills, standardIconButtons, infoSets,
   * badgeBottom, buttonsTacked} × disabled/ghost states, the Card
   * SHALL render without throwing an error.
   */
  it('should render without error for any combination of variant × disabled × ghost', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'standard', 'standardType2', 'slotBanner', 'standardPills',
          'standardIconButtons', 'infoSets', 'badgeBottom', 'buttonsTacked',
        ),
        fc.boolean(),
        fc.boolean(),
        (cardVariant, isDisabled, isGhost) => {
          // Provide bannerImage for slotBanner variant
          const variantProps: Record<string, any> = {};
          if (cardVariant === 'slotBanner') {
            variantProps.bannerImage = <img src="test-banner.png" alt="banner" />;
          }

          const { unmount } = render(
            <Card
              cardStyle="tarmac-01"
              cardVariant={cardVariant}
              title="Test Card Title"
              isDisabled={isDisabled}
              isGhost={isGhost}
              {...variantProps}
            />,
          );

          expect(screen.getByTestId('tarmac-card')).toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 4: Card boolean toggle conditional rendering
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 4: Card boolean toggle conditional rendering', () => {
  /**
   * **Validates: Requirements 12.9–12.23, 24.4**
   *
   * For any combination of the 12 Standard Card boolean toggle props
   * (badge, actions, subitems, leadingIcon, number, snackbar,
   * statusIndicator, subtextBottom, subtextTop, trailingIcon, checkbox,
   * avatar), the Card SHALL render without error and each provided
   * toggle prop SHALL produce its corresponding DOM element.
   */
  it('should conditionally render toggle elements based on prop presence', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // badge
        fc.boolean(), // actions
        fc.boolean(), // subitems
        fc.boolean(), // leadingIcon
        fc.boolean(), // number
        fc.boolean(), // snackbar
        fc.boolean(), // statusIndicator
        fc.boolean(), // subtextBottom
        fc.boolean(), // subtextTop
        fc.boolean(), // trailingIcon
        fc.boolean(), // checkbox
        fc.boolean(), // avatar
        (
          hasBadge, hasActions, hasSubitems, hasLeadingIcon,
          hasNumber, hasSnackbar, hasStatusIndicator,
          hasSubtextBottom, hasSubtextTop, hasTrailingIcon,
          hasCheckbox, hasAvatar,
        ) => {
          const toggleProps: Record<string, any> = {};

          if (hasBadge) toggleProps.badge = <span>Badge</span>;
          if (hasActions) toggleProps.actions = [<button key="a1">Action</button>];
          if (hasSubitems) toggleProps.subitems = [{ icon: <span>📦</span>, label: 'Shipments' }];
          if (hasLeadingIcon) toggleProps.leadingIcon = <span>★</span>;
          if (hasNumber) toggleProps.number = 1;
          if (hasSnackbar) toggleProps.snackbar = <span>In progress</span>;
          if (hasStatusIndicator) toggleProps.statusIndicator = <span>●</span>;
          if (hasSubtextBottom) toggleProps.subtextBottom = 'Bottom text';
          if (hasSubtextTop) toggleProps.subtextTop = 'Top text';
          if (hasTrailingIcon) toggleProps.trailingIcon = <span>→</span>;
          if (hasCheckbox) toggleProps.checkbox = true;
          if (hasAvatar) toggleProps.avatar = <span>AV</span>;

          const { unmount } = render(
            <Card
              cardStyle="tarmac-01"
              cardVariant="standard"
              title="Toggle Test"
              {...toggleProps}
            />,
          );

          // Card must render
          expect(screen.getByTestId('tarmac-card')).toBeInTheDocument();

          // Verify each toggle's DOM presence
          const toggleMap: Array<[boolean, string]> = [
            [hasBadge, 'tarmac-card-badge'],
            [hasActions, 'tarmac-card-actions'],
            [hasSubitems, 'tarmac-card-subitems'],
            [hasLeadingIcon, 'tarmac-card-leading-icon'],
            [hasNumber, 'tarmac-card-stepper-icon'],
            [hasSnackbar, 'tarmac-card-snackbar'],
            [hasStatusIndicator, 'tarmac-card-status-indicator'],
            [hasSubtextBottom, 'tarmac-card-subtext-bottom'],
            [hasSubtextTop, 'tarmac-card-subtext-top'],
            [hasTrailingIcon, 'tarmac-card-trailing-icon'],
            [hasCheckbox, 'tarmac-card-checkbox'],
            [hasAvatar, 'tarmac-card-avatar'],
          ];

          for (const [isPresent, testId] of toggleMap) {
            if (isPresent) {
              expect(screen.getByTestId(testId)).toBeInTheDocument();
            } else {
              expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
            }
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 8 (Card part): Disabled prevents interaction
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 8 (Card): Disabled prevents interaction', () => {
  /**
   * **Validates: Requirements 23.5, 24.8**
   *
   * For any Card with isDisabled=true, clicking the card SHALL NOT
   * fire the onClick callback.
   */
  it('should not fire onClick when isDisabled is true for any card variant', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'standard', 'standardType2', 'slotBanner', 'standardPills',
          'standardIconButtons', 'infoSets', 'badgeBottom', 'buttonsTacked',
        ),
        (cardVariant) => {
          const onClick = jest.fn();

          // Provide bannerImage for slotBanner variant
          const variantProps: Record<string, any> = {};
          if (cardVariant === 'slotBanner') {
            variantProps.bannerImage = <img src="test-banner.png" alt="banner" />;
          }

          const { unmount } = render(
            <Card
              cardStyle="tarmac-01"
              cardVariant={cardVariant}
              title="Disabled Card"
              isDisabled={true}
              onClick={onClick}
              {...variantProps}
            />,
          );

          const card = screen.getByTestId('tarmac-card');
          fireEvent.click(card);

          // onClick must NOT have been called
          expect(onClick).not.toHaveBeenCalled();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});


// ══════════════════════════════════════════════════════════════════════════
// Property 5: Ghost state renders skeleton
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 5: Ghost state renders skeleton', () => {
  /**
   * **Validates: Requirements 4.6, 8.5, 11.5, 16.12, 16.13, 16.14, 24.5**
   *
   * For any combination of Selection Card Type × Size, Info Card Style,
   * or Card Variant, when isGhost is true, the sub-component SHALL render
   * skeleton placeholder blocks and SHALL NOT render any interactive
   * elements (no radio/checkbox, no text content, no icons, no badges,
   * no chips, no buttons).
   */

  it('Selection Card ghost: renders skeleton and no interactive elements for any type × size', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('radio', 'checkbox'),
        fc.constantFrom('lg', 'sm'),
        (selectionType, size) => {
          const onChange = jest.fn();

          const { unmount } = render(
            <SelectionCard
              selectionType={selectionType}
              size={size}
              isGhost={true}
              title="Should not appear"
              subtext="Should not appear"
              statusIndicator={<span>●</span>}
              trailingIcon={<span>→</span>}
              onChange={onChange}
            />,
          );

          // Skeleton placeholder SHALL be present
          expect(screen.getByTestId('selection-card-ghost-skeleton')).toBeInTheDocument();

          // Interactive elements SHALL NOT be present
          expect(screen.queryByTestId('mock-radio')).not.toBeInTheDocument();
          expect(screen.queryByTestId('mock-checkbox')).not.toBeInTheDocument();
          expect(screen.queryByTestId('selection-card-title')).not.toBeInTheDocument();
          expect(screen.queryByTestId('selection-card-subtext')).not.toBeInTheDocument();
          expect(screen.queryByTestId('selection-card-status-indicator')).not.toBeInTheDocument();
          expect(screen.queryByTestId('selection-card-trailing-icon')).not.toBeInTheDocument();

          // Clicking ghost card SHALL NOT fire onChange
          fireEvent.click(screen.getByTestId('selection-card'));
          expect(onChange).not.toHaveBeenCalled();

          unmount();
        },
      ),
      { numRuns: 20 },
    );
  });

  it('Info Card ghost: renders skeleton and no interactive elements for any style', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('slots', 'slotTop', 'slotBanner', 'regular'),
        (infoStyle) => {
          const onClick = jest.fn();

          const { unmount } = render(
            <InfoCard
              infoStyle={infoStyle}
              isGhost={true}
              title="Should not appear"
              subtitle="Should not appear"
              badge={<span>Badge</span>}
              bannerImage={<img src="test.png" alt="banner" />}
              slotLeading={<div>Lead</div>}
              slotTrailing={<div>Trail</div>}
              onClick={onClick}
            />,
          );

          // Skeleton placeholder SHALL be present
          expect(screen.getByTestId('info-card-ghost-skeleton')).toBeInTheDocument();

          // Interactive/content elements SHALL NOT be present
          expect(screen.queryByTestId('info-card-title')).not.toBeInTheDocument();
          expect(screen.queryByTestId('info-card-subtitle')).not.toBeInTheDocument();
          expect(screen.queryByTestId('info-card-badge')).not.toBeInTheDocument();
          expect(screen.queryByTestId('info-card-banner')).not.toBeInTheDocument();
          expect(screen.queryByTestId('info-card-slot-leading')).not.toBeInTheDocument();
          expect(screen.queryByTestId('info-card-slot-trailing')).not.toBeInTheDocument();

          // Clicking ghost card SHALL NOT fire onClick
          fireEvent.click(screen.getByTestId('info-card'));
          expect(onClick).not.toHaveBeenCalled();

          unmount();
        },
      ),
      { numRuns: 20 },
    );
  });

  it('Card ghost: renders skeleton and no interactive elements for any variant', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'standard', 'standardType2', 'slotBanner', 'standardPills',
          'standardIconButtons', 'infoSets', 'badgeBottom', 'buttonsTacked',
        ),
        (cardVariant) => {
          const onClick = jest.fn();

          const { unmount } = render(
            <Card
              cardStyle="tarmac-01"
              cardVariant={cardVariant}
              isGhost={true}
              title="Should not appear"
              subtitle="Should not appear"
              badge={<span>Badge</span>}
              leadingIcon={<span>★</span>}
              trailingIcon={<span>→</span>}
              number={1}
              chips={[{ label: 'Chip' }]}
              actions={[<button key="a">Action</button>]}
              subitems={[{ icon: <span>📦</span>, label: 'Item' }]}
              statusIndicator={<span>●</span>}
              snackbar={<span>Status</span>}
              avatar={<span>AV</span>}
              bannerImage={<img src="test.png" alt="banner" />}
              onClick={onClick}
            />,
          );

          // Skeleton placeholder SHALL be present
          expect(screen.getByTestId('tarmac-card-ghost-skeleton')).toBeInTheDocument();

          // Interactive/content elements SHALL NOT be present
          expect(screen.queryByTestId('tarmac-card-title')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-subtitle')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-badge')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-leading-icon')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-trailing-icon')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-stepper-icon')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-chips')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-actions')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-subitems')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-status-indicator')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-snackbar')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-avatar')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-banner')).not.toBeInTheDocument();

          // Clicking ghost card SHALL NOT fire onClick
          fireEvent.click(screen.getByTestId('tarmac-card'));
          expect(onClick).not.toHaveBeenCalled();

          unmount();
        },
      ),
      { numRuns: 20 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 6: Theme JSON tokens exist in variables file
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 6: Theme JSON tokens exist in variables file', () => {
  /**
   * **Validates: Requirements 14.9, 18.2, 24.6**
   *
   * For all `{{TokenName}}` placeholders used in the `card_tarmac` section
   * of Theme JSON, the token name SHALL exist in `tarmac-variables-full.json`.
   */

  // Read both files at test time
  const fs = require('fs');
  const path = require('path');

  const themeJsonPath = path.resolve(__dirname, '../../../../public/tarmac-theme.json');
  const variablesJsonPath = path.resolve(__dirname, '../../ThemeProvider/tarmac-variables-full.json');

  const themeJson = JSON.parse(fs.readFileSync(themeJsonPath, 'utf-8'));
  const variablesJson = JSON.parse(fs.readFileSync(variablesJsonPath, 'utf-8'));

  // Extract all variable names from the variables file
  const variableNames = new Set<string>();
  for (const collection of variablesJson.collections || []) {
    for (const variable of collection.variables || []) {
      variableNames.add(variable.name);
    }
  }

  // Extract all {{TokenName}} placeholders from the card_tarmac section
  const cardTarmacSection = themeJson['tarmac-theme']?.components?.card_tarmac;
  const tokenPattern = /\{\{([^}]+)\}\}/g;
  const tokens: string[] = [];

  function extractTokens(obj: any): void {
    if (typeof obj === 'string') {
      let match: RegExpExecArray | null;
      while ((match = tokenPattern.exec(obj)) !== null) {
        tokens.push(match[1]);
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (const value of Object.values(obj)) {
        extractTokens(value);
      }
    }
  }

  extractTokens(cardTarmacSection);

  it('should have at least one token in the card_tarmac section', () => {
    expect(tokens.length).toBeGreaterThan(0);
  });

  it('every {{TokenName}} in card_tarmac SHALL exist in tarmac-variables-full.json', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...tokens),
        (tokenName) => {
          expect(variableNames.has(tokenName)).toBe(true);
        },
      ),
      { numRuns: tokens.length },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 7: Open union types accept arbitrary strings
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 7: Open union types accept arbitrary strings', () => {
  /**
   * **Validates: Requirements 1.3, 10.10, 24.7**
   *
   * For any arbitrary string value passed to open-union-typed props
   * (cardStyle, cardVariant, selectionType, selectionSize, infoStyle),
   * the component SHALL not throw a runtime error.
   */

  it('Card: arbitrary cardStyle and cardVariant strings SHALL not throw', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 1, maxLength: 50 }),
        (cardStyle, cardVariant) => {
          const { unmount } = render(
            <Card
              cardStyle={cardStyle as any}
              cardVariant={cardVariant as any}
              title="Arbitrary test"
            />,
          );

          expect(screen.getByTestId('tarmac-card')).toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });

  it('SelectionCard: arbitrary selectionType and size strings SHALL not throw', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 1, maxLength: 50 }),
        (selectionType, size) => {
          const { unmount } = render(
            <SelectionCard
              selectionType={selectionType as any}
              size={size as any}
              title="Arbitrary test"
              onChange={() => {}}
            />,
          );

          expect(screen.getByTestId('selection-card')).toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });

  it('InfoCard: arbitrary infoStyle strings SHALL not throw', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (infoStyle) => {
          const { unmount } = render(
            <InfoCard
              infoStyle={infoStyle as any}
              title="Arbitrary test"
            />,
          );

          expect(screen.getByTestId('info-card')).toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════
// Property 9: Children override structured content
// ══════════════════════════════════════════════════════════════════════════

describe('Feature: cards-tarmac-migration, Property 9: Children override structured content', () => {
  /**
   * **Validates: Requirements 13.5**
   *
   * For any Card in Tarmac mode where children is provided alongside
   * structured content props (title, subtitle, description), the Card
   * SHALL render the children content and SHALL NOT render the structured
   * content props in the DOM.
   */

  it('children SHALL be rendered and structured content SHALL NOT be rendered', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'standard', 'standardType2', 'slotBanner', 'standardPills',
          'standardIconButtons', 'infoSets', 'badgeBottom', 'buttonsTacked',
        ),
        fc.string({ minLength: 1, maxLength: 30 }),
        fc.string({ minLength: 1, maxLength: 30 }),
        fc.string({ minLength: 1, maxLength: 30 }),
        fc.string({ minLength: 1, maxLength: 30 }),
        (cardVariant, childText, titleText, subtitleText, descriptionText) => {
          const { unmount } = render(
            <Card
              cardStyle="tarmac-01"
              cardVariant={cardVariant}
              title={titleText}
              subtitle={subtitleText}
              description={descriptionText}
            >
              <div data-testid="custom-children">{childText}</div>
            </Card>,
          );

          // Children SHALL be rendered
          expect(screen.getByTestId('custom-children')).toBeInTheDocument();
          expect(screen.getByTestId('custom-children').textContent).toBe(childText);

          // Structured content SHALL NOT be rendered
          expect(screen.queryByTestId('tarmac-card-title')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-subtitle')).not.toBeInTheDocument();
          expect(screen.queryByTestId('tarmac-card-description')).not.toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 50 },
    );
  });
});
