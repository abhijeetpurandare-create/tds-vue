/**
 * Unit tests for the {{VariableName}} template resolver.
 * Mocks getVariableByName from figma-variables-resolver.
 */

// Mock the figma-variables-resolver module
jest.mock('../figma-variables-resolver', () => ({
  getVariableByName: jest.fn(),
}));

import { resolveTemplatePlaceholders, hasPlaceholders } from '../../../utils/templateResolver';
import { getVariableByName } from '../figma-variables-resolver';

const mockGetVariable = getVariableByName as jest.MockedFunction<typeof getVariableByName>;

beforeEach(() => {
  mockGetVariable.mockReset();
});

// ── hasPlaceholders ───────────────────────────────────────────────────────────

describe('hasPlaceholders', () => {
  it('returns true for a single placeholder', () => {
    expect(hasPlaceholders('{{DLV Red/500}}')).toBe(true);
  });

  it('returns true for placeholder with spaces', () => {
    expect(hasPlaceholders('{{White/300}}')).toBe(true);
  });

  it('returns false for plain hex color', () => {
    expect(hasPlaceholders('#ED4136')).toBe(false);
  });

  it('returns false for plain CSS value', () => {
    expect(hasPlaceholders('0.375rem')).toBe(false);
  });

  it('returns false for empty braces {{}}', () => {
    expect(hasPlaceholders('{{}}')).toBe(false);
  });

  it('returns false for single braces', () => {
    expect(hasPlaceholders('{DLV Red/500}')).toBe(false);
  });

  it('returns false for unclosed placeholder', () => {
    expect(hasPlaceholders('{{DLV Red/500')).toBe(false);
  });
});

// ── resolveTemplatePlaceholders ───────────────────────────────────────────────

