// Reasonable defaults
const MAX_ZOOM_STEP = 10;

// https://github.com/tldraw/tldraw/blob/4698b8a33a382514d7415937aaf60389f574bd01/packages/core/src/hooks/useZoomEvents.ts#L150
WheelEvent.prototype.normalizedDelta = function () {
  const { deltaY, deltaX } = this;

  let deltaZ = 0;

  if (this.ctrlKey || this.metaKey) {
    const signY = Math.sign(this.deltaY);
    const absDeltaY = Math.abs(this.deltaY);

    let dy = deltaY;

    if (absDeltaY > MAX_ZOOM_STEP) {
      dy = MAX_ZOOM_STEP * signY;
    }

    deltaZ = dy;
  }

  return [deltaX, deltaY, deltaZ];
};

declare global {
  interface WheelEvent {
    /**
     * Normalized wheel delta across browsers.
     */
    normalizedDelta(): [number, number, number];
  }
}

export {};
