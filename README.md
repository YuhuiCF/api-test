# API Test Template

## Initialize for your project
* copy api-test/core to your own api-test/core
* copy configuration file api-test/config.js to your own api-test/config.js, and update the fields
* copy scripts and dependencies from packages.json to your own packages.json
* add terms of .gitignore to your own .gitignore

## Update api-test module
```
# this could also be used for initializing
bash node_modules/api-test/update.sh
```

## Run the test:
```
npm install && export apiHost='https://a.bc.de'; npm run api-test:test
```
