#!/bin/bash

rm -r ./api-test/core
mkdir -p ./api-test/core
cp -R ./node_modules/api-test/api-test/core/ ./api-test/core

echo "Please update also scripts and dependencies in package.json, and .gitignore"
