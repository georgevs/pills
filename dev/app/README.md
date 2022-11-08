# Pills app

## Link live certificates (option #1)
```
ln -svfT ~/ws-private/certs ./certs
```
## Decrypt live certificates (option #2)
```
openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.bin | tar xzv --directory ./
```
## Build and run on localhost
```
npm install
npm run build
npm run start
```
