#!/bin/bash

http-server ./dist -c-1 --ssl -p 3443 --cert ./certs/cert.pem --key ./certs/cert-key-nopassword.pem
