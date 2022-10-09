import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("context-menu")
export class ContextMenu extends LitElement {
  render() {
    return html`<div>Context Menu</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "context-menu": ContextMenu;
  }
}