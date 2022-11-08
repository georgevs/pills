import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = (db) => {
  const app = express();
  
  // https://expressjs.com/en/resources/middleware/cors.html
  app.use(cors());

  // http://expressjs.com/en/resources/middleware/body-parser.html
  app.use(bodyParser.json());

  // RESTful API - https://www.restapitutorial.com/lessons/httpmethods.html
  //
  // -- Create
  //   POST /customers
  //     201 (Created), 'Location' header with link to /customers/{id} containing new ID.
  //   POST /customers/{id}
  //     404 (Not Found), 409 (Conflict) if resource already exists.
  //
  // -- Read
  //   GET /customers
  //     200 (OK), list of customers. Use pagination, sorting and filtering to navigate big lists.
  //   GET /customers/{id}
  //     200 (OK), single customer. 404 (Not Found), if ID not found or invalid.
  //
  // -- Update/Replace
  //   PUT /customers
  //     405 (Method Not Allowed), unless you want to update/replace every resource in the entire collection.
  //   PUT /customers/{id}
  //     200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
  //
  // -- Update/Modify
  //   PATCH /customers
  //     405 (Method Not Allowed), unless you want to modify the collection itself.
  //   PATCH /customers/{id}
  //     200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
  //
  // -- Delete
  //   DELETE /customers
  //     405 (Method Not Allowed), unless you want to delete the whole collection—not often desirable.
  //   DELETE /customers/{id}
  //     200 (OK). 404 (Not Found), if ID not found or invalid.
  
  
  const parseQuery = (query) => {
    const parse = (re) => RegExp.prototype.exec.bind(re);
    const parseQueryField = (function () {
      const match = parse(/^q\.(.+)/);
      const cons = ([_, field]) => field;
      return (x) => [x].map(match).filter(Boolean).map(cons).pop();
    })();
    return Object.entries(query)
      .reduce((acc, [key, value]) => {
        let field, start, count;
        if (key === 'q') { acc.fields = value.split(',') }
        else if (key === 's' && (start = Number.parseInt(value)) > 0) { acc.start = start }
        else if (key === 'c' && (count = Number.parseInt(value)) > 0) { acc.count = count }
        else if (field = parseQueryField(key)) { acc.filter[field] = value }
        return acc;
      }, { filter: {} });
  };

  // curl 'https://127.0.0.1:3444/pills/drugs'
  // curl 'https://127.0.0.1:3444/pills/drugs?q.id=1'
  // curl 'https://127.0.0.1:3444/pills/drugs?q=id,description,doses'
  // curl 'https://127.0.0.1:3444/pills/drugs?s=5&c=5'
  app.get('/pills/drugs', (req, res) => {
    const query = parseQuery(req.query);
    res.setHeader('Content-Type', 'application/json');
    db.fetchDrugs(query, send(res));
  });

  // curl 'https://127.0.0.1:3444/pills/drugs/1'
  // curl 'https://127.0.0.1:3444/pills/drugs/1?q=id,description,doses'
  app.get('/pills/drugs/:id', (req, res) => {
    const { id } = req.params;
    const { fields } = parseQuery(req.query);
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
