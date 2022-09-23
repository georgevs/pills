import { PillsConfig } from "./services/pills";

export interface Conifg {
  pills: PillsConfig;
}

const config = (): Conifg => ({
  pills: {
    baseUrl: new URL('https://spamfro.xyz/api/v1/pills/')
  }
});

export default config;
