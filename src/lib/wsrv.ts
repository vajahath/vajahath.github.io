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
