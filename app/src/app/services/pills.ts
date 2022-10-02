// const fetchData = () => (
//   fetch('data', new URL('https://spamfro.xyz/api/pills/v1/'))
//     .then(resp => { 
//       if (!resp.ok) { throw Error(resp.statusText) }
//       return resp.json();
//     })
// );

export class Pills {
  constructor(config) { }

  drugs() {
    return Promise.resolve([
      { "id": 1, "description": "Xymebac 200", "doses": 14 },
      { "id": 2, "description": "Lymex", "doses": 10 },
      { "id": 3, "description": "Mycomax", "doses": 1 },
      { "id": 4, "description": "Sintrom", "doses": 30 }
    ]);
  }

  prescriptions() {
    return Promise.resolve([
      { "id": 1, "issued": "9/1/2022", "started": "9/1/2022" },
      { "id": 2, "issued": "9/1/2022", "started": "9/1/2022" }
    ]);
  }

  tracks() {
    return Promise.resolve([
      { "id": 1, "pid": 1, "did": 1, "dose": 1, "slot": 800, "span": 7 },
      { "id": 2, "pid": 1, "did": 1, "dose": 1, "slot": 2000, "span": 7 },
      { "id": 3, "pid": 1, "did": 2, "dose": 1, "slot": -3, "span": 7 },
      { "id": 4, "pid": 1, "did": 3, "dose": 1, "slot": -3, "times": 1, "filter": "3" },
      { "id": 5, "pid": 2, "did": 4, "dose": 1/4, "slot": -5, "span": 30, "filter": "we-th,sa-mo" },
      { "id": 6, "pid": 2, "did": 4, "dose": 1/2, "slot": -5, "span": 30, "filter": "tu,fr" }
    ]);
  }

  history() {
    return Promise.resolve([
      { "timestamp": "9/1/2022 8:00", "tid": 1 },
      { "timestamp": "9/1/2022 12:00", "tid": 3 },
      { "timestamp": "9/1/2022 20:00", "tid": 2 },
      { "timestamp": "9/1/2022 20:00", "tid": 5 },
      { "timestamp": "9/2/2022 8:00", "tid": 1 },
      { "timestamp": "9/2/2022 12:00", "tid": 3 },
      { "timestamp": "9/2/2022 20:00", "tid": 2 },
      { "timestamp": "9/2/2022 20:00", "tid": 6 },
      { "timestamp": "9/3/2022 8:00", "tid": 1 },
      { "timestamp": "9/3/2022 12:00", "tid": 3 },
      { "timestamp": "9/3/2022 12:00", "tid": 4 },
      { "timestamp": "9/3/2022 20:00", "tid": 2 },
      { "timestamp": "9/3/2022 20:00", "tid": 5 }
    ]);
  }
}

