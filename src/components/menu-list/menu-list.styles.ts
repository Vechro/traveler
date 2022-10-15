import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      margin: 0;
      border-radius: 0.5rem;
      box-shadow: var(--panel-shadow);
    }
  `,
];
