export const isInvalidDate = (d: Date): boolean => d.toString() === new Date('').toString();

export const dateOf = (s?: string): Date | undefined => {
  if (!s) { return }
  const r = new Date(s);
  if (isInvalidDate(r)) { throw Error('Invalid date') }
  return r;
};

export const addDays = (d: Date, n: number): Date => new Date(d.getTime() + n * 24 * 60 * 60 * 1000);
export const toDateOnly = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const earlierDateOf = (l: Date, r: Date): Date => l < r ? l : r;
export const daysInRange = function* (s: Date, e?: Date): Generator<Date> { 
  for (let d = s; e === undefined || d < e; d = addDays(d, 1)) { yield d }
};
