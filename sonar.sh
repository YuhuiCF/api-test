#!/bin/bash

# Sonar settings
sed -E "s/\SF:.+\/taxonomy-api-test\//SF:taxonomy-api-test\//" coverage/lcov.info > coverage/lcov-sonar.info
npm run sonarscan
