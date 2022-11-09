import mysql from 'mysql2';

const db = ({ host, port, user, password }) => {
  const connection = mysql.createConnection({ host, port, user, password });

  const fetchPrescriptionsDrugs = ({ pid }, callback) => {
    const sql = 'SELECT * FROM pills.drugs WHERE id IN (SELECT DISTINCT did FROM pills.tracks WHERE pid=?)';
    connection.query(sql, [pid], callback);
  };

  const fetchDrugs = (callback) => {
    const sql = 'SELECT * FROM pills.drugs';
    connection.query(sql, callback);
  };
  
  const fetchDrug = ({ id }, callback) => {
    const sql = 'SELECT * FROM pills.drugs WHERE id=?';
    connection.query(sql, [id], callback);
  };

  const fetchPrescriptions = (callback) => {
    const sql = 'SELECT * FROM pills.prescriptions';
    connection.query(sql, callback);
  };

  const fetchTracks = (callback) => {
    const sql = 'SELECT * FROM pills.tracks';
    connection.query(sql, callback);
  };

  const fetchHistory = (callback) => {
    const sql = 'SELECT * FROM pills.history';
    connection.query(sql, callback);
  };

  return { 
    fetchDrugs, fetchDrug, fetchPrescriptionsDrugs,
    fetchPrescriptions, fetchTracks, fetchHistory
  };
};

export default db;
