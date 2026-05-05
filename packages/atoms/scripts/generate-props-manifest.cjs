#!/usr/bin/env node
/**
 * generate-props-manifest.cjs
 *
 * Reads all exported React components from packages/atoms/src/index.ts,
 * extracts their TypeScript prop interfaces using react-docgen-typescript,
 * and writes a props-manifest.json file.
 *
 * Usage: node packages/atoms/scripts/generate-props-manifest.cjs
 */

const path = require('path');
const fs = require('fs');
const docgen = require('react-docgen-typescript');

const ROOT = path.resolve(__dirname, '..');
const TSCONFIG = path.join(ROOT, 'tsconfig.json');
const SRC = path.join(ROOT, 'src');
const COMPONENTS_DIR = path.join(SRC, 'components');
const OUTPUT = path.join(ROOT, 'props-manifest.json');

// Parser options
const parser = docgen.withCustomConfig(TSCONFIG, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractValuesFromUnion: true,
  componentNameResolver: (exp, source) => {
    // Handle forwardRef components — extract the display name
    const text = exp.getName ? exp.getName() : '';
    if (text === 'default') {
      // Try to find displayName assignment in the source
      const sourceText = source.getFullText ? source.getFullText() : '';
      const match = sourceText.match(/(\w+)\.displayName\s*=\s*['"](\w+)['"]/);
      if (match) return match[2];
    }
    return undefined;
  },
  propFilter: (prop) => {
    // Filter out HTML/DOM props inherited from React.HTMLAttributes
    if (prop.declarations && prop.declarations.length > 0) {
      const isFromNodeModules = prop.declarations.some(
        (d) => d.fileName.includes('node_modules')
      );
      if (isFromNodeModules) return false;
    }
    return true;
  },
});

// Secondary parser with less strict filtering for forwardRef components
const forwardRefParser = docgen.withCustomConfig(TSCONFIG, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractValuesFromUnion: true,
  propFilter: () => true, // Accept all props including inherited ones
});

// Find component entry files
function findComponentFiles() {
  const files = [];
  const dirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    const dirPath = path.join(COMPONENTS_DIR, dir.name);

    // Look for index.tsx, index.ts, or ComponentName.tsx
    const candidates = [
      path.join(dirPath, 'index.tsx'),
      path.join(dirPath, 'index.ts'),
      path.join(dirPath, `${dir.name}.tsx`),
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        files.push({ name: dir.name, file: candidate });
        break;
      }
    }

    // Also check for sub-components (e.g., Card/SelectionCard, Card/InfoCard)
    const subDirs = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const sub of subDirs) {
      if (!sub.isDirectory()) continue;
      const subPath = path.join(dirPath, sub.name);
      const subCandidates = [
        path.join(subPath, 'index.tsx'),
        path.join(subPath, 'index.ts'),
        path.join(subPath, `${sub.name}.tsx`),
      ];
      for (const candidate of subCandidates) {
        if (fs.existsSync(candidate)) {
          files.push({ name: `${dir.name}/${sub.name}`, file: candidate });
          break;
        }
      }
    }
  }

  return files;
}


// Main
function main() {
  console.log('Generating props manifest...');
  const componentFiles = findComponentFiles();
  console.log(`Found ${componentFiles.length} component files`);

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    components: {},
  };

  let successCount = 0;
  let errorCount = 0;

  for (const { name, file } of componentFiles) {
    try {
      let docs = parser.parse(file);
      
      // If primary parser found nothing, try the forwardRef-friendly parser
      if (docs.length === 0) {
        docs = forwardRefParser.parse(file);
      }
      if (docs.length === 0) continue;

      for (const doc of docs) {
        const componentName = doc.displayName || name;
        const props = {};

        for (const [propName, propInfo] of Object.entries(doc.props || {})) {
          props[propName] = {
            name: propName,
            type: propInfo.type?.name || propInfo.type?.raw || 'unknown',
            required: propInfo.required || false,
            defaultValue: propInfo.defaultValue?.value ?? null,
            description: propInfo.description || '',
          };
        }

        const propCount = Object.keys(props).length;
        if (propCount === 0) continue;

        manifest.components[componentName] = {
          name: componentName,
          filePath: path.relative(ROOT, file),
          props,
          propCount,
        };

        successCount++;
        console.log(`  ✓ ${componentName} (${propCount} props)`);
      }
    } catch (err) {
      errorCount++;
      console.warn(`  ✗ ${name}: ${err.message}`);
    }
  }

  // Fallback: extract props from exported interfaces for components docgen missed
  const ts = require('typescript');
  const indexFile = path.join(SRC, 'index.ts');
  const indexSource = fs.readFileSync(indexFile, 'utf-8');
  const sourceFile = ts.createSourceFile('index.ts', indexSource, ts.ScriptTarget.Latest, true);

  // Find all "export type { XxxProps } from ..." statements
  const propsExports = [];
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const el of node.exportClause.elements) {
        const exportedName = el.name.text;
        if (exportedName.endsWith('Props') && !manifest.components[exportedName.replace('Props', '')]) {
          const modulePath = node.moduleSpecifier?.text;
          if (modulePath) {
            propsExports.push({ propsName: exportedName, componentName: exportedName.replace('Props', ''), modulePath });
          }
        }
      }
    }
  });

  // For each missing component, try to extract props from the interface
  for (const { propsName, componentName, modulePath } of propsExports) {
    try {
      const resolvedPath = path.resolve(SRC, modulePath.replace('./', '') + '.tsx');
      const altPath = path.resolve(SRC, modulePath.replace('./', '') + '.ts');
      const indexTsxPath = path.resolve(SRC, modulePath.replace('./', ''), 'index.tsx');
      const indexTsPath = path.resolve(SRC, modulePath.replace('./', ''), 'index.ts');
      const filePath = [resolvedPath, altPath, indexTsxPath, indexTsPath].find(p => fs.existsSync(p));
      if (!filePath) continue;

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const sf = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

      // Find the interface/type with the Props name
      const props = {};
      ts.forEachChild(sf, (node) => {
        if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name.text === propsName) {
          const members = ts.isInterfaceDeclaration(node) ? node.members : [];
          for (const member of members) {
            if (ts.isPropertySignature(member) && member.name) {
              const propName = member.name.getText(sf);
              // Skip index signatures like [key: string]: any
              if (propName.startsWith('[')) continue;
              const typeText = member.type ? member.type.getText(sf) : 'unknown';
              const isOptional = !!member.questionToken;
              props[propName] = {
                name: propName,
                type: typeText,
                required: !isOptional,
                defaultValue: null,
                description: '',
              };
            }
          }
        }
      });

      const propCount = Object.keys(props).length;
      if (propCount > 0) {
        manifest.components[componentName] = {
          name: componentName,
          filePath: path.relative(ROOT, filePath),
          props,
          propCount,
        };
        successCount++;
        console.log(`  ✓ ${componentName} (${propCount} props, via TS AST fallback)`);
      }
    } catch (err) {
      // Silently skip fallback failures
    }
  }

  // Write output
  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));
  console.log(`\nDone! ${successCount} components, ${errorCount} errors`);
  console.log(`Output: ${OUTPUT}`);
}

main();
