export const applyReflection = (
  ctx: OffscreenCanvasRenderingContext2D,
  canvas: OffscreenCanvas,
  type: "none" | "horizontal" | "vertical" | "both"
) => {
  if (type === "none") return;

  ctx.save();

  if (type === "horizontal" || type === "both") {
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
  }
  if (type === "vertical" || type === "both") {
    ctx.scale(1, -1);
    ctx.translate(0, -canvas.height);
  }

  ctx.drawImage(canvas, 0, 0);
  ctx.restore();
};
