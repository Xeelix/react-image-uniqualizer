
export const applyReflection = (
  ctx: OffscreenCanvasRenderingContext2D,
  canvas: OffscreenCanvas,
  type: "none" | "horizontal" | "vertical" | "both"
) => {
  if (type === "none") return;

  ctx.save();
  if (type === "horizontal" || type === "both") {
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, -canvas.width, 0);
  }
  if (type === "vertical" || type === "both") {
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, -canvas.height);
  }
  ctx.restore();
};