interface FilterSettings {
  brightness?: { enabled: boolean; min: number; max: number };
  contrast?: { enabled: boolean; min: number; max: number };
  saturation?: { enabled: boolean; min: number; max: number };
}

export const applyFilters = (
  ctx: OffscreenCanvasRenderingContext2D,
  canvas: OffscreenCanvas,
  settings: FilterSettings
) => {
  const filters: string[] = [];
  
  if (settings.brightness?.enabled) {
    const brightness = settings.brightness.min + 
      Math.random() * (settings.brightness.max - settings.brightness.min);
    filters.push(`brightness(${brightness}%)`);
  }
  
  if (settings.contrast?.enabled) {
    const contrast = settings.contrast.min + 
      Math.random() * (settings.contrast.max - settings.contrast.min);
    filters.push(`contrast(${contrast}%)`);
  }
  
  if (settings.saturation?.enabled) {
    const saturation = settings.saturation.min + 
      Math.random() * (settings.saturation.max - settings.saturation.min);
    filters.push(`saturate(${saturation}%)`);
  }

  if (filters.length === 0) return;

  const tempCanvas = new OffscreenCanvas(canvas.width, canvas.height);
  const tempCtx = tempCanvas.getContext("2d");
  if (!tempCtx) return;

  tempCtx.filter = filters.join(" ");
  tempCtx.drawImage(canvas, 0, 0);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0);
}; 