#!/bin/bash

mkdir -p ./dist ./build

tsc --project ./src/tsconfig.json

pushd ./build
find . -type f -name '*.js' | tar c -T - | tar xv --directory ../dist
popd
