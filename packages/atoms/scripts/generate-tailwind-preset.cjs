#!/usr/bin/env node
/**
 * generate-tailwind-preset.cjs
 *
 * Reads tarmac-variables-full.json (same source the atoms use),
 * resolves tokens via the same alias-chain logic as figma-variables-resolver.js,
 * and outputs dist/tailwind-preset.cjs.
 *
 * Colors: ALL semantic tokens (Surface/*, Text/*, Border/*, Icon/*, Alpha/*) are
 * auto-discovered — no manual mapping needed. Any Figma semantic token is
 * immediately available as a tds- Tailwind class.
 *
 * Spacing, radius, fonts: manually mapped via tailwind-token-map.json (small set).
 *
 * Run: node scripts/generate-tailwind-preset.cjs
 */

const fs = require('fs');
const path = require('path');

// ── Paths ──────────────────────────────────────────────────────────────────
const VARIABLES_PATH = path.resolve(__dirname, '../src/components/ThemeProvider/tarmac-variables-full.json');
const TOKEN_MAP_PATH = path.resolve(__dirname, 'tailwind-token-map.json');
const OUTPUT_PATH = path.resolve(__dirname, '../dist/tailwind-preset.cjs');

// ── Load data ──────────────────────────────────────────────────────────────
if (!fs.existsSync(VARIABLES_PATH)) {
  console.error(`ERROR: ${VARIABLES_PATH} not found`);
  process.exit(1);
}

const variablesData = JSON.parse(fs.readFileSync(VARIABLES_PATH, 'utf-8'));
const tokenMap = fs.existsSync(TOKEN_MAP_PATH)
  ? JSON.parse(fs.readFileSync(TOKEN_MAP_PATH, 'utf-8'))
  : { spacing: {}, borderRadius: {}, fontFamily: {} };

// ── Build lookup maps (mirrors figma-variables-resolver.js) ────────────────
const variableMap = new Map();
const collectionMap = new Map();

for (const collection of variablesData.collections || []) {
  collectionMap.set(collection.id, collection);
  for (const variable of collection.variables || []) {
    variableMap.set(variable.id, variable);
  }
}

// ── Resolver (same logic as figma-variables-resolver.js) ───────────────────

function rgbaToHex(r, g, b, a) {
  const ri = Math.round(r * 255);
  const gi = Math.round(g * 255);
  const bi = Math.round(b * 255);
  const hex = '#' + [ri, gi, bi].map(c => c.toString(16).padStart(2, '0')).join('');
  if (a !== undefined && a !== 1) {
    const ai = Math.round(a * 255);
    return hex + ai.toString(16).padStart(2, '0');
  }
  return hex;
}

function resolveVariable(variableId, depth) {
  if (depth === undefined) depth = 0;
  if (depth > 20) return null;
  const variable = variableMap.get(variableId);
  if (!variable) return null;
  const collection = collectionMap.get(variable.variableCollectionId);
  if (!collection) return null;
  const modeId = collection.defaultModeId;
  const value = variable.valuesByMode[modeId];
  if (value === undefined || value === null) return null;
  if (value.type === 'VARIABLE_ALIAS') return resolveVariable(value.id, depth + 1);
  if (variable.resolvedType === 'COLOR' && typeof value === 'object' && 'r' in value) {
    return { type: 'color', value: rgbaToHex(value.r, value.g, value.b, value.a) };
  }
  if (variable.resolvedType === 'FLOAT') return { type: 'float', value: value };
  if (variable.resolvedType === 'STRING') return { type: 'string', value: value };
  return { type: 'unknown', value: value };
}

