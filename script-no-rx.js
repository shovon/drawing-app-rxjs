console.log('Without RxJS');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

let isMousedown = false;

canvas.addEventListener('mousedown', (e) => {
  isMousedown = true;
  const { x, y } = getMousePos(canvas, e);
  context.moveTo(x, y);
  context.stroke();
});

canvas.addEventListener('mouseup', (e) => {
  isMousedown = false;
  context.stroke();
});

canvas.addEventListener('mousemove', (e) => {
  if (isMousedown) {
    const { x, y } = getMousePos(canvas, e);
    context.lineTo(x, y);
    context.stroke();
    context.moveTo(x, y);
  }
});