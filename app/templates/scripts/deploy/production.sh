#!/bin/bash

# udpate source
# echo "pull latest code..."
git pull

# handle npm deps
# rm -rf node_modules/
echo "updating npm modules..."
npm install --registry=http://registry.npm.taobao.org # --production --verbose

# reload node server
echo "reload pm2 processes..."
pm2 reload ./scripts/process.production.json
