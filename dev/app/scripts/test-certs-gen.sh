#!/bin/bash

[ -f ./certs/root.crt ] || exit 1
openssl genrsa -des3 -out ./certs/cert-key.pem 4096
openssl req -new -sha256 -days 5475 -subj "/C=US/ST=CA/L=SB/O=spamfro/OU=IT/CN=*.spamfro.xyz" -key ./certs/cert-key.pem -out ./certs/cert-csr.pem
openssl x509 -req -sha256 -in ./certs/cert-csr.pem -CA ./certs/root.crt -CAkey ./certs/root-key.pem -set_serial 01 -extfile ./scripts/test-certs.conf -out ./certs/cert.crt
openssl x509 -in ./certs/cert.crt -out ./certs/cert.pem -outform PEM
openssl rsa -in ./certs/cert-key.pem -out ./certs/cert-key-nopassword.pem
  