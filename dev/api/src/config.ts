import fs from 'fs';

const config = () => ({
  server: {
    key: fs.readFileSync('./certs/cert-key-nopassword.pem', 'utf8'),
    cert: fs.readFileSync('./certs/cert.pem', 'utf8'),
    port: 3443
  },
  db: {
    host: 'pills-dbs.spamfro.xyz',
    port: 3306,
    user: 'root',
    password: 'LikeBeingThere'
  }
});

export default config;
