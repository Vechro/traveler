import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 0.5rem;
      box-shadow: var(--panel-shadow);
    }
    ::slotted(menu-list) {
      box-shadow: none;
    }
    ::slotted([slot="header"]) {
      border-radius: 0.5rem 0.5rem 0 0;
      background-color: #f5f6f9;
      padding: 1rem;
      border-bottom: 2px solid #ddd;
    }
    ::slotted([slot="footer"]) {
      border-radius: 0 0 0.5rem 0.5rem;
      background-color: #f5f6f9;
      padding: 1rem;
      border-top: 2px solid #ddd;
    }
  `,
];
