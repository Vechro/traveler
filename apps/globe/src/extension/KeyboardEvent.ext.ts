Object.defineProperty(KeyboardEvent.prototype, "isAlphanumeric", {
  get: function () {
    if (this.key.length !== 1) return false;
    const key = this.key.charCodeAt(0);
    return (
      (key > 47 && key < 58) ||
      (key > 64 && key < 91) ||
      (key > 96 && key < 123)
    );
  },
});

declare global {
  interface KeyboardEvent {
    isAlphanumeric: boolean;
  }
}

export {};
