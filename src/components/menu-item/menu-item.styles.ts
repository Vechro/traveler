import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: var(--background-color-transition);
      border-top: 1px solid #ececec;
      border-bottom: 1px solid #ececec;
    }
    :host(:hover) {
      background-color: #ececec7f;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
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
