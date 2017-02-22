#!/bin/bash

NODE_ENV=test node_modules/.bin/mocha --recursive --compilers js:babel-register --repoter list tests client/**/*.spec.js
