
export const openQuotesDb = (): Promise<IDBDatabase> => (
  new Promise((resolve, reject) => {
    console.log('quotes-db/open');
    const req = window.indexedDB.open('data', 1);
    req.onerror = () => { reject(req.error) };
    req.onsuccess = () => { resolve(req.result) };
    req.onupgradeneeded = (event) => { upgradeQuotesDb(req.result, event) };
  })
);

const upgradeQuotesDb = (db: IDBDatabase, { oldVersion, newVersion }: IDBVersionChangeEvent): void => {
  console.log('quotes-db/upgrade', 'ver:', `${oldVersion} -> ${newVersion}`);
  db.createObjectStore('quotes', { keyPath: 'id' });
};

export const getQuotesDb = (db: IDBDatabase): Promise<any[]> => (
  new Promise((resolve, reject) => {
    console.log('quotes-db/get');
    const tr = db.transaction(['quotes'], 'readonly');
    tr.onerror = () => { reject(tr.error) };
    const store = tr.objectStore('quotes');
    const req = store.getAll();
    req.onsuccess = () => { resolve(req.result) };
  })
);

export const putQuotesDb = (db: IDBDatabase, quotes: any[]): Promise<void> => (
  new Promise((resolve, reject) => {
    console.log('quotes-db/put');
    const tr = db.transaction(['quotes'], 'readwrite');
    tr.onerror = () => { reject(tr.error) };
    tr.oncomplete = () => { resolve() };
    const store = tr.objectStore('quotes');
    quotes.forEach(quote => { store.put(quote) });
  })
);
