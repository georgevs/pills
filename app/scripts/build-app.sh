#!/bin/bash

ln -fsv ../csstype ./node_modules/@types/csstype

mkdir -p ./dist ./build/app

pushd ./src/app
tar c *.html *.ico | tar xv --directory ../../dist
popd

rollup --config ./rollup.config-app.js

pushd ./build/app
tar c *.js *.css | tar xv --directory ../../dist
popd
