export const applyReflection = (
  ctx: OffscreenCanvasRenderingContext2D,
  canvas: OffscreenCanvas,
  type: "none" | "horizontal" | "vertical" | "both"
) => {
  if (type === "none") return;

  ctx.save();
  
  let effectiveType = type;
  if (type === "both") {
    effectiveType = Math.random() < 0.5 ? "horizontal" : "vertical";
  }
  
  if (effectiveType === "horizontal") {
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, -canvas.width, 0);
  } else if (effectiveType === "vertical") {
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, -canvas.height);
  }
  
  ctx.restore();
};
