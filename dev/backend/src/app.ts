import express, { request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = (db) => {
  const app = express();
  
  // https://expressjs.com/en/resources/middleware/cors.html
  app.use(cors());

  // http://expressjs.com/en/resources/middleware/body-parser.html
  app.use(bodyParser.json());

  const sendAll = (res) => (err, results) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(err ? 500 : 200);
    res.send(JSON.stringify(err || results));
  };

  const sendOne = (res) => (err, results) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(err ? 500 : results.length == 0 ? 404 : 200);
    res.send(JSON.stringify(err || results[0] || {}));
  };

  // See wiki/restful-api.md
  
  // curl 'https://spamfro.xyz:3444/pills/drugs'
  app.get('/pills/drugs', (req, res) => {
    db.fetchDrugs(sendAll(res));
  });

  // curl 'https://spamfro.xyz:3444/pills/drugs/1'
  app.get('/pills/drugs/:id', (req, res) => {
    db.fetchDrug(req.params, sendOne(res));
  });

  // curl 'https://spamfro.xyz:3444/pills/prescriptions/1/drugs'
  app.get('/pills/prescriptions/:pid/drugs', (req, res) => {
    db.fetchPrescriptionsDrugs(req.params, sendAll(res));
  });

  // curl 'https://spamfro.xyz:3444/pills/prescriptions'
  app.get('/pills/prescriptions', (req, res) => {
    db.fetchPrescriptions(sendAll(res));
  });

  // curl 'https://spamfro.xyz:3444/pills/tracks'
  app.get('/pills/tracks', (req, res) => {
    db.fetchTracks(sendAll(res));
  });
  
  // curl 'https://spamfro.xyz:3444/pills/history'
  app.get('/pills/history', (req, res) => {
    db.fetchHistory(sendAll(res));
  });
  
  return app;
};

export default app;
