Selection.prototype.offsetRange = function() {
  return [this.anchorOffset, this.focusOffset];
};

declare global {
  interface Selection {
    /**
     * @returns [anchorOffset, focusOffset]
     */
    offsetRange(): [number, number];
  }
}

export {};
