import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    ::slotted([slot="menu-list"]) {
      position: absolute;
      z-index: 3;
      border-radius: 0 0.5rem 0.5rem 0.5rem;
      min-width: 10rem;
      box-shadow: var(--panel-shadow);
    }
  `,
];
