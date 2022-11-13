declare global {
  interface MouseEvent {
    /**
     * @returns [clientX, clientY]
     */
    clientPosition: [number, number];
    /**
     * @returns [offsetX, offsetY]
     */
    offsetPosition: [number, number];
    /**
     * @returns [pageX, pageY]
     */
    pagePosition: [number, number];
    /**
     * @returns [screenX, screenY]
     */
    screenPosition: [number, number];
    /**
     * @returns [clientX, clientY] normalized to -1..1 where top-left corner is [-1, 1].
     */
    normalizedPosition(): [number, number];
  }
}

export {};
