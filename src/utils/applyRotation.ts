export const applyRotation = (
  ctx: OffscreenCanvasRenderingContext2D,
  canvas: OffscreenCanvas,
  angle: number
) => {
  const tempCanvas = new OffscreenCanvas(canvas.width, canvas.height);
  const tempCtx = tempCanvas.getContext("2d");
  if (!tempCtx) return;

  tempCtx.translate(canvas.width / 2, canvas.height / 2);
  tempCtx.rotate((angle * Math.PI) / 180);
  tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0);
};
