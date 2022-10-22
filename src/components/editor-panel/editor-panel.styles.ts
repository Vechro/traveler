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
    ::slotted(input[slot="header"]) {
      all: unset;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0;
      padding: 1rem;
      border-bottom: var(--outline-border);
    }
    .content {
      padding: 1rem;
      line-height: 1.7;
    }
    .content h3 {
      margin-block: 0.25rem 0.5rem;
    }
  `,
];
