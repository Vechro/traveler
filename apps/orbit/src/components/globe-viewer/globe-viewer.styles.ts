import { css } from "lit";

export const styles = [
  css`
    model-viewer {
      width: 100%;
      height: 100vh;
      contain: size layout paint;
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

    .hotspot{
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: none;
      background-color: #fd7050;
      box-sizing: border-box;
      pointer-events: none;
      --min-hotspot-opacity: 0;
    }
    .annotation{
      background-color: #888888;
      position: absolute;
      transform: translate(10px, 10px);
      border-radius: 10px;
      padding: 10px;
    }
    /* This keeps child nodes hidden while the element loads */
    :not(:defined) > * {
      display: none;
    }
  `,
];