describe('resolveTemplatePlaceholders', () => {
  it('resolves a single placeholder to its CSS value', () => {
    mockGetVariable.mockReturnValue('rgb(237, 27, 54)');

    const theme = { main: '{{DLV Red/500}}' };
    const result = resolveTemplatePlaceholders(theme);

    expect(result.main).toBe('rgb(237, 27, 54)');
    expect(mockGetVariable).toHaveBeenCalledWith('DLV Red/500', {});
  });

  it('passes mode overrides to getVariableByName', () => {
    mockGetVariable.mockReturnValue('rgb(255, 255, 255)');
    const modes = { 'Brand ': 'Mode 1' };

    const theme = { bg: '{{White/500}}' };
    resolveTemplatePlaceholders(theme, modes);

    expect(mockGetVariable).toHaveBeenCalledWith('White/500', modes);
  });

  it('leaves non-placeholder strings unchanged', () => {
    const theme = {
      fontFamily: 'sans-serif',
      fontWeight: '500',
      padding: '0.375rem',
      color: '#ED4136',
      shadow: '0px 1px 3px rgba(0,0,0,0.1)',
    };
    const result = resolveTemplatePlaceholders(theme);

    expect(result).toEqual(theme);
    expect(mockGetVariable).not.toHaveBeenCalled();
  });

  it('preserves number values unchanged', () => {
    const theme = { zIndex: 99999 };
    const result = resolveTemplatePlaceholders(theme);
    expect(result.zIndex).toBe(99999);
  });

  it('preserves boolean values unchanged', () => {
    const theme = { visible: true };
    const result = resolveTemplatePlaceholders(theme);
    expect(result.visible).toBe(true);
  });

  it('preserves null values unchanged', () => {
    const theme = { empty: null };
    const result = resolveTemplatePlaceholders(theme);
    expect(result.empty).toBeNull();
  });

  it('resolves nested objects recursively', () => {
    mockGetVariable.mockImplementation((name: string) => {
      const map: Record<string, string> = {
        'DLV Red/500': 'rgb(237, 27, 54)',
        'White/500': 'rgb(255, 255, 255)',
        'Coal/900': 'rgb(36, 41, 56)',
      };
      return map[name] ?? null;
    });

    const theme = {
      colors: {
        primary: { main: '{{DLV Red/500}}', contrast: '{{White/500}}' },
      },
      components: {
        button: { backgroundColor: '{{Coal/900}}', padding: '0.375rem' },
      },
    };
    const result = resolveTemplatePlaceholders(theme);

    expect(result.colors.primary.main).toBe('rgb(237, 27, 54)');
    expect(result.colors.primary.contrast).toBe('rgb(255, 255, 255)');
    expect(result.components.button.backgroundColor).toBe('rgb(36, 41, 56)');
    expect(result.components.button.padding).toBe('0.375rem');
  });

  it('resolves array items containing placeholders', () => {
    mockGetVariable.mockImplementation((name: string) => {
      if (name === 'Blue/500') return 'rgb(35, 150, 251)';
      return null;
    });

    const theme = { colors: ['{{Blue/500}}', '#FFFFFF'] };
    const result = resolveTemplatePlaceholders(theme);

    expect(result.colors[0]).toBe('rgb(35, 150, 251)');
    expect(result.colors[1]).toBe('#FFFFFF');
  });

  it('keeps unresolved placeholder when getVariableByName returns null', () => {
    mockGetVariable.mockReturnValue(null);
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const theme = { color: '{{Nonexistent/Token}}' };
    const result = resolveTemplatePlaceholders(theme);

    expect(result.color).toBe('{{Nonexistent/Token}}');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Nonexistent/Token')
    );

    warnSpy.mockRestore();
  });

  it('keeps placeholder intact when getVariableByName throws', () => {
    mockGetVariable.mockImplementation(() => {
      throw new Error('Resolver crashed');
    });
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const theme = { color: '{{DLV Red/500}}' };
    const result = resolveTemplatePlaceholders(theme);

    expect(result.color).toBe('{{DLV Red/500}}');
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('treats malformed placeholders as literal strings', () => {
    const theme = {
      a: '{{}}',
      b: '{{',
      c: '}}',
      d: '{DLV Red/500}',
    };
    const result = resolveTemplatePlaceholders(theme);

    expect(result).toEqual(theme);
    expect(mockGetVariable).not.toHaveBeenCalled();
  });

  it('completes resolution of all valid placeholders even when some fail', () => {
    mockGetVariable.mockImplementation((name: string) => {
      if (name === 'White/500') return 'rgb(255, 255, 255)';
      return null; // everything else fails
    });
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const theme = {
      bg: '{{White/500}}',
      text: '{{Missing/Token}}',
      border: '{{Another/Missing}}',
    };
    const result = resolveTemplatePlaceholders(theme);

    expect(result.bg).toBe('rgb(255, 255, 255)');
    expect(result.text).toBe('{{Missing/Token}}');
    expect(result.border).toBe('{{Another/Missing}}');

    warnSpy.mockRestore();
  });

  it('backward compat: standard theme with no placeholders passes through identical', () => {
    const standardTheme = {
      name: 'Red_LIGHT',
      colors: { primary: { main: '#ED4136', contrast: '#FFFFFF' } },
      components: {
        button: {
          fontWeight: '500',
          padding: '0.375rem',
          backgroundColor: '#1F222E',
        },
      },
    };
    const result = resolveTemplatePlaceholders(standardTheme);

    expect(result).toEqual(standardTheme);
    expect(mockGetVariable).not.toHaveBeenCalled();
  });

  it('round-trip: resolving an already-resolved theme produces the same output', () => {
    mockGetVariable.mockReturnValue('rgb(237, 27, 54)');

    const theme = { main: '{{DLV Red/500}}' };
    const first = resolveTemplatePlaceholders(theme);
    const second = resolveTemplatePlaceholders(first);

    expect(second).toEqual(first);
  });

  it('resolves spacing tokens that return numeric values', () => {
    mockGetVariable.mockImplementation((name: string) => {
      const map: Record<string, number> = {
        'Scale/400': 8,
        'Scale/600': 16,
        'Scale/0': 0,
      };
      return map[name] ?? null;
    });

    const theme = {
      padding: '{{Scale/400}}px',
      fontSize: '{{Scale/600}}px',
      gap: '{{Scale/400}}',
      borderWidth: '{{Scale/0}}',
    };
    const result = resolveTemplatePlaceholders(theme);

    expect(result.padding).toBe('8px');
    expect(result.fontSize).toBe('16px');
    expect(result.gap).toBe('8');
    expect(result.borderWidth).toBe('0');
  });

  it('resolves compound spacing values with multiple placeholders', () => {
    mockGetVariable.mockImplementation((name: string) => {
      if (name === 'Scale/400') return 8;
      if (name === 'Scale/600') return 16;
      return null;
    });

    const theme = {
      padding: '{{Scale/400}}px {{Scale/600}}px',
    };
    const result = resolveTemplatePlaceholders(theme);

    expect(result.padding).toBe('8px 16px');
  });
});
