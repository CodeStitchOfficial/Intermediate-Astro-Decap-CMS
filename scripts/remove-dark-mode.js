/**
 * remove-dark-mode.js
 *
 * Removes dark mode functionality from the Intermediate-Astro-Decap-CMS template.
 * Files are moved to scripts/deleted/ for recovery, not permanently deleted.
 *
 * Usage: npm run remove-dark-mode
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const DELETED_DIR = path.join(__dirname, 'deleted');

// Files to move to scripts/deleted/
const FILES_TO_MOVE = [
  'src/styles/dark.less',
  'src/icons/moon.svg',
  'src/icons/sun.svg',
];

// Directories to move to scripts/deleted/
const DIRS_TO_MOVE = [
  'src/components/DarkModeToggle',
];

/**
 * Prompts user for confirmation
 */
function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Ensures a directory exists, creating it recursively if needed
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Moves a file to the deleted directory, preserving relative path structure
 */
function moveFile(relativePath) {
  const srcPath = path.join(ROOT_DIR, relativePath);
  const destPath = path.join(DELETED_DIR, relativePath);

  if (!fs.existsSync(srcPath)) {
    console.log(`  Skipping (not found): ${relativePath}`);
    return false;
  }

  ensureDir(path.dirname(destPath));
  fs.copyFileSync(srcPath, destPath);
  fs.rmSync(srcPath);
  console.log(`  Moved: ${relativePath}`);
  return true;
}

/**
 * Moves a directory to the deleted directory, preserving relative path structure
 */
function moveDir(relativePath) {
  const srcPath = path.join(ROOT_DIR, relativePath);
  const destPath = path.join(DELETED_DIR, relativePath);

  if (!fs.existsSync(srcPath)) {
    console.log(`  Skipping (not found): ${relativePath}`);
    return false;
  }

  ensureDir(path.dirname(destPath));
  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true });
  }
  fs.cpSync(srcPath, destPath, { recursive: true });
  fs.rmSync(srcPath, { recursive: true, force: true });
  console.log(`  Moved: ${relativePath}/`);
  return true;
}

/**
 * Applies text replacements to a file
 */
function updateFile(relativePath, replacements) {
  const fullPath = path.join(ROOT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`  File not found: ${relativePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  for (const { pattern, replacement } of replacements) {
    content = content.replace(pattern, replacement);
  }

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  Updated: ${relativePath}`);
  } else {
    console.log(`  No changes needed: ${relativePath}`);
  }
}

/**
 * Removes a CSS/LESS block by selector, handling balanced braces (including nested blocks)
 */
function removeCssBlock(content, selector) {
  let result = content;
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const selectorRegex = new RegExp(
    `\\s*${escapedSelector}(?:\\s+[^{,]+)?\\s*\\{`,
    'g',
  );

  let match;
  while ((match = selectorRegex.exec(result)) !== null) {
    const startIndex = match.index;
    const openBraceIndex = result.indexOf('{', startIndex);

    let braceCount = 1;
    let i = openBraceIndex + 1;
    while (braceCount > 0 && i < result.length) {
      if (result[i] === '{') braceCount++;
      else if (result[i] === '}') braceCount--;
      i++;
    }

    if (braceCount === 0) {
      result = result.substring(0, startIndex) + result.substring(i);
      selectorRegex.lastIndex = 0;
    } else {
      selectorRegex.lastIndex = startIndex + 1;
    }
  }
  return result;
}

/**
 * Cleans dark mode styles from a file (works with both .less and .astro files).
 * Removes body.dark-mode blocks, #dark-mode-toggle blocks, dark mode comments,
 * dark mode variables, utility classes, and cleans up empty media queries.
 */
function cleanDarkStyles(relativePath) {
  const fullPath = path.join(ROOT_DIR, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`  File not found: ${relativePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // 1. Remove dark mode CSS variables from :root
  content = content.replace(/\s*--dark:\s*#[0-9a-fA-F]+;\s*/g, '\n');
  content = content.replace(/\s*--medium:\s*#[0-9a-fA-F]+;\s*/g, '\n');
  content = content.replace(/\s*--accent:\s*#[0-9a-fA-F]+;\s*/g, '\n');

  // 2. Remove "Dark Mode" section comments (multi-line block comments and CodeStitch headers)
  content = content.replace(
    /\n?\s*\/\*(?:(?!\*\/)[\s\S])*?[Dd]ark\s*[Mm]ode(?:(?!\*\/)[\s\S])*?\*\/\s*/g,
    '\n',
  );
  // Single-line LESS/SASS comments referencing dark mode
  content = content.replace(/\n?\s*\/\/.*[Dd]ark\s*[Mm]ode.*\n/g, '\n');

  // 3. Remove body.dark-mode blocks (handles nested braces)
  content = removeCssBlock(content, 'body.dark-mode');

  // 4. Remove #dark-mode-toggle blocks
  content = removeCssBlock(content, '#dark-mode-toggle');

  // 5. Remove .dark utility class blocks
  content = removeCssBlock(content, '.dark');

  // 6. Remove nested &.dark blocks (e.g. inside other selectors)
  content = content.replace(/\n?\s*&\.dark\s*\{[^}]*\}/g, '');

  // 7. Remove the standalone body transition only used for dark mode color shift
  content = content.replace(
    /\n?\s*body\s*\{\s*transition:\s*background-color\s+0\.3s;\s*\}/g,
    '',
  );

  // 8. Remove empty media queries left behind after block removal
  let loopCount = 0;
  while (/@media[^{]+\{\s*\}/g.test(content) && loopCount < 5) {
    content = content.replace(/@media[^{]+\{\s*\}/g, '');
    loopCount++;
  }

  // 9. Clean up multiple empty lines
  content = content.replace(/\n{3,}/g, '\n\n');

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  Cleaned: ${relativePath}`);
  } else {
    console.log(`  No dark mode styles found: ${relativePath}`);
  }
}

