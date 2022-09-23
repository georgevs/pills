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
openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.bin | tar xzv --directory ./
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

## References
- [CSS checkbox](https://www.javatpoint.com/css-checkbox-style)
- [CSS custom checkbox](https://www.w3schools.com/howto/howto_css_custom_checkbox.asp)
- [CSS style a checkbox](https://stackoverflow.com/questions/4148499/how-to-style-a-checkbox-using-css)
- [The checkbox hack](https://css-tricks.com/the-checkbox-hack/)
- [Custom checkbox with CSS](https://www.css3.com/implementing-custom-checkboxes-and-radio-buttons-with-css3/)
- [Style a checkbox with CSS](https://paulund.co.uk/how-to-style-a-checkbox-with-css)

## Date API
```
new Date(yyyy,mm,dd,...) -> local time yyyy/mm/dd...
new Date(Date.UTC(yyyy,mm,dd,...)) -> UTC time yyyy,mm,dd,...

new Date(yyyy,mm,dd,...).valueOf() -> number of milliseconds since 1 January 1970 00:00:00 UTC to local time yyyy/mm/dd...
Date.UTC(yyyy,mm,dd,...) -> number of milliseconds since 1 January 1970 00:00:00 UTC to UTC time yyyy/mm/dd...

new Date(yyyy,mm,dd,...).getTime() === new Date(yyyy,mm,dd,...).valueOf()

new Date(date.getFullYear(), date.getMonth(), date.getDay()) -> local date only (time is 00:00h)
```
