// transform :: x -> y
// classify :: x -> [y]
// key :: x -> [k,v]

// (x -> [k,v]) -> [x] -> { k -> v }
export const indexBy = (fn) => (xs) => new Map((xs || []).map(fn));

// pair :: (x -> [y]) -> [x] -> [[y, x]]
export const pair = (fn) => (xs) => xs.flatMap(x => fn(x).map(y => [y, x]));

// fold :: [[y, x]] -> { y -> [x] }
export const fold = (xs) => (
  xs.reduce(
    (acc, [y, x]) => { 
      let r = acc.get(y) ?? []; 
      return acc.set(y, (r.push(x), r))
    }, 
    new Map
  )
);

// remap :: (x -> y) -> { k -> x } -> { k -> y }
export const remap = (fn) => (m) => Array.from<any>(m.entries()).reduce((acc, [y, x]) => acc.set(y, fn(x)), new Map);

// map :: (x -> y) -> [x] -> [y]
export const map = (fn) => (xs) => xs.map(fn);

// compose :: (...fns) -> (x -> y)
export const compose = (...fns) => fns.reduce((g, f) => x => g(f(x)));

// index :: (x -> [y]) -> [x] -> { y -> [x] } 
export const index = (fn) => compose(fold, pair(fn));

export const unique = (fn) => {
  const m = new Map;
  return (x) => {
    let k = fn(x);
    return (m.get(k) ?? (m.set(k, x), x));
  }
};
