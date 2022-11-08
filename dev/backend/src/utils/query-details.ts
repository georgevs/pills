interface QueryDetails {
  filter?: Record<string, string>;
  fields?: string[];
  start?: Number;
  count?: Number;
  params?: Record<string, string>;
}

export default QueryDetails;
