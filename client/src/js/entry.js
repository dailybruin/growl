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
const defaultImage = "../img/blackBackground.jpg";
const canvasLib = require('./canvas');

// CONSTANTS
const CANVAS_HEIGHT = 320;
const CANVAS_WIDTH = 640;

// DOM ELEMENTS
var lineOne = document.getElementById('line1');
var canvasContain = document.getElementById('ediCanvas-container');
var canvas = null;

// GLOBALS
var currentImage = null;

function resize (text) {
    console.log('resize called!');
  text.style.height = 'auto';
  text.style.height = text.scrollHeight+'px';
}

function handleLine1(evt) {
  resize(lineOne);
  var image = new Image();
  image.onload = () => {
    canvas.getContext('2d').drawImage(image, 0, 0);
    stateManager.setLine1(evt.target.value);
  };
  image.src = currentImage;
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
    canvas = canvasLib.createHiDPICanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    canvasContain.insertBefore(canvas, canvasContain.firstChild);
    
    currentImage = defaultImage;

    imageHandler.renderImage(canvas, currentImage, 1).then( () => {
        console.log('thenned');
        const state = stateManager.getState();

        lineOne.value = state.line1;
        console.log('canvases value is ');
        console.log(lineOne.value);
        resize(lineOne);
    });
}
init();

// get canvas
// get context(?)
// create image
// load image
// draw image
// put text
// set src