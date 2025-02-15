import { UniqualizationSettingsForm } from "../types";

export const applyCrop = (
  ctx: OffscreenCanvasRenderingContext2D,
  canvas: OffscreenCanvas,
  amount: number,
  side: "top" | "bottom" | "left" | "right" | "random"
) => {
  let x = 0, y = 0, width = canvas.width, height = canvas.height;
  
  const actualSide = side === "random" 
    ? ["top", "bottom", "left", "right"][Math.floor(Math.random() * 4)] as typeof side
    : side;

  switch (actualSide) {
    case "top": y = amount; height -= amount; break;
    case "bottom": height -= amount; break;
    case "left": x = amount; width -= amount; break;
    case "right": width -= amount; break;
  }

  const tempCanvas = new OffscreenCanvas(width, height);
  const tempCtx = tempCanvas.getContext("2d");
  if (!tempCtx) return;

  tempCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(tempCanvas, 0, 0);
};
