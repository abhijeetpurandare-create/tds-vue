interface VariableInfo {
  name: string;
  id: string;
  type: string;
  collectionName: string | undefined;
}

interface CollectionInfo {
  modes: string[];
  defaultMode: string | undefined;
  id: string;
}

type ModesByCollectionName = Record<string, string>;

export declare const variableMap: Map<string, Record<string, unknown>>;
export declare const collectionMap: Map<string, Record<string, unknown>>;
export declare const modeMap: Map<string, Record<string, string>>;
export declare const keyMap: Map<string, Record<string, unknown>>;

export declare function resolveVariable(
  variableId: string,
  modesByCollectionName?: ModesByCollectionName
): string | number | null;

export declare function getVariableByName(
  name: string,
  modesByCollectionName?: ModesByCollectionName
): string | number | null;

export declare function getAvailableCollections(): Record<string, CollectionInfo>;

export declare function findVariablesByPattern(pattern: string): VariableInfo[];
