# API Test Template

## Initialize for your project
* add `"api-test": "https://github.com/YuhuiCF/api-test.git"` to the `"dependencies"` of your own package.json
* run `npm i` to install the api-test module, which will be placed in `node_modules/api-test`
* in the node_modules:
  - copy api-test/core to your own api-test/core
  - copy configuration file api-test/config.js to your own api-test/config.js, and update the fields
  - copy scripts, nyc, and dependencies from package.json to your own package.json
  - add terms of .gitignore to your own .gitignore
  - api-test/test/ could be used as reference of writing tests

## Update api-test module
```
# this could also be used for initializing
bash node_modules/api-test/update.sh
```
* udpate configs in api-test/config.js

## Run the test:
```
# indicate whether the mcon-group API Tester (https://github.com/mcon-group/apitester) is used or not
export apiTesterNewVersion=1 # or ignore this, if old version of API Tester is used

# indicate the api host
export apiHost='https://a.bc.de'

# initialize the rest APIs from your API Tester
npm run api-test:init-api

# run api tests, coverage report will be found in api-test/coverage
npm run api-test:istanbul

# send coverage report to your sonar server
npm run api-test:sonar


# or in one command
npm install && export apiHost='https://a.bc.de'; npm run api-test:test
```

## Additional methods to retrieve data from the response
```javascript
response.getRequestMethod();
response.getRequestOptions();
response.getRequestPath();
response.getResponseHeaders();
response.getResponseBody();
response.getStatusCode();
```