// ── Convert Figma token name to tds- Tailwind class name ───────────────────
function toTdsName(figmaName) {
  return 'tds-' + figmaName
    .replace(/\//g, '-')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .toLowerCase();
}

// ── Auto-discover all semantic color tokens ────────────────────────────────
const SEMANTIC_PREFIXES = ['Surface/', 'Text/', 'Border/', 'Icon/', 'Alpha/'];

const errors = [];
const resolved = { colors: {}, spacing: {}, borderRadius: {}, fontFamily: {} };
let colorSkipped = 0;

for (const variable of variableMap.values()) {
  if (!SEMANTIC_PREFIXES.some(p => variable.name.startsWith(p))) continue;
  if (variable.resolvedType !== 'COLOR') continue;

  const result = resolveVariable(variable.id);
  if (!result || result.type !== 'color') {
    colorSkipped++;
    continue;
  }

  const tdsName = toTdsName(variable.name);
  resolved.colors[tdsName] = result.value;
}

// ── Manually mapped non-color tokens (spacing, radius, fonts) ──────────────

for (const [twName, tokenName] of Object.entries(tokenMap.spacing || {})) {
  const found = [...variableMap.values()].find(v => v.name === tokenName);
  if (!found) { errors.push(`Spacing "${twName}" -> "${tokenName}": NOT FOUND`); continue; }
  const result = resolveVariable(found.id);
  if (!result || result.type !== 'float') { errors.push(`Spacing "${twName}": expected float`); continue; }
  resolved.spacing[twName] = `${result.value}px`;
}

for (const [twName, tokenName] of Object.entries(tokenMap.borderRadius || {})) {
  const found = [...variableMap.values()].find(v => v.name === tokenName);
  if (!found) { errors.push(`Radius "${twName}" -> "${tokenName}": NOT FOUND`); continue; }
  const result = resolveVariable(found.id);
  if (!result || result.type !== 'float') { errors.push(`Radius "${twName}": expected float`); continue; }
  resolved.borderRadius[twName] = `${result.value}px`;
}

for (const [twName, tokenName] of Object.entries(tokenMap.fontFamily || {})) {
  const found = [...variableMap.values()].find(v => v.name === tokenName);
  if (!found) { errors.push(`Font "${twName}" -> "${tokenName}": NOT FOUND`); continue; }
  const result = resolveVariable(found.id);
  if (!result || result.type !== 'string') { errors.push(`Font "${twName}": expected string`); continue; }
  resolved.fontFamily[twName] = [result.value, 'sans-serif'];
}

// ── Fail on non-color errors ───────────────────────────────────────────────
if (errors.length > 0) {
  console.error('\n❌ Tailwind preset generation FAILED:\n');
  errors.forEach(e => console.error(`  • ${e}`));
  console.error(`\nFix the token names in scripts/tailwind-token-map.json`);
  process.exit(1);
}

// ── Write output ───────────────────────────────────────────────────────────
const distDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const colorCount = Object.keys(resolved.colors).length;
const spacingCount = Object.keys(resolved.spacing).length;
const radiusCount = Object.keys(resolved.borderRadius).length;
const fontCount = Object.keys(resolved.fontFamily).length;
const totalCount = colorCount + spacingCount + radiusCount + fontCount;

const output = `/**
 * Tarmac TDS Tailwind Preset
 * Auto-generated from tarmac-variables-full.json
 * Generated: ${new Date().toISOString()}
 * Tokens: ${totalCount} (${colorCount} colors, ${spacingCount} spacing, ${radiusCount} radius, ${fontCount} fonts)
 *
 * Usage in tailwind.config.js:
 *   import { createRequire } from 'module';
 *   const require = createRequire(import.meta.url);
 *   presets: [require('@delhivery/tarmac/tailwind-preset')]
 *
 * All semantic Figma tokens (Surface/*, Text/*, Border/*, Icon/*, Alpha/*) are
 * auto-included. Use classes like: bg-tds-surface-bg-blue-default, text-tds-text-body-primary
 * Opacity modifiers work: bg-tds-surface-bg-blue-default/10
 */
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(resolved.colors, null, 8)},
      spacing: ${JSON.stringify(resolved.spacing, null, 8)},
      borderRadius: ${JSON.stringify(resolved.borderRadius, null, 8)},
      fontFamily: ${JSON.stringify(resolved.fontFamily, null, 8)}
    }
  }
};
`;

fs.writeFileSync(OUTPUT_PATH, output, 'utf-8');

console.log(`\n✅ Tailwind preset generated: ${OUTPUT_PATH}`);
console.log(`   ${colorCount} colors (auto-discovered), ${spacingCount} spacing, ${radiusCount} radius, ${fontCount} fonts`);
if (colorSkipped > 0) console.log(`   ${colorSkipped} color tokens skipped (failed to resolve)`);
console.log(`   Total: ${totalCount} tokens\n`);
