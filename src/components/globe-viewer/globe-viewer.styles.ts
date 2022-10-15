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
    h3 {
      margin: 0;
    }
    .points-menu {
      position: absolute;
      top: 2rem;
      left: 2rem;
      width: 15rem;
    }
    .points-menu menu-list {
      max-height: 12rem;
    }
    .points-menu menu-item {
      padding: 1rem;
    }
  `,
];
