/**
 * Branded type for token name references in theme JSON.
 * A TokenName is a string that references a Figma variable name
 * (e.g. "White/300", "DLV-Red-500", "Surface-BG_Primary-Default").
 */
export type TokenName = string & { __isToken: true };

/**
 * Flat key→value map: variable name → resolved CSS value.
 * Built at init time from the Figma variables JSON.
 */
export type TokenRegistry = Record<string, string>;

/**
 * Recursively replaces all TokenName leaves with plain strings.
 */
export type DeepResolved<T> = T extends TokenName
  ? string
  : T extends string
    ? string
    : T extends Array<infer U>
      ? Array<DeepResolved<U>>
      : T extends object
        ? { [K in keyof T]: DeepResolved<T[K]> }
        : T;

// ── Figma Variables JSON shape ────────────────────────────────────────────────

interface FigmaColorValue {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

interface FigmaMode {
  name: string;
  modeId: string;
}

export interface FigmaVariable {
  id: string;
  name: string;
  key: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  valuesByMode: Record<string, FigmaColorValue | FigmaVariableAlias | number | string | boolean>;
  variableCollectionId: string;
  description?: string;
  scopes?: string[];
  hiddenFromPublishing?: boolean;
  codeSyntax?: Record<string, string>;
}

export interface FigmaCollection {
  id: string;
  name: string;
  key: string;
  defaultModeId: string;
  modes: FigmaMode[];
  variables: FigmaVariable[];
  variableIds?: string[];
  hiddenFromPublishing?: boolean;
  remote?: boolean;
}

export interface FigmaVariablesJSON {
  schemaVersion?: number;
  lastModified?: string;
  collections: FigmaCollection[];
}

/**
 * Mode overrides: collection name → mode name.
 * If a collection is not listed, its default mode is used.
 */
export type ModeOverrides = Record<string, string>;
