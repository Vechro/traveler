export class MouseEventX extends MouseEvent {
  static from = (event: MouseEvent) => new MouseEventX(event.type, event);

  /**
   * @returns [clientX, clientY] normalized to -1..1 where top-left corner is [-1, 1].
   */
  normalizedPosition = (): [x: number, y: number] => [
    (this.clientX / self.innerWidth) * 2 - 1,
    -(this.clientY / self.innerHeight) * 2 + 1,
  ];
}
