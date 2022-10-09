import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../math";

@customElement("context-menu")
export class ContextMenu extends LitElement {
  @property({ type: Boolean })
  open = false;

  private location?: number[];

  firstUpdated() {
    window.addEventListener("contextmenu", (event) => {
      this.open = !this.open;
      this.location = event.pagePosition;
      event.preventDefault();
    });
  }

  render() {
    return html` <style>
        :host {
          left: ${this.location?.[0]}px;
          top: ${this.location?.[1]}px;
        }
      </style>
      ${this.open ? html`<slot></slot>` : nothing}`;
  }

  static styles = css`
    :host {
      display: flex;
      position: absolute;
      z-index: 1;
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
}

declare global {
  interface HTMLElementTagNameMap {
    "context-menu": ContextMenu;
  }
}
