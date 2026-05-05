import type {
  TokenRegistry,
  DeepResolved,
  FigmaVariablesJSON,
  FigmaVariable,
  FigmaCollection,
  ModeOverrides,
} from '../types/tokenTypes';

// ── Figma variable resolution (mirrors figma-variables-resolver.js) ───────────

/**
 * Internal lookup maps built from the Figma variables JSON.
 */
interface VariableMaps {
  variableMap: Map<string, FigmaVariable>;
  collectionMap: Map<string, FigmaCollection>;
  modeMap: Map<string, Record<string, string>>; // collectionName → { modeName → modeId }
  collectionNameToId: Map<string, string>;
  keyMap: Map<string, FigmaVariable>; // variable key → variable
}

/**
 * Process one or more Figma variable JSON files into lookup maps.
 */
function buildMaps(sources: FigmaVariablesJSON[]): VariableMaps {
  const variableMap = new Map<string, FigmaVariable>();
  const collectionMap = new Map<string, FigmaCollection>();
  const modeMap = new Map<string, Record<string, string>>();
  const collectionNameToId = new Map<string, string>();
  const keyMap = new Map<string, FigmaVariable>();

  for (const source of sources) {
    if (!source?.collections) continue;
    for (const collection of source.collections) {
      collectionMap.set(collection.id, collection);
      collectionNameToId.set(collection.name, collection.id);

      const modes: Record<string, string> = {};
      for (const mode of collection.modes) {
        modes[mode.name] = mode.modeId;
      }
      modeMap.set(collection.name, modes);

      for (const variable of collection.variables) {
        variableMap.set(variable.id, variable);
        keyMap.set(variable.key, variable);
      }
    }
  }

  return { variableMap, collectionMap, modeMap, collectionNameToId, keyMap };
}

/**
 * Resolve mode IDs for each collection given optional overrides.
 */
function resolveModeIds(
  maps: VariableMaps,
  modeOverrides: ModeOverrides
): Record<string, string> {
  const resolved: Record<string, string> = {};
  for (const [collectionName, availableModes] of maps.modeMap.entries()) {
    const requested = modeOverrides[collectionName];
    if (requested && availableModes[requested]) {
      resolved[collectionName] = availableModes[requested];
    } else {
      const collectionId = maps.collectionNameToId.get(collectionName);
      const collection = collectionId ? maps.collectionMap.get(collectionId) : undefined;
      resolved[collectionName] = collection?.defaultModeId ?? '';
    }
  }
  return resolved;
}

interface ColorObj {
  r: number;
  g: number;
  b: number;
  a?: number;
}

function isColorObj(v: unknown): v is ColorObj {
  return (
    typeof v === 'object' &&
    v !== null &&
    'r' in v &&
    'g' in v &&
    'b' in v &&
    !('type' in v)
  );
}

function rgbaToCSS(c: ColorObj): string {
  const red = Math.round(c.r * 255);
  const green = Math.round(c.g * 255);
  const blue = Math.round(c.b * 255);
  const a = c.a ?? 1;
  if (a === 1) return `rgb(${red}, ${green}, ${blue})`;
  return `rgba(${red}, ${green}, ${blue}, ${a})`;
}

/**
 * Recursively resolve a single Figma variable to its CSS value.
 */
function resolveVariableValue(
  variableId: string,
  maps: VariableMaps,
  resolvedModes: Record<string, string>,
  visited: Set<string> = new Set()
): string | number | null {
  if (visited.has(variableId)) return null; // circular ref guard
  visited.add(variableId);

  const variable = maps.variableMap.get(variableId);
  if (!variable) return null;

  const collection = maps.collectionMap.get(variable.variableCollectionId);
  if (!collection) return null;

  const modeId = resolvedModes[collection.name];
  const value = variable.valuesByMode[modeId];
  if (value === undefined || value === null) return null;

  // Handle alias
  if (typeof value === 'object' && 'type' in value && value.type === 'VARIABLE_ALIAS') {
    const aliasId = (value as { type: string; id: string }).id;

    // Cross-JSON reference
    if (aliasId.includes('/') && aliasId.startsWith('VariableID:')) {
      const keyPart = aliasId.substring('VariableID:'.length, aliasId.indexOf('/'));
      const ref = maps.keyMap.get(keyPart);
      if (ref) return resolveVariableValue(ref.id, maps, resolvedModes, visited);
      return null;
    }

    return resolveVariableValue(aliasId, maps, resolvedModes, visited);
  }

  // Handle color
  if (variable.resolvedType === 'COLOR' && isColorObj(value)) {
    return rgbaToCSS(value);
  }

  // Numeric or string
  if (typeof value === 'number' || typeof value === 'string') return value;

  return null;
}

/**
 * Build a flat TokenRegistry (name → CSS value) from Figma variables JSON.
 * This is the main entry point for creating the token dictionary.
 */
