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
    ::slotted([slot="header"]) {
      margin: 0;
      padding: 1rem;
      border-bottom: var(--outline-border);
    }
    ::slotted([slot="content"]) {
      padding: 1rem;
      line-height: 1.7;
    }
  `,
];