/**
 * Recursively collect all files matching an extension under a directory (relative to ROOT_DIR)
 */
function collectFiles(relativeDir, extension) {
  const fullDir = path.join(ROOT_DIR, relativeDir);
  const results = [];

  if (!fs.existsSync(fullDir)) return results;

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(relativePath, extension));
    } else if (entry.name.endsWith(extension)) {
      results.push(relativePath);
    }
  }
  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('\nDark Mode Removal Script\n');
  console.log('This script will:');
  console.log('  - Move DarkModeToggle/, dark.less, moon.svg, and sun.svg to scripts/deleted/');
  console.log('  - Remove the inline dark mode script from BaseLayout.astro');
  console.log('  - Remove the DarkModeToggle import and usage from both Header components');
  console.log('  - Remove the dark.less import from BaseLayout.astro');
  console.log('  - Remove the #dark-mode-toggle reference from nav.js');
  console.log('  - Remove body.dark-mode CSS blocks from all components, layouts, and pages');
  console.log('\nFiles can be recovered from scripts/deleted/ if needed.\n');

  const confirmed = await askConfirmation('Proceed with dark mode removal? (y/n): ');
  if (!confirmed) {
    console.log('\nAborted.\n');
    process.exit(0);
  }

  // --- 1. Move files and directories ---
  console.log('\n--- Moving Dark Mode Files ---');
  for (const file of FILES_TO_MOVE) {
    moveFile(file);
  }
  for (const dir of DIRS_TO_MOVE) {
    moveDir(dir);
  }

  // --- 2. Update BaseLayout.astro ---
  console.log('\n--- Updating BaseLayout.astro ---');
  updateFile('src/layouts/BaseLayout.astro', [
    {
      name: 'Remove dark.less import',
      pattern: /import\s+["']@styles\/dark\.less["'];\n?/g,
      replacement: '',
    },
    {
      name: 'Remove inline dark mode script',
      pattern: /\n*<script is:inline>\s*\n\s*\/\/\s*helper functions to toggle dark mode[\s\S]*?<\/script>\s*/g,
      replacement: '\n',
    },
  ]);

  // --- 3. Update Header components ---
  console.log('\n--- Updating Header Components ---');
  const headerReplacements = [
    {
      name: 'Remove DarkModeToggle import',
      pattern: /import\s+DarkModeToggle\s+from\s+["']@components\/DarkModeToggle\/DarkModeToggle\.astro["'];\n?/g,
      replacement: '',
    },
    {
      name: 'Remove DarkModeToggle usage (with optional comment)',
      pattern: /\s*<!--.*[Dd]ark\s*[Mm]ode.*-->\s*\n?\s*<DarkModeToggle\s*\/>/gi,
      replacement: '',
    },
    {
      name: 'Remove standalone DarkModeToggle usage',
      pattern: /\s*<DarkModeToggle\s*\/>\s*/g,
      replacement: '\n',
    },
  ];
  updateFile('src/components/Header/DynamicHeader.astro', headerReplacements);
  updateFile('src/components/Header/StaticHeader.astro', headerReplacements);

  // --- 4. Update nav.js (remove dead dark mode toggle selector) ---
  console.log('\n--- Updating nav.js ---');
  updateFile('src/js/nav.js', [
    {
      name: 'Remove darkModeToggle selector config',
      pattern: /\s*darkModeToggle:\s*["']#dark-mode-toggle["'],?\n?/g,
      replacement: '\n',
    },
    {
      name: 'Remove darkModeToggle element query',
      pattern: /\s*darkModeToggle:\s*document\.querySelector\(CONFIG\.SELECTORS\.darkModeToggle\),?\n?/g,
      replacement: '\n',
    },
  ]);

  // --- 5. Clean dark mode styles from all files ---
  console.log('\n--- Cleaning Dark Mode Styles ---');

  // Global LESS files
  cleanDarkStyles('src/styles/root.less');
  cleanDarkStyles('src/styles/sidebar.less');

  // All components (recursive scan)
  const componentFiles = collectFiles('src/components', '.astro');
  for (const file of componentFiles) {
    // Skip the DarkModeToggle folder (already moved)
    if (file.includes('DarkModeToggle')) continue;
    cleanDarkStyles(file);
  }

  // All layout files
  const layoutFiles = collectFiles('src/layouts', '.astro');
  for (const file of layoutFiles) {
    cleanDarkStyles(file);
  }

  // All pages (recursive scan)
  const pageFiles = collectFiles('src/pages', '.astro');
  for (const file of pageFiles) {
    cleanDarkStyles(file);
  }

  // Any other .less files that may exist
  const lessFiles = collectFiles('src/styles', '.less');
  for (const file of lessFiles) {
    if (file === 'src/styles/root.less' || file === 'src/styles/sidebar.less') continue;
    cleanDarkStyles(file);
  }

  console.log('\nDark mode removal complete!');
  console.log('Run "npm run build" to verify the build succeeds.\n');
}

main().catch((error) => {
  console.error('\nError:', error.message);
  process.exit(1);
});
