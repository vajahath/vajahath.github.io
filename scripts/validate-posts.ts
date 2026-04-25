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

let hasErrors = false;

console.log(`Validating ${blogFiles.length} posts...`);

blogFiles.forEach(file => {
  const fileContent = fs.readFileSync(file, 'utf8');
  const { data: frontmatter } = matter(fileContent);
  const relativePath = path.relative(BLOG_DIR, file);

  const errors: string[] = [];

  // Required fields
  if (!frontmatter.title) errors.push('Missing "title"');
  if (!frontmatter.description) errors.push('Missing "description"');
  if (!frontmatter.pubDate) errors.push('Missing "pubDate"');
  if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) errors.push('Missing or invalid "tags"');

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
