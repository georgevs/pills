interface Query {
  filter?: Record<string, string>;
  fields?: string[];
  start?: Number;
  count?: Number;
}

export default Query;
