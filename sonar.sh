#!/bin/bash

# Sonar settings
sed -E "s/\SF:.+\/api-test\//SF:api-test\//" coverage/lcov.info > coverage/lcov-sonar.info
npm run sonarscan
