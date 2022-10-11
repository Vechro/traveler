import { css } from "lit";

export const styles = css`
  :host {
    display: flex;
    position: absolute;
    z-index: 3;
    flex-direction: column;
    margin: 0;
    background: #fff;
    border-radius: 0.5rem;
    min-width: 8rem;
    box-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05),
      0px 0px 16px -8px rgba(0, 0, 0, 0.05),
      0px 0px 16px -12px rgba(0, 0, 0, 0.12),
      0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  }
  ::slotted(button) {
    background-color: transparent;
    border: none;
    padding: 0.75rem 1rem;
    cursor: pointer;
    text-align: start;
  }
  ::slotted(button:hover) {
    background-color: #ececec;
  }
  ::slotted(button:first-child) {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  ::slotted(button:last-child) {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;
