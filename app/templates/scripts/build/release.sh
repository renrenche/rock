#!/bin/bash

BUILD_DATE=`date +%Y-%m-%d:%H:%M:%S`

# update npm
npm install --registry=http://registry.npm.taobao.org # --verbose

# build and commit
npm run build:webpack
gulp cdn

git add rev
git add webpack-assets.json
git commit -m "build on $BUILD_DATE"

# bump version
git stash
npm version patch
git stash pop

# push to remote
git push
git push --tags
