import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    button {
      border: unset;
      background: unset;
      display: block;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      cursor: pointer;
    }
    svg {
      display: block;
    }
    button:hover {
      background-color: var(--background-color-hover);
    }
  `,
];
