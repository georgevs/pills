export const filter = (fn) => function* (xs) { let i = 0; for (const x of xs) if (fn(x, i++)) yield x };
export const takeWhile = (fn) => function* (xs) { let i = 0; for (const x of xs) if (fn(x, i++)) yield x; else break };
export const takeUntil = (fn) => function* (xs) { let i = 0; for (const x of xs) { yield x; if (!fn(x, i++)) break } };
