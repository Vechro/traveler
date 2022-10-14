import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    button {
      background-color: transparent;
      border: none;
      padding: 0.75rem 1rem;
      cursor: pointer;
      text-align: start;
      border-radius: 0.5rem;
      transition: var(--background-color-transition);
    }
    button:hover {
      background-color: #ececec;
    }
    /* We're targeting text nodes out here */
    :only-child {
      display: block;
      width: 100%;
    }
  `,
];
