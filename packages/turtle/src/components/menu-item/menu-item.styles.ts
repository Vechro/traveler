import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      display: flex;
      align-items: center;
      transition: var(--color-transition);
      border-top: var(--divider-border);
      border-bottom: var(--divider-border);
      padding-inline: 0.5rem;
    }
    :host(:hover) {
      background-color: var(--background-color-hover);
      border-top: var(--divider-border-hover);
      border-bottom: var(--divider-border-hover);
    }
    :host(:first-child) {
      border-top-color: transparent;
      border-radius: var(--border-radius-first);
    }
    :host(:last-child) {
      border-bottom-color: transparent;
      border-radius: var(--border-radius-last);
    }
    :host(:only-child) {
      border-color: transparent;
      border-radius: var(--border-radius);
    }
    ::slotted(input) {
      border: unset;
      color: unset;
      background: unset;
      font: unset;
      font-size: unset;
      width: min-content;
    }
    .title {
      flex: 1;
    }
  `,
];
