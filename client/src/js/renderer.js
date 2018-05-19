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
  let lines = [];
  
  words = text.split(' ');
  line = '';

  for( k = 0; k < words.length; k++ ) 
  {
    testLine = line + words[k] + ' ';
    if( maxWidth < context.measureText(testLine).width && k > 0 ) 
    {
      lines.push({line: line, x: x, y: y});
      line = words[k] + ' ';
      y += lineHeight;
    }
    else 
    {
      line = testLine;
    }
  }
  lines.push({line: line, x: x, y: y});
  console.log(lines);
  for(let line of lines) {
    context.fillText(line.line, line.x, line.y);
  }
  context.textAlign = 'right';
  context.fillText('This is the footer', maxWidth, y += lineHeight);
}

// Does the real work of making text changes appear on-screen.
const renderState = () => 
{
    console.log('render state is called');
  const canvas = document.getElementById(ediCanvas);
  const ctx = canvas.getContext('2d');
  const state = stateManager.getState();

  // Background Image rendering
//   if (typeof state.image1.image !== 'undefined') 
//   {
//     ctx.drawImage(
//       state.image1.image,
//       state.image1.dx,
//       state.image1.dy,
//       state.image1.width,
//       state.image1.height,
//       0, 0, 
//       canvas.width, canvas.height);
//   }

  // Line 1
  const cHeight = parseInt(canvas.style.height, 10);
  const cWidth = parseInt(canvas.style.width, 10);
  textSize = Math.floor(cHeight * 0.063);
  canvasMaxWidth = Math.floor(cWidth - cWidth * 0.10);
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
