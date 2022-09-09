# Pills

## Generate test certificates
```
npm install
./scripts/test-certs-gen-root.sh
./scripts/test-certs-gen.sh
```
## Link live certificates (option #1)
```
ln -svfT ~/ws-webroot/secret/certs ./certs
```
## Decrypt live certificates (option #2)
```
openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.bin | tar xzv -
-directory ./
```
## Build and run on localhost
```
npm install
npm run build
npm run start
```
## Build and run in docker
```
npm install
npm run build
ln -svfT $(pwd) ~/ws-webroot/public
docker container start -ia ws-ubuntu-www
cd ~/ws-webroot/public/
npm run start
```
## Deploy to GitHub pages
```
npm install
npm run build
npm run deploy
```
Open at https://spamfro.github.io/pills/
