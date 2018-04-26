#!/bin/bash
# :: build.sh
###################################################
# A quick and dirty script to use browserify
# to consolidate all of our .js files in /src
# into one file: pub_src/bundle.js.
# Also uses sass to compile the styles/styles.scss
# into styles_pub/styles.css
###################################################
# IF you don't have browserify, run the following:
# sudo npm install -g browserify
# IF you don't have sass, run the following
# sudo npm install -g sass
###################################################
# :: Created By: Benji Brandt
# :: Creation Date: 25 February 2018

browserify src/entry.js -o src_pub/bundle.js
sass styles/styles.scss styles_pub/styles.css
