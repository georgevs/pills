#!/bin/bash

mkdir -p ./certs

openssl genrsa -des3 -out ./certs/root-key.pem 4096
openssl req -new -sha256 -x509 -days 5475 -subj "/C=US/ST=CA/L=SB/O=spamfro/OU=IT/CN=Spamfro Test Root Certificate" -key ./certs/root-key.pem -out ./certs/root.crt
  
# ... import root.crt in Local Computer Trusted Root Certification Authorities
