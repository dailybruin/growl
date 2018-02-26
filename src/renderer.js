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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f98a5f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Background Image rendering
  if (typeof state.image1.image !== 'undefined') 
  {
    ctx.drawImage(
      state.image1.image,
      state.image1.dx,
      state.image1.dy,
      state.image1.width,
      state.image1.height,
      0, 0, canvas.width, canvas.height);
  }

  // Line 1
  textSize = Math.floor(ctx.canvas.height * 0.063);
  canvasMaxWidth = Math.floor(ctx.canvas.width - ctx.canvas.width * 0.05);
  ctx.font = `bold ${textSize}px sans-serif`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  textX = ctx.canvas.width / 2;
  textY = ctx.canvas.height / 2;
  wrapText(ctx, state.line1, textX, textY, canvasMaxWidth, textSize);
};

stateManager.addSubscriber(renderState);

// Allows you to get the generated quote.
const getCover = () => 
{
  var image = new Image();
	image.src = ctx.toDataURL("image/png");
	return image;
};

module.exports = {
  renderState,
  getCover
};
