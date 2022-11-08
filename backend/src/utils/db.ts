export const fetchData = (buildQuery) => (connection) => (details, callback) => {
  const [sql, values] = buildQuery(details);
  connection.query(sql, values, callback);
};

export const buildTableQuery = ({ table, fields: tableFields }) => ({ fields: queryFields, filter, start, count }) => {
  const fields = queryFields?.filter(Array.prototype.includes.bind(tableFields)).join(',') || '*';
  const select = `SELECT ${fields}`;

  const from = `FROM ${table}`;

  const [terms, values] = Object.entries(lens(tableFields).view(filter))
    .filter(([_, value]) => value !== undefined)
    .reduce(([terms, values], [name, value]) => [[...terms, `${name}=?`], [...values, value]], [[], []]);
  const where = terms.length ? 'WHERE ' + terms.join(' AND ') : '';

  const limit = count > 0 ? `LIMIT ${count}` : '';
  const offset = start >= 0 ? `OFFSET ${start}` : '';

  const sql = [select, from, where, limit, offset].filter(Boolean).join(' ');
  return [sql, values];
};

const view = (keys) => (obj = {}) => Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));

const lens = (keys) => ({
  view: view(keys)
});
