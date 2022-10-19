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
    .title {
      margin: 0;
    }
    .marker-title {
      line-height: 1.8;
      padding: 0.25rem;
    }
    .points-menu {
      position: absolute;
      top: 2rem;
      left: 2rem;
      width: 20rem;
    }
    .points-menu menu-list {
      max-height: 12rem;
    }
    .points-menu menu-item {
      padding: 1rem;
    }
    .bar-item {
      width: 1rem;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      cursor: pointer;
    }
    .bar-item:hover {
      background-color: var(--background-color-hover);
    }
    .bar-item svg {
      transition: var(--color-transition);
      color: transparent;
    }
    menu-item:hover svg {
      color: currentColor;
    }
  `,
];
