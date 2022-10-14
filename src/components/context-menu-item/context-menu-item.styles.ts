import { css } from "lit";

export const styles = css`
  button {
    background-color: transparent;
    border: none;
    padding: 0.75rem 1rem;
    cursor: pointer;
    text-align: start;
    border-radius: 0.5rem;
  }
  button:hover {
    background-color: #ececec;
  }
  /* We're targeting text nodes out here */
  :only-child {
    display: block;
    width: 100%;
  }
`;
