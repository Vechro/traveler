import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    ::slotted([slot="menu-list"]) {
      position: absolute;
      z-index: 3;
      min-width: 10rem;
      background: var(--background-color);
      box-shadow: var(--panel-shadow);
    }
  `,
];
