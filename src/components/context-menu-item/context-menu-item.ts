import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./context-menu-item.styles";

@customElement("context-menu-item")
export class ContextMenuItem extends LitElement {
  static styles = styles;

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "context-menu-item": ContextMenuItem;
  }
}
