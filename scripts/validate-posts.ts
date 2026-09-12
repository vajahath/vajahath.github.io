import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.resolve('src/content/blog');
const SERIES_DIR = path.resolve('src/content/series');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

const blogFiles = getAllFiles(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
let seriesFiles: string[] = [];
if (fs.existsSync(SERIES_DIR)) {
  seriesFiles = getAllFiles(SERIES_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
}

const validSeriesIds = seriesFiles.map(f => path.basename(f, path.extname(f)));

/**
 * Body headings must start at H2 and step down one level at a time.
 *
 * The page title is the H1, so a heading in the body that jumps to H3 (or
 * introduces a second H1) breaks the document outline and picks up the wrong
 * prose styling. Fenced code is skipped so shell comments aren't mistaken for
 * ATX headings.
 */
function headingErrors(body: string, lineOffset: number): string[] {
  const errors: string[] = [];
  let inFence = false;
  let previous = 1; // the rendered page supplies the H1
  body.split(/\r?\n/).forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    const match = /^(#{1,6})\s+(.*)$/.exec(line);
    if (!match) return;
    const level = match[1].length;
    const lineNo = i + 1 + lineOffset;
    if (level === 1) {
      errors.push(
        `Line ${lineNo}: "${match[2].trim()}" is an H1; the post title is already the page H1, so body headings start at H2`,
      );
    } else if (level > previous + 1) {
      errors.push(
        `Line ${lineNo}: "${match[2].trim()}" jumps from H${previous} to H${level}; headings may only step down one level`,
      );
    }
    previous = Math.max(level, 2);
  });
  return errors;
}

let hasErrors = false;

console.log(`Validating ${blogFiles.length} posts...`);

blogFiles.forEach(file => {
  const fileContent = fs.readFileSync(file, 'utf8');
  const { data: frontmatter, content: body } = matter(fileContent);
  const relativePath = path.relative(BLOG_DIR, file);

  const errors: string[] = [];

  // Required fields
  if (!frontmatter.title) errors.push('Missing "title"');
  if (!frontmatter.description) errors.push('Missing "description"');
  if (!frontmatter.pubDate) errors.push('Missing "pubDate"');
  if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) errors.push('Missing or invalid "tags"');

  // A titleHighlight that isn't in the title renders as a plain, unmarked
  // headline — a silent miss, so fail the build instead.
  if (frontmatter.titleHighlight) {
    const title = String(frontmatter.title ?? '');
    if (!title.toLowerCase().includes(String(frontmatter.titleHighlight).toLowerCase())) {
      errors.push(
        `"titleHighlight" ("${frontmatter.titleHighlight}") does not appear in "title" ("${title}")`,
      );
    }
  }

  // Series check
  if (frontmatter.seriesOrder != null) {
    if (!frontmatter.seriesId) {
      errors.push('Has "seriesOrder" but missing "seriesId"');
    }
  }

  if (frontmatter.seriesId) {
    if (!validSeriesIds.includes(frontmatter.seriesId)) {
      errors.push(`References unknown seriesId: "${frontmatter.seriesId}"`);
    }
  }

  // gray-matter strips the frontmatter, so add it back to report real line numbers.
  const bodyStart = fileContent.length - body.length;
  const lineOffset = fileContent.slice(0, bodyStart).split(/\r?\n/).length - 1;
  errors.push(...headingErrors(body, lineOffset));

  if (errors.length > 0) {
    hasErrors = true;
    console.error(`\n❌ Error(s) in ${relativePath}:`);
    errors.forEach(err => console.error(`   - ${err}`));
  }
});

if (hasErrors) {
  console.error('\n💥 Validation failed. Please fix the errors above.');
  process.exit(1);
} else {
  console.log('\n✅ All posts validated successfully!');
  process.exit(0);
}
