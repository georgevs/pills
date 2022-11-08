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

const fetchPrescriptionsDrugs = (connection) => ({ filter: { pid } }, callback) => {
  // const [sql, values] = buildQuery(details);
  const [sql, values] = ['call pills.prescription_drugs_1(?)', [pid]];
  console.log({ sql, values });
  connection.query(sql, values, callback);
};

const db = ({ host, port, user, password }) => {
  const connection = mysql.createConnection({ host, port, user, password });
  return {
    fetchDrugs: fetchDrugs(connection),
    fetchPrescriptionsDrugs: fetchPrescriptionsDrugs(connection)
  };
};

export default db;
