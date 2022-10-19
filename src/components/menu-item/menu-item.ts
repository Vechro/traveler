import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./menu-item.styles";

@customElement("menu-item")
export class MenuItem extends LitElement {
  static styles = styles;

  render() {
    return html`
      <span class="title" part="title">
        <slot></slot>
      </span>
      <span part="interaction-bar">
        <slot name="interaction-bar"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "menu-item": MenuItem;
  }
}
