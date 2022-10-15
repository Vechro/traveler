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
      background-color: #ececec7f;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    :host(:first-child) {
      border-top: none;
      border-radius: 0 0.5rem 0 0;
    }
    :host(:last-child) {
      border-bottom: none;
      border-radius: 0 0 0.5rem 0.5rem;
    }
    :host(:only-child) {
      border: none;
      border-radius: 0 0.5rem 0.5rem 0.5rem;
    }
  `,
];
