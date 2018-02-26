#!/bin/bash
# :: buildJSBundle.sh
###################################################
# A quick and dirty script to use browserify
# to consolidate all of our .js files in /src
# into one file: pub_src/bundle.js.
###################################################
# IF you don't have browserify, run the following:
# sudo npm install -g browserify
###################################################
# :: Created By: Benji Brandt
# :: Creation Date: 25 February 2018

browserify src/entry.js -o src_pub/bundle.js