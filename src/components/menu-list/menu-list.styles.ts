import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      margin: 0;
      border-radius: 0.5rem;
      box-shadow: var(--panel-shadow);
    }
    ::slotted(div) {
      padding: 1rem;
      transition: var(--background-color-transition);
      cursor: pointer;
      border-top: 1px solid #ececec;
      border-bottom: 1px solid #ececec;
    }
    ::slotted(div:hover) {
      background-color: #ececec7f;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    ::slotted(div:first-child) {
      border-top-color: transparent;
      border-radius: 0.5rem 0.5rem 0 0;
    }
    ::slotted(div:last-child) {
      border-bottom-color: transparent;
      border-radius: 0 0 0.5rem 0.5rem;
    }
    ::slotted(div:only-child) {
      border-color: transparent;
      border-radius: 0.5rem;
    }
  `,
];
