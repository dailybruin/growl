(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


var createHiDPICanvas = (w, h, ratio) => {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.id = "ediCanvas"
    can.className = "cover__canvas"
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

module.exports = {
    createHiDPICanvas
};
},{}],2:[function(require,module,exports){
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
},{"./canvas":1,"./imageHandler":3,"./renderer":4,"./stateManager":5}],3:[function(require,module,exports){
// :: imageHandler.js
/*
    Does as it is named - handles loading and rendering of an image,
    basically getting metadata and handing it off to stateManager.
*/
// ::

const stateManager = require('./stateManager');

const calculateSourceCoordinates = (width, height, ratio) => 
{
  let srcWidth = width;
  let srcHeight = height;
  let dx = 0;
  let dy = 0;
  // const realRatio = width / height;

  // if (realRatio < ratio) 
  // {
  //   srcHeight = width / ratio;
  //   dy = (height - srcHeight) / 2;
  // } 
  // else if (realRatio > ratio) 
  // {
  //   srcWidth = height / ratio;
  //   dx = (width - srcWidth) / 2;
  // }

  return {
    width: srcWidth,
    height: srcHeight,
    dx,
    dy
  };
};

const renderImage = (src, imageNumber) => 
{
  const image = new Image();
  image.onload = () => {
    const ratio = 1;
    const srcCoords = calculateSourceCoordinates(image.width, image.height, ratio);
    const imageData = {
      image,
      width: srcCoords.width,
      height: srcCoords.height,
      dx: srcCoords.dx,
      dy: srcCoords.dy
    };

    if (imageNumber === 1) {
      stateManager.setImage1(imageData);
    }
  };
  image.src = src;
};

// const loadImageFromFile = (src, imageNumber) => {

//   const reader = new FileReader();

//   reader.onload = (e) => 
//   {
//     renderImage(e.target.result, imageNumber);
//   };
//   reader.readAsDataURL(src);
// };

module.exports = {
  // loadImageFromFile,
  renderImage
};

},{"./stateManager":5}],4:[function(require,module,exports){
// :: renderer.js
/*
    Does the actual hard work of rendering out our image/text
    in the canvas on-screen.
*/
// ::

const stateManager = require('./stateManager');

const ediCanvas = 'ediCanvas';

// Wrapper for canvas.fillxText so that the text always wraps
// over to the next line, and doesn't just run off screen.
function wrapText(context, text, x, y, maxWidth, lineHeight) 
{
  words = text.split(' ');
  line = '';

  for( k = 0; k < words.length; k++ ) 
  {
    testLine = line + words[k] + ' ';
    if( maxWidth < context.measureText(testLine).width && k > 0 ) 
    {
      context.fillText(line, x, y);
      line = words[k] + ' ';
      y += lineHeight;
    }
    else 
    {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

// Does the real work of making text changes appear on-screen.
const renderState = () => 
{
  const canvas = document.getElementById(ediCanvas);
  const ctx = canvas.getContext('2d');
  const state = stateManager.getState();

  // Background Image rendering
  if (typeof state.image1.image !== 'undefined') 
  {
    ctx.drawImage(
      state.image1.image,
      state.image1.dx,
      state.image1.dy,
      state.image1.width,
      state.image1.height,
      0, 0, 
      canvas.width, canvas.height);
  }

  // Line 1
  const cHeight = parseInt(canvas.style.height, 10);
  const cWidth = parseInt(canvas.style.width, 10);
  console.log(cWidth);
  textSize = Math.floor(cHeight * 0.063);
  canvasMaxWidth = Math.floor(cWidth - cWidth * 0.10);
  console.log(canvasMaxWidth);
  ctx.font = `${textSize}px 'Cormorant Garamond'`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  textX = cWidth / 20; //reciprocal of half maxwidth scaling factor 3 lines up
  textY = cHeight / 3.5;
  wrapText(ctx, state.line1, textX, textY, canvasMaxWidth, textSize + 10);
};

stateManager.addSubscriber(renderState);

// Allows you to get the generated quote.
const getCover = () => 
{
  return document.getElementById(ediCanvas).toDataURL();
};

module.exports = {
  renderState,
  getCover
};

},{"./stateManager":5}],5:[function(require,module,exports){
// :: stateManager.js
/*
    Sort of like a go-between for the renderer and entry.
    Saves the current state of the canvas, so we can grab the text
    and images as needed.
*/
// ::

const state = {
  line1: '\"The Undergraduate Students Association Council was created for the purpose of giving students agency in a university riddled with bureaucracy and administrative jargon. Too bad this year’s council has decided to cede its authority to the very administrators it should be holding accountable.\"',
  image1: {}
};
const subscribers = [];

const addSubscriber = (subscriber) => 
{
  if (typeof subscriber === 'function') {
    subscribers.push(subscriber);
  }
};

function callSubscribers() 
{
  subscribers.forEach((subscriber) => {
    subscriber();
  });
}

const setLine1 = (text) => 
{
  state.line1 = text;
  callSubscribers();
};

const setImage1 = (image) => 
{
  state.image1 = image;
  callSubscribers();
};

const getState = () => state;

module.exports = {
  addSubscriber,
  setLine1,
  setImage1,
  getState
};

},{}]},{},[2]);
