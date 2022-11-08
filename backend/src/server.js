import https from 'https';

const server = ({ key, cert, port }) => {
  let server;
  const start = (app) => {
    server = https.createServer({ key, cert }, app);
    server.listen(port, () => {
      console.log(`Available on:\n\thttps://127.0.0.1:${port}`);
    });
  };
  return {
    start
  };
};

export default server;
