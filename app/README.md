# Pills

## Generate test certificates
```
npm install
./scripts/test-certs-gen-root.sh
./scripts/test-certs-gen.sh
```
## Link live certificates
```
ln -svfT ~/ws-webroot/secret/certs ./certs
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
Open at http://spamfro.github.io/pills/
