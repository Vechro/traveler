import { css } from "lit";

export const globalStyles = css`
  :host {
    --font-color: #213547;
    --color-transition: background-color 0.08s ease-out, color 0.2s ease-in;
    --outline-border: 2px solid #dddded;
    --divider-border: 1px solid #ececfc;
    --divider-border-hover: 1px solid #dddded;
    --background-color: #fcfcff;
    --background-color-hover: #ececfc5f;
    --border-radius-first: 0.5rem 0.5rem 0 0;
    --border-radius-last: 0 0 0.5rem 0.5rem;
    --border-radius: 0.5rem;
    --panel-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05), 0px 0px 16px -8px rgba(0, 0, 0, 0.05),
      0px 0px 16px -12px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08);

    color: var(--font-color);
  }
  * {
    box-sizing: border-box;
  }
`;
