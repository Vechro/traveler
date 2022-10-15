import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./menu-item.styles";

@customElement("menu-item")
export class MenuItem extends LitElement {
  static styles = styles;

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "menu-item": MenuItem;
  }
}
