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
const defaultImage = "./img/blackBackground.jpg";

function handleImage(file, imageNumber) 
{
  imageHandler.loadImageFromFile(file, imageNumber);
}

function handleFamilyImage(evt) 
{
  handleImage(evt.target.files[0], 1);
}

function handleBigAssImage(evt) 
{
  handleImage(evt.target.files[0], 2);
}

function handleLine1(evt) 
{
  stateManager.setLine1(evt.target.value);
}

function handleFocus1(evt) 
{
  const target = evt.target;

  if (evt.target.value.toUpperCase() === 'THE LIFE OF PABLO')
   {
    target.value = '';
  }
}

function handleFocus2(evt) 
{
  const target = evt.target;

  if (evt.target.value.toUpperCase() === 'WHICH/ONE') {
    target.value = '';
  }
}

function downloadCover(evt) 
{
  const target = evt.target;
  const cover = renderer.getCover();

  target.href = cover;
}

document.getElementById('background-image')  
    .addEventListener('change', handleFamilyImage, false);
  
  document.getElementById('line1')
    .addEventListener('input', handleLine1, false);
  
  
  document.getElementById('line1')
    .addEventListener('focus', handleFocus1, false);
  
  document.getElementById('download')
    .addEventListener('click', downloadCover, false);

function init() 
{
  const input1 = document.getElementById('line1');
  const state = stateManager.getState();

  input1.value = state.line1;
  imageHandler.renderImage(defaultImage, 1);
}

init();
