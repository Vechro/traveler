import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      background: var(--background-color);
      box-shadow: var(--panel-shadow);
      border-radius: var(--border-radius);
    }
    ::slotted(menu-list) {
      min-height: 8rem;
    }
    ::slotted([slot="header"]) {
      padding: 1rem;
      border-bottom: var(--outline-border);
    }
    ::slotted([slot="footer"]) {
      padding: 1rem;
      border-top: var(--outline-border);
    }
  `,
];
