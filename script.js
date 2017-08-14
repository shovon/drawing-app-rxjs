console.log('With RxJS');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// The `mousedown`, `mouseup`, `mousemove` events turned into an Rx Observable
// stream.

const mousedown = Rx.Observable
  .fromEvent(canvas, 'mousedown')
  .map((e) => ({ clickType: 'mousedown', position: getMousePos(canvas, e) }));

const mouseup = Rx.Observable
  .fromEvent(canvas, 'mouseup')
  .map((e) => ({ clickType: 'mouseup', position: getMousePos(canvas, e) }));

const mousemove = Rx.Observable
  .fromEvent(canvas, 'mousemove')
  .map((e) => getMousePos(canvas, e));

// Merge the `mousedown` and `mouseup` streams into a single sequential stream.

const clicks = Rx.Observable.merge(mousedown, mouseup);

// Combine the `clicks` stream and `mousemove` stream into a stream of events
// where both the click and move are combined into a single event.
//
// This will be useful to us when we want to handle the event when the user
// clicks and drags the cursor across the screen for drawing.
const clickMove = clicks.combineLatest(mousemove, ({ clickType }, position) => {
  return { clickType, position };
});

// Only get the click+move event after a mousedown event, and ignore all those
// that come after a mouseup event.
const dragDown = clickMove.filter(({ clickType }) => clickType === 'mousedown');

// Fairly self-explanatory below.

mousedown.subscribe(({ position }) => {
  const { x, y } = position;
  context.moveTo(x, y);
  context.stroke();
});

dragDown.subscribe(({ clickType, position }) => {
  const { x, y } = position;
  context.lineTo(x, y);
  context.stroke();
  context.moveTo(x, y);
});

mouseup.subscribe(() => {
  context.stroke();
});
