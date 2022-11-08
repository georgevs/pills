import type QueryDetails from './query-details';

class RequestQueryDetails implements QueryDetails {
  filter?: Record<string, string>;
  fields?: string[];
  start?: Number;
  count?: Number;
  constructor(query: any) {
    const parseKey = RegExp.prototype.exec.bind(/^q\.(.+)/);
    const filter = Object.entries(query)
      .map(([key, value]) => [parseKey(key), value])
      .filter(([match]) => !!match)
      .map(([[, key], value]) => [key, value]);
    if (filter.length > 0) { this.filter = Object.fromEntries(filter) }  

    const fields = (query.q || '').split(',').map(key => key.trim()).filter(Boolean);
    if (fields.length > 0) { this.fields = fields }

    const start = Number.parseInt(query.s);
    if (start > 0) { this.start = start }

    const count = Number.parseInt(query.c);
    if (count > 0) { this.count = count }
  }
}

export default RequestQueryDetails;
