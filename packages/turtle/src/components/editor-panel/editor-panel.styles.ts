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
    .header {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 0.25rem;
      padding: 1rem;
      border-bottom: var(--outline-border);
    }
    .header > input {
      font-family: unset;
      border: unset;
      background: unset;
      height: unset;
      margin: unset;
      padding: 0.5rem;
      flex: 1;
      font-size: 1.2rem;
      font-weight: 600;
    }
    .content {
      margin: 1rem;
      line-height: 1.7;
      text-indent: 0.5rem;
    }
    .content h3 {
      margin-block: 0.25rem 0.5rem;
    }
  `,
];
