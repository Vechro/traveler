import { css } from "lit";

export const globalStyles = css`
  :host {
    --background-color-transition: background-color 0.08s ease-out;
    --panel-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05),
      0px 0px 16px -8px rgba(0, 0, 0, 0.05),
      0px 0px 16px -12px rgba(0, 0, 0, 0.12),
      0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  }
`;
