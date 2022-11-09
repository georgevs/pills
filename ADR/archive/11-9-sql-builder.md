# SQL builder

## Summary

Proposed module for building sql query string, so that raw string literal concatenations are avoided thus preventing SQL injection vulnerabilities.

Alternative: see https://hiddentao.github.io/squel/

## Proposal
```
https://pills.spamfro.xyz/api/drugs
expect(new RequestDetails(req)).toEqual({})
drugs = table('pills.drugs').fields(['id', 'description', 'doses'])
expect(select().from(drugs).query()).toEqual({ sql: 'SELECT * FROM pills.drugs' })

https://pills.spamfro.xyz/api/drugs/123
expect(new RequestDetails(req)).toEqual({ params: { id: 123 } })
expect(select().from(drugs).where(and(details.params)).limit(1).query())
  .toEqual({ sql: 'SELECT * FROM pills.drugs WHERE id=? LIMIT 1', values: [123] })

https://pills.spamfro.xyz/api/drugs/123?q=id,description&q.doses=0
expect(new RequestDetails(req)).toEqual({ params: { id: 123 }, query: { fields: ['id', 'description'], filter: { doses: 0 } } })
expect(select().fields(details.query.fields).from(drugs).where(and(details.params, details.query.filter)).query())
  .toEqual({ sql: 'SELECT id,description FROM pills.drugs WHERE id=? AND doses=?', values: [123,0] })

https://pills.spamfro.xyz/api/prescription/42/drugs?q=description,doses&q.doses=0&s=5&c=10
expect(new RequestDetails(req)).toEqual({ params: { pid: 42 }, query: { fields: ['description','doses'], filter: { doses: 0 }, start: 5, count: 10 } })

tracks = table('pills.tracks').fields(['id','pid','did','dose','slot','span','times','filter'])
expect(
  select().fields(details.query.fields).from(drugs)
    .where(and(
      details.query.filter,
      in(drugs.id,
        select({distinct}).fields([tracks.did]).from(tracks).where(and(details.params)))))
    .offset(details.query.start).limit(details.query.count)
    .query()
).toEqual({ sql: 'SELECT description,doses FROM pills.drugs WHERE doses=? AND id IN (SELECT DISTINCT did FROM pills.tracks WHERE pid=?) OFFSET 5 LIMIT 10', values: [0, 42]})

pd = table('pd').fields(['did'])
expect(select().fields(details.query.fields)
  .from(
    join(drugs, select({distinct}).fields([tracks.did]).from(tracks).as(pd))
      .on(eq(drugs.id, pd.did))))
  .where(and(details.query.filter))
  .offset(details.query.start).limit(details.query.count)
  .query()
).toEqual({
  sql: 'SELECT description,doses FROM pills.drugs JOIN (SELECT DISTINCT did FROM pills.tracks WHERE pid=?) AS pd ON pills.drugs.id=pd.did WHERE doses=? OFFSET 5 LIMIT 10',
  values: [42,0]
})
```
