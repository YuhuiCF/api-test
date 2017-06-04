#!/bin/bash

# ./api-test/core
rm -r ./api-test/core
mkdir -p ./api-test/core
cp -R ./node_modules/api-test/api-test/core/ ./api-test/core

# ./api-test/core
rm -r ./api-test/config.js
mkdir -p ./api-test/
cp -R ./node_modules/api-test/api-test/config.js ./api-test/config.js

echo "Please update also package.json and .gitignore"
