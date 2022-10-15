import { css } from "lit";
import { globalStyles } from "../global.styles";

export const styles = [
  globalStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      margin: 0;
      background: #fff;
      border-radius: 0.5rem;
      box-shadow: var(--panel-shadow);
    }
    ::slotted(div) {
      padding: 1rem;
      transition: var(--background-color-transition);
      cursor: pointer;
      border-radius: 0.5rem;
    }
    ::slotted(div:hover) {
      background-color: #ececec7f;
    }
    ::slotted(div:not(:last-child))::after,
    ::slotted(div:not(:first-child))::before {
      content: "";
      display: block;
      height: 2px;
      position: relative;
      width: 100%;
    }
    ::slotted(div:not(:last-child):hover)::after,
    ::slotted(div:not(:first-child):hover)::before {
      background: linear-gradient(
        to right,
        transparent 4%,
        #ddd 50%,
        transparent 96%
      );
    }
    ::slotted(div:not(:last-child))::after {
      top: 1rem;
    }
    ::slotted(div:not(:first-child))::before {
      bottom: 1rem;
    }
  `,
];
