import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import "../../math";

@customElement("context-menu")
export class ContextMenu extends LitElement {
  @property({ type: Boolean })
  open = false;

  @query("#menu")
  menu!: HTMLDivElement;

  location?: number[];

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
      ${this.open
        ? html`<div id="menu">
            <slot></slot>
          </div>`
        : nothing}`;
  }

  static styles = css`
    :host {
      z-index: 1;
      position: absolute;
    }
    ::slotted(*) {
      display: flex;
      margin: 0;
      padding: 0.5rem;
      background: #fff;
      border-radius: 0.25rem;
      min-width: 8rem;
      box-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05),
        0px 0px 16px -8px rgba(0, 0, 0, 0.05),
        0px 0px 16px -12px rgba(0, 0, 0, 0.12),
        0px 0px 2px 0px rgba(0, 0, 0, 0.08);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "context-menu": ContextMenu;
  }
}
