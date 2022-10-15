import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    ::slotted([slot="menu-items"]) {
      display: flex;
      position: absolute;
      z-index: 3;
      flex-direction: column;
      margin: 0;
      background: #fff;
      border-radius: 0 0.5rem 0.5rem 0.5rem;
      min-width: 8rem;
      box-shadow: var(--panel-shadow);
    }
  `,
];
