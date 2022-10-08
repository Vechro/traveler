Object.defineProperty(MouseEvent.prototype, "position", {
  get: function position() {
    return [this.clientX, this.clientY];
  },
});

MouseEvent.prototype.normalizedPosition = function () {
  return [
    (this.clientX / innerWidth) * 2 - 1,
    -(-(this.clientY / innerHeight) * 2 + 1),
  ];
};

declare global {
  interface MouseEvent {
    /**
     * @returns [clientX, clientY]
     */
    position: [number, number];
    /**
     * @returns [clientX, clientY] normalized to -1..1 where top-left corner is [-1, -1].
     */
    normalizedPosition(): [number, number];
  }
}

export {};
