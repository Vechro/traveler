Object.defineProperty(MouseEvent.prototype, "clientPosition", {
  get: function () {
    return [this.clientX, this.clientY];
  },
});

Object.defineProperty(MouseEvent.prototype, "offsetPosition", {
  get: function () {
    return [this.offsetX, this.offsetY];
  },
});

Object.defineProperty(MouseEvent.prototype, "pagePosition", {
  get: function () {
    return [this.pageX, this.pageY];
  },
});

Object.defineProperty(MouseEvent.prototype, "screenPosition", {
  get: function () {
    return [this.screenX, this.screenY];
  },
});

MouseEvent.prototype.normalizedPosition = function () {
  return [
    (this.clientX / innerWidth) * 2 - 1,
    -(this.clientY / innerHeight) * 2 + 1,
  ];
};

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
