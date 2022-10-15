import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: var(--background-color-transition);
      border-top: var(--divider-border);
      border-bottom: var(--divider-border);
    }
    :host(:hover) {
      background-color: #ececfc5f;
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
  `,
];
