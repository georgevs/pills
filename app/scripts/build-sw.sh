#!/bin/bash

mkdir -p ./dist ./build/sw

rollup --config ./rollup.config-sw.js

pushd ./build/sw
tar c *.js | tar xv --directory ../../dist
popd
