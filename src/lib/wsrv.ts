export interface WsrvOptions {
	w?: number;
	h?: number;
	output?: 'webp' | 'avif' | 'jpeg' | 'png';
	q?: number;
	fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export function wsrv(sourceUrl: string, opts: WsrvOptions = {}): string {
	const params = new URLSearchParams({ url: sourceUrl });
	params.set('output', opts.output ?? 'webp');
	params.set('q', String(opts.q ?? 85));
	if (opts.w) params.set('w', String(opts.w));
	if (opts.h) params.set('h', String(opts.h));
	if (opts.fit) params.set('fit', opts.fit);
	return `https://wsrv.nl/?${params.toString()}`;
}

export function wsrvSrcset(
	sourceUrl: string,
	widths: number[],
	opts: Omit<WsrvOptions, 'w'> = {},
): string {
	return widths.map((w) => `${wsrv(sourceUrl, { ...opts, w })} ${w}w`).join(', ');
}

/** Intrinsic size of a hero/cover image: from metadata for local assets,
 *  from `?width=&height=` query params for remote URLs (empty if absent). */
export function imageDimensions(src: string | ImageMetadata): { width?: number; height?: number } {
	if (typeof src !== 'string') return { width: src.width, height: src.height };
	try {
		const params = new URL(src).searchParams;
		const w = params.get('width');
		const h = params.get('height');
		return {
			width: w ? parseInt(w, 10) : undefined,
			height: h ? parseInt(h, 10) : undefined,
		};
	} catch {
		return {};
	}
}
