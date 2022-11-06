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
      border-radius: 0.5rem 0.5rem 0 0;
    }
    :host(:last-child) {
      border-bottom-color: transparent;
      border-radius: 0 0 0.5rem 0.5rem;
    }
    :host(:only-child) {
      border-color: transparent;
      border-radius: 0.5rem;
    }
    ::slotted(input) {
      border: unset;
      color: unset;
      background: unset;
      font: unset;
      font-size: unset;
      margin: 0.75rem;
      width: 10rem;
    }
    .title {
      flex: 1;
    }
  `,
];
