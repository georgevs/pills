export const isInvalidDate = (d: Date): boolean => d.toString() === new Date('').toString();

export const date = (s: string): Date => {
  const r = new Date(s);
  if (isInvalidDate(r)) { throw Error('Invalid date') }
  return r;
};

export const addDays = (d: Date, n: number): Date => new Date(d.getTime() + n * 24 * 60 * 60 * 1000);
export const earlierDate = (l: Date, r: Date): Date => l < r ? l : r;
