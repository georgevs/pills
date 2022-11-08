import mysql from 'mysql2';
import { buildTableQuery, fetchData } from "./utils/db";

const pills = {
  drugs: {
    table: 'pills.drugs',
    fields: [
      'id', 'description', 'doses'
    ]
  }
};

const fetchDrugs = fetchData(buildTableQuery(pills.drugs));

const fetchPrescriptionsDrugs = (connection) => (details, callback) => {
  const [sql, values] = buildPrescriptionsDrugsQuery(details);
  console.log(sql, values);
  connection.query(sql, values, callback);
};

const buildPrescriptionsDrugsQuery = ({ fields: queryFields, filter, start, count, params: { pid } }) => {
  const fields = queryFields?.filter(field => pills.drugs.fields.includes(field)).join(',') || '*';
  const select = `SELECT ${fields}`;

  const from = `FROM ${pills.drugs.table}`;

  const clauses = Object.entries(new Lens(pills.drugs.fields).view(filter))
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => [`${key}=?`, value])
    .concat([['id IN (SELECT DISTINCT did FROM pills.tracks WHERE pills.tracks.pid = ?)', pid]]);
  const terms = clauses.map(([term]) => term);
  const values = clauses.map(([, value]) => value);
  const where = clauses.length ? 'WHERE ' + terms.join(' AND ') : '';

  const limit = count > 0 ? `LIMIT ${count}` : '';
  const offset = start >= 0 ? `OFFSET ${start}` : '';

  const sql = [select, from, where, limit, offset].filter(Boolean).join(' ');
  return [sql, values];
};

class Lens {
  constructor(private keys: string[]) { }
  view(obj = {}) { return Object.fromEntries(Object.entries(obj).filter(([key]) => this.keys.includes(key))) }
}

const db = ({ host, port, user, password }) => {
  const connection = mysql.createConnection({ host, port, user, password });
  return {
    fetchDrugs: fetchDrugs(connection),
    fetchPrescriptionsDrugs: fetchPrescriptionsDrugs(connection)
  };
};

export default db;
