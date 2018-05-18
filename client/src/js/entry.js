// :: entry.js
/*
    Acts as our "entry-point," setting everything up for us.
*/
// ::

/* For the un-initiated, the commonJS require stuff
just lets us treat individal JS files like they're
header files in C++: require('./imageHandler') is
spiritually similar to #include "imageHandler" */
// DEPENDENCIES
const renderer = require('./renderer');
const stateManager = require('./stateManager');
// const docPrep = require('./docPrep');
const imageHandler = require('./imageHandler');
const defaultImage = "../img/editorialbg.jpg";
const canvas = require('./canvas');

// CONSTANTS
const CANVAS_HEIGHT = 320;
const CANVAS_WIDTH = 640;

// DOM ELEMENTS
var lineOne = document.getElementById('line1');
var canvasContain = document.getElementById('ediCanvas-container');


function resize (text) {
  text.style.height = 'auto';
  text.style.height = text.scrollHeight+'px';
}

function handleLine1(evt) {
  resize(lineOne);
  stateManager.setLine1(evt.target.value);
}

function handleTextFocus(evt) {
  const target = evt.target;

  if (evt.target.value.toUpperCase() === 'Enter Text Here!') {
    target.value = '';
  }
}

//v2
function downloadCover(link, canvasId, filename) {
  var image = new Image();
  image.crossOrigin = "Anonymous"
  var ts = new Date().getTime();
  image.src = renderer.getCover() + '?' + ts;
  link.href = image;
  link.download = filename;
}
  
  lineOne.addEventListener('input', handleLine1, false);

//v2
  document.getElementById('download').addEventListener('click', function() {
  downloadCover(this, 'ediCanvas', 'editorial.png');},
  false);

  lineOne.addEventListener('focus', handleTextFocus, false);

function init() {
    canvasContain.insertBefore(canvas.createHiDPICanvas(CANVAS_WIDTH, CANVAS_HEIGHT), canvasContain.firstChild);

    //const input1 = document.getElementById('line1');
    const state = stateManager.getState();

    lineOne.value = state.line1;
    imageHandler.renderImage(defaultImage, 1);
    resize(lineOne);
}
init();