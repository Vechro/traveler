import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      font-size: 0.9rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: var(--background-color-transition);
      border-bottom: 1px solid #ececec;
    }
    :host(:hover) {
      background-color: #ececec;
    }
    :host(:first-child) {
      border-radius: 0 0.5rem 0 0;
    }
    :host(:last-child) {
      border-radius: 0 0 0.5rem 0.5rem;
    }
    :host(:only-child) {
      border-radius: 0 0.5rem 0.5rem 0.5rem;
    }
  `,
];
