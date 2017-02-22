#!/bin/bash

# update config
echo "replace production config with development..."
cp ./config/development.js ./config/production.js

# restart node server
echo "restart pm2 processes..."
pm2 flush
pm2 kill
pm2 start ./scripts/processes.sandbox.json

