/**
 * Post-build guard: every rendered page must have exactly one <h1> and a
 * heading outline that never skips a level.
 *
 * The content validator checks markdown source, but layouts and components
 * inject headings too, so the built HTML is the only place the real outline
 * is visible. Runs over dist/ after `astro build`.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

function htmlFiles(dir: string, found: string[] = []): string[] {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) htmlFiles(full, found);
		else if (entry.name.endsWith('.html')) found.push(full);
	}
	return found;
}

if (!fs.existsSync(DIST)) {
	console.error('💥 dist/ not found — run `astro build` first.');
	process.exit(1);
}

const pages = htmlFiles(DIST);
console.log(`Checking heading order on ${pages.length} pages...`);

let hasErrors = false;

for (const page of pages) {
	const html = fs.readFileSync(page, 'utf8');
	const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
	const route = '/' + path.relative(DIST, page).replace(/index\.html$/, '');

	const errors: string[] = [];
	const h1Count = levels.filter((l) => l === 1).length;
	if (h1Count !== 1) errors.push(`expected exactly one <h1>, found ${h1Count}`);

	let previous = 0;
	levels.forEach((level, i) => {
		if (previous && level > previous + 1) {
			errors.push(`heading ${i + 1} jumps from H${previous} to H${level}`);
		}
		previous = level;
	});

	if (errors.length > 0) {
		hasErrors = true;
		console.error(`\n❌ ${route}`);
		console.error(`   outline: ${levels.map((l) => `h${l}`).join(' ')}`);
		errors.forEach((e) => console.error(`   - ${e}`));
	}
}

if (hasErrors) {
	console.error('\n💥 Heading order check failed.');
	process.exit(1);
}
console.log('\n✅ Heading order is valid on every page!');
