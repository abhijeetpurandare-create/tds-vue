/**
 * Integration test: resolves ALL 1044 variables from tarmac-variables-full.json
 * using buildTokenRegistry (TypeScript port of figma-variables-resolver).
 *
 * Validates:
 * - Every variable resolves to a non-null value
 * - COLOR variables resolve to rgb()/rgba() strings
 * - FLOAT variables resolve to numeric strings
 * - STRING variables resolve to non-empty strings
 * - Alias chains resolve correctly
 * - Spot-checks known values against the CSS output
 */

import { buildTokenRegistry } from '../../../utils/tokenResolver';
import tdsData from '../tarmac-variables-full.json';

// Build the registry once for all tests
const registry = buildTokenRegistry(tdsData as never);

// Also build with Dark mode for DLV_Mapped
const darkRegistry = buildTokenRegistry(tdsData as never, { 'DLV_Mapped ': 'Dark' });

// ── Registry structure ────────────────────────────────────────────────────────

describe('TDS registry structure', () => {
  it('builds a non-empty registry', () => {
    const keys = Object.keys(registry);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('contains all expected variable count (1044)', () => {
    const keys = Object.keys(registry);
    expect(keys.length).toBe(1044);
  });
});

// ── Brand collection: direct COLOR values ─────────────────────────────────────

describe('Brand — direct color values', () => {
  it.each([
    ['White/500', 'rgb(255, 255, 255)'],
    ['Black/500', 'rgb(0, 0, 0)'],
    ['White/25', 'rgb(191, 191, 191)'],
    ['Grey/300', 'rgb(153, 153, 153)'],
    ['Grey/500', 'rgb(102, 102, 102)'],
  ])('%s → %s', (name, expected) => {
    expect(registry[name]).toBe(expected);
  });
});

// ── Brand collection: Scale (FLOAT) values ────────────────────────────────────

describe('Brand — Scale (FLOAT) values', () => {
  it.each([
    ['Scale/0', '0'],
    ['Scale/25', '0.5'],
    ['Scale/50', '1'],
    ['Scale/75', '1.5'],
    ['Scale/100', '2'],
    ['Scale/150', '3'],
    ['Scale/200', '4'],
    ['Scale/300', '6'],
    ['Scale/400', '8'],
    ['Scale/450', '10'],
    ['Scale/500', '12'],
    ['Scale/550', '14'],
    ['Scale/600', '16'],
    ['Scale/700', '20'],
    ['Scale/800', '24'],
    ['Scale/900', '32'],
    ['Scale/1000', '40'],
    ['Scale/1125', '48'],
    ['Scale/1200', '64'],
    ['Scale/1500', '999'],
  ])('%s → %s', (name, expected) => {
    expect(registry[name]).toBe(expected);
  });
});

// ── Brand collection: STRING values ───────────────────────────────────────────

describe('Brand — STRING values', () => {
  it.each([
    ['Font_Family/display', 'Noto Sans'],
    ['Font_Family/heading', 'Noto Sans'],
    ['Font_Family/body', 'Noto Sans'],
    ['Font_Family/caption', 'Noto Sans'],
    ['Font_Weight/display', 'Display'],
    ['Font_Weight/bold', 'Bold'],
    ['Font_Weight/semibold', 'Semibold'],
    ['Font_Weight/medium', 'Medium'],
    ['Font_Weight/regular', 'Regular'],
    ['Font_Weight/Light', 'Light'],
  ])('%s → "%s"', (name, expected) => {
    expect(registry[name]).toBe(expected);
  });
});

// ── Alias collection: Spacing aliases ─────────────────────────────────────────

describe('Alias — Spacing aliases', () => {
  it.each([
    ['Spacing/0', '0'],
    ['Spacing/2', '2'],
    ['Spacing/4', '4'],
    ['Spacing/8', '8'],
    ['Spacing/12', '12'],
    ['Spacing/16', '16'],
    ['Spacing/20', '20'],
    ['Spacing/24', '24'],
    ['Spacing/32', '32'],
    ['Spacing/40', '40'],
    ['Spacing/48', '48'],
    ['Spacing/64', '64'],
    ['Spacing/80', '80'],
  ])('%s → %s', (name, expected) => {
    expect(registry[name]).toBe(expected);
  });
});

// ── Alias collection: Border Radius aliases ───────────────────────────────────

describe('Alias — Border Radius aliases', () => {
  it.each([
    ['Border Radius/none', '0'],
    ['Border Radius/small', '2'],
    ['Border Radius/default', '4'],
    ['Border Radius/medium', '8'],
    ['Border Radius/large', '12'],
    ['Border Radius/xlarge', '16'],
    ['Border Radius/max', '999'],
  ])('%s → %s', (name, expected) => {
    expect(registry[name]).toBe(expected);
  });
});

// ── Alias collection: Border Width aliases ────────────────────────────────────

describe('Alias — Border Width aliases', () => {
  it.each([
    ['Border Width/none', '0'],
    ['Border Width/small', '0.5'],
    ['Border Width/default', '1'],
    ['Border Width/medium', '1.5'],
    ['Border Width/large', '2'],
    ['Border Width/xlarge', '4'],
  ])('%s → %s', (name, expected) => {
    expect(registry[name]).toBe(expected);
  });
});

// ── Alias collection: Stroke aliases ──────────────────────────────────────────

describe('Alias — Stroke aliases', () => {
  it.each([
    ['Stroke/none', '0'],
    ['Stroke/small', '0.5'],
    ['Stroke/default', '1'],
    ['Stroke/medium', '1.5'],
    ['Stroke/large', '2'],
    ['Stroke/xlarage', '4'],
  ])('%s → %s', (name, expected) => {
    expect(registry[name]).toBe(expected);
  });
});

// ── Alias collection: Radius aliases ──────────────────────────────────────────

describe('Alias — Radius aliases', () => {
  it.each([
    ['Radius/none', '0'],
    ['Radius/Small', '2'],
    ['Radius/Default', '4'],
    ['Radius/Medium', '8'],
    ['Radius/Large', '12'],
    ['Radius/Xlarage', '16'],
    ['Radius/Max', '999'],
  ])('%s → %s', (name, expected) => {
    expect(registry[name]).toBe(expected);
  });
});

// ── DLV_Mapped: Surface colors (Light mode) ───────────────────────────────────

describe('DLV_Mapped — Surface colors (Light mode)', () => {
  it('Surface/BG_Primary/Default → white', () => {
    expect(registry['Surface/BG_Primary/Default']).toBe('rgb(255, 255, 255)');
  });

  it('Surface/BG_Primary_Inverse/Default → black', () => {
    expect(registry['Surface/BG_Primary_Inverse/Default']).toBe('rgb(0, 0, 0)');
  });

  it('Surface/Transparent → transparent rgba', () => {
    expect(registry['Surface/Transparent']).toMatch(/^rgba\(255, 255, 255, 0\)$/);
  });
});

// ── DLV_Mapped: Dark mode ─────────────────────────────────────────────────────

describe('DLV_Mapped — Dark mode overrides', () => {
  it('Surface/BG_Primary/Default in Dark → black', () => {
    expect(darkRegistry['Surface/BG_Primary/Default']).toBe('rgb(0, 0, 0)');
  });

  it('Surface/BG_Primary_Inverse/Default in Dark → white', () => {
    expect(darkRegistry['Surface/BG_Primary_Inverse/Default']).toBe('rgb(255, 255, 255)');
  });
});

// ── DLV_Mapped: Text colors ──────────────────────────────────────────────────

describe('DLV_Mapped — Text colors (Light mode)', () => {
  it('Text/Heading/Only Black → black', () => {
    expect(registry['Text/Heading/Only Black']).toBe('rgb(0, 0, 0)');
  });

  it('Text/Heading_Inverse/Only White → white', () => {
    expect(registry['Text/Heading_Inverse/Only White']).toBe('rgb(255, 255, 255)');
  });
});

// ── Bulk validation: every variable resolves ──────────────────────────────────

describe('Bulk validation — all 1044 variables', () => {
  const allVarNames: string[] = [];

  beforeAll(() => {
    const data = tdsData as { collections: Array<{ variables: Array<{ name: string }> }> };
    for (const col of data.collections) {
      for (const v of col.variables) {
        allVarNames.push(v.name);
      }
    }
  });

  it('every variable name exists in the registry', () => {
    const missing = allVarNames.filter((name) => !(name in registry));
    expect(missing).toEqual([]);
  });

  it('no variable resolves to empty string', () => {
    const empties = allVarNames.filter((name) => registry[name] === '');
    expect(empties).toEqual([]);
  });

  it('all COLOR variables resolve to rgb/rgba pattern', () => {
    const data = tdsData as {
      collections: Array<{ variables: Array<{ name: string; resolvedType: string }> }>;
    };
    const colorNames: string[] = [];
    for (const col of data.collections) {
      for (const v of col.variables) {
        if (v.resolvedType === 'COLOR') colorNames.push(v.name);
      }
    }
    expect(colorNames.length).toBe(954);

    const failures = colorNames.filter(
      (name) => !registry[name]?.startsWith('rgb')
    );
    expect(failures).toEqual([]);
  });

  it('all FLOAT variables resolve to valid numeric strings', () => {
    const data = tdsData as {
      collections: Array<{ variables: Array<{ name: string; resolvedType: string }> }>;
    };
    const floatNames: string[] = [];
    for (const col of data.collections) {
      for (const v of col.variables) {
        if (v.resolvedType === 'FLOAT') floatNames.push(v.name);
      }
    }
    expect(floatNames.length).toBe(80);

    const failures = floatNames.filter(
      (name) => isNaN(Number(registry[name]))
    );
    expect(failures).toEqual([]);
  });

  it('all STRING variables resolve to non-empty strings', () => {
    const data = tdsData as {
      collections: Array<{ variables: Array<{ name: string; resolvedType: string }> }>;
    };
    const stringNames: string[] = [];
    for (const col of data.collections) {
      for (const v of col.variables) {
        if (v.resolvedType === 'STRING') stringNames.push(v.name);
      }
    }
    expect(stringNames.length).toBe(10);

    const failures = stringNames.filter(
      (name) => !registry[name] || registry[name].length === 0
    );
    expect(failures).toEqual([]);
  });
});
