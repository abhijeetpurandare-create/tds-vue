import { getVariableByName } from '../components/ThemeProvider/figma-variables-resolver';
import type { ModeOverrides } from '../types/tokenTypes';

/**
 * Regex to match {{VariableName}} placeholders.
 * Captures the token name between double curly braces.
 * Requires at least one character inside the braces (rejects {{}}).
 */
const PLACEHOLDER_RE = /\{\{([^}]+)\}\}/g;

/**
 * Returns true if the string contains at least one valid {{...}} placeholder.
 */
export function hasPlaceholders(value: string): boolean {
  PLACEHOLDER_RE.lastIndex = 0;
  return PLACEHOLDER_RE.test(value);
}

/**
 * Resolve a single string value by replacing all {{VariableName}}
 * placeholders with their resolved CSS values from the Figma TDS.
 *
 * - If the entire value is a single placeholder, returns the resolved value.
 * - If no placeholders are found, returns the original string unchanged.
 * - Malformed placeholders (e.g. {{}}, {{, }}) are treated as literals.
 * - Unresolved tokens are kept as-is with a warning logged.
 */
function resolveStringValue(
  value: string,
  modeOverrides: ModeOverrides,
  jsonPath: string
): string {
  if (!hasPlaceholders(value)) return value;

  return value.replace(PLACEHOLDER_RE, (match, tokenName: string) => {
    const trimmed = tokenName.trim();
    if (!trimmed) return match; // {{}} or {{  }} — malformed, keep literal

    try {
      const resolved = getVariableByName(trimmed, modeOverrides);
      if (resolved !== null && resolved !== undefined) {
        return String(resolved);
      }
    } catch (err) {
      if (typeof console !== 'undefined') {
        console.warn(
          `[Orca TemplateResolver] Error resolving token "${trimmed}" at ${jsonPath}:`,
          err
        );
      }
      return match;
    }

    // Token not found — warn and keep original placeholder
    if (typeof console !== 'undefined') {
      console.warn(
        `[Orca TemplateResolver] Unresolved token "{{${trimmed}}}" at ${jsonPath}`
      );
    }
    return match;
  });
}

/**
 * Recursively walk a theme JSON object and resolve all {{...}} placeholders.
 *
 * - Strings with placeholders get resolved via getVariableByName().
 * - Non-string primitives (number, boolean, null) pass through unchanged.
 * - Arrays and nested objects are walked recursively.
 * - Does NOT mutate the original object (deep clones first).
 */
export function resolveTemplatePlaceholders<T>(
  theme: T,
  modeOverrides: ModeOverrides = {}
): T {
  return walkNode(theme, modeOverrides, '') as T;
}

function walkNode(
  node: unknown,
  modeOverrides: ModeOverrides,
  path: string
): unknown {
  if (node === null || node === undefined) return node;

  if (typeof node === 'string') {
    return resolveStringValue(node, modeOverrides, path);
  }

  if (typeof node === 'number' || typeof node === 'boolean') return node;

  if (Array.isArray(node)) {
    return node.map((item, i) => walkNode(item, modeOverrides, `${path}[${i}]`));
  }

  if (typeof node === 'object') {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(node as Record<string, unknown>)) {
      const childPath = path ? `${path}.${key}` : key;
      result[key] = walkNode(
        (node as Record<string, unknown>)[key],
        modeOverrides,
        childPath
      );
    }
    return result;
  }

  return node;
}
