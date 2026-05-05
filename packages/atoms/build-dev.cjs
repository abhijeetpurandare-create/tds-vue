const fs = require('fs');
const { execSync } = require('child_process');

// Path to the index file
const filePath = './src/index.ts';
const backupFilePath = './src/index.ts.backup';

try {
  // Step 1: Backup the file
  fs.copyFileSync(filePath, backupFilePath);
  console.log('Backup created.');

  // Step 2: Read and modify the file
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content
    .split('\n')
    .filter(line => !line.includes('export {default as Icon} from "./components/Icon"'))
    .join('\n');

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Icon export removed.');

  // Step 3: Run the build command
  console.log('Starting build...');
  execSync('pnpm run build', { stdio: 'inherit' });
  console.log('Build completed.');
} catch (error) {
  console.error('Error during build process:', error);
} finally {
  // Step 4: Restore the original file
  if (fs.existsSync(backupFilePath)) {
    fs.copyFileSync(backupFilePath, filePath);
    fs.unlinkSync(backupFilePath);
    console.log('Original index.ts restored.');
  }
}
