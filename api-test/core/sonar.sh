#!/bin/bash

# Sonar settings
# sed -E "s/\SF:.+\/api-test\//SF:api-test\//" api-test/coverage/lcov.info > api-test/coverage/lcov-sonar.info
npm run api-test:sonarscan
