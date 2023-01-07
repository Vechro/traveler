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
    dialog {
      background: none;
      padding: 0;
      border: none;
    }
    dialog::backdrop {
      background: #0009;
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

    .hotspot {
      display: block;
      font: unset;
      padding: unset;
      cursor: pointer;
      width: 12px;
      height: 12px;
      border-radius: 99px;
      border: 4px solid var(--background-color);
      background-color: #661fff;
      --min-hotspot-opacity: 0;
      --max-hotspot-opacity: 0.9;
    }
    .annotation {
      background-color: var(--background-color);
      position: absolute;
      transform: translateX(2px);
      border-radius: calc(var(--border-radius) / 2);
      max-width: 8rem;
      width: max-content;
      height: max-content;
      overflow-wrap: break-word;
      padding: 0.5rem 0.75rem;
    }
    /* This keeps child nodes hidden while the element loads */
    :not(:defined) > * {
      display: none;
    }
  `,
];
