// :: stateManager.js
/*
    Sort of like a go-between for the renderer and entry.
    Saves the current state of the canvas, so we can grab the text
    and images as needed.
*/
// ::

const state = {
  line1: '',
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

const setImage1 = (image) => {
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
