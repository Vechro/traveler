import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./menu-list.styles";

@customElement("menu-list")
export class MenuList extends LitElement {
  static override styles = styles;

  override render = () => {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "menu-list": MenuList;
  }
}
