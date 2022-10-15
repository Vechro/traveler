import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    canvas {
      display: block;
      width: 100%;
      height: 100%;
      contain: size layout paint;
    }
    .points-menu {
      position: absolute;
      top: 2rem;
      left: 2rem;
      width: 15rem;
      max-height: 12rem;
      overflow-y: auto;
    }
    .points-menu > menu-item {
      padding: 1rem;
    }
  `,
];
