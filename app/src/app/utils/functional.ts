export const index = (fn) => (xs) => xs.map(x => [fn(x), x]);
export const fold = (xs) => (
  xs.reduce(
    (acc, [k, x]) => {
      let r = acc.get(k) ?? []; 
      return acc.set(k, (r.push(x), r));
    },
    new Map
  )
);

export const unique = (fn) => {
  const m = new Map;
  return (x) => {
    let k = fn(x);
    return (m.get(k) ?? (m.set(k, x), x));
  }
};
