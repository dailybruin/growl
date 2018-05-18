// :: entry.js
/*
    Acts as our "entry-point," setting everything up for us.
*/
// ::

/* For the un-initiated, the commonJS require stuff
just lets us treat individal JS files like they're
header files in C++: require('./imageHandler') is
spiritually similar to #include "imageHandler" */
const renderer = require('./renderer');
const stateManager = require('./stateManager');
const imageHandler = require('./imageHandler');
// const docPrep = require('./docPrep');
const defaultImage = "../img/editorialbg.jpg";

// function handleImage(file, imageNumber) 
// {
//   imageHandler.loadImageFromFile(file, imageNumber);
// }

// function handleBackgroundImage(evt) 
// {
//   handleImage(evt.target.files[0], 1);
// }


function resize (text) 
{
  text.style.height = 'auto';
  text.style.height = text.scrollHeight+'px';
}

function handleLine1(evt) 
{
  var text = document.getElementById("line1");
  resize(text);
  stateManager.setLine1(evt.target.value);
}

function handleTextFocus(evt) 
{
  const target = evt.target;

  if (evt.target.value.toUpperCase() === 'Enter Text Here!')
  {
    target.value = '';
  }
}


//v1
// function downloadCover(evt) 
// {
//   const target = evt.target;
//   const cover = renderer.getCover();

//   target.href = "editorial.jpg";
// }

//v2
function downloadCover(link, canvasId, filename) {
  var image = new Image();
  image.crossOrigin = "Anonymous"
  var ts = new Date().getTime();
  image.src = renderer.getCover() + '?' + ts;
  link.href = image;
  link.download = filename;
}

// document.getElementById('background-image')  
//     .addEventListener('change', handleBackgroundImage, false);
  
  document.getElementById('line1')
    .addEventListener('input', handleLine1, false);

//v2
  document.getElementById('download').addEventListener('click', function() {
  downloadCover(this, 'ediCanvas', 'editorial.png');},
  false);

  document.getElementById('line1')
    .addEventListener('focus', handleTextFocus, false);
  
  //v1
  // document.getElementById('download')
  //   .addEventListener('click', downloadCover, false);

function init() 
{
  const input1 = document.getElementById('line1');
  const state = stateManager.getState();

  input1.value = state.line1;
  // defaultImage.setAttribute('crossOrigin', 'anonymous');
  imageHandler.renderImage(defaultImage, 1);
  resize(input1);
}

init();