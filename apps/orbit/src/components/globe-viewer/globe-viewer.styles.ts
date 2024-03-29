import { css } from "lit";

const modelViewerStyles = css`
  model-viewer {
    width: 100%;
    height: 100vh;
    contain: size layout paint;
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
    max-width: 10rem;
    text-align: start;
    width: max-content;
    height: max-content;
    overflow-wrap: break-word;
    padding: 0.5rem 0.75rem;
  }
  /* This keeps child nodes hidden while the element loads */
  :not(:defined) > * {
    display: none;
  }
`;

export const styles = [
  modelViewerStyles,
  css`
    * {
      box-sizing: border-box;
    }
    .title {
      margin: 0;
    }
    .marker-title {
      padding-block: 0.25rem;
      margin-inline: 0.25rem;
      margin-block: 0.75rem;
    }
    .points-menu {
      position: absolute;
      top: 2rem;
      left: 2rem;
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
    light-button svg {
      transition: var(--color-transition);
      color: transparent;
    }
    menu-item:hover svg {
      color: currentColor;
    }
    .context-menu > menu-item {
      padding: 0.75rem 1rem;
      cursor: pointer;
    }
  `,
];
