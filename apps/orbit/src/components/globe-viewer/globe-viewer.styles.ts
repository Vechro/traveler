import { css } from "lit";

export const styles = [
  css`
    canvas {
      display: block;
      width: 100%;
      height: 100%;
      contain: size layout paint;
    }
    model-viewer {
      width: 100%;
      height: 100vh;
    }
    .title {
      margin: 0;
    }
    .marker-title {
      padding-block: 0.25rem;
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
    div[slot="interaction-bar"] {
      display: flex;
      flex-direction: row;
      margin-inline-end: 0.5rem;
      gap: 0.25rem;
    }
    .bar-item {
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
    .context-menu > menu-item {
      padding: 0.75rem 1rem;
    }
  `,
];
