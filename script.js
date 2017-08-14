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

const mousedown = Rx.Observable
  .fromEvent(canvas, 'mousedown')
  .map((e) => ({ clickType: 'mousedown', position: getMousePos(canvas, e) }));

const mouseup = Rx.Observable
  .fromEvent(canvas, 'mouseup')
  .map((e) => ({ clickType: 'mouseup', position: getMousePos(canvas, e) }));

const mousemove = Rx.Observable
  .fromEvent(canvas, 'mousemove')
  .map((e) => getMousePos(canvas, e));

const clicks = Rx.Observable.merge(mousedown, mouseup);

const clickMove = clicks.combineLatest(mousemove, ({ clickType }, position) => {
  return { clickType, position };
});

const dragDown = clickMove.filter(({ clickType }) => clickType === 'mousedown');

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
