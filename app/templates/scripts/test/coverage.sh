#!/bin/bash

NODE_ENV=test node_modules/.bin/babel-node node_modules/.bin/babel-istanbul cover node_modules/.bin/_mocha -- --recursive --reporter  mocha-multi --reporter-options list=-,tap=test.tap tests client/**/*.spec.js && node_modules/.bin/babel-istanbul report clover
