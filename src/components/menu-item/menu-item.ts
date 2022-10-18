import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import cross from "../../assets/icons/cross.svg?raw";
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
