import express, { request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import RequestQueryDetails from './utils/request-query-details';

const app = (db) => {
  const app = express();
  
  // https://expressjs.com/en/resources/middleware/cors.html
  app.use(cors());

  // http://expressjs.com/en/resources/middleware/body-parser.html
  app.use(bodyParser.json());

  const sendAll = (res) => (err, results) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(err ? 500 : results.length == 0 ? 404 : 200);
    res.send(JSON.stringify(err || results));
  };

  const sendOne = (res) => (err, results) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(err ? 500 : results.length == 0 ? 404 : 200);
    res.send(JSON.stringify(err || results[0] || {}));
  };

  // See wiki/restful-api.md
  
  // curl 'https://spamfro.xyz:3444/pills/drugs'
  // curl 'https://spamfro.xyz:3444/pills/drugs?q.id=1'
  // curl 'https://spamfro.xyz:3444/pills/drugs?q=id,description,doses'
  // curl 'https://spamfro.xyz:3444/pills/drugs?s=5&c=5'
  app.get('/pills/drugs', (req, res) => {
    const details = new RequestQueryDetails(req.query);
    db.fetchDrugs(details, sendAll(res));
  });

  // curl 'https://spamfro.xyz:3444/pills/drugs/1'
  // curl 'https://spamfro.xyz:3444/pills/drugs/1?q=id,description,doses'
  app.get('/pills/drugs/:id', (req, res) => {
    const { id } = req.params;
    const { fields } = new RequestQueryDetails(req.query);
    const details = { fields, filter: { id }, count: 1 };
    db.fetchDrugs(details, sendOne(res));
  });

  // curl 'https://spamfro.xyz:3444/pills/prescriptions/1/drugs'
  // curl 'https://spamfro.xyz:3444/pills/prescriptions/1/drugs?q=id,description,doses'
  app.get('/pills/prescriptions/:pid/drugs', (req, res) => {
    const { pid } = req.params;
    const details = new RequestQueryDetails(req.query);
    db.fetchPrescriptionsDrugs({ ...details, params: { pid } }, sendAll(res));
  });
  
  return app;
};

export default app;