export function buildTokenRegistry(
  sources: FigmaVariablesJSON | FigmaVariablesJSON[],
  modeOverrides: ModeOverrides = {}
): TokenRegistry {
  const sourceArray = Array.isArray(sources) ? sources : [sources];
  const maps = buildMaps(sourceArray);
  const resolvedModes = resolveModeIds(maps, modeOverrides);
  const registry: TokenRegistry = {};

  for (const variable of maps.variableMap.values()) {
    const resolved = resolveVariableValue(variable.id, maps, resolvedModes);
    if (resolved !== null) {
      registry[variable.name] = String(resolved);
    }
  }

  return registry;
}

// ── Raw-value detection ───────────────────────────────────────────────────────

const HEX_COLOR_RE = /#([0-9a-fA-F]{3,8})\b/;
const CSS_LENGTH_RE = /^\d+(\.\d+)?(px|rem|em|vh|vw|%|s|ms)$/;
const CSS_NUMERIC_RE = /^\d+(\.\d+)?$/;
const SHADOW_PREFIX_RE = /^(0px\s|rgba?\()/i;

const TAILWIND_PREFIXES = [
  'flex', 'grid', 'items-', 'justify-', 'gap-', 'text-', 'bg-', 'border-',
  'rounded-', 'p-', 'px-', 'py-', 'pt-', 'pb-', 'pl-', 'pr-', 'm-', 'mx-',
  'my-', 'mt-', 'mb-', 'ml-', 'mr-', 'w-', 'h-', 'min-', 'max-', 'space-',
  'font-', 'leading-', 'tracking-', 'cursor-', 'select-', 'opacity-',
  'absolute', 'relative', 'fixed', 'sticky', 'block', 'inline', 'hidden',
];

const CSS_KEYWORDS = new Set([
  'transparent', 'inherit', 'none', 'auto', 'normal', 'initial', 'unset',
  'white', 'black', 'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy',
  'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded',
  'not-allowed', 'ease-in-out', 'ease-in', 'ease-out', 'ease',
  'all', 'separate', 'collapse',
]);

/**
 * Returns true if the value is a raw CSS value that should NOT be resolved
 * as a token name.
 */
export function isRawValue(value: string): boolean {
  if (HEX_COLOR_RE.test(value)) return true;
  if (CSS_LENGTH_RE.test(value)) return true;
  if (CSS_NUMERIC_RE.test(value)) return true;
  if (SHADOW_PREFIX_RE.test(value)) return true;
  if (CSS_KEYWORDS.has(value.toLowerCase())) return true;
  if (value.includes(' ')) return true;
  for (const prefix of TAILWIND_PREFIXES) {
    if (value.startsWith(prefix)) return true;
  }
  if (value.includes('/')) return true;
  if (/^[a-z-]+\(/.test(value)) return true;
  if (value.includes(',')) return true;
  return false;
}

// ── Theme token resolution ────────────────────────────────────────────────────

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function resolveLeaf(value: string, tokens: TokenRegistry): string {
  if (isRawValue(value)) return value;

  const resolved = tokens[value];
  if (resolved !== undefined) return resolved;

  const isDev =
    typeof globalThis !== 'undefined' &&
    typeof (globalThis as Record<string, unknown>).process === 'object' &&
    ((globalThis as Record<string, unknown>).process as Record<string, unknown>)?.env &&
    (((globalThis as Record<string, unknown>).process as Record<string, unknown>).env as Record<string, unknown>)?.NODE_ENV !== 'production';

  if (isDev) {
    throw new Error(
      `[Orca TokenResolver] Unresolved token: "${value}". ` +
      `Ensure this token exists in the Style Dictionary registry.`
    );
  }

  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    console.warn(`[Orca TokenResolver] Unresolved token: "${value}". Keeping raw value.`);
  }

  return value;
}

function walkNode(node: unknown, tokens: TokenRegistry): unknown {
  if (node === null || node === undefined) return node;
  if (typeof node === 'string') return resolveLeaf(node, tokens);
  if (typeof node === 'number' || typeof node === 'boolean') return node;
  if (Array.isArray(node)) return node.map((item) => walkNode(item, tokens));
  if (typeof node === 'object') {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(node as Record<string, unknown>)) {
      result[key] = walkNode((node as Record<string, unknown>)[key], tokens);
    }
    return result;
  }
  return node;
}

/**
 * Recursively walks every leaf string in the theme object.
 * - Raw CSS values pass through unchanged.
 * - Token names are looked up in the registry and replaced.
 * - Does NOT mutate the original object.
 */
export function resolveThemeTokens<T extends Record<string, unknown>>(
  theme: T,
  tokens: TokenRegistry
): DeepResolved<T> {
  const cloned = deepClone(theme);
  return walkNode(cloned, tokens) as DeepResolved<T>;
}
