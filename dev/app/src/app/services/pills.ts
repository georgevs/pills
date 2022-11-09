export class Pills {
  constructor(private config) { }

  private fetch(path) {
    return fetch(new URL(path, this.config.baseUrl))
      .then(resp => {
        if (!resp.ok) { throw Error(resp.statusText) }
        return resp.json();
      })
  }

  drugs() { return this.fetch('drugs') }
  prescriptions() { return this.fetch('prescriptions') }
  tracks() { return this.fetch('tracks') }
  history() { return this.fetch('history') }
}
