import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      border-radius: var(--border-radius);
    }
  `,
];
