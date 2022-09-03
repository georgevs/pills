// const fetchData = () => (
//   fetch('https://spamfro.xyz/api/data')   // config.data.url
//     .then(resp => { 
//       if (!resp.ok) { throw Error(resp.statusText) }
//       return resp.json();
//     })
// );

export const fetchData = () => Promise.resolve([
  'item #1',
  'item #2',
  'item #3',
  'item #4',
  'item #5',
]);
