import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_DIR = join(ROOT, 'docs');

const NAVIGATION = `<nav aria-label="Main navigation">
  <a href="index.html">Home</a>
  <a href="wiki/Home.html">Wiki</a>
  <a href="DECISIONS.html">ADRs</a>
  <a href="README.html">README</a>
  <a href="diagrams/authentication-platform.html">Lineage Diagram</a>
</nav>`;

const NAV_STYLES = `<style>
  nav { position: fixed; top: 0; left: 0; right: 0; height: 4rem; display: flex; align-items: center; gap: 1.5rem; padding: 0 2rem; background: #08101d; border-bottom: 1px solid #26364e; z-index: 9999; font-family: system-ui, sans-serif; }
  nav a { color: #7dd3fc; font-weight: 600; text-decoration: none; }
  nav a:hover { color: #bae6fd; text-decoration: underline; }
</style>`;

function listHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(entryPath);
    return entry.isFile() && extname(entry.name).toLowerCase() === '.html'
      ? [entryPath]
      : [];
  });
}

function injectNavigation(filePath) {
  let html = readFileSync(filePath, 'utf8');
  const original = html;
  if (/<head\b[^>]*>/i.test(html) && !/<base\b/i.test(html)) {
    html = html.replace(/<head\b[^>]*>/i, (head) => `${head}\n  <base href="/tmura/">`);
  }
  if (filePath === join(DOCS_DIR, 'index.html')) {
    if (html !== original) writeFileSync(filePath, html, 'utf8');
    return;
  }
  if (/<nav\b/i.test(html)) {
    if (html !== original) writeFileSync(filePath, html, 'utf8');
    return;
  }
  if (/<head\b[^>]*>/i.test(html)) {
    html = html.replace(/<\/head\s*>/i, `${NAV_STYLES}\n</head>`);
  }

  html = html.replace(/<body\b([^>]*)>/i, (bodyTag, attributes) => {
    let updatedAttributes = attributes;
    const styleAttribute = /\sstyle\s*=\s*(["'])(.*?)\1/i.exec(attributes);
    if (styleAttribute) {
      const style = styleAttribute[2];
      const updatedStyle = /(?:^|;)\s*padding-top\s*:/i.test(style)
        ? style.replace(/padding-top\s*:[^;]*/i, 'padding-top: 4rem')
        : `${style.trim().replace(/;?$/, ';')} padding-top: 4rem;`;
      updatedAttributes = attributes.replace(styleAttribute[0], ` style=${styleAttribute[1]}${updatedStyle}${styleAttribute[1]}`);
    } else {
      updatedAttributes += ' style="padding-top: 4rem;"';
    }
    return `<body${updatedAttributes}>\n${NAVIGATION}`;
  });

  writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${filePath}`);
}

for (const file of listHtmlFiles(DOCS_DIR)) injectNavigation(file);
