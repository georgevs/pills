export const isInvalidDate = (d: Date): boolean => d.toString() === new Date(undefined).toString();

export const date = (s: string): Date => {
  const r = new Date(s);
  if (isInvalidDate(r)) { throw Error('Invalid date') }
  return r;
};
