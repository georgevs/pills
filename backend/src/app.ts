import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import RequestQuery from './utils/request-query';

const app = (db) => {
  const app = express();
  
  // https://expressjs.com/en/resources/middleware/cors.html
  app.use(cors());

  // http://expressjs.com/en/resources/middleware/body-parser.html
  app.use(bodyParser.json());

  // See wiki/restful-api.md
  
  // const parseQuery = (query) => {
  //   const parse = (re) => RegExp.prototype.exec.bind(re);
  //   const parseQueryField = (function () {
  //     const match = parse(/^q\.(.+)/);
  //     const cons = ([_, field]) => field;
  //     return (x) => [x].map(match).filter(Boolean).map(cons).pop();
  //   })();
  //   return Object.entries(query)
  //     .reduce((acc, [key, value]) => {
  //       let field, start, count;
  //       if (key === 'q') { acc.fields = value.split(',') }
  //       else if (key === 's' && (start = Number.parseInt(value)) > 0) { acc.start = start }
  //       else if (key === 'c' && (count = Number.parseInt(value)) > 0) { acc.count = count }
  //       else if (field = parseQueryField(key)) { acc.filter[field] = value }
  //       return acc;
  //     }, { filter: {} });
  // };

  // curl 'https://127.0.0.1:3444/pills/drugs'
  // curl 'https://127.0.0.1:3444/pills/drugs?q.id=1'
  // curl 'https://127.0.0.1:3444/pills/drugs?q=id,description,doses'
  // curl 'https://127.0.0.1:3444/pills/drugs?s=5&c=5'
  // app.get('/pills/drugs', (req, res) => {
  //   const query = parseQuery(req.query);
  //   res.setHeader('Content-Type', 'application/json');
  //   db.fetchDrugs(query, send(res));
  // });

  app.get('/pills/drugs', (req, res) => {
    const query = new RequestQuery(req.query);
    res.setHeader('Content-Type', 'application/json');
    db.fetchDrugs(query, send(res));
  });

  // curl 'https://127.0.0.1:3444/pills/drugs/1'
  // curl 'https://127.0.0.1:3444/pills/drugs/1?q=id,description,doses'
  app.get('/pills/drugs/:id', (req, res) => {
    const { id } = req.params;
    const { fields } = new RequestQuery(req.query);
    res.setHeader('Content-Type', 'application/json');
    const query = { fields, filter: { id }, count: 1 };
    db.fetchDrugs(query, sendFound(res));
  });

  // curl 'https://127.0.0.1:3444/pills/prescriptions/1/drugs'
  app.get('/pills/prescriptions/:pid/drugs', (req, res) => {
    const { pid } = req.params;
    // const { fields } = parseQuery(req.query);
    res.setHeader('Content-Type', 'application/json');
    // const query = { fields, filter: { id }, count: 1 };
    const query = { filter: { pid } };
    db.fetchPrescriptionsDrugs(query, sendFound(res));
  });

  const send = (res) => (err, results) => {
    res.status(err ? 500 : results.length == 0 ? 404 : 200);
    res.send(JSON.stringify(err || results));
  };

  const sendFound = (res) => (err, results) => {
    res.status(err ? 500 : results.length == 0 ? 404 : 200);
    res.send(JSON.stringify(err || results[0] || {}));
  };
  
  return app;
};

export default app;
