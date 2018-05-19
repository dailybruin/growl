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
function downloadCover() {

    var link = document.createElement("a");
    link.download = "image.png";
  
    canvas.toBlob(function(blob) {
      link.href = URL.createObjectURL(blob);
      link.click();
    },'image/png');
  
}
  
  lineOne.addEventListener('input', handleLine1, false);

//v2
  document.getElementById('download').addEventListener('click', function() {
  downloadCover();},
  false);

  lineOne.addEventListener('focus', handleTextFocus, false);

function init() {
    canvas = canvasLib.createHiDPICanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    canvasContain.insertBefore(canvas, canvasContain.firstChild);
    
    currentImage = defaultImage;

    imageHandler.renderImage(canvas, currentImage, 1).then( () => {
        const state = stateManager.getState();

        lineOne.value = state.line1;
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