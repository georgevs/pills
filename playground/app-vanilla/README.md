# Pills vanilla app

## Summary

Experiment with vanilla js app implementation

## Install live certificates
Download live certificates:
```
scp opx:~/ws-archive/certs.tar.gz.bin ~/ws-archive/certs.tar.gz.bin
openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.bin | tar xzv
```

## Manage secrets
Download secrets:
```
scp opx:~/ws-archive/pills.tar.gz.enc ~/ws-archive/pills.tar.gz.enc
openssl enc -d -aes-128-cbc -pbkdf2 -salt -in ~/ws-archive/pills.tar.gz.enc | tar xzv
```
Upload secrets:
```
tar czv secrets | openssl enc -aes-128-cbc -pbkdf2 -salt -out ~/ws-archive/pills.tar.gz.enc
scp ~/ws-archive/pills.tar.gz.enc opx:~/ws-archive/pills.tar.gz.enc
```

## Setup DNS
Verify `spamfro.xyz` points `127.0.0.1`. Setup at https://namecheap.com if necessary.
```
dig spamfro.xyz | grep '^spamfro.xyz'
  spamfro.xyz.            1759    IN      A       127.0.0.1
```

## Run the app
```
npx http-server ./src -c-1 --ssl -a spamfro.xyz -p 3443 --cert ./certs/cert.pem --key ./certs/cert-key-nopassword.pem
```
